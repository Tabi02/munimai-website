"use client";

import { useState } from "react";
import { SiteNav, SiteFooter } from "../../components/site";
import { Button, SectionHead, Reveal } from "../../components/ui";
import { PricingTable, pricingNote, useCountry } from "../../components/pricing";

const FAQS = [
  {
    q: "Is there really a free trial?",
    a: "Yes. Every plan starts with a 14-day free trial, no credit card required. When the trial ends you choose a plan or keep read-only access to your data.",
  },
  {
    q: "What does the license cover?",
    a: "One license covers one business on the number of devices and staff accounts your plan allows. Your data and exports remain yours under any plan.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrades apply immediately and downgrades at the next billing cycle. We do not charge a fee for changing plans.",
  },
  {
    q: "What payment methods do you accept?",
    a: "UPI, cards and netbanking in India via Razorpay; cards internationally. Annual plans can also be paid by bank transfer on Scale and Enterprise.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, within the period stated in our Refund Policy. If the software does not work for your business, you get your money back.",
  },
];

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

export default function PricingPage() {
  const [country, setCountry] = useCountry();
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <SiteNav />

      <section className="section-tight" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ paddingTop: 40 }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
              <SectionHead
                eyebrow="Pricing"
                title="Pricing that respects a small business budget."
                lede="Per business, per month. Every plan includes the full product, local-first software and free updates. Prices adapt to your country."
              />
              <div className="bill-toggle" role="group" aria-label="Billing frequency">
                <button aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
                <button aria-pressed={annual} onClick={() => setAnnual(true)}>Annual</button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <PricingTable country={country} annual={annual} onCurrency={setCountry} />
            <p className="small faint" style={{ marginTop: 16 }}>{pricingNote(country)}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <div className="split-narrow">
            <Reveal>
              <div>
                <span className="eyebrow">Terms</span>
                <h2>Simple terms, in writing.</h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <dl style={{ margin: 0 }}>
                <div className="kv"><dt>Trial</dt><dd>14 days free on every plan. No credit card required.</dd></div>
                <div className="kv"><dt>License</dt><dd>Per business. Install on the devices your plan allows; staff accounts included as listed.</dd></div>
                <div className="kv"><dt>Updates</dt><dd>All product updates included while your subscription is active.</dd></div>
                <div className="kv"><dt>Cancellation</dt><dd>Cancel any time. Your data stays readable on your machine; paid features pause at the end of the billing period.</dd></div>
                <div className="kv"><dt>Refunds</dt><dd>Covered by the Refund Policy. If the software does not work for your business, you get your money back.</dd></div>
              </dl>
              <div style={{ marginTop: 24, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button href="/register">Start free trial</Button>
                <Button href="/refund-policy" variant="secondary">Read the refund policy</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="container-narrow">
          <Reveal>
            <SectionHead eyebrow="Questions" title="Pricing questions." />
          </Reveal>
          <Reveal>
            {FAQS.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
