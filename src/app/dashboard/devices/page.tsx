"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import { api, type Device } from "../../../lib/api";
import { Button, Badge, PageSkeleton, EmptyState, DataTable } from "../../../components/ui";

export default function DevicesPage() {
  const { accessToken } = useAuth();
  const [devices, setDevices] = useState<Device[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = async () => {
    if (!accessToken) return;
    const d = await api.get<{ devices: Device[] }>("/v1/licenses/devices", accessToken);
    setDevices(d.devices);
  };

  useEffect(() => { load().catch(() => setDevices([])); }, [accessToken]);

  const revoke = async (id: string, name: string) => {
    if (!accessToken || !confirm(`Revoke "${name}"? It will lose access immediately.`)) return;
    setBusy(id);
    try {
      await api.del(`/v1/licenses/devices/${id}`, accessToken);
      await load();
    } catch { /* ignore */ }
    setBusy(null);
  };

  if (!devices) return <PageSkeleton />;

  const active = devices.filter((d) => !d.revoked_at);

  return (
    <>
      <div className="page-head">
        <div>
          <p className="dash-crumb">Account</p>
          <h1>Devices</h1>
          <p className="faint">
            Each activated desktop counts as one device. Revoke one to free its seat. The app on that
            machine stops working at the next check-in.
          </p>
        </div>
      </div>

      {devices.length === 0 ? (
        <EmptyState
          title="No devices yet."
          body="Install the desktop app and activate it with your license key from the Overview page."
          actions={<Button href="/download" variant="secondary">Get the desktop app</Button>}
        />
      ) : (
        <DataTable
          caption={`${active.length} active device${active.length === 1 ? "" : "s"}`}
          columns={[
            { key: "device", header: "Device" },
            { key: "os", header: "OS" },
            { key: "app", header: "App", mono: true },
            { key: "seen", header: "Last seen" },
            { key: "status", header: "Status" },
            { key: "action", header: "", align: "right" },
          ]}
          rows={devices.map((d) => ({
            device: <span><span className="t-strong">{d.device_name}</span><br /><span className="small faint mono">{d.device_uid.slice(0, 18)}…</span></span>,
            os: d.os,
            app: d.app_version,
            seen: new Date(d.last_seen_at).toLocaleString("en-IN"),
            status: d.revoked_at ? <Badge tone="red">Revoked</Badge> : <Badge tone="green">Active</Badge>,
            action: !d.revoked_at ? (
              <Button variant="danger" size="sm" disabled={busy === d.id} onClick={() => revoke(d.id, d.device_name)}>
                {busy === d.id ? "Revoking…" : "Revoke"}
              </Button>
            ) : null,
          }))}
        />
      )}
    </>
  );
}
