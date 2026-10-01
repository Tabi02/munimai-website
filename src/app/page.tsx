"use client";

import { useEffect, useState } from "react";
import { SiteNav, SiteFooter } from "../components/site";
import { AppWindow } from "../components/appwindow";
import { Button, Reveal } from "../components/ui";
import { api, type Plan } from "../lib/api";
import {
  COUNTRIES, countryByCode, detectCountryCode, priceForCountry, planPriceForCountry,
  hasCustomPrice, storedCountryCode, storeCountryCode, storedLang, storeLang,
  type CountryInfo,
} from "../lib/geo";
import { STRINGS, type Lang } from "../lib/i18n";

const FALLBACK_PLANS: Plan[] = [
  { id: "starter", name: "Starter", slug: "starter", price_cents: 99000, currency: "INR", billing_interval: "month", trial_days: 14, device_limit: 1, features: [] },
  { id: "pro", name: "Pro", slug: "pro", price_cents: 249000, currency: "INR", billing_interval: "month", trial_days: 14, device_limit: 3, features: [] },
  { id: "team", name: "Team", slug: "team", price_cents: 499000, currency: "INR", billing_interval: "month", trial_days: 14, device_limit: 10, features: [] },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        {q}
        <span className="pm">+</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

function InvoiceMock({ country }: { country: CountryInfo }) {
  return (
    <div className="mock-inv" aria-hidden="true">
      <div className="mock-inv-h">
        <span className="no">INV-1043</span>
        <span className="pill pill-pending">Pending</span>
      </div>
      <div className="mock-line"><span>Royal Sweets — Order #8821</span><span>{priceForCountry(432000, country)}</span></div>
      <div className="mock-line"><span>Tax (GST 18%)</span><span>{priceForCountry(77760, country)}</span></div>
      <div className="mock-total"><span>Total due</span><span>{priceForCountry(509760, country)}</span></div>
      <span className="mock-stamp">SENT ✓</span>
    </div>
  );
}

function ChatMock({ country }: { country: CountryInfo }) {
  return (
    <div className="mock-chat" aria-hidden="true">
      <div className="bubble user">Which invoices are overdue?</div>
      <div className="bubble ai">
        <strong>3 invoices</strong> are overdue, totalling <strong>{priceForCountry(1297000, country)}</strong>. Royal Sweets is 12 days late.
      </div>
      <div className="mock-approve">
        <p>Draft a reminder for Royal Sweets ({priceForCountry(509760, country)})?</p>
        <div className="row">
          <span className="mini-btn approve">Approve</span>
          <span className="mini-btn deny">Edit first</span>
        </div>
      </div>
    </div>
  );
}

function LocalMock() {
  const rows = [
    { t: "Your data", s: "SQLite database on your machine" },
    { t: "Works offline", s: "No internet needed, ever" },
    { t: "Cloud", s: "Billing and licenses only" },
  ];
  return (
    <div className="mock-local" aria-hidden="true">
      {rows.map((r) => (
        <div className="li" key={r.t}>
          <span className="tick">✓</span>
          <div><div className="t">{r.t}</div><div className="s">{r.s}</div></div>
        </div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  const [plans, setPlans] = useState<Plan[]>(FALLBACK_PLANS);
  const [livePricing, setLivePricing] = useState(false);
  const [country, setCountry] = useState<CountryInfo>(COUNTRIES[1]); // US default; detected on mount
  const [lang, setLang] = useState<Lang>("en");
  const t = STRINGS[lang];

  useEffect(() => {
    const cc = storedCountryCode() ?? detectCountryCode();
    const c = countryByCode(cc);
    setCountry(c);
    setLang(storedLang() ?? c.lang);
    api.get<{ plans: Plan[] }>("/v1/plans")
      .then((d) => { if (d.plans.length) { setPlans(d.plans); setLivePricing(true); } })
      .catch(() => {});
  }, []);

  const changeCountry = (code: string) => {
    const c = countryByCode(code);
    setCountry(c);
    storeCountryCode(code);
  };
  const changeLang = (l: Lang) => {
    setLang(l);
    storeLang(l);
  };

  const rows = [
    { e: t.row1e, h: t.row1h, p: t.row1p, visual: <InvoiceMock country={country} /> },
    { e: t.row2e, h: t.row2h, p: t.row2p, visual: <ChatMock country={country} /> },
    { e: t.row3e, h: t.row3h, p: t.row3p, visual: <LocalMock /> },
  ];

  return (
    <>
      <SiteNav lang={lang} onLangChange={changeLang} />

      <section className="hero">
        <div className="container">
          <h1>
            {t.heroH1a}
            <br />
            {t.heroH1b}
          </h1>
          <p className="lead">{t.heroLead}</p>
          <div className="hero-cta">
            <Button href="/register">{t.heroCta1}</Button>
            <a href="/#pricing" className="link-more">{t.heroCta2} &gt;</a>
          </div>
          <p className="hero-note">{t.heroNote}</p>
          <Reveal>
            <div className="trust-row" aria-label="Trust highlights">
              {t.trustBadges.map((b) => (
                <span key={b} className="trust-badge"><span className="tick">✓</span>{b}</span>
              ))}
            </div>
          </Reveal>
          <AppWindow country={country} />
        </div>
      </section>

      <section id="features" className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 24, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
            <h2 className="section-h">{t.featuresH}</h2>
            <p className="section-p" style={{ margin: "0 auto" }}>{t.featuresP}</p>
          </div>
          {rows.map((r, i) => (
            <Reveal key={r.e} delay={(i % 3) * 90}>
              <div className={`frow${i % 2 === 1 ? " flip" : ""}`}>
                <div className="frow-text">
                  <div className="eyebrow">{r.e}</div>
                  <h3>{r.h}</h3>
                  <p>{r.p}</p>
                </div>
                <div className="frow-visual">{r.visual}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="pricing" className="section pricing-band">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h2 className="section-h">{t.pricingH}</h2>
            <p className="section-p" style={{ margin: "0 auto" }}>{t.pricingP}</p>
          </div>
          <div className="currency-row">
            <label className="muted" style={{ fontSize: 14 }}>{t.currencyLabel}:</label>
            <select value={country.code} onChange={(e) => changeCountry(e.target.value)} aria-label={t.currencyLabel}>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.name} ({c.currency})</option>
              ))}
            </select>
          </div>
          <div className="price-grid">
            {plans.map((p, i) => (
              <Reveal key={p.id} delay={i * 110} className="reveal-card">
              <div className={`price-card${i === 1 ? " popular" : ""}`}>
                {i === 1 && <div className="price-flag">{t.popular}</div>}
                <div className="card-title" style={{ fontSize: 19 }}>{p.name}</div>
                <div className="price-amount">{planPriceForCountry(p.slug, p.price_cents, country)}</div>
                <div className="price-per">{t.perMonth} · {p.device_limit} {p.device_limit > 1 ? t.devices : t.device}</div>
                <ul className="price-list">
                  <li>{t.trialDays(p.trial_days)}</li>
                  <li>{t.devicesIncluded(p.device_limit)}</li>
                  <li>{t.offlineApp}</li>
                  <li>{t.aiWorkflows}</li>
                  {p.slug !== "starter" && <li>{t.prioritySupport}</li>}
                  {p.slug === "team" && <li>{t.teamRoles}</li>}
                </ul>
                <div style={{ marginTop: "auto" }}>
                  <Button href="/register" variant={i === 1 ? "primary" : "ghost"}>{t.startTrial}</Button>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
          <p className="muted" style={{ textAlign: "center", marginTop: 28, fontSize: 13 }}>
            {livePricing ? t.pricingNoteLive : t.pricingNoteLaunch} · {t.pricingNoteTail}
            {!hasCustomPrice("pro", country.currency) && <><br />{t.approxNote}</>}
          </p>
        </div>
      </section>

      <section id="faq" className="section" style={{ paddingTop: 90 }}>
        <div className="container-narrow">
          <Reveal>
            <h2 className="section-h" style={{ textAlign: "center", marginBottom: 40 }}>{t.faqH}</h2>
          </Reveal>
          {t.faqs.map((f, i) => <Reveal key={f.q} delay={Math.min(i, 4) * 60}><FaqItem q={f.q} a={f.a} /></Reveal>)}
        </div>
      </section>

      <section className="cta-band">
        <Reveal>
          <div className="container">
            <h2>{t.ctaH}</h2>
            <p>{t.ctaP}</p>
            <Button href="/register">{t.ctaBtn}</Button>
          </div>
        </Reveal>
      </section>

      <SiteFooter lang={lang} />
    </>
  );
}
