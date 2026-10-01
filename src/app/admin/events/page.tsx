"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import { api } from "../../../lib/api";
import { Badge, PageSkeleton, DataTable } from "../../../components/ui";

interface Evt { kind: string; created_at: string; detail: string; organization_name: string; }

export default function AdminEvents() {
  const { accessToken } = useAuth();
  const [events, setEvents] = useState<Evt[] | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    api.get<{ events: Evt[] }>("/v1/admin/events", accessToken)
      .then((d) => setEvents(d.events)).catch(() => setEvents([]));
  }, [accessToken]);

  if (!events) return <PageSkeleton />;

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 4 }}>Events</h1>
      <p className="muted">Audit trail of subscription and license activity across the platform.</p>
      <div style={{ marginTop: 24 }}>
        {events.length === 0 ? (
          <p className="muted">No events yet.</p>
        ) : (
          <DataTable
            caption="Platform events"
            columns={[
              { key: "time", header: "Time" },
              { key: "type", header: "Type" },
              { key: "org", header: "Organization" },
              { key: "detail", header: "Detail" },
            ]}
            rows={events.map((e, i) => ({
              time: <span className="muted">{new Date(e.created_at).toLocaleString("en-IN")}</span>,
              type: <Badge tone={e.kind === "subscription" ? "accent" : "gray"}>{e.kind}</Badge>,
              org: <strong key={i}>{e.organization_name}</strong>,
              detail: <span className="muted">{e.detail.replace(/_/g, " ")}</span>,
            }))}
          />
        )}
      </div>
    </>
  );
}
