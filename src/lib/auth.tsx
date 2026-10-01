"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api, setRefreshHandler } from "./api";

interface Org { id: string; name: string; slug: string; role: string; }
interface User { id: string; email: string; display_name: string; email_verified_at: string | null; }

interface AuthState {
  user: User | null;
  orgs: Org[];
  isPlatformAdmin: boolean;
  accessToken: string | null;
  loading: boolean;
  /** True when signed in with the built-in demo account (no backend). */
  isDemo: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: { email: string; password: string; displayName: string; organizationName: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

const REFRESH_KEY = "bizai_refresh";
const DEMO_KEY = "munimai_demo";

/** Built-in demo account. Works fully client-side so the static site can be explored. */
export const DEMO_EMAIL = "demo@munimai.com";
export const DEMO_PASSWORD = "demo1234";

const DEMO_USER: User = {
  id: "demo-user",
  email: DEMO_EMAIL,
  display_name: "Demo User",
  email_verified_at: new Date().toISOString(),
};
const DEMO_ORGS: Org[] = [
  { id: "demo-org", name: "Sharma Traders", slug: "demo", role: "owner" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [isPlatformAdmin, setIsPlatformAdmin] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);

  const enterDemo = useCallback(() => {
    try { localStorage.setItem(DEMO_KEY, "1"); } catch { /* ignore */ }
    setUser(DEMO_USER);
    setOrgs(DEMO_ORGS);
    setIsPlatformAdmin(false);
    setAccessToken("demo");
    setIsDemo(true);
  }, []);

  const exitDemo = useCallback(() => {
    try { localStorage.removeItem(DEMO_KEY); } catch { /* ignore */ }
    setIsDemo(false);
  }, []);

  const doRefresh = useCallback(async (): Promise<string | null> => {
    const rt = localStorage.getItem(REFRESH_KEY);
    if (!rt) return null;
    try {
      const data = await api.post<{ accessToken: string; refreshToken: string }>("/v1/auth/refresh", { refreshToken: rt });
      localStorage.setItem(REFRESH_KEY, data.refreshToken);
      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch {
      localStorage.removeItem(REFRESH_KEY);
      setAccessToken(null);
      setUser(null);
      setIsPlatformAdmin(false);
      return null;
    }
  }, []);

  useEffect(() => {
    setRefreshHandler(doRefresh);
    (async () => {
      try {
        if (localStorage.getItem(DEMO_KEY) === "1") {
          enterDemo();
          setLoading(false);
          return;
        }
      } catch { /* ignore */ }
      const rt = localStorage.getItem(REFRESH_KEY);
      if (rt) {
        const token = await doRefresh();
        if (token) {
          try {
            const me = await api.get<{ user: User; organizations: Org[]; isPlatformAdmin: boolean }>("/v1/auth/me", token);
            setUser(me.user);
            setOrgs(me.organizations);
            setIsPlatformAdmin(me.isPlatformAdmin);
          } catch { /* ignore */ }
        }
      }
      setLoading(false);
    })();
  }, [doRefresh]);

  const syncMe = useCallback(async (token: string) => {
    const me = await api.get<{ user: User; organizations: Org[]; isPlatformAdmin: boolean }>("/v1/auth/me", token);
    setUser(me.user);
    setOrgs(me.organizations);
    setIsPlatformAdmin(me.isPlatformAdmin);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      enterDemo();
      return;
    }
    const data = await api.post<{ accessToken: string; refreshToken: string }>("/v1/auth/login", { email, password });
    localStorage.setItem(REFRESH_KEY, data.refreshToken);
    setAccessToken(data.accessToken);
    await syncMe(data.accessToken);
  }, [syncMe, enterDemo]);

  const register = useCallback(async (input: { email: string; password: string; displayName: string; organizationName: string }) => {
    await api.post("/v1/auth/register", {
      email: input.email,
      password: input.password,
      displayName: input.displayName,
      organizationName: input.organizationName,
    });
    await login(input.email, input.password);
  }, [login]);

  const logout = useCallback(async () => {
    exitDemo();
    const rt = localStorage.getItem(REFRESH_KEY);
    if (rt) {
      try { await api.post("/v1/auth/logout", { refreshToken: rt }); } catch { /* ignore */ }
    }
    localStorage.removeItem(REFRESH_KEY);
    setAccessToken(null);
    setUser(null);
    setOrgs([]);
    setIsPlatformAdmin(false);
  }, []);

  const value = useMemo(
    () => ({ user, orgs, isPlatformAdmin, accessToken, loading, isDemo, login, register, logout }),
    [user, orgs, isPlatformAdmin, accessToken, loading, isDemo, login, register, logout],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
