"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import { api } from "../../../lib/api";
import { Card, Spinner, StatusBadge } from "../../../components/ui";

interface Org {
  id: string; name: string; slug: string; created_at: string;
  subscription_status: string | null; plan_name: string | null; member_count: string;
}

export default function AdminOrgs() {
  const { accessToken } = useAuth();
  const [orgs, setOrgs] = useState<Org[] | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    api.get<{ organizations: Org[] }>("/v1/admin/organizations", accessToken)
      .then((d) => setOrgs(d.organizations)).catch(() => setOrgs([]));
  }, [accessToken]);

  if (!orgs) return <Spinner />;

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 4 }}>Organizations</h1>
      <p className="muted">{orgs.length} total</p>
      <Card className="mt">
        <table className="table">
          <thead><tr><th>Organization</th><th>Plan</th><th>Status</th><th>Members</th><th>Created</th></tr></thead>
          <tbody>
            {orgs.map((o) => (
              <tr key={o.id}>
                <td><strong>{o.name}</strong><br /><span className="muted" style={{ fontSize: 12 }}>{o.slug}</span></td>
                <td>{o.plan_name ?? "—"}</td>
                <td>{o.subscription_status ? <StatusBadge status={o.subscription_status} /> : <span className="muted">—</span>}</td>
                <td>{o.member_count}</td>
                <td className="muted">{new Date(o.created_at).toLocaleDateString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orgs.length === 0 && <p className="muted">No organizations yet.</p>}
      </Card>
    </>
  );
}
