"use client";

import { useState } from "react";
import { SectionHead, Reveal, Badge } from "./ui";

/* The 14 AI specialists as professional software agents:
   role, data context, tools, and approval requirements. No fictional characters. */

type Specialist = {
  id: string;
  name: string;
  role: string;
  reads: string[];
  does: string[];
  approval: string;
};

const SPECIALISTS: Specialist[] = [
  {
    id: "general", name: "General",
    role: "All-rounder for everyday questions: sales trends, dues, what needs attention today.",
    reads: ["Invoices", "Orders", "Customers", "Inventory", "Expenses"],
    does: ["Answers whole-business questions", "Drafts invoices, expenses, attendance entries"],
    approval: "Every write action pauses for owner approval.",
  },
  {
    id: "sales", name: "Sales",
    role: "Quotations, order follow-ups and payment reminders drafted from real order history.",
    reads: ["Customers", "Invoices", "Sales orders", "Tax configuration"],
    does: ["Drafts quotations and invoices", "Summarises order history per customer"],
    approval: "Draft invoices need approval before they are issued.",
  },
  {
    id: "collections", name: "Collections",
    role: "Tracks overdue invoices and helps the owner follow up politely.",
    reads: ["Overdue invoices", "Invoice summaries", "Customer records"],
    does: ["Prioritises who owes what", "Drafts reminder message text"],
    approval: "Never contacts customers directly; never marks anything paid without approval.",
  },
  {
    id: "inventory", name: "Inventory",
    role: "Watches stock levels and sales velocity; flags what will run out.",
    reads: ["Stock quantities", "Sales order items", "Reorder levels"],
    does: ["Stockout warnings", "Reorder suggestions with basis shown"],
    approval: "Read-only analysis; purchase decisions stay with the owner.",
  },
  {
    id: "accountant", name: "Accountant",
    role: "Explains profit and loss, tax treatment and where the money went, in plain language.",
    reads: ["Invoices", "Expenses", "Tax configuration", "Accounting records"],
    does: ["P&L explanations", "Tax breakdowns per invoice"],
    approval: "Read-only; it explains, it does not post entries.",
  },
  {
    id: "expenses", name: "Expenses",
    role: "Records spending and keeps an eye on where it goes.",
    reads: ["Expense records", "Categories"],
    does: ["Records expenses", "Spending summaries by category"],
    approval: "Recording an expense requests approval first.",
  },
  {
    id: "hr", name: "HR",
    role: "Answers staff, attendance and leave questions from HR records.",
    reads: ["Employee records", "Attendance log"],
    does: ["Attendance summaries", "Staff record lookup"],
    approval: "Marking attendance requests approval first.",
  },
  {
    id: "customers", name: "Customers",
    role: "Finds any customer and summarises their whole history.",
    reads: ["Customer records", "Orders", "Invoices", "Dues"],
    does: ["Customer 360 summaries", "Dues and last-contact lookup"],
    approval: "Read-only.",
  },
  {
    id: "reports", name: "Reports",
    role: "Builds readable daily, weekly and monthly business summaries.",
    reads: ["Invoices", "Orders", "Expenses", "Inventory movements"],
    does: ["Daily briefing", "Period summaries in plain language"],
    approval: "Read-only.",
  },
  {
    id: "orders", name: "Orders",
    role: "Watches the sales order pipeline and explains delays.",
    reads: ["Sales orders", "Order items", "Fulfilment status"],
    does: ["Pipeline status per order", "Delay explanations"],
    approval: "Read-only; status changes stay with the owner.",
  },
  {
    id: "marketing", name: "Marketing Strategist",
    role: "Suggests offers, campaigns and promotion ideas from customer and sales data.",
    reads: ["Customers", "Sales history", "Product performance"],
    does: ["Campaign angles", "Offer ideas tied to real data"],
    approval: "Suggestions only; campaigns are launched by the owner.",
  },
  {
    id: "copywriter", name: "Copywriter",
    role: "Writes sharp text for products, offers and customer messages in the business's voice.",
    reads: ["Product catalog", "Campaign context"],
    does: ["Product descriptions", "Message and offer copy"],
    approval: "Text is drafted for review; sending stays with the owner.",
  },
  {
    id: "growth", name: "Growth Advisor",
    role: "Straightforward, practical advice to grow profit: no buzzwords.",
    reads: ["Revenue", "Margins", "Customer activity", "Inventory"],
    does: ["Prioritised next steps", "What-if reasoning with numbers shown"],
    approval: "Advisory only; it takes no actions.",
  },
  {
    id: "care", name: "Customer Care",
    role: "Drafts polite replies to customer queries using their actual records.",
    reads: ["Customer records", "Orders", "Invoices"],
    does: ["Reply drafts with order/invoice context", "Follow-up suggestions"],
    approval: "Drafts only; the owner sends every message.",
  },
];

