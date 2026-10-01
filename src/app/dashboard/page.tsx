"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../lib/auth";
import { api, formatINR, type Subscription, type Device } from "../../lib/api";
import { Button, Card, CopyKey, Spinner, StatusBadge } from "../../components/ui";

export default function DashboardOverview() {
  const { accessToken, orgs, isDemo } = useAuth();
  const [sub, setSub] = useState<Subscription | null>(null);
  const [devices, setDevices] = useState<Device[] | null>(null);
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    if (isDemo) {
      // Sample data so the demo account shows a living dashboard.
      setSub({
        id: "demo-sub", plan_name: "Pro", plan_slug: "pro", status: "trialing",
        price_cents: 249000, currency: "INR", billing_interval: "month", device_limit: 3,
        current_period_end: new Date(Date.now() + 11 * 864e5).toISOString(),
        cancel_at_period_end: false,
      });
      setDevices([
        { id: "d1", device_uid: "demo-pc-1", device_name: "Shop PC", os: "Windows", app_version: "0.1.0", last_seen_at: new Date().toISOString(), revoked_at: null },
        { id: "d2", device_uid: "demo-lap-2", device_name: "Owner Laptop", os: "macOS", app_version: "0.1.0", last_seen_at: new Date(Date.now() - 36e5).toISOString(), revoked_at: null },
      ]);
      setLicenseKey("MUNIM-DEMO-7X4K-9Q2P-ABCD");
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const [s, d, l] = await Promise.all([
          api.get<{ subscription: Subscription }>("/v1/subscriptions/current", accessToken),
          api.get<{ devices: Device[] }>("/v1/licenses/devices", accessToken),
          api.post<{ id: string; licenseKey: string }>("/v1/licenses/ensure", {}, accessToken),
        ]);
        setSub(s.subscription);
        setDevices(d.devices);
        setLicenseKey(l.licenseKey);
      } catch { /* API may be offline in preview */ }
      setLoading(false);
    })();
  }, [accessToken]);

  if (loading) return <Spinner />;

  const activeDevices = devices?.filter((d) => !d.revoked_at).length ?? 0;

  return (
    <>
      <div className="row-between">
        <div>
          <h1 style={{ fontSize: 30, marginBottom: 4 }}>Overview</h1>
          <p className="muted" style={{ margin: 0 }}>{orgs[0]?.name} · {orgs[0]?.role}</p>
        </div>
        <Button href="/dashboard/billing" variant="ghost">Manage billing</Button>
      </div>

      <div className="stat-grid">
        <div className="stat">
          <div className="stat-k">Plan</div>
          <div className="stat-v">{sub?.plan_name ?? "—"}</div>
        </div>
        <div className="stat">
          <div className="stat-k">Status</div>
          <div style={{ marginTop: 6 }}>{sub ? <StatusBadge status={sub.status} /> : "—"}</div>
        </div>
        <div className="stat">
          <div className="stat-k">Devices</div>
          <div className="stat-v">{activeDevices}<span className="muted" style={{ fontSize: 15, fontWeight: 500 }}> / {sub?.device_limit ?? "—"}</span></div>
        </div>
        <div className="stat">
          <div className="stat-k">Renews</div>
          <div className="stat-v" style={{ fontSize: 19 }}>
            {sub ? new Date(sub.current_period_end).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <Card>
          <div className="card-title">License key</div>
          <p className="card-sub">Enter this in the desktop app to activate it. Keep it private.</p>
          {licenseKey ? <CopyKey value={licenseKey} /> : <p className="muted">No license yet.</p>}
          <div className="mt">
            <Link href="/dashboard/devices" className="btn btn-ghost btn-sm">Manage devices →</Link>
          </div>
        </Card>
        <Card>
          <div className="card-title">Subscription</div>
          {sub ? (
            <>
              <p className="card-sub" style={{ marginBottom: 12 }}>
                <StatusBadge status={sub.status} />&nbsp;&nbsp;
                {formatINR(sub.price_cents)} / {sub.billing_interval === "month" ? "month" : "year"}
              </p>
              <p className="muted" style={{ fontSize: 13.5 }}>
                {sub.status === "trialing"
                  ? "You're on a free trial. Add a payment method before it ends to keep everything running."
                  : sub.cancel_at_period_end
                    ? "Your subscription will end at the close of the current period. Your data stays on your machines."
                    : "Billed automatically. Cancel anytime — your data is never deleted."}
              </p>
              <div className="mt">
                <Button href="/dashboard/billing" size="sm">
                  {sub.status === "trialing" ? "Choose a plan" : "Change plan"}
                </Button>
              </div>
            </>
          ) : (
            <p className="muted">Could not load subscription.</p>
          )}
        </Card>
      </div>

      <Card className="mt">
        <div className="card-title">Get the desktop app</div>
        <p className="card-sub">
          Download MunimAI for your computer, install it, and activate with your license key above.
          Your business data stays on your machines.
        </p>
        <div className="row-between mt" style={{ justifyContent: "flex-start" }}>
          {process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL ? (
            <Button variant="ghost" size="sm" href={process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL}>⬇ Windows</Button>
          ) : (
            <Button variant="ghost" size="sm" disabled>⬇ Windows — coming soon</Button>
          )}
          <Button variant="ghost" size="sm" disabled>⬇ macOS — coming soon</Button>
          <Button variant="ghost" size="sm" disabled>⬇ Linux — coming soon</Button>
        </div>
      </Card>
    </>
  );
}
