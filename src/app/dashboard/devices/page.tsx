"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/auth";
import { api, type Device } from "../../../lib/api";
import { Button, Card, Spinner } from "../../../components/ui";

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

  if (!devices) return <Spinner />;

  const active = devices.filter((d) => !d.revoked_at);

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 4 }}>Devices</h1>
      <p className="muted">
        Each activated desktop counts as one device. Revoke one to free its seat — the app on that
        machine stops working at the next check-in.
      </p>

      <Card className="mt">
        {devices.length === 0 ? (
          <p className="muted" style={{ margin: 0 }}>
            No devices yet. Install the desktop app and activate it with your license key from the Overview page.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr><th>Device</th><th>OS</th><th>App</th><th>Last seen</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d.id}>
                  <td><strong>{d.device_name}</strong><br /><span className="muted" style={{ fontSize: 12 }}>{d.device_uid.slice(0, 18)}…</span></td>
                  <td>{d.os}</td>
                  <td className="muted">{d.app_version}</td>
                  <td className="muted">{new Date(d.last_seen_at).toLocaleString("en-IN")}</td>
                  <td>
                    {d.revoked_at
                      ? <span className="badge badge-red"><span className="dot" />Revoked</span>
                      : <span className="badge badge-green"><span className="dot" />Active</span>}
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {!d.revoked_at && (
                      <Button variant="danger-ghost" size="sm" disabled={busy === d.id}
                        onClick={() => revoke(d.id, d.device_name)}>
                        {busy === d.id ? "Revoking…" : "Revoke"}
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
      <p className="muted mt">{active.length} active device{active.length === 1 ? "" : "s"}</p>
    </>
  );
}
