"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth, DEMO_EMAIL, DEMO_PASSWORD } from "../../lib/auth";
import { ApiError } from "../../lib/api";
import { Button, Field } from "../../components/ui";
import { Wordmark } from "../../components/site";

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

  if (loading) return <div className="container" style={{ padding: "80px 0" }}><p className="faint">Preparing sign in…</p></div>;

  return (
    <div className="auth-wrap">
      <div className="auth-side">
        <Link href="/" aria-label="MunimAI OS home" style={{ display: "inline-block", marginBottom: 32 }}>
          <Wordmark />
        </Link>
        <h1>Welcome back.</h1>
        <p>Sign in to manage your subscription, licenses and devices.</p>
        <ul className="auth-points">
          <li><strong>One account, every device</strong>Your license follows your account across your machines.</li>
          <li><strong>Billing and invoices</strong>View plans, receipts and renewal dates.</li>
          <li><strong>Device management</strong>See licensed devices and deactivate a lost one.</li>
        </ul>
      </div>
      <div className="auth-form-col">
        <div className="auth-card">
          <h2>Sign in</h2>
          <p className="faint" style={{ marginBottom: 24 }}>Use your MunimAI OS account.</p>
          {error && <div className="auth-error" role="alert">{error}</div>}
          <form onSubmit={submit}>
            <Field label="Email">
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </Field>
            <Field label="Password">
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
            </Field>
            <Button type="submit" block disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
          </form>
          <p className="small faint" style={{ marginTop: 16 }}>
            Exploring? <button type="button" className="link-btn" onClick={fillDemo}>Fill the demo account</button> ({DEMO_EMAIL}).
          </p>
          <p className="auth-alt">New to MunimAI OS? <Link href="/register">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
}
