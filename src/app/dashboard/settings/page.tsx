"use client";

import { useAuth } from "../../../lib/auth";
import { Field, Badge } from "../../../components/ui";

export default function SettingsPage() {
  const { user, orgs } = useAuth();

  return (
    <>
      <div className="page-head">
        <div>
          <p className="dash-crumb">Account</p>
          <h1>Settings</h1>
          <p className="faint">Your account and organization.</p>
        </div>
      </div>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Profile</h2>
        <div style={{ maxWidth: 480 }}>
          <Field label="Name">
            <input className="input" value={user?.display_name ?? ""} readOnly />
          </Field>
          <Field label="Email">
            <input className="input" value={user?.email ?? ""} readOnly />
          </Field>
          <p className="small" style={{ margin: 0 }}>
            {user?.email_verified_at
              ? <Badge tone="green">Email verified</Badge>
              : <span className="faint">Email not verified yet. Check your inbox.</span>}
          </p>
        </div>
      </section>

      <section className="section-tight" style={{ borderTop: "1px solid var(--line)", paddingTop: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Organization</h2>
        <div style={{ maxWidth: 480 }}>
          <Field label="Name">
            <input className="input" value={orgs[0]?.name ?? ""} readOnly />
          </Field>
          <Field label="Your role">
            <input className="input" value={orgs[0]?.role ?? ""} readOnly style={{ textTransform: "capitalize" }} />
          </Field>
          <p className="small faint" style={{ margin: 0 }}>
            Team member management ships with the Team plan admin tools.
          </p>
        </div>
      </section>

      <section className="section-tight" style={{ borderTop: "1px solid var(--line)", paddingTop: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 4 }}>Danger zone</h2>
        <p className="faint" style={{ maxWidth: "64ch" }}>
          Deleting your account removes your cloud identity. Your local business data stays on your
          machines. We never delete customer data.
        </p>
      </section>
    </>
  );
}
