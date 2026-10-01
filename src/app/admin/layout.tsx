"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../lib/auth";

const LINKS = [
  { href: "/admin", label: "Overview", icon: "▦" },
  { href: "/admin/organizations", label: "Organizations", icon: "🏢" },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: "💳" },
  { href: "/admin/events", label: "Events", icon: "📋" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isPlatformAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading) return <div className="dash-main"><div className="skeleton" /></div>;
  if (!user) return null;

  if (!isPlatformAdmin) {
    return (
      <div className="dash-main" style={{ maxWidth: 560, margin: "80px auto", textAlign: "center" }}>
        <h1 style={{ fontSize: 28 }}>Restricted area</h1>
        <p className="muted">This console is only available to platform administrators.</p>
        <Link href="/dashboard" className="btn btn-ghost" style={{ marginTop: 12 }}>Back to dashboard</Link>
      </div>
    );
  }

  return (
    <div className="dash">
      <aside className="sidebar">
        <Link href="/" className="brand" style={{ padding: "6px 14px 20px", display: "flex" }}>
          <img src="/logo.png" alt="MunimAI logo" className="brand-logo" /> MunimAI Admin
        </Link>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href}
            className={`side-link${pathname === l.href ? " active" : ""}`}>
            <span style={{ width: 22, textAlign: "center" }}>{l.icon}</span>
            {l.label}
          </Link>
        ))}
        <div style={{ marginTop: "auto", padding: "14px 6px 0" }}>
          <Link href="/dashboard" className="side-link">← Customer dashboard</Link>
        </div>
      </aside>
      <main className="dash-main">{children}</main>
    </div>
  );
}
