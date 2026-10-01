"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import { api } from "../../../lib/api";
import { Badge, PageSkeleton, DataTable } from "../../../components/ui";

interface Org {
  id: string; name: string; slug: string; created_at: string;
  subscription_status: string | null; plan_name: string | null; member_count: string;
}

function statusTone(status: string): "green" | "amber" | "red" | "gray" {
  if (status === "active") return "green";
  if (status === "trialing" || status === "past_due") return "amber";
  if (status === "canceled" || status === "unpaid") return "red";
  return "gray";
}

export default function AdminOrgs() {
  const { accessToken } = useAuth();
  const [orgs, setOrgs] = useState<Org[] | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    api.get<{ organizations: Org[] }>("/v1/admin/organizations", accessToken)
      .then((d) => setOrgs(d.organizations)).catch(() => setOrgs([]));
  }, [accessToken]);

  if (!orgs) return <PageSkeleton />;

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 4 }}>Organizations</h1>
      <p className="muted">{orgs.length} total</p>
      <div style={{ marginTop: 24 }}>
        {orgs.length === 0 ? (
          <p className="muted">No organizations yet.</p>
        ) : (
          <DataTable
            caption="Organizations"
            columns={[
              { key: "org", header: "Organization" },
              { key: "plan", header: "Plan" },
              { key: "status", header: "Status" },
              { key: "members", header: "Members", align: "right", mono: true },
              { key: "created", header: "Created" },
            ]}
            rows={orgs.map((o) => ({
              org: <><strong>{o.name}</strong><br /><span className="muted" style={{ fontSize: 12 }}>{o.slug}</span></>,
              plan: o.plan_name ?? "–",
              status: o.subscription_status ? <Badge tone={statusTone(o.subscription_status)}>{o.subscription_status}</Badge> : <span className="faint">–</span>,
              members: o.member_count,
              created: <span className="muted">{new Date(o.created_at).toLocaleDateString("en-IN")}</span>,
            }))}
          />
        )}
      </div>
    </>
  );
}
