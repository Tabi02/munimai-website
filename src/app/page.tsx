"use client";

import { useEffect, useState } from "react";
import { SiteNav, SiteFooter } from "../components/site";
import { ProductDemo } from "../components/demo";
import { Button, SectionHead, Reveal, DataTable, Badge } from "../components/ui";
import { PricingTable, pricingNote, useCountry } from "../components/pricing";
import {
  COUNTRIES, countryByCode, detectCountryCode, priceForCountry,
  storedCountryCode, type CountryInfo,
} from "../lib/geo";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? " open" : ""}`}>
      <button className="faq-q" onClick={() => setOpen(!open)} aria-expanded={open}>
        {q}
        <span className="pm">{open ? "–" : "+"}</span>
      </button>
      {open && <div className="faq-a">{a}</div>}
    </div>
  );
}

const MODULES = [
  { name: "Customers", desc: "A complete customer workspace: records, dues, payment history and every conversation in one timeline.", meta: "CRM" },
  { name: "Sales", desc: "Quotations, orders, invoices and payment links. Every sale traces back to its customer and its stock.", meta: "Orders · Invoices" },
  { name: "Inventory", desc: "Stock levels, reorder points and purchase flow, kept in step with every sale you make.", meta: "Stock · Purchase" },
  { name: "Finance", desc: "Expenses, profit and loss, and tax-aware reporting built for how small businesses actually file.", meta: "P&L · Tax" },
  { name: "AI Workspace", desc: "Ask questions about your business in plain language. AI analyses, recommends, and waits for approval.", meta: "7 specialists" },
  { name: "Automation", desc: "Overdue reminders, low-stock alerts and follow-ups that run themselves, with you in control.", meta: "Workflows" },
];

const FAQS = [
  {
    q: "Is my business data stored in the cloud?",
    a: "No. MunimAI OS is local-first: your database lives on your own machine and the app works fully offline. The cloud is used only for licensing, billing and optional sync between your own devices.",
  },
  {
    q: "What does the AI need from me?",
    a: "AI features use your own API key, added once in Settings. The AI reads your business data to answer questions and draft work, but it never sends anything, records anything, or moves money without your explicit approval.",
  },
  {
    q: "Can I use it for more than one shop or branch?",
    a: "Yes. Business and Scale plans support multiple devices and staff roles, and every record is tagged to the branch or counter where it belongs.",
  },
  {
    q: "What happens when my subscription ends?",
    a: "Your data stays yours and stays readable on your machine. Paid features pause until you renew; nothing is locked away or deleted.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes. If the software does not work for your business, you can claim a refund within the period stated in our Refund Policy, no questions about your reasons beyond what the policy asks.",
  },
  {
    q: "Which platforms are supported?",
    a: "Windows desktop today, with macOS and Linux builds on the roadmap. Your license covers the desktop app on the devices your plan allows.",
  },
];

export default function LandingPage() {
  const [country, setCountry] = useCountry();
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <SiteNav />

      {/* ---------- hero ---------- */}
      <section className="hero">
        <div className="container">
          <Reveal>
            <span className="hero-kicker"><span className="tick">●</span> Business operating system</span>
            <h1>One workspace for running your entire business.</h1>
            <p className="lede">
              MunimAI OS brings customers, sales, inventory, finance and AI-assisted
              workflows into one connected system. Local-first software that your
              business owns, priced honestly.
            </p>
            <div className="hero-cta">
              <Button href="/register" size="lg">Start free trial</Button>
              <Button href="/features" variant="secondary" size="lg">See the product</Button>
            </div>
            <p className="hero-note">Free 14-day trial · No credit card required · Works fully offline</p>
          </Reveal>

          <Reveal delay={120}>
            <ProductDemo country={country} />
            <p className="small faint" style={{ marginTop: 12 }}>
              Illustrated with a sample wholesale business. Every screen above is a real part of the product.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- module directory: dense rows, not cards ---------- */}
      <section className="section">
        <div className="container">
          <Reveal>
            <SectionHead
              eyebrow="The system"
              title="Everything a small business runs on, in one place."
              lede="Six connected workspaces share the same customers, products and money. Enter something once and it is everywhere it needs to be."
            />
          </Reveal>
          <Reveal>
            <div>
              {MODULES.map((m) => (
                <a className="mod-row" href="/features" key={m.name}>
                  <span className="mod-name">{m.name}</span>
                  <p className="mod-desc">{m.desc}</p>
                  <span className="mod-meta">{m.meta}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- editorial split: sales, text + interface ---------- */}
      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal>
              <div>
                <span className="eyebrow">Sales</span>
                <h2>From quotation to payment, one unbroken trail.</h2>
                <p>
                  A quotation becomes an order, the order becomes an invoice, and the
                  invoice is followed until it is paid. Stock moves with every step,
                  so the numbers always agree with each other.
                </p>
                <ul className="spec-list">
                  <li><strong>Quotations</strong><span>Send a quote; convert it to an invoice in one step when the customer says yes.</span></li>
                  <li><strong>Tax-aware invoices</strong><span>GST, VAT or sales tax, configured per country and printed correctly.</span></li>
                  <li><strong>Payment tracking</strong><span>Partial payments, dues and overdue ageing, per customer and per invoice.</span></li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <DataTable
                caption="Sales pipeline, September 2026"
                columns={[
                  { key: "stage", header: "Stage" },
                  { key: "count", header: "Open items", align: "right", mono: true },
                  { key: "value", header: "Value", align: "right", mono: true },
                ]}
                rows={[
                  { stage: <span className="t-strong">Quotations sent</span>, count: "6", value: priceForCountry(1840000, country) },
                  { stage: <span className="t-strong">Orders confirmed</span>, count: "4", value: priceForCountry(1683260, country) },
                  { stage: <span className="t-strong">Invoices unpaid</span>, count: "3", value: priceForCountry(1297000, country) },
                  { stage: <span className="t-strong">Overdue</span>, count: "2", value: priceForCountry(941760, country) },
                ]}
              />
              <p className="small faint" style={{ marginTop: 12 }}>
                The overdue {priceForCountry(941760, country)} belongs to Royal Sweets, the same customer flagged in the demo above.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- AI: inside the system ---------- */}
      <section className="section">
        <div className="container">
          <div className="split flip">
            <Reveal>
              <div className="ai-flow">
                <div className="ai-msg user-msg">
                  <span className="who">You</span>
                  Which products should I reorder this week?
                </div>
                <div className="ai-msg">
                  <span className="who">MunimAI · Inventory Manager</span>
                  Two products are below reorder level. Mustard Oil 15L sells about 9 units a week and has 4 weeks of cover left.
                  <div className="rec">
                    <strong>Recommendation:</strong> raise a purchase order for 60 units of Mustard Oil 15L and 40 units of Tea Powder 1kg.
                    <div className="ai-approve">
                      <button className="btn btn-primary btn-sm" type="button">Approve purchase order</button>
                      <button className="btn btn-secondary btn-sm" type="button">Adjust quantities</button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <span className="eyebrow">AI workspace</span>
                <h2>AI that works inside your business.</h2>
                <p>
                  Seven specialist assistants read your actual customers, stock and
                  accounts, then recommend the next step. Every recommendation waits
                  for your approval before anything happens.
                </p>
                <ul className="spec-list">
                  <li><strong>Grounded in your data</strong><span>Answers come from your records, never from guesswork.</span></li>
                  <li><strong>Approval first</strong><span>Drafts, messages and orders pause for a human decision.</span></li>
                  <li><strong>Audit trail</strong><span>Every AI action is logged with who approved it and when.</span></li>
                </ul>
                <div style={{ marginTop: 24 }}>
                  <Button href="/features#ai-workspace" variant="secondary">Explore the AI workspace</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- local-first: structured facts ---------- */}
      <section className="section">
        <div className="container">
          <div className="split-narrow">
            <Reveal>
              <div>
                <span className="eyebrow">Ownership</span>
                <h2>Your data stays with you.</h2>
                <p>
                  MunimAI OS is local-first. The database lives on your machine,
                  the app works without internet, and your subscription never
                  holds your records hostage.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <dl style={{ margin: 0 }}>
                <div className="kv"><dt>Where data lives</dt><dd>SQLite database on your own machine. Full export to CSV and Excel at any time.</dd></div>
                <div className="kv"><dt>Offline</dt><dd>Every feature works without internet: billing, stock, reports, AI drafts.</dd></div>
                <div className="kv"><dt>What the cloud does</dt><dd>Licensing, billing and optional sync between your own devices. Nothing else.</dd></div>
                <div className="kv"><dt>If you leave</dt><dd>Your data remains readable on your machine. Paid features pause; nothing is deleted.</dd></div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- pricing ---------- */}
      <section className="section" id="pricing">
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", marginBottom: 8 }}>
              <SectionHead
                eyebrow="Pricing"
                title="Choose the operating capacity your business needs."
                lede="Per business, per month. Every plan includes the full product, local-first software and free updates."
              />
              <div className="bill-toggle" role="group" aria-label="Billing frequency">
                <button aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
                <button aria-pressed={annual} onClick={() => setAnnual(true)}>Annual</button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <PricingTable country={country} annual={annual} onCurrency={setCountry} />
            <p className="small faint" style={{ marginTop: 16 }}>{pricingNote(country)}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section">
        <div className="container-narrow">
          <Reveal>
            <SectionHead eyebrow="Questions" title="Asked by businesses like yours." />
          </Reveal>
          <Reveal>
            {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="cta-band">
        <div className="container">
          <Reveal>
            <div className="cta-panel">
              <div>
                <h2>Run your business on a system you own.</h2>
                <p>Start a free 14-day trial. Import your customers in an afternoon.</p>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button href="/register" size="lg">Start free trial</Button>
                <Button href="/download" variant="secondary" size="lg">Download</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
