"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import { api, formatINR } from "../../../lib/api";
import { Card, Spinner, StatusBadge } from "../../../components/ui";

interface Sub {
  id: string; status: string; current_period_end: string; cancel_at_period_end: boolean;
  created_at: string; organization_name: string; plan_name: string; price_cents: number; currency: string;
}

export default function AdminSubs() {
  const { accessToken } = useAuth();
  const [subs, setSubs] = useState<Sub[] | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    api.get<{ subscriptions: Sub[] }>("/v1/admin/subscriptions", accessToken)
      .then((d) => setSubs(d.subscriptions)).catch(() => setSubs([]));
  }, [accessToken]);

  if (!subs) return <Spinner />;

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 4 }}>Subscriptions</h1>
      <p className="muted">{subs.length} total</p>
      <Card className="mt">
        <table className="table">
          <thead><tr><th>Organization</th><th>Plan</th><th>Amount</th><th>Status</th><th>Period ends</th></tr></thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id}>
                <td><strong>{s.organization_name}</strong></td>
                <td>{s.plan_name}</td>
                <td>{formatINR(s.price_cents)}</td>
                <td>
                  <StatusBadge status={s.status} />
                  {s.cancel_at_period_end && <span className="badge badge-gray" style={{ marginLeft: 8 }}>cancelling</span>}
                </td>
                <td className="muted">{new Date(s.current_period_end).toLocaleDateString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {subs.length === 0 && <p className="muted">No subscriptions yet.</p>}
      </Card>
    </>
  );
}
