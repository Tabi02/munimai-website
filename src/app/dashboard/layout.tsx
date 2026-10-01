"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../lib/auth";
import { ThemeToggle } from "../../components/ui";

const LINKS = [
  { href: "/dashboard", label: "Overview", icon: "▦" },
  { href: "/dashboard/billing", label: "Billing", icon: "💳" },
  { href: "/dashboard/devices", label: "Devices", icon: "💻" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, orgs, loading, logout, isPlatformAdmin, isDemo } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading) {
    return <div className="dash-main"><div className="skeleton" /></div>;
  }
  if (!user) return null;

  return (
    <div className="dash">
      <aside className="sidebar">
        <Link href="/" className="brand" style={{ padding: "6px 14px 20px", display: "flex" }}>
          <img src="/logo.png" alt="MunimAI logo" className="brand-logo" /> MunimAI
        </Link>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href}
            className={`side-link${pathname === l.href ? " active" : ""}`}>
            <span style={{ width: 22, textAlign: "center" }}>{l.icon}</span>
            {l.label}
          </Link>
        ))}
        {isPlatformAdmin && (
          <Link href="/admin" className="side-link" style={{ marginTop: 8 }}>
            <span style={{ width: 22, textAlign: "center" }}>🛡</span>
            Admin console
          </Link>
        )}
        <div style={{ marginTop: "auto", padding: "14px 6px 0" }}>
          <div className="muted" style={{ padding: "0 8px 10px", fontSize: 12.5 }}>
            {user.display_name}<br />{orgs[0]?.name}
          </div>
          <div className="row-between" style={{ padding: "0 4px" }}>
            <ThemeToggle />
            <button className="btn btn-ghost btn-sm" onClick={() => { logout(); router.push("/"); }}>
              Sign out
            </button>
          </div>
        </div>
      </aside>
      <main className="dash-main">
        {isDemo && (
          <div className="demo-banner">
            <span>✨</span>
            <span><strong>Demo mode</strong> — you're exploring with sample data. Nothing here is real, and nothing is saved.</span>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
