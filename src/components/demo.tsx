"use client";

import { useState } from "react";
import { priceForCountry, type CountryInfo } from "../lib/geo";
import { DataTable, Badge } from "./ui";
import {
  IconDashboard, IconCustomers, IconSales, IconInventory, IconFinance, IconAI, IconAutomation,
} from "./icons";

/* Realistic, coherent demo data for "Sharma Traders", a wholesale distributor. */

export const CUSTOMERS = [
  { id: "C-101", name: "Royal Sweets", city: "Mumbai", contact: "R. Agarwal", phone: "+91 98200 11435", dues: 509760, status: "overdue" as const },
  { id: "C-102", name: "Gupta Electronics", city: "Delhi", contact: "S. Gupta", phone: "+91 98110 22341", dues: 0, status: "clear" as const },
  { id: "C-103", name: "City Mart", city: "Bengaluru", contact: "P. Rao", phone: "+91 99010 88712", dues: 217500, status: "pending" as const },
  { id: "C-104", name: "FreshKart Retail", city: "Pune", contact: "M. Shaikh", phone: "+91 98220 44510", dues: 0, status: "clear" as const },
  { id: "C-105", name: "Anand Traders", city: "Jaipur", contact: "V. Anand", phone: "+91 94140 90218", dues: 86400, status: "pending" as const },
];

export const INVOICES = [
  { no: "INV-1043", customer: "Royal Sweets", date: "28 Sep 2026", due: "12 Oct 2026", paise: 509760, status: "overdue" as const },
  { no: "INV-1042", customer: "Gupta Electronics", date: "25 Sep 2026", due: "09 Oct 2026", paise: 865000, status: "paid" as const },
  { no: "INV-1041", customer: "City Mart", date: "22 Sep 2026", due: "06 Oct 2026", paise: 217500, status: "pending" as const },
  { no: "INV-1040", customer: "Royal Sweets", date: "15 Sep 2026", due: "29 Sep 2026", paise: 432000, status: "overdue" as const },
  { no: "INV-1039", customer: "FreshKart Retail", date: "10 Sep 2026", due: "24 Sep 2026", paise: 1240000, status: "paid" as const },
];

export const ORDERS = [
  { no: "SO-2084", customer: "City Mart", items: "Sugar 50kg × 40", date: "30 Sep 2026", paise: 217500, status: "confirmed" as const },
  { no: "SO-2083", customer: "Royal Sweets", items: "Basmati Rice 25kg × 60", date: "28 Sep 2026", paise: 509760, status: "invoiced" as const },
  { no: "SO-2082", customer: "Anand Traders", items: "Mustard Oil 15L × 24", date: "26 Sep 2026", paise: 86400, status: "confirmed" as const },
  { no: "SO-2081", customer: "Gupta Electronics", items: "Tea Powder 1kg × 200", date: "24 Sep 2026", paise: 865000, status: "fulfilled" as const },
];

export const PRODUCTS = [
  { sku: "PRD-011", name: "Basmati Rice 25kg", stock: 142, reorder: 100, price: 84900 },
  { sku: "PRD-012", name: "Mustard Oil 15L", stock: 38, reorder: 50, price: 360000 },
  { sku: "PRD-013", name: "Sugar 50kg", stock: 210, reorder: 120, price: 217500 },
  { sku: "PRD-014", name: "Wheat Flour 10kg", stock: 96, reorder: 80, price: 42500 },
  { sku: "PRD-015", name: "Tea Powder 1kg", stock: 12, reorder: 40, price: 432500 },
];

const REVENUE = [
  { m: "Apr", v: 182 }, { m: "May", v: 196 }, { m: "Jun", v: 171 }, { m: "Jul", v: 208 }, { m: "Aug", v: 221 }, { m: "Sep", v: 248 },
];

export type TabId = "overview" | "customers" | "sales" | "inventory" | "finance" | "ai" | "automation";

const TABS: Array<{ id: TabId; label: string; Icon: (p: { size?: number }) => React.ReactNode }> = [
  { id: "overview", label: "Overview", Icon: IconDashboard },
  { id: "customers", label: "Customers", Icon: IconCustomers },
  { id: "sales", label: "Sales", Icon: IconSales },
  { id: "inventory", label: "Inventory", Icon: IconInventory },
  { id: "finance", label: "Finance", Icon: IconFinance },
  { id: "ai", label: "AI Workspace", Icon: IconAI },
  { id: "automation", label: "Automation", Icon: IconAutomation },
];

export function StatusPill({ status }: { status: string }) {
  const tone = status === "paid" || status === "clear" || status === "fulfilled" ? "green"
    : status === "overdue" ? "red"
    : status === "pending" || status === "confirmed" || status === "invoiced" ? "amber" : "gray";
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <Badge tone={tone as "green" | "amber" | "red" | "gray"}>{label}</Badge>;
}

