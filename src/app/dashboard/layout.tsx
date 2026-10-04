"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../lib/auth";
import { Wordmark } from "../../components/site";
import { Button } from "../../components/ui";
import { IconDashboard, IconFinance, IconInventory, IconGear, IconShield } from "../../components/icons";

const LINKS = [
  { href: "/dashboard", label: "Overview", Icon: IconDashboard },
  { href: "/dashboard/billing", label: "Billing", Icon: IconFinance },
  { href: "/dashboard/devices", label: "Devices", Icon: IconInventory },
  { href: "/dashboard/settings", label: "Settings", Icon: IconGear },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, orgs, loading, logout, isPlatformAdmin, isDemo } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading) {
    return <div className="dash-main"><p className="faint">Loading…</p></div>;
  }
  if (!user) return null;

  return (
    <div className="dash">
      <aside className="dash-side">
        <Link href="/" aria-label="Aetros Biz home" style={{ display: "inline-block", padding: "4px 10px 20px" }}>
          <Wordmark compact />
        </Link>
        <nav aria-label="Account">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}
              className={`dash-link${pathname === l.href ? " active" : ""}`}
              aria-current={pathname === l.href ? "page" : undefined}>
              <l.Icon size={17} />
              {l.label}
            </Link>
          ))}
          {isPlatformAdmin && (
            <Link href="/admin" className="dash-link" style={{ marginTop: 8 }}>
              <IconShield size={17} />
              Admin console
            </Link>
          )}
        </nav>
        <div className="dash-user">
          <p className="small" style={{ padding: "0 10px 10px", margin: 0 }}>
            <strong>{user.display_name}</strong><br />
            <span className="faint">{orgs[0]?.name}</span>
          </p>
          <Button variant="secondary" size="sm" block onClick={() => { logout(); router.push("/"); }}>
            Sign out
          </Button>
        </div>
      </aside>
      <main className="dash-main">
        {isDemo && (
          <div className="demo-banner" role="status">
            <strong>Demo mode</strong><span>, you are exploring with sample data. Nothing here is real, and nothing is saved.</span>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
