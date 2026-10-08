"use client";

import { useState } from "react";
import { Button, Field } from "../../components/ui";

// Website ka Help form -> Render backend (freebizmail.onrender.com/api/contact)
// wahan se Brevo mailer owner ko email bhejta hai.
const CONTACT_API = "https://freebizmail.onrender.com/api/contact";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(form.email.trim())) {
      setError("Please enter a valid email address."); return;
    }
    if (form.message.trim().length < 10) {
      setError("Please write your message (at least 10 characters)."); return;
    }
    setStatus("sending");
    try {
      const res = await fetch(CONTACT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          website: form.website, // honeypot — khaali rehta hai
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send your message.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send your message. Please try again later.");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" style={{ padding: "8px 0" }}>
        <p style={{ fontSize: 16, margin: "0 0 8px" }}>
          <strong>Message sent.</strong>
        </p>
        <p className="faint" style={{ margin: 0, fontSize: 15 }}>
          Thanks for reaching out — we&apos;ll reply to your email soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      {error && (
        <div className="auth-error" role="alert" style={{ marginBottom: 16 }}>{error}</div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Your name">
          <input
            className="input"
            value={form.name}
            onChange={set("name")}
            autoComplete="name"
            maxLength={100}
            disabled={status === "sending"}
          />
        </Field>
        <Field label="Email">
          <input
            className="input"
            type="email"
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
            maxLength={200}
            disabled={status === "sending"}
          />
        </Field>
      </div>
      <Field label="How can we help?">
        <textarea
          className="textarea"
          value={form.message}
          onChange={set("message")}
          rows={5}
          maxLength={2000}
          placeholder="Describe your issue or question…"
          disabled={status === "sending"}
        />
      </Field>
      {/* Honeypot — bots bhar dete hain, insaan dekhte bhi nahi */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={set("website")}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
      />
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
      <p className="faint" style={{ fontSize: 13, margin: "12px 0 0" }}>
        We reply from our support inbox — usually within a day.
      </p>
    </form>
  );
}
