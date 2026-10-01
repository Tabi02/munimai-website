"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import { api } from "../../../lib/api";
import { Card, Spinner } from "../../../components/ui";

interface Evt { kind: string; created_at: string; detail: string; organization_name: string; }

export default function AdminEvents() {
  const { accessToken } = useAuth();
  const [events, setEvents] = useState<Evt[] | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    api.get<{ events: Evt[] }>("/v1/admin/events", accessToken)
      .then((d) => setEvents(d.events)).catch(() => setEvents([]));
  }, [accessToken]);

  if (!events) return <Spinner />;

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 4 }}>Events</h1>
      <p className="muted">Audit trail of subscription and license activity across the platform.</p>
      <Card className="mt">
        <table className="table">
          <thead><tr><th>Time</th><th>Type</th><th>Organization</th><th>Detail</th></tr></thead>
          <tbody>
            {events.map((e, i) => (
              <tr key={i}>
                <td className="muted">{new Date(e.created_at).toLocaleString("en-IN")}</td>
                <td><span className={`badge ${e.kind === "subscription" ? "badge-violet" : "badge-gray"}`}>{e.kind}</span></td>
                <td><strong>{e.organization_name}</strong></td>
                <td className="muted">{e.detail.replace(/_/g, " ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && <p className="muted">No events yet.</p>}
      </Card>
    </>
  );
}
