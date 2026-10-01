"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";
import { ApiError } from "../../lib/api";
import { Button, Card, Field } from "../../components/ui";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", displayName: "", organizationName: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 10) {
      setError("Password must be at least 10 characters.");
      return;
    }
    setBusy(true);
    try {
      await register({
        email: form.email.trim(),
        password: form.password,
        displayName: form.displayName.trim(),
        organizationName: form.organizationName.trim(),
      });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Registration failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="hero-glow" />
      <Card className="auth-card" >
        <Link href="/" className="brand" style={{ marginBottom: 26, display: "inline-flex" }}>
          <img src="/logo.png" alt="MunimAI OS logo" className="brand-logo" style={{ width: 30, height: 30 }} /> MunimAI OS
        </Link>
        <h1>Start your trial</h1>
        <p className="muted" style={{ marginBottom: 26 }}>14 days free on every plan. No credit card required.</p>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={submit}>
          <Field label="Your name">
            <input className="input" required placeholder="Aarav Sharma" value={form.displayName} onChange={set("displayName")} autoComplete="name" />
          </Field>
          <Field label="Company / organization">
            <input className="input" required placeholder="Sharma Traders" value={form.organizationName} onChange={set("organizationName")} autoComplete="organization" />
          </Field>
          <Field label="Work email">
            <input className="input" type="email" required placeholder="you@company.com" value={form.email} onChange={set("email")} autoComplete="email" />
          </Field>
          <Field label="Password">
            <input className="input" type="password" required placeholder="Min. 10 characters" value={form.password} onChange={set("password")} autoComplete="new-password" />
          </Field>
          <Button type="submit" disabled={busy}>
            <span style={{ width: "100%" }}>{busy ? "Creating account…" : "Create account"}</span>
          </Button>
        </form>
        <div className="divider" />
        <p className="muted" style={{ textAlign: "center", margin: 0 }}>
          Just exploring? <Link href="/login" style={{ color: "var(--accent-2)", fontWeight: 600 }}>Try the demo account</Link> — no signup needed.
        </p>
        <div className="divider" />
        <p className="muted" style={{ textAlign: "center", margin: 0 }}>
          Already have an account? <Link href="/login" style={{ color: "var(--accent-2)", fontWeight: 600 }}>Sign in</Link>
        </p>
      </Card>
    </div>
  );
}
