"use client";

import { useAuth } from "../../../lib/auth";
import { Card, Field } from "../../../components/ui";

export default function SettingsPage() {
  const { user, orgs } = useAuth();

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 4 }}>Settings</h1>
      <p className="muted">Your account and organization.</p>

      <div className="grid grid-2 mt">
        <Card>
          <div className="card-title">Profile</div>
          <div className="mt">
            <Field label="Name">
              <input className="input" value={user?.display_name ?? ""} readOnly />
            </Field>
            <Field label="Email">
              <input className="input" value={user?.email ?? ""} readOnly />
            </Field>
            <p className="muted" style={{ fontSize: 13, margin: 0 }}>
              {user?.email_verified_at ? "✓ Email verified" : "Email not verified yet — check your inbox."}
            </p>
          </div>
        </Card>
        <Card>
          <div className="card-title">Organization</div>
          <div className="mt">
            <Field label="Name">
              <input className="input" value={orgs[0]?.name ?? ""} readOnly />
            </Field>
            <Field label="Your role">
              <input className="input" value={orgs[0]?.role ?? ""} readOnly style={{ textTransform: "capitalize" }} />
            </Field>
            <p className="muted" style={{ fontSize: 13, margin: 0 }}>
              Team member management ships with the Team plan admin tools.
            </p>
          </div>
        </Card>
      </div>

      <Card className="mt">
        <div className="card-title">Danger zone</div>
        <p className="card-sub">
          Deleting your account removes your cloud identity. Your local business data stays on your
          machines — we never delete customer data.
        </p>
      </Card>
    </>
  );
}
