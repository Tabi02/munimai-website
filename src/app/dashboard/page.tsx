"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth";
import { api, formatINR, type Subscription, type Device } from "../../lib/api";
import { Button, Badge, PageSkeleton } from "../../components/ui";
import { IconCheck } from "../../components/icons";

const WIN_URL = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL || "";

function statusTone(status: string): "green" | "amber" | "red" | "gray" {
  if (status === "active") return "green";
  if (status === "trialing" || status === "past_due") return "amber";
  if (status === "canceled" || status === "unpaid") return "red";
  return "gray";
}

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
      <code className="mono" style={{ fontSize: 14, padding: "8px 12px", border: "1px solid var(--line)", borderRadius: "var(--radius-s)", background: "var(--surface)" }}>
        {value}
      </code>
      <Button
        variant="secondary"
        size="sm"
        onClick={async () => {
          try { await navigator.clipboard.writeText(value); } catch { /* clipboard unavailable */ }
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
      >
        {copied ? "Copied" : "Copy"}
      </Button>
      {copied && <IconCheck size={16} />}
    </div>
  );
}

export default function DashboardOverview() {
  const { accessToken, orgs, isDemo } = useAuth();
  const [sub, setSub] = useState<Subscription | null>(null);
  const [devices, setDevices] = useState<Device[] | null>(null);
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) return;
    if (isDemo) {
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
  }, [accessToken, isDemo]);

  if (loading) return <PageSkeleton />;

  const activeDevices = devices?.filter((d) => !d.revoked_at).length ?? 0;

  return (
    <>
      <div className="page-head">
        <div>
          <p className="dash-crumb">Account</p>
          <h1>Overview</h1>
          <p className="faint">{orgs[0]?.name} · {orgs[0]?.role}</p>
        </div>
        <Button href="/dashboard/billing" variant="secondary">Manage billing</Button>
      </div>

      <div className="stat-strip">
        <div className="stat"><span className="stat-k">Plan</span><span className="stat-v">{sub?.plan_name ?? "–"}</span></div>
        <div className="stat"><span className="stat-k">Status</span><span className="stat-v">{sub ? <Badge tone={statusTone(sub.status)}>{sub.status}</Badge> : "–"}</span></div>
        <div className="stat"><span className="stat-k">Devices</span><span className="stat-v">{activeDevices}<span className="faint" style={{ fontSize: 15, fontWeight: 500 }}> / {sub?.device_limit ?? "–"}</span></span></div>
        <div className="stat"><span className="stat-k">Renews</span><span className="stat-v" style={{ fontSize: 19 }}>{sub ? new Date(sub.current_period_end).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "–"}</span></div>
      </div>

      <section className="section-tight" style={{ paddingTop: 8 }}>
        <h2 style={{ fontSize: 22, marginBottom: 4 }}>License key</h2>
        <p className="faint" style={{ marginBottom: 16 }}>Enter this in the desktop app to activate it. Keep it private.</p>
        {licenseKey ? <CopyValue value={licenseKey} /> : <p className="faint">No license yet.</p>}
        <div style={{ marginTop: 16 }}>
          <Button href="/dashboard/devices" variant="secondary" size="sm">Manage devices</Button>
        </div>
      </section>

      <section className="section-tight" style={{ borderTop: "1px solid var(--line)", paddingTop: 32 }}>
        <h2 style={{ fontSize: 22, marginBottom: 4 }}>Subscription</h2>
        {sub ? (
          <>
            <p style={{ marginBottom: 12 }}>
              <Badge tone={statusTone(sub.status)}>{sub.status}</Badge>
              <span className="mono" style={{ marginLeft: 12 }}>{formatINR(sub.price_cents)} / {sub.billing_interval === "month" ? "month" : "year"}</span>
            </p>
            <p className="faint" style={{ fontSize: 14, maxWidth: "60ch" }}>
              {sub.status === "trialing"
                ? "You are on a free trial. Add a payment method before it ends to keep everything running."
                : sub.cancel_at_period_end
                  ? "Your subscription will end at the close of the current period. Your data stays on your machines."
                  : "Billed automatically. Cancel anytime. Your data is never deleted."}
            </p>
            <div style={{ marginTop: 16 }}>
              <Button href="/dashboard/billing" size="sm">
                {sub.status === "trialing" ? "Choose a plan" : "Change plan"}
              </Button>
            </div>
          </>
        ) : (
          <p className="faint">Could not load subscription.</p>
        )}
      </section>

      <section className="section-tight" style={{ borderTop: "1px solid var(--line)", paddingTop: 32 }}>
        <h2 style={{ fontSize: 22, marginBottom: 4 }}>Get the desktop app</h2>
        <p className="faint" style={{ marginBottom: 16, maxWidth: "64ch" }}>
          Download MunimAI OS for your computer, install it, and activate with your license key above.
          Your business data stays on your machines.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {WIN_URL ? (
            <Button variant="secondary" size="sm" href={WIN_URL}>Download for Windows</Button>
          ) : (
            <Button variant="secondary" size="sm" disabled>Windows (coming soon)</Button>
          )}
          <Button variant="secondary" size="sm" disabled>macOS (coming soon)</Button>
          <Button variant="secondary" size="sm" disabled>Linux (coming soon)</Button>
        </div>
      </section>
    </>
  );
}
