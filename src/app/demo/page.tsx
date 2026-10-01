"use client";

import { useState } from "react";
import { SiteNav, SiteFooter } from "../../components/site";
import { Button, SectionHead, Reveal } from "../../components/ui";
import { ProductDemo, type TabId } from "../../components/demo";
import { countryByCode } from "../../lib/geo";

const NEEDS: Array<{ tab: TabId; label: string; hint: string; note: string }> = [
  { tab: "sales", label: "Invoices and billing", hint: "Bills, payment follow-up", note: "Quotations, orders and invoices sharing the same customers and stock. Overdue invoices are flagged and followed up." },
  { tab: "inventory", label: "Stock and inventory", hint: "Levels, reorder points", note: "Stock moves the moment an order is confirmed. Reorder points warn you before a shelf goes empty." },
  { tab: "customers", label: "Customers", hint: "Records, history, dues", note: "Every customer gets a record with contact details, open dues, payment history and notes." },
  { tab: "finance", label: "Reports and accounts", hint: "P&L, expenses, tax", note: "Expenses, profit and loss, and tax-aware reporting that match how small businesses actually file." },
  { tab: "ai", label: "AI assistance", hint: "Questions, drafts, approvals", note: "Seven specialists analyse your real records, recommend the next step, and wait for your approval." },
  { tab: "automation", label: "Automation", hint: "Reminders, alerts", note: "Overdue reminders, low-stock alerts and follow-ups that run themselves, with you in control." },
];

export default function DemoPage() {
  const [tab, setTab] = useState<TabId>("sales");
  const active = NEEDS.find((n) => n.tab === tab)!;

  return (
    <>
      <SiteNav />

      <section className="section-tight" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ paddingTop: 40 }}>
          <Reveal>
            <SectionHead
              eyebrow="Live demo"
              title="Try the product with a sample business."
              lede="Pick what you want to see. Everything below is a real part of Aetros Biz, illustrated with a sample wholesale business. No signup needed."
            />
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
              {NEEDS.map((n) => (
                <button
                  key={n.tab}
                  type="button"
                  className={`chip${n.tab === tab ? " chip-on" : ""}`}
                  onClick={() => setTab(n.tab)}
                  aria-pressed={n.tab === tab}
                >
                  <strong>{n.label}</strong>
                  <span>{n.hint}</span>
                </button>
              ))}
            </div>
            <p className="small faint" style={{ marginTop: 14, maxWidth: "72ch" }}>{active.note}</p>
          </Reveal>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <ProductDemo key={tab} country={countryByCode("IN")} initialTab={tab} />
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              <Button href="/register">Start free trial</Button>
              <Button href="/download" variant="secondary">Download the app</Button>
            </div>
            <p className="small faint" style={{ marginTop: 12 }}>
              Sample data only. In the real app this is your business, on your machine.
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