/* Interactive approval workflow demo, per the product's real approval model. */
const WORKFLOW_STEPS = [
  { t: "Business event", d: "Mustard Oil 15L falls to 38 units; reorder level is 50." },
  { t: "Specialist", d: "Inventory AI picks up the stock event." },
  { t: "Context", d: "Reads 90-day sales velocity, current stock, supplier record." },
  { t: "Analysis", d: "Sells ~4 units/day; 9 days of cover left; supplier lead time 7 days." },
  { t: "Recommendation", d: "Proposes a purchase of 60 units, showing the basis for the number." },
  { t: "Approval", d: "The proposal waits. Nothing is ordered until the owner approves." },
  { t: "Action", d: "On approval, the purchase workflow is created and logged." },
  { t: "Verification", d: "Stock, supplier and audit records are updated together." },
  { t: "Audit trail", d: "Every step, including the approval, is recorded with timestamps." },
];

export function AITeam() {
  const [active, setActive] = useState(SPECIALISTS[0].id);
  const [step, setStep] = useState(0);
  const s = SPECIALISTS.find((x) => x.id === active) ?? SPECIALISTS[0];

  return (
    <div>
      <Reveal>
        <SectionHead
          eyebrow="AI team"
          title="Fourteen specialists, one approval rule."
          lede="Each specialist reads the business's own records and explains what it finds. Anything that changes data, money or messages waits for a human to approve it first."
        />
      </Reveal>

      <div className="explorer">
        <div className="explorer-rail" role="tablist" aria-label="AI specialists">
          {SPECIALISTS.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={x.id === active}
              className={`explorer-tab${x.id === active ? " is-active" : ""}`}
              onClick={() => setActive(x.id)}
            >
              <span className="explorer-tab-label">{x.name}</span>
            </button>
          ))}
        </div>
        <div className="explorer-panel" role="tabpanel">
          <h3 style={{ marginTop: 0 }}>{s.name}</h3>
          <p className="explorer-summary">{s.role}</p>
          <div className="agent-grid">
            <div>
              <h4 className="agent-h">Reads</h4>
              <ul className="agent-ul">{s.reads.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
            <div>
              <h4 className="agent-h">Does</h4>
              <ul className="agent-ul">{s.does.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          </div>
          <p className="agent-approval"><Badge tone="amber">Approval</Badge> {s.approval}</p>
        </div>
      </div>

      <div style={{ marginTop: 48 }}>
        <Reveal>
          <SectionHead
            eyebrow="How approval works"
            title="From event to audit trail."
            lede="A real workflow from the product: low stock detected, analysed, proposed, approved, executed and recorded. Step through it."
          />
        </Reveal>
        <div className="workflow">
          <ol className="workflow-steps">
            {WORKFLOW_STEPS.map((w, i) => (
              <li key={w.t} className={i === step ? "is-active" : i < step ? "is-done" : ""}>
                <button onClick={() => setStep(i)} aria-current={i === step ? "step" : undefined}>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span> {w.t}
                </button>
              </li>
            ))}
          </ol>
          <div className="workflow-detail">
            <h3 style={{ marginTop: 0 }}>{WORKFLOW_STEPS[step].t}</h3>
            <p>{WORKFLOW_STEPS[step].d}</p>
            <p className="muted small">Sample workspace data. In the product, each step runs against the business's real records.</p>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn btn-ghost btn-sm" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</button>
              <button className="btn btn-ghost btn-sm" disabled={step === WORKFLOW_STEPS.length - 1} onClick={() => setStep(step + 1)}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
