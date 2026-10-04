"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import { api, formatINR, type Plan, type Subscription } from "../../../lib/api";
import { Button, Badge, PageSkeleton } from "../../../components/ui";

export default function BillingPage() {
  const { accessToken } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [sub, setSub] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!accessToken) return;
    (async () => {
      try {
        const [p, s] = await Promise.all([
          api.get<{ plans: Plan[] }>("/v1/plans"),
          api.get<{ subscription: Subscription }>("/v1/subscriptions/current", accessToken),
        ]);
        setPlans(p.plans);
        setSub(s.subscription);
      } catch { setError("Could not reach the billing API."); }
      setLoading(false);
    })();
  }, [accessToken]);

  const checkout = async (planId: string) => {
    if (!accessToken) return;
    setBusy(planId);
    setError("");
    try {
      const s = await api.post<{ url: string }>("/v1/subscriptions/checkout", { planId }, accessToken);
      window.location.href = s.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed.");
      setBusy(null);
    }
  };

  const portal = async () => {
    if (!accessToken) return;
    setBusy("portal");
    try {
      const u = await api.post<{ url: string }>("/v1/subscriptions/portal", {}, accessToken);
      window.location.href = u.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not open billing portal.");
      setBusy(null);
    }
  };

  const cancel = async () => {
    if (!accessToken || !confirm("Cancel at the end of the billing period? Your data stays on your machines.")) return;
    setBusy("cancel");
    try {
      await api.post("/v1/subscriptions/cancel", { atPeriodEnd: true }, accessToken);
      const s = await api.get<{ subscription: Subscription }>("/v1/subscriptions/current", accessToken);
      setSub(s.subscription);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Cancellation failed.");
    }
    setBusy(null);
  };

  if (loading) return <PageSkeleton />;

  return (
    <>
      <div className="page-head">
        <div>
          <p className="dash-crumb">Account</p>
          <h1>Billing</h1>
          <p className="faint">Plans are per organization, billed in INR. Cancel anytime. Data is never deleted.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={portal} disabled={busy === "portal"}>
          {busy === "portal" ? "Opening…" : "Payment methods"}
        </Button>
      </div>

      {error && <div className="auth-error" role="alert">{error}</div>}

      {sub && (
        <section className="dash-card">
          <h2>Current subscription</h2>
          <p className="muted">
            <Badge tone={sub.status === "active" ? "green" : sub.status === "trialing" ? "amber" : "gray"}>{sub.status}</Badge>
            <span className="mono" style={{ marginLeft: 12 }}>{formatINR(sub.price_cents)} / {sub.billing_interval === "month" ? "month" : "year"}</span>
          </p>
          <p className="muted" style={{ marginBottom: 0 }}>
            <strong style={{ color: "var(--ink)" }}>{sub.plan_name}</strong>
            {" · Renews "}{new Date(sub.current_period_end).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            {sub.cancel_at_period_end && " · Cancellation scheduled at period end. Everything keeps working until then."}
          </p>
          {!sub.cancel_at_period_end && sub.status !== "trialing" && (
            <div style={{ marginTop: 16 }}>
              <Button variant="danger" size="sm" onClick={cancel} disabled={busy === "cancel"}>
                {busy === "cancel" ? "Cancelling…" : "Cancel plan"}
              </Button>
            </div>
          )}
        </section>
      )}

      <section>
        <h2 style={{ fontSize: 20, marginBottom: 4 }}>Plans</h2>
        <p className="faint" style={{ marginBottom: 20 }}>Every plan includes the full product and a 14-day free trial.</p>
        {plans.length === 0 ? (
          <p className="faint">Plans could not be loaded. The billing API may be offline.</p>
        ) : (
          <div className="plan-grid">
            {plans.map((p) => {
              const current = sub?.plan_slug === p.slug;
              const feats = p.features.length
                ? p.features.slice(0, 4).map((f) => `${f.label}${f.limit ? ` (${f.limit})` : ""}`)
                : [`${p.trial_days}-day free trial`, "Offline-capable desktop app", "AI-assisted workflows"];
              return (
                <div className={`plan-card${current ? " current" : ""}`} key={p.id}>
                  {current && <span className="plan-tag">Current plan</span>}
                  <h3>{p.name}</h3>
                  <div className="plan-price">{formatINR(p.price_cents)}<small> /month</small></div>
                  <p className="faint" style={{ fontSize: 13 }}>{p.device_limit} device{p.device_limit > 1 ? "s" : ""} included</p>
                  <ul className="plan-feats">
                    {feats.map((f, i) => <li key={i}><i>✓</i>{f}</li>)}
                  </ul>
                  {!current && (
                    <Button
                      variant="secondary"
                      size="sm"
                      block
                      disabled={busy === p.id}
                      onClick={() => checkout(p.id)}
                    >
                      {busy === p.id ? "Redirecting…" : sub?.status === "trialing" ? "Start subscription" : `Switch to ${p.name}`}
                    </Button>
                  )}
                  {current && (
                    <Button variant="secondary" size="sm" block disabled>Current plan</Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <p className="small faint" style={{ marginTop: 8 }}>
          Payments are processed securely by our billing provider. A successful payment page alone never
          activates anything. Your subscription updates only after the provider confirms it.
        </p>
      </section>
    </>
  );
}
