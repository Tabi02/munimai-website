"use client";

import { useEffect, useState } from "react";
import { SiteNav, SiteFooter } from "../../components/site";
import { Button, SectionHead, Reveal, DataTable, Badge } from "../../components/ui";
import { useCountry } from "../../components/pricing";
import {
  CUSTOMERS, INVOICES, ORDERS, PRODUCTS,
  StatusPill, StatStrip, RevenueChart, AiWorkspace, AutomationDemo,
} from "../../components/demo";
import {
  COUNTRIES, countryByCode, detectCountryCode, priceForCountry,
  storedCountryCode, type CountryInfo,
} from "../../lib/geo";

const SPECIALISTS = [
  { name: "Business Manager", desc: "Answers questions about the whole business: sales trends, dues, what needs attention today." },
  { name: "Accountant", desc: "Explains profit and loss, tax treatment and where the money went, in plain language." },
  { name: "Sales Manager", desc: "Drafts quotations, follow-ups and payment reminders from real order history." },
  { name: "Marketing Manager", desc: "Writes customer messages and campaign copy that fits your business voice." },
  { name: "Inventory Manager", desc: "Watches stock levels and suggests purchase orders before you run out." },
  { name: "Customer Support", desc: "Drafts replies to customer queries using their actual records." },
  { name: "Product Manager", desc: "Summarises what sells, what does not, and what to stock next." },
];

function TourHead({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div className="tour-index">{index}</div>
      <span className="eyebrow">{eyebrow}</span>
      <h2 style={{ marginTop: 6 }}>{title}</h2>
    </div>
  );
}

