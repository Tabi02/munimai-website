"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import { api, formatINR, type Plan, type Subscription } from "../../../lib/api";
import { Button, Card, Spinner, StatusBadge } from "../../../components/ui";

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

  if (loading) return <Spinner />;

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 4 }}>Billing</h1>
      <p className="muted">Plans are per organization, billed in INR. Cancel anytime — data is never deleted.</p>
      {error && <div className="form-error mt">{error}</div>}

      {sub && (
        <Card className="mt">
          <div className="row-between">
            <div>
              <div className="card-title">Current plan: {sub.plan_name}</div>
              <p className="card-sub" style={{ margin: 0 }}>
                <StatusBadge status={sub.status} />&nbsp;&nbsp;
                {formatINR(sub.price_cents)} / {sub.billing_interval === "month" ? "month" : "year"} ·
                renews {new Date(sub.current_period_end).toLocaleDateString("en-IN")}
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Button variant="ghost" size="sm" onClick={portal} disabled={busy === "portal"}>
                {busy === "portal" ? "Opening…" : "Payment methods"}
              </Button>
              {!sub.cancel_at_period_end && sub.status !== "trialing" && (
                <Button variant="danger-ghost" size="sm" onClick={cancel} disabled={busy === "cancel"}>
                  {busy === "cancel" ? "Cancelling…" : "Cancel plan"}
                </Button>
              )}
            </div>
          </div>
          {sub.cancel_at_period_end && (
            <p className="muted mt" style={{ marginBottom: 0 }}>
              Scheduled to cancel at period end. Everything keeps working until then.
            </p>
          )}
        </Card>
      )}

      <div className="grid grid-3 mt">
        {plans.map((p, i) => {
          const current = sub?.plan_slug === p.slug;
          return (
            <Card key={p.id} className={`price-card${i === 1 ? " popular" : ""}`}>
              {i === 1 && <span className="price-flag">Most popular</span>}
              <div className="card-title">{p.name}</div>
              <div className="price-amount">{formatINR(p.price_cents)}</div>
              <div className="price-per">per month · {p.device_limit} device{p.device_limit > 1 ? "s" : ""}</div>
              <ul className="price-list">
                {p.features.length
                  ? p.features.map((f) => <li key={f.key}>{f.label}{f.limit ? ` (${f.limit})` : ""}</li>)
                  : <><li>{p.trial_days}-day free trial</li><li>Offline-capable desktop app</li><li>AI-assisted workflows</li></>}
              </ul>
              <div style={{ marginTop: "auto" }}>
                {current ? (
                  <span className="badge badge-green"><span className="dot" />Current plan</span>
                ) : (
                  <Button
                    variant={i === 1 ? "primary" : "ghost"}
                    disabled={busy === p.id}
                    onClick={() => checkout(p.id)}
                  >
                    {busy === p.id ? "Redirecting…" : sub?.status === "trialing" ? "Start subscription" : "Switch to " + p.name}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      <p className="muted mt" style={{ fontSize: 13 }}>
        Payments are processed securely by our billing provider. A successful payment page alone never
        activates anything — your subscription updates only after the provider confirms it.
      </p>
    </>
  );
}
