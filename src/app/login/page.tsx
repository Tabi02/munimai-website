"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, DEMO_EMAIL, DEMO_PASSWORD } from "../../lib/auth";
import { ApiError } from "../../lib/api";
import { Button, Card, Field, BrandLoader } from "../../components/ui";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email.trim(), password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Sign in failed. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  if (loading) return <BrandLoader label="Preparing sign in…" />;

  return (
    <div className="auth-wrap">
      <div className="hero-glow" />
      <Card className="auth-card">
        <Link href="/" className="brand" style={{ marginBottom: 26, display: "inline-flex" }}>
          <img src="/logo.png" alt="MunimAI OS logo" className="brand-logo" style={{ width: 30, height: 30 }} /> MunimAI OS
        </Link>
        <h1>Welcome back</h1>
        <p className="muted" style={{ marginBottom: 26 }}>Sign in to manage your subscription, licenses, and devices.</p>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={submit}>
          <Field label="Email">
            <input className="input" type="email" required placeholder="you@company.com"
              value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </Field>
          <Field label="Password">
            <input className="input" type="password" required placeholder="••••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </Field>
          <Button type="submit" disabled={busy} >
            <span style={{ width: "100%" }}>{busy ? "Signing in…" : "Sign in"}</span>
          </Button>
        </form>
        <div className="divider" />
        <div className="demo-box">
          <div className="demo-box-h">Just exploring? Try the demo account</div>
          <div className="demo-creds">
            <code>{DEMO_EMAIL}</code>
            <code>{DEMO_PASSWORD}</code>
          </div>
          <button type="button" className="btn btn-ghost btn-sm" onClick={fillDemo}>
            Fill demo credentials
          </button>
          <p className="muted" style={{ fontSize: 12, margin: "10px 0 0" }}>
            Demo mode runs fully in your browser with sample data — no signup needed.
          </p>
        </div>
        <div className="divider" />
        <p className="muted" style={{ textAlign: "center", margin: 0 }}>
          New here? <Link href="/register" style={{ color: "var(--accent-2)", fontWeight: 600 }}>Create an account</Link>
        </p>
      </Card>
    </div>
  );
}
