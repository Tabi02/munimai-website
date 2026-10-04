"use client";

import { useState } from "react";
import { SiteNav, SiteFooter } from "../../components/site";
import { Button, Reveal, Badge } from "../../components/ui";
import { PageHero, CtaBand } from "../../components/om";

function Gate({ platform, label, note }: { platform: string; label: string; note?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    setErr("");
    try {
      const r = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, platform }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Failed");
      window.location.href = d.url;
      setState("idle");
    } catch (e: any) {
      setErr(e.message || "Something went wrong.");
      setState("error");
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        aria-label={`Email for ${label} download`}
        style={{
          border: "1px solid var(--line-strong)",
          borderRadius: "var(--radius-s)",
          padding: "9px 12px",
          fontSize: 14,
          minWidth: 220,
          background: "var(--surface)",
          color: "var(--ink)",
        }}
      />
      <Button size="sm" type="submit" disabled={state === "busy"}>
        {state === "busy" ? "Preparing…" : label}
      </Button>
      {note ? <span className="muted small" style={{ width: "100%" }}>{note}</span> : null}
      {err ? <span className="small" style={{ color: "var(--danger, #b3261e)", width: "100%" }}>{err}</span> : null}
    </form>
  );
}

const STEPS = [
  { t: "Enter your email", d: "We send the download link to your inbox and keep you posted on updates. No spam, ever." },
  { t: "Download and run", d: "The link is valid for 15 minutes. Extract and start the app — your 14-day trial begins on first run." },
  { t: "Your data stays yours", d: "Local-first software. Your business data is created on your machine, never on our servers." },
];

export default function DownloadPage() {
  return (
    <>
      <SiteNav />

      <PageHero
        kicker="Download"
        title="Get Aetros Biz for your desktop."
        lede="Enter your work email and the download starts right away. Your 14-day trial begins when you first run the app."
      />

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div>
              <div className="mod-row" style={{ cursor: "default" }}>
                <span className="mod-name">Windows <Badge tone="green">Available</Badge></span>
                <p className="mod-desc">Windows 10 or later, 64-bit. Portable ZIP, about 220 MB: extract and run, no installer and no admin rights needed.</p>
                <span className="mod-meta"><Gate platform="windows" label="Download for Windows" /></span>
              </div>
              <div className="mod-row" style={{ cursor: "default" }}>
                <span className="mod-name">macOS <Badge tone="green">Available</Badge></span>
                <p className="mod-desc">About 400 MB. Unsigned build: on first launch, right-click the app and choose Open.</p>
                <span className="mod-meta" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Gate platform="mac-arm64" label="Apple Silicon (M1/M2/M3)" />
                  <Gate platform="mac-x64" label="Intel Mac" />
                </span>
              </div>
              <div className="mod-row" style={{ cursor: "default" }}>
                <span className="mod-name">Linux <Badge tone="green">Available</Badge></span>
                <p className="mod-desc">AppImage (runs anywhere) and deb package (Debian/Ubuntu).</p>
                <span className="mod-meta" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <Gate platform="linux-appimage" label="AppImage (~200 MB)" />
                  <Gate platform="linux-deb" label="deb package (~160 MB)" />
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="om-block" style={{ paddingTop: 72 }}>
        <div className="container">
          <Reveal>
            <div className="om-kicker">AI Models</div>
            <h2 className="om-h2" style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>Download AI models separately.</h2>
            <p className="om-lead">The app works without these. Download a model to run Aetros AI 100% offline on your own computer — no cloud, no API key needed.</p>
          </Reveal>
          <Reveal>
            <div>
              <div className="mod-row" style={{ cursor: "default" }}>
                <span className="mod-name">Aetros-1 <Badge tone="green">Available</Badge></span>
                <p className="mod-desc">Your own trained model (Qwen3-4B fine-tune, Q4_K_M GGUF, ~2.4 GB). Place the file as <code>Aetros-1-Q4_K_M.gguf</code> in the app&apos;s <code>aetros-ai/models</code> folder, then enable it in Settings → AI. Runs fully offline.</p>
                <span className="mod-meta"><Gate platform="aetros-1" label="Download Aetros-1 (~2.4 GB)" /></span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="om-block" style={{ paddingTop: 72 }}>
        <div className="container">
          <Reveal>
            <div className="om-kicker">Install</div>
            <h2 className="om-h2" style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>Running in three steps.</h2>
          </Reveal>
          <div className="om-steps">
            {STEPS.map((s, i) => (
              <div className="om-step" key={s.t}>
                <div className="om-sn">{String(i + 1).padStart(2, "0")}</div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={<>Your data stays home.<br />Your AI comes with you.</>}
        body="One download, five platforms, zero cloud fees. The 14-day trial starts the first time you open the app."
      />

      <SiteFooter />
    </>
  );
}
