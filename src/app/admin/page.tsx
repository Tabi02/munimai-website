"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth";
import { api, formatINR } from "../../lib/api";
import { Card, Spinner, StatusBadge } from "../../components/ui";

interface Overview {
  organizations: number;
  users: number;
  subscriptionsByStatus: Record<string, number>;
  mrrCents: number;
}

export default function AdminOverview() {
  const { accessToken } = useAuth();
  const [data, setData] = useState<Overview | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    api.get<Overview>("/v1/admin/overview", accessToken).then(setData).catch(() => {});
  }, [accessToken]);

  if (!data) return <Spinner />;

  const entries = Object.entries(data.subscriptionsByStatus);

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 4 }}>Platform overview</h1>
      <p className="muted">The commercial health of MunimAI at a glance.</p>

      <div className="stat-grid">
        <div className="stat">
          <div className="stat-k">Organizations</div>
          <div className="stat-v">{data.organizations}</div>
        </div>
        <div className="stat">
          <div className="stat-k">Users</div>
          <div className="stat-v">{data.users}</div>
        </div>
        <div className="stat">
          <div className="stat-k">MRR</div>
          <div className="stat-v">{formatINR(data.mrrCents)}</div>
        </div>
        <div className="stat">
          <div className="stat-k">Paying subs</div>
          <div className="stat-v">{(data.subscriptionsByStatus.active || 0) + (data.subscriptionsByStatus.past_due || 0)}</div>
        </div>
      </div>

      <Card>
        <div className="card-title">Subscriptions by status</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
          {entries.length === 0 && <p className="muted" style={{ margin: 0 }}>No subscriptions yet.</p>}
          {entries.map(([status, count]) => (
            <div key={status} className="stat" style={{ minWidth: 150 }}>
              <div className="stat-k">{count}</div>
              <StatusBadge status={status} />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
