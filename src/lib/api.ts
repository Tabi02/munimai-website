/* Typed client for the MunimAI OS cloud API. */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export class ApiError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

type RefreshFn = () => Promise<string | null>;

let refreshFn: RefreshFn | null = null;
export function setRefreshHandler(fn: RefreshFn) {
  refreshFn = fn;
}

async function request<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {},
  retried = false,
): Promise<T> {
  const { token, ...init } = options;
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init.headers || {}),
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  });
  const json = await res.json().catch(() => ({}));

  if (res.status === 401 && token && refreshFn && !retried) {
    const newToken = await refreshFn();
    if (newToken) return request<T>(path, { ...options, token: newToken }, true);
  }
  if (!res.ok) {
    throw new ApiError(
      json?.error?.code || "REQUEST_FAILED",
      json?.error?.message || `Request failed (${res.status})`,
      res.status,
    );
  }
  return json.data as T;
}

export const api = {
  get: <T>(path: string, token?: string | null) => request<T>(path, { token }),
  post: <T>(path: string, body?: unknown, token?: string | null) =>
    request<T>(path, { method: "POST", body: body === undefined ? undefined : JSON.stringify(body), token }),
  del: <T>(path: string, token?: string | null) => request<T>(path, { method: "DELETE", token }),
};

/* ---------- types ---------- */
export interface Plan {
  id: string;
  name: string;
  slug: string;
  price_cents: number;
  currency: string;
  billing_interval: string;
  trial_days: number;
  device_limit: number;
  features: { key: string; label: string; limit: number | null }[];
}

export interface Subscription {
  id: string;
  status: string;
  plan_name: string;
  plan_slug: string;
  price_cents: number;
  currency: string;
  billing_interval: string;
  device_limit: number;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export interface Device {
  id: string;
  device_uid: string;
  device_name: string;
  os: string;
  app_version: string;
  last_seen_at: string;
  revoked_at: string | null;
}

export interface LicenseEntitlement {
  licenseId: string;
  organizationId: string;
  plan: string;
  features: string[];
  deviceLimit: number;
  issuedAt: string;
  expiresAt: string;
  offlineGraceUntil: string;
  keyId: string;
  signature: string;
}

export function formatINR(cents: number): string {
  return "₹" + (cents / 100).toLocaleString("en-IN");
}

export function statusBadge(status: string): string {
  switch (status) {
    case "active": return "badge-green";
    case "trialing": return "badge-violet";
    case "past_due":
    case "grace_period": return "badge-amber";
    case "expired":
    case "cancelled":
    case "suspended":
    case "revoked": return "badge-red";
    default: return "badge-gray";
  }
}
