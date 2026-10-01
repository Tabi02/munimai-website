"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import { api, formatINR } from "../../../lib/api";
import { Badge, PageSkeleton, DataTable } from "../../../components/ui";

interface Sub {
  id: string; status: string; current_period_end: string; cancel_at_period_end: boolean;
  created_at: string; organization_name: string; plan_name: string; price_cents: number; currency: string;
}

function statusTone(status: string): "green" | "amber" | "red" | "gray" {
  if (status === "active") return "green";
  if (status === "trialing" || status === "past_due") return "amber";
  if (status === "canceled" || status === "unpaid") return "red";
  return "gray";
}

export default function AdminSubs() {
  const { accessToken } = useAuth();
  const [subs, setSubs] = useState<Sub[] | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    api.get<{ subscriptions: Sub[] }>("/v1/admin/subscriptions", accessToken)
      .then((d) => setSubs(d.subscriptions)).catch(() => setSubs([]));
  }, [accessToken]);

  if (!subs) return <PageSkeleton />;

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 4 }}>Subscriptions</h1>
      <p className="muted">{subs.length} total</p>
      <div style={{ marginTop: 24 }}>
        {subs.length === 0 ? (
          <p className="muted">No subscriptions yet.</p>
        ) : (
          <DataTable
            caption="Subscriptions"
            columns={[
              { key: "org", header: "Organization" },
              { key: "plan", header: "Plan" },
              { key: "amount", header: "Amount", align: "right", mono: true },
              { key: "status", header: "Status" },
              { key: "ends", header: "Period ends" },
            ]}
            rows={subs.map((s) => ({
              org: <strong>{s.organization_name}</strong>,
              plan: s.plan_name,
              amount: formatINR(s.price_cents),
              status: <><Badge tone={statusTone(s.status)}>{s.status}</Badge>{s.cancel_at_period_end && <span style={{ marginLeft: 8 }}><Badge tone="gray">cancelling</Badge></span>}</>,
              ends: <span className="muted">{new Date(s.current_period_end).toLocaleDateString("en-IN")}</span>,
            }))}
          />
        )}
      </div>
    </>
  );
}