export function StatStrip({ items }: { items: Array<{ k: string; v: string; d?: string; tone?: string }> }) {
  return (
    <div className="stat-strip">
      {items.map((s) => (
        <div className="stat-cell" key={s.k}>
          <div className="stat-k">{s.k}</div>
          <div className="stat-v">{s.v}</div>
          {s.d && <div className={`stat-d${s.tone ? ` ${s.tone}` : ""}`}>{s.d}</div>}
        </div>
      ))}
    </div>
  );
}

export function RevenueChart() {
  const max = Math.max(...REVENUE.map((r) => r.v));
  const W = 560, H = 180, pad = 30;
  const bw = (W - pad * 2) / REVENUE.length;
  return (
    <div className="chart">
      <div className="chart-title">Revenue, last 6 months (lakh)</div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Bar chart of monthly revenue">
        {REVENUE.map((r, i) => {
          const h = ((H - pad - 24) * r.v) / max;
          const x = pad + i * bw + bw * 0.22;
          return (
            <g key={r.m}>
              <rect x={x} y={H - 24 - h} width={bw * 0.56} height={h}
                className={`chart-bar${i < REVENUE.length - 1 ? " dim" : ""}`} rx={2} />
              <text x={x + bw * 0.28} y={H - 8} textAnchor="middle" className="chart-axis">{r.m}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function AiWorkspace({ country }: { country: CountryInfo }) {
  return (
    <div>
      <div className="ai-flow">
        <div className="ai-msg user-msg">
          <span className="who">You</span>
          Which invoices are overdue, and what should I do about them?
        </div>
        <div className="ai-msg">
          <span className="who">Aetros · Sales Manager</span>
          2 invoices are overdue, totalling <strong className="num">{priceForCountry(941760, country)}</strong>:
          <div style={{ marginTop: 10 }}>
            <DataTable
              columns={[
                { key: "no", header: "Invoice", mono: true },
                { key: "customer", header: "Customer" },
                { key: "days", header: "Days late", align: "right", mono: true },
                { key: "amount", header: "Amount", align: "right", mono: true },
              ]}
              rows={[
                { no: "INV-1040", customer: "Royal Sweets", days: "12", amount: priceForCountry(432000, country) },
                { no: "INV-1043", customer: "Royal Sweets", days: "2", amount: priceForCountry(509760, country) },
              ]}
            />
          </div>
          <div className="rec">
            <strong>Recommendation:</strong> Royal Sweets pays late but always pays. Send a polite reminder referencing both invoices, and offer to split INV-1043 into two payments.
            <div className="ai-approve">
              <button className="btn btn-primary btn-sm" type="button">Approve reminder</button>
              <button className="btn btn-secondary btn-sm" type="button">Edit first</button>
            </div>
          </div>
        </div>
        <div className="ai-msg faint small" style={{ borderBottom: 0 }}>
          AI drafts and analyses. Nothing is sent or recorded without your approval.
        </div>
      </div>
    </div>
  );
}

export function AutomationDemo() {
  const steps = [
    { tag: "WHEN", cls: "when", title: "Invoice becomes overdue", body: "Trigger: payment not received 7 days after the due date." },
    { tag: "IF", cls: "", title: "Customer is high priority", body: "Condition: lifetime value above 5,00,000 or tagged VIP." },
    { tag: "THEN", cls: "", title: "Draft a follow-up reminder", body: "AI writes a polite reminder using the invoice and customer history." },
    { tag: "THEN", cls: "", title: "Send for your approval", body: "The draft waits in your inbox. Nothing goes out automatically." },
    { tag: "THEN", cls: "", title: "Record the outcome", body: "Approval, edits and payment are logged to the customer timeline." },
  ];
  return (
    <div className="flow">
      {steps.map((s, i) => (
        <div key={s.title}>
          {i > 0 && <div className="flow-link" aria-hidden="true" />}
          <div className="flow-step">
            <span className={`flow-tag ${s.cls}`}>{s.tag}</span>
            <div className="flow-body"><strong>{s.title}</strong><span>{s.body}</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductDemo({ country, initialTab }: { country: CountryInfo; initialTab?: TabId }) {
  const [tab, setTab] = useState<TabId>(initialTab ?? "overview");
  const money = (paise: number) => priceForCountry(paise, country);

  return (
    <div className="demo-frame">
      <div className="demo-bar">
        <span className="app-name">Aetros Biz</span>
        <span className="app-sub">Sharma Traders · Pro plan · Works offline</span>
      </div>
      <div className="demo-win">
        <aside className="demo-side" aria-label="Product sections">
          <div className="demo-acct">
            <div className="demo-acct-name">Sharma Traders</div>
            <div className="demo-acct-sub">Wholesale distributor</div>
          </div>
          {TABS.map((t) => (
            <button
              key={t.id}
              className="demo-nav"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
            >
              <t.Icon size={16} />
              {t.label}
            </button>
          ))}
        </aside>
        <div className="demo-main">
          {tab === "overview" && (
            <div>
              <div className="demo-head">
                <div><h3>Overview</h3><p>1 October 2026 · All figures for this business</p></div>
                <Badge tone="green">Synced</Badge>
              </div>
              <StatStrip items={[
                { k: "Revenue · Sep", v: money(24850000), d: "+12% vs Aug", tone: "up" },
                { k: "Outstanding", v: money(1297000), d: "3 invoices open" },
                { k: "Low stock", v: "2 items", d: "Below reorder level", tone: "down" },
                { k: "Orders · Sep", v: "48", d: "6 awaiting fulfilment" },
              ]} />
              <RevenueChart />
              <div style={{ marginTop: 18 }}>
                <DataTable
                  caption="Recent invoices"
                  columns={[
                    { key: "no", header: "Invoice", mono: true },
                    { key: "customer", header: "Customer" },
                    { key: "due", header: "Due" },
                    { key: "amount", header: "Amount", align: "right", mono: true },
                    { key: "status", header: "Status", align: "center" },
                  ]}
                  rows={INVOICES.slice(0, 4).map((i) => ({
                    no: <span className="t-strong">{i.no}</span>,
                    customer: i.customer,
                    due: i.due,
                    amount: money(i.paise),
                    status: <StatusPill status={i.status} />,
                  }))}
                />
              </div>
            </div>
          )}

          {tab === "customers" && (
            <div>
              <div className="demo-head">
                <div><h3>Customers</h3><p>5 customers · 2 with open dues</p></div>
              </div>
              <DataTable
                columns={[
                  { key: "id", header: "ID", mono: true },
                  { key: "name", header: "Customer" },
                  { key: "city", header: "City" },
                  { key: "phone", header: "Phone", mono: true },
                  { key: "dues", header: "Open dues", align: "right", mono: true },
                  { key: "status", header: "Status", align: "center" },
                ]}
                rows={CUSTOMERS.map((c) => ({
                  id: c.id,
                  name: <span className="t-strong">{c.name}</span>,
                  city: c.city,
                  phone: c.phone,
                  dues: c.dues ? money(c.dues) : "–",
                  status: <StatusPill status={c.status} />,
                }))}
              />
            </div>
          )}

          {tab === "sales" && (
            <div>
              <div className="demo-head">
                <div><h3>Sales orders</h3><p>From order to invoice to payment, one trail</p></div>
              </div>
              <DataTable
                columns={[
                  { key: "no", header: "Order", mono: true },
                  { key: "customer", header: "Customer" },
                  { key: "items", header: "Items" },
                  { key: "date", header: "Date" },
                  { key: "amount", header: "Amount", align: "right", mono: true },
                  { key: "status", header: "Status", align: "center" },
                ]}
                rows={ORDERS.map((o) => ({
                  no: <span className="t-strong">{o.no}</span>,
                  customer: o.customer,
                  items: o.items,
                  date: o.date,
                  amount: money(o.paise),
                  status: <StatusPill status={o.status} />,
                }))}
              />
              <p className="small faint" style={{ marginTop: 12 }}>
                SO-2083 became INV-1043 for Royal Sweets. Every order links to its customer, items and invoice.
              </p>
            </div>
          )}

          {tab === "inventory" && (
            <div>
              <div className="demo-head">
                <div><h3>Inventory</h3><p>5 products · 2 below reorder level</p></div>
              </div>
              <DataTable
                columns={[
                  { key: "sku", header: "SKU", mono: true },
                  { key: "name", header: "Product" },
                  { key: "stock", header: "In stock", align: "right", mono: true },
                  { key: "reorder", header: "Reorder at", align: "right", mono: true },
                  { key: "price", header: "Unit price", align: "right", mono: true },
                  { key: "status", header: "Status", align: "center" },
                ]}
                rows={PRODUCTS.map((p) => ({
                  sku: p.sku,
                  name: <span className="t-strong">{p.name}</span>,
                  stock: String(p.stock),
                  reorder: String(p.reorder),
                  price: money(p.price),
                  status: p.stock < p.reorder ? <Badge tone="red">Low stock</Badge> : <Badge tone="green">In stock</Badge>,
                }))}
              />
            </div>
          )}

          {tab === "finance" && (
            <div>
              <div className="demo-head">
                <div><h3>Finance</h3><p>September 2026 · Accrual basis</p></div>
              </div>
              <StatStrip items={[
                { k: "Revenue", v: money(24850000) },
                { k: "Cost of goods", v: money(16920000) },
                { k: "Expenses", v: money(3140000) },
                { k: "Net profit", v: money(4790000), d: "19.3% margin", tone: "up" },
              ]} />
              <RevenueChart />
            </div>
          )}

          {tab === "ai" && (
            <div>
              <div className="demo-head">
                <div><h3>AI Workspace</h3><p>AI works with your business data, never around it</p></div>
                <Badge tone="accent">Approval required</Badge>
              </div>
              <AiWorkspace country={country} />
            </div>
          )}

          {tab === "automation" && (
            <div>
              <div className="demo-head">
                <div><h3>Automation</h3><p>Overdue invoice follow-up · Active</p></div>
                <Badge tone="green">Active</Badge>
              </div>
              <AutomationDemo />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
