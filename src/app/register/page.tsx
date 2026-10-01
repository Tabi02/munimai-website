"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/auth";
import { ApiError } from "../../lib/api";
import { Button, Field } from "../../components/ui";
import { Wordmark } from "../../components/site";

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
      <div className="auth-side">
        <Link href="/" aria-label="Aetros Biz home" style={{ display: "inline-block", marginBottom: 32 }}>
          <Wordmark />
        </Link>
        <h1>Start your trial.</h1>
        <p>14 days free on every plan. No credit card required.</p>
        <ul className="auth-points">
          <li><strong>Full product, not a demo</strong>Every module and all seven AI specialists are included from day one.</li>
          <li><strong>Your data, your machine</strong>The database lives on your computer. Cancel any time and keep everything.</li>
          <li><strong>Honest pricing</strong>Prices adapt to your country. See the full table before you commit.</li>
        </ul>
      </div>
      <div className="auth-form-col">
        <div className="auth-card">
          <h2>Create your account</h2>
          <p className="faint" style={{ marginBottom: 24 }}>One account manages your license, devices and billing.</p>
          {error && <div className="auth-error" role="alert">{error}</div>}
          <form onSubmit={submit}>
            <Field label="Your name">
              <input className="input" required value={form.displayName} onChange={set("displayName")} autoComplete="name" />
            </Field>
            <Field label="Business name">
              <input className="input" required value={form.organizationName} onChange={set("organizationName")} autoComplete="organization" />
            </Field>
            <Field label="Work email">
              <input className="input" type="email" required value={form.email} onChange={set("email")} autoComplete="email" />
            </Field>
            <Field label="Password" hint="Minimum 10 characters.">
              <input className="input" type="password" required value={form.password} onChange={set("password")} autoComplete="new-password" />
            </Field>
            <Button type="submit" block disabled={busy}>{busy ? "Creating account…" : "Create account"}</Button>
          </form>
          <p className="small faint" style={{ marginTop: 16 }}>
            By creating an account you agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
          </p>
          <p className="auth-alt">Already have an account? <Link href="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