export default function FeaturesPage() {
  const [country, setCountry] = useCountry();
  const money = (paise: number) => priceForCountry(paise, country);
  const royal = CUSTOMERS[0];

  return (
    <>
      <SiteNav />

      <section className="section-tight" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ paddingTop: 40 }}>
          <Reveal>
            <SectionHead
              eyebrow="Product tour"
              title="A tour of the workspace."
              lede="Six connected workspaces, one shared set of books. This is what each one looks like in daily use, with a sample wholesale business."
            />
          </Reveal>
        </div>
      </section>

      {/* 01 CUSTOMERS */}
      <section className="tour-block">
        <div className="container">
          <div className="split">
            <Reveal>
              <div>
                <TourHead index="01" eyebrow="Customers" title="A complete customer workspace." />
                <p>
                  Every customer gets a record with contact details, open dues, payment
                  history and notes. Nothing about a customer lives in a notebook or
                  a chat thread anymore.
                </p>
                <ul className="spec-list">
                  <li><strong>Dues at a glance</strong><span>Open invoices, overdue ageing and partial payments per customer.</span></li>
                  <li><strong>Full history</strong><span>Orders, invoices, payments and messages in one timeline.</span></li>
                  <li><strong>Import</strong><span>Bring an existing customer list from a spreadsheet in minutes.</span></li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="panel">
                <div className="panel-h">
                  <h4>{royal.name}</h4>
                  <StatusPill status={royal.status} />
                </div>
                <div className="panel-b">
                  <dl style={{ margin: 0 }}>
                    <div className="kv"><dt>Customer ID</dt><dd className="mono">{royal.id}</dd></div>
                    <div className="kv"><dt>Contact</dt><dd>{royal.contact}, {royal.city}</dd></div>
                    <div className="kv"><dt>Phone</dt><dd className="mono">{royal.phone}</dd></div>
                    <div className="kv"><dt>Open dues</dt><dd className="num"><strong>{money(royal.dues)}</strong> across 2 invoices</dd></div>
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 SALES */}
      <section className="tour-block">
        <div className="container">
          <Reveal>
            <TourHead index="02" eyebrow="Sales" title="From lead to payment." />
            <p style={{ maxWidth: "68ch", marginBottom: 28 }}>
              Quotations turn into orders, orders into invoices, invoices into payments.
              Each step links to the last, so a sale is never a loose paper again.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <DataTable
              caption="Open sales documents"
              columns={[
                { key: "doc", header: "Document", mono: true },
                { key: "type", header: "Type" },
                { key: "customer", header: "Customer" },
                { key: "amount", header: "Amount", align: "right", mono: true },
                { key: "status", header: "Status", align: "center" },
              ]}
              rows={[
                { doc: <span className="t-strong">QUO-0331</span>, type: "Quotation", customer: "FreshKart Retail", amount: money(1240000), status: <StatusPill status="pending" /> },
                ...ORDERS.slice(0, 2).map((o) => ({
                  doc: <span className="t-strong">{o.no}</span>, type: "Order", customer: o.customer,
                  amount: money(o.paise), status: <StatusPill status={o.status} />,
                })),
                ...INVOICES.slice(0, 2).map((i) => ({
                  doc: <span className="t-strong">{i.no}</span>, type: "Invoice", customer: i.customer,
                  amount: money(i.paise), status: <StatusPill status={i.status} />,
                })),
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* 03 OPERATIONS */}
      <section className="tour-block">
        <div className="container">
          <div className="split flip">
            <Reveal>
              <DataTable
                caption="Stock levels"
                columns={[
                  { key: "name", header: "Product" },
                  { key: "stock", header: "In stock", align: "right", mono: true },
                  { key: "status", header: "Status", align: "center" },
                ]}
                rows={PRODUCTS.map((p) => ({
                  name: <span className="t-strong">{p.name}</span>,
                  stock: String(p.stock),
                  status: p.stock < p.reorder ? <Badge tone="red">Reorder</Badge> : <Badge tone="green">OK</Badge>,
                }))}
              />
            </Reveal>
            <Reveal delay={120}>
              <div>
                <TourHead index="03" eyebrow="Operations" title="Inventory that keeps up with sales." />
                <p>
                  Stock moves the moment an order is confirmed. Reorder points warn
                  you before a shelf goes empty, and purchase orders close the loop
                  with suppliers.
                </p>
                <ul className="spec-list">
                  <li><strong>Live stock</strong><span>Every sale and purchase updates quantities immediately.</span></li>
                  <li><strong>Reorder points</strong><span>Per-product thresholds with low-stock alerts.</span></li>
                  <li><strong>Suppliers</strong><span>Purchase orders and supplier records alongside customers.</span></li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 FINANCE */}
      <section className="tour-block">
        <div className="container">
          <div className="split-narrow">
            <Reveal>
              <div>
                <TourHead index="04" eyebrow="Finance" title="Know exactly where the business stands." />
                <p>
                  Expenses, profit and loss, and tax-aware reports that match how
                  small businesses file. No spreadsheet gymnastics at month end.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <StatStrip items={[
                  { k: "Revenue · Sep", v: money(24850000) },
                  { k: "Expenses · Sep", v: money(20060000) },
                  { k: "Net profit", v: money(4790000), d: "19.3% margin", tone: "up" },
                ]} />
                <div style={{ marginTop: 18 }}>
                  <RevenueChart />
                </div>
                <dl style={{ margin: "18px 0 0" }}>
                  <div className="kv"><dt>Tax handling</dt><dd>GST, VAT or sales tax per country, with tax-inclusive and exclusive pricing.</dd></div>
                  <div className="kv"><dt>Reports</dt><dd>P&amp;L, dues ageing, stock valuation and sales summaries, exportable.</dd></div>
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 AI WORKSPACE */}
      <section className="tour-block" id="ai-workspace">
        <div className="container">
          <div className="split">
            <Reveal>
              <div>
                <TourHead index="05" eyebrow="AI workspace" title="Fourteen specialists for fourteen jobs." />
                <p>
                  Seven assistants work with your business data: they analyse, explain
                  and draft. Each one shows its reasoning and waits for your approval
                  before anything is sent, recorded or ordered.
                </p>
                <ul className="spec-list">
                  {SPECIALISTS.slice(0, 4).map((s) => (
                    <li key={s.name}><strong>{s.name}</strong><span>{s.desc}</span></li>
                  ))}
                </ul>
                <p className="small faint" style={{ marginTop: 16 }}>
                  Plus Marketing Manager, Customer Support and Product Manager. AI uses
                  your own API key, set once in Settings.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <AiWorkspace country={country} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06 AUTOMATION */}
      <section className="tour-block" id="automation" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container">
          <div className="split flip">
            <Reveal>
              <AutomationDemo />
              <p className="small faint" style={{ marginTop: 12 }}>
                Overdue follow-up is one of several built-in workflows. Each step is
                visible, editable and logged.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <TourHead index="06" eyebrow="Automation" title="Routine work, handled routinely." />
                <p>
                  Define what should happen when something changes: an invoice goes
                  overdue, stock runs low, a big expense lands. The system drafts the
                  action and brings it to you for approval.
                </p>
                <ul className="spec-list">
                  <li><strong>Plain-language rules</strong><span>When this happens, if these conditions hold, then do this.</span></li>
                  <li><strong>Owner alerts</strong><span>Approvals and alerts reach you on Telegram or WhatsApp.</span></li>
                  <li><strong>Always supervised</strong><span>Nothing is sent or recorded without a human decision.</span></li>
                </ul>
                <div style={{ marginTop: 24 }}>
                  <Button href="/register" variant="secondary">Try it free for 14 days</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
