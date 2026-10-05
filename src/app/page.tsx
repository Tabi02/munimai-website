"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SiteNav, SiteFooter } from "../components/site";
import { Button, Reveal, SplashIntro } from "../components/ui";
import { HeroScene } from "../components/hero3d";
import { useCountry } from "../components/pricing";

/* ---------- data ---------- */

const TRUST = [
  { n: "26", t: "Intelligence modules built in" },
  { n: "100%", t: "Offline \u2014 your data never leaves" },
  { n: "5", t: "Platform installers, one download" },
  { n: "0", t: "Monthly cloud fees required" },
];

const PILLARS = [
  {
    tag: "Your data",
    name: "Stays on your computer",
    desc: "Customers, invoices, stock \u2014 everything lives in a database on your own machine. No account needed, no silent sync, no third party ever sees it.",
  },
  {
    tag: "Your AI",
    name: "26 modules watching",
    desc: "Digital Twin, Time Machine, cash forecast, anomaly alerts, margin intelligence. It studies your business around the clock, offline.",
  },
  {
    tag: "Your call",
    name: "Approval before action",
    desc: "Risk scores, second opinions and a decision inbox. Nothing executes until you say yes \u2014 the audit trail remembers why.",
  },
];

const STEPS = [
  {
    n: "01",
    name: "Install",
    desc: "One download for Windows, Mac or Linux. Opens in seconds, works fully offline from the first launch.",
  },
  {
    n: "02",
    name: "Import",
    desc: "Bring your Excel sheets, Tally exports or past invoices. Your digital twin builds itself in minutes.",
  },
  {
    n: "03",
    name: "Ask",
    desc: "\u201CWhich customers are slipping?\u201D \u201CWhat should I reorder?\u201D Plain questions, evidence-backed answers, one-tap actions.",
  },
];

const GALLERY = [
  { name: "Business Digital Twin", desc: "A live mirror of your shop \u2014 entities, cash, stock and data quality, updated from real records.", hue: "linear-gradient(135deg,#0e6b5d,#14b8a6)" },
  { name: "Time Machine", desc: "Rewind any day. See exactly what your business looked like, and what changed since.", hue: "linear-gradient(135deg,#1e3a5f,#3b82f6)" },
  { name: "Decision Simulator", desc: "\u201CWhat if I raise prices 5%?\u201D Test the move on your twin before spending a rupee.", hue: "linear-gradient(135deg,#7c2d12,#ea580c)" },
  { name: "Cash Forecast", desc: "13-week cash outlook from your own invoices and expenses. No spreadsheet needed.", hue: "linear-gradient(135deg,#3f3d56,#8b5cf6)" },
  { name: "Anomaly Alerts", desc: "Unusual expenses, slipping customers, dying stock \u2014 flagged with evidence, not noise.", hue: "linear-gradient(135deg,#7f1d1d,#ef4444)" },
  { name: "Plain-English Reports", desc: "Ask in your own words. Get a clean report with charts you can send to anyone.", hue: "linear-gradient(135deg,#14532d,#22c55e)" },
];

const FAQS = [
  {
    q: "Does my data leave my computer?",
    a: "Never. The database lives on your machine. There is no account, no cloud sync, no telemetry of your business records.",
  },
  {
    q: "Do I need internet to use it?",
    a: "No. Install once, then everything \u2014 AI included \u2014 runs offline. Internet is only needed for the one-time download.",
  },
  {
    q: "Will the AI take actions on its own?",
    a: "No. Every consequential action needs your approval in the Decision Inbox, with evidence and a risk score attached.",
  },
  {
    q: "What does it cost?",
    a: "The app is free to download with a 14-day demo. There are no per-seat cloud fees, ever \u2014 because there is no cloud.",
  },
];

/* ---------- small pieces ---------- */

const EASE = [0.16, 1, 0.3, 1] as const;

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion() ?? false;
  return (
    <div className={`om-qa${open ? " open" : ""}`}>
      <button className="om-qa-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        {q}
        <span className="om-qa-pm">{open ? "\u2013" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div className="om-qa-a">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryCard({ g, i }: { g: (typeof GALLERY)[number]; i: number }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      className="om-gcard"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}
      whileHover={reduce ? undefined : { rotateX: 5, rotateY: -6, y: -6 }}
      style={{ transformPerspective: 900 }}
    >
      <div className="om-gthumb" style={{ background: g.hue }}>{g.name.split(" ")[0]}</div>
      <div className="om-gbody">
        <b>{g.name}</b>
        <p>{g.desc}</p>
      </div>
    </motion.div>
  );
}

