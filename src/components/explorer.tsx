"use client";

import { useState } from "react";
import { SectionHead, Reveal } from "./ui";

/* The 63 shipped features, grouped into 8 product systems.
   No card grids: one selectable system at a time, structured list detail. */

type Feature = { name: string; desc: string };
type System = { id: string; label: string; summary: string; features: Feature[] };

const SYSTEMS: System[] = [
  {
    id: "operations",
    label: "Operations",
    summary: "The daily workspace: customers, orders, stock, staff and the calendar that ties them together.",
    features: [
      { name: "Home Dashboard", desc: "Outstanding dues, paid totals, customer count and low stock at a glance, with an AI-written daily summary." },
      { name: "Unified Inbox", desc: "Approvals, tasks, alerts and overdue invoices in one priority-sorted feed with inline actions." },
      { name: "Business Calendar", desc: "Invoice due dates, task deadlines, order dates and quotation expiries on one month grid." },
      { name: "Customers", desc: "Customer records with dues, history and custom fields; search and full edit." },
      { name: "Quotations", desc: "Tax-aware quotations with valid-until dates and one-click conversion to invoice." },
      { name: "Orders + Live Tracker", desc: "Sales orders with a visual pipeline: draft, confirmed, packing, shipped, fulfilled." },
      { name: "Inventory", desc: "Products with SKU, pricing, tax, stock levels, barcode labels and e-commerce listing export." },
      { name: "Suppliers", desc: "Supplier records with contact details, tags and notes; the purchasing side of the business." },
      { name: "Employees + Attendance", desc: "Staff records, roles and daily attendance tracking." },
      { name: "Marketing", desc: "Campaigns via deep links, an AI SEO checker and a WhatsApp store that turns chats into orders." },
      { name: "Studio", desc: "Product video ads rendered locally from templates; AI writes the headline, subline and call to action." },
      { name: "Store", desc: "Shareable product catalog for WhatsApp selling." },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    summary: "Money in, money out, and the books that prove it.",
    features: [
      { name: "GST Invoices", desc: "Tax invoices with per-country tax labels, named tax breakdowns and payment links." },
      { name: "Expenses + P&L", desc: "Expense capture with categories and a profit-and-loss view built from real entries." },
      { name: "Accounting", desc: "Ledger-style records behind every invoice, order and expense." },
      { name: "Analytics", desc: "Revenue, orders, inventory and expense charts from the business's own data." },
      { name: "Payment Reminders", desc: "Overdue invoices with one-tap polite WhatsApp reminders; the owner always presses send." },
    ],
  },
  {
    id: "ai",
    label: "AI Team",
    summary: "Fourteen specialists that read the business's own records, explain what they find, and wait for approval before acting.",
    features: [
      { name: "AI Assistant", desc: "The workspace chat where every specialist is reachable; sensitive writes pause for human approval." },
      { name: "General", desc: "Answers whole-business questions: sales trends, dues, what needs attention today." },
      { name: "Sales", desc: "Drafts quotations, follow-ups and reminders from real order history." },
      { name: "Collections", desc: "Prioritises overdue invoices and drafts collection messages." },
      { name: "Inventory", desc: "Watches stock velocity and flags what will run out." },
      { name: "Accountant", desc: "Explains profit, loss and tax treatment in plain language." },
      { name: "Expenses", desc: "Categorises spending and flags unusual outflows." },
      { name: "HR", desc: "Answers staff, attendance and leave questions from HR records." },
      { name: "Customers", desc: "Summarises any customer: dues, orders, last contact." },
      { name: "Reports", desc: "Builds readable summaries from any report or date range." },
      { name: "Orders", desc: "Tracks order status and explains delays." },
      { name: "Marketing Strategist", desc: "Suggests campaign angles from customer and sales data." },
      { name: "Copywriter", desc: "Writes product and campaign copy in the business's voice." },
      { name: "Growth Advisor", desc: "Practical next steps for revenue, retention and reach." },
      { name: "Customer Care", desc: "Drafts replies to customer queries using their actual records." },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    summary: "Ten analysis systems that turn raw records into findings, explanations and suggested actions.",
    features: [
      { name: "Business Intelligence", desc: "The home of all ten systems below, with a daily briefing of what changed." },
      { name: "Health Center", desc: "Ten business dimensions scored from real data: cash, receivables, stock, customers and more." },
      { name: "Early Warnings", desc: "Problems detected before they cost money: dues ageing, stockouts, margin slips." },
      { name: "Command Center", desc: "One screen for the state of the business right now." },
      { name: "Price Simulator", desc: "What-if modelling: what a price change does to margin and revenue." },
      { name: "Opportunity Detector", desc: "Unacted-on chances in the data: repeat buyers, slow movers, bundling." },
      { name: "Revenue Leakage", desc: "Where money quietly escapes: discounts, write-offs, unbilled work." },
      { name: "Inventory Intel", desc: "Dead stock, fast movers and reorder points from sales velocity." },
      { name: "Cash Flow Forecast", desc: "Expected inflows and outflows from dues, payables and run-rate." },
      { name: "Data Quality", desc: "Duplicate customers and products, missing phones and prices, negative stock, broken references." },
      { name: "Integration Health", desc: "Every connection's status, last sync, errors and credential state." },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    summary: "Rules the business defines; the system executes them and reports back.",
    features: [
      { name: "Workflow Builder", desc: "Visual rules: triggers, conditions and actions across invoices, stock, customers and orders." },
      { name: "Custom Fields Engine", desc: "Eleven field types on customers, products, suppliers and employees; no code required." },
      { name: "Video Ad Studio", desc: "Three templates across three formats, rendered locally with headless Chromium." },
    ],
  },
  {
    id: "communication",
    label: "Communication",
    summary: "The business reaches people where they already are.",
    features: [
      { name: "Community Chat", desc: "Real-time rooms for the whole user base and for the owner's own team." },
      { name: "Telegram Alerts", desc: "Owner alerts and two-way AI chat through the owner's own bot; approvals by reply." },
      { name: "WhatsApp Alerts + Store", desc: "Notifications through WhatsApp Business; the store turns chat messages into orders." },
      { name: "Notification Chime", desc: "An original synthesized chime for every notification type; testable in Settings." },
    ],
  },
  {
    id: "integrations",
    label: "Integrations",
    summary: "Connected systems, honestly reported: what is linked, when it last synced, and what failed.",
    features: [
      { name: "Integrations", desc: "Connection registry with per-integration logs and enable/disable control." },
      { name: "Shopify / WooCommerce Sync", desc: "Pull orders and products from connected stores into the workspace." },
      { name: "CSV Import", desc: "Customers and products from spreadsheets with column auto-mapping." },
      { name: "Import / Export", desc: "Backup, restore and data exchange without lock-in." },
      { name: "Integration Health", desc: "Status, last sync, error counts and credential state per connection. Secrets never displayed." },
    ],
  },
  {
    id: "security",
    label: "Security & System",
    summary: "Local-first data, licensed devices, and the controls that keep the business in charge.",
    features: [
      { name: "Security & Backup", desc: "OS-encrypted secret vault, audit-logged sensitive writes, backup and restore." },
      { name: "Devices", desc: "Owner view of connected devices with grant and revoke control." },
      { name: "License + Auto-update", desc: "License status, plan, devices and update channel in one place." },
      { name: "Backup / Restore", desc: "Full local backups the business owns and can restore from." },
      { name: "6 Languages", desc: "English, Hindi/Hinglish, Spanish, Portuguese, French, German across the interface." },
      { name: "Multi-Currency", desc: "Country-aware currency formatting and pricing throughout." },
      { name: "25 Country Taxes", desc: "Editable tax presets per country; GST, VAT, sales tax handled by configuration." },
      { name: "Settings", desc: "Brand, theme, language, taxes, alerts and customisation in one place." },
    ],
  },
];

export function ProductExplorer() {
  const [active, setActive] = useState(SYSTEMS[0].id);
  const system = SYSTEMS.find((s) => s.id === active) ?? SYSTEMS[0];
  const total = SYSTEMS.reduce((n, s) => n + s.features.length, 0);

  return (
    <div>
      <Reveal>
        <SectionHead
          eyebrow="Product explorer"
          title="Sixty-three features, eight systems."
          lede={`Every shipped capability, grouped the way the product is actually organised. Select a system to see what is inside. Total: ${total} features.`}
        />
      </Reveal>
      <div className="explorer">
        <div className="explorer-rail" role="tablist" aria-label="Product systems">
          {SYSTEMS.map((s) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={s.id === active}
              className={`explorer-tab${s.id === active ? " is-active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              <span className="explorer-tab-label">{s.label}</span>
              <span className="explorer-tab-count num">{s.features.length}</span>
            </button>
          ))}
        </div>
        <div className="explorer-panel" role="tabpanel">
          <p className="explorer-summary">{system.summary}</p>
          <dl className="explorer-list">
            {system.features.map((f) => (
              <div className="explorer-row" key={f.name}>
                <dt>{f.name}</dt>
                <dd>{f.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
