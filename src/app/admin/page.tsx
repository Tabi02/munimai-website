"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth";
import { api, formatINR } from "../../lib/api";
import { Badge, PageSkeleton } from "../../components/ui";

interface Overview {
  organizations: number;
  users: number;
  subscriptionsByStatus: Record<string, number>;
  mrrCents: number;
}

function statusTone(status: string): "green" | "amber" | "red" | "gray" {
  if (status === "active") return "green";
  if (status === "trialing" || status === "past_due") return "amber";
  if (status === "canceled" || status === "unpaid") return "red";
  return "gray";
}

export default function AdminOverview() {
  const { accessToken } = useAuth();
  const [data, setData] = useState<Overview | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    api.get<Overview>("/v1/admin/overview", accessToken).then(setData).catch(() => {});
  }, [accessToken]);

  if (!data) return <PageSkeleton />;

  const entries = Object.entries(data.subscriptionsByStatus);

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 4 }}>Platform overview</h1>
      <p className="muted">The commercial health of Aetros Biz at a glance.</p>

      <div className="stat-strip" style={{ marginTop: 24 }}>
        <div className="stat"><span className="stat-k">Organizations</span><span className="stat-v">{data.organizations}</span></div>
        <div className="stat"><span className="stat-k">Users</span><span className="stat-v">{data.users}</span></div>
        <div className="stat"><span className="stat-k">MRR</span><span className="stat-v">{formatINR(data.mrrCents)}</span></div>
        <div className="stat"><span className="stat-k">Paying subs</span><span className="stat-v">{(data.subscriptionsByStatus.active || 0) + (data.subscriptionsByStatus.past_due || 0)}</span></div>
      </div>

      <section style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-s)", background: "var(--surface)", padding: 20, marginTop: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 16 }}>Subscriptions by status</h2>
        {entries.length === 0 && <p className="muted" style={{ margin: 0 }}>No subscriptions yet.</p>}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {entries.map(([status, count]) => (
            <div key={status} style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-s)", padding: "12px 16px", minWidth: 150 }}>
              <div className="stat-v">{count}</div>
              <div style={{ marginTop: 6 }}><Badge tone={statusTone(status)}>{status}</Badge></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