/* ---------- page ---------- */

export default function LandingPage() {
  const [country] = useCountry();
  // Hero entrance waits for the brand loader (once per session; instant on repeat views)
  const [ready, setReady] = useState(() => {
    try { return sessionStorage.getItem("aetros-splash-seen") === "1"; } catch { return false; }
  });

  return (
    <>
      <SplashIntro onDone={() => setReady(true)} />
      <SiteNav />

      {/* announcement */}
      <div className="container">
        <motion.div
          className="om-pill"
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span><i>New</i>v0.6.2 — premium feature UI redesign, Adaptive Business OS + smarter AI errors, now live</span>
        </motion.div>
      </div>

      {/* hero */}
      <section className="om-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            The analyst you <em>didn't have to hire.</em>
          </motion.h1>
          <motion.p
            className="om-sub"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
          >
            Aetros Biz runs your shop's data on your own computer. Twenty-six
            intelligence modules watch sales, stock, cash and customers — and
            ask your approval before acting.
          </motion.p>
          <motion.div
            className="om-ctas"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: EASE }}
          >
            <Button href="/download" size="lg">Download for free</Button>
            <Button href="/features" variant="secondary" size="lg">See how it works</Button>
          </motion.div>
          <motion.p
            className="om-works"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.32 }}
          >
            Works on <strong>Windows</strong> · <strong>macOS</strong> · <strong>Linux</strong>
            {" "}— 100% offline, no cloud fees
          </motion.p>

          <HeroScene country={country} />
        </div>
      </section>

      {/* trust strip */}
      <section className="trust-strip" aria-label="Aetros Biz at a glance">
        <div className="container trust-grid">
          {TRUST.map((t) => (
            <div key={t.t}>
              <div className="trust-n num">{t.n}</div>
              <div className="trust-t">{t.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* control */}
      <section className="om-block">
        <div className="container">
          <Reveal>
            <div className="om-kicker">Local-first control</div>
            <h2 className="om-h2">The first insight is AI.<br />The final call is yours.</h2>
            <p className="om-lead">Aetros Biz never uploads your data, never acts without permission. Every recommendation arrives with evidence — you approve, then it runs.</p>
          </Reveal>
          <div className="om-cols3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.tag}
                className="om-col"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              >
                <span className="om-tag">{p.tag}</span>
                <h4>{p.name}</h4>
                <p>{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* steps */}
      <section className="om-block">
        <div className="container">
          <Reveal>
            <div className="om-kicker">A shorter path</div>
            <h2 className="om-h2">Data in. Decisions out.</h2>
          </Reveal>
          <div className="om-steps">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                className="om-step"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              >
                <div className="om-sn">{s.n}</div>
                <h4>{s.name}</h4>
                <p>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* gallery */}
      <section className="om-block">
        <div className="container">
          <Reveal>
            <div className="om-kicker">Intelligence gallery</div>
            <h2 className="om-h2">Ideas, directed.</h2>
            <p className="om-lead">Real modules inside the app — each one earns its place by saving you time or money.</p>
          </Reveal>
          <div className="om-gal">
            {GALLERY.map((g, i) => <GalleryCard key={g.name} g={g} i={i} />)}
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="om-block">
        <div className="container">
          <Reveal>
            <div className="om-kicker">The essentials</div>
            <h2 className="om-h2">Questions, answered.</h2>
          </Reveal>
          <div className="om-faq">
            {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* cta band */}
      <section className="om-block">
        <div className="container">
          <Reveal>
            <div className="om-cta">
              <h2>All the intelligence.<br />None of the cloud fees.</h2>
              <p>Aetros Biz is free while we're building. Download it, run it on your own machine, keep every rupee of insight.</p>
              <div className="om-ticks"><span>Free download</span><span>Works offline</span><span>No account needed</span></div>
              <Button href="/download" size="lg" variant="white">Download Aetros Biz</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
