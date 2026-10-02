"use client";

import { useState } from "react";
import { SectionHead, Reveal, Badge } from "./ui";

/* Business Intelligence Control Surface: select an intelligence area,
   see Input -> Analysis -> Finding -> Explanation -> Suggested Action.
   All figures are sample workspace data, clearly marked. */

type Intel = {
  id: string;
  name: string;
  input: string;
  analysis: string;
  finding: string;
  explanation: string;
  action: string;
};

const SYSTEMS: Intel[] = [
  {
    id: "health", name: "Health Center",
    input: "Invoices, orders, expenses, stock and customer records from the last 90 days.",
    analysis: "Ten dimensions scored 0-100: cash, receivables, payables, stock, customers, margins, expenses, growth, data quality, momentum.",
    finding: "Receivables at 62/100: Rs 7.3L overdue across 14 invoices.",
    explanation: "Three customers account for 80% of overdue value; average payment delay is 19 days past due date.",
    action: "Review the overdue list in Collections and send reminders for the top three accounts.",
  },
  {
    id: "warnings", name: "Early Warnings",
    input: "Live thresholds over dues ageing, stock cover, margin drift and inactivity.",
    analysis: "Each signal is checked against the business's own history, not fixed rules.",
    finding: "Mustard Oil 15L will stock out in 9 days at current sales velocity.",
    explanation: "Selling 4 units/day with 38 in stock and a 7-day supplier lead time leaves a 2-day gap.",
    action: "Open the Smart Purchase Planner to see the suggested order quantity and basis.",
  },
  {
    id: "command", name: "Command Center",
    input: "Today's invoices, orders, tasks, alerts and approvals.",
    analysis: "Everything needing the owner's attention, ranked by urgency and money at stake.",
    finding: "5 items need decisions today: 2 approvals, 2 overdue follow-ups, 1 stockout risk.",
    explanation: "Ranked by value at risk and deadline, so the owner starts with what matters most.",
    action: "Work the list top-down in the Unified Inbox.",
  },
  {
    id: "sim", name: "Price Simulator",
    input: "A product, its cost, current price and 90-day sales volume.",
    analysis: "Models margin and revenue at different price points from real sales history.",
    finding: "Raising Basmati Rice 25kg by 3% keeps volume and adds ~Rs 18,000/month margin.",
    explanation: "The model uses the product's own demand pattern; it does not guess market response.",
    action: "Test the change on one product first, then compare actuals after 30 days.",
  },
  {
    id: "opps", name: "Opportunity Detector",
    input: "Customer purchase patterns, slow-moving stock and product affinities.",
    analysis: "Looks for unacted-on chances: repeat buyers, bundles, dormant customers.",
    finding: "City Mart buys Sugar monthly but has never ordered Tea Powder; 12 similar pairs found.",
    explanation: "Customers who buy product A usually buy product B within 60 days; these have not.",
    action: "Ask the Sales specialist to draft a targeted offer for the top pairs.",
  },
  {
    id: "leak", name: "Revenue Leakage",
    input: "Discounts, write-offs, unbilled items and margin exceptions across invoices.",
    analysis: "Adds up the small amounts that never become revenue.",
    finding: "~Rs 46,000 lost last quarter to ad-hoc discounts without recorded reason.",
    explanation: "Discounts cluster on two products and one sales counter; none were pre-approved.",
    action: "Set discount approval rules in the Workflow Builder.",
  },
  {
    id: "inv", name: "Inventory Intel",
    input: "Stock quantities, reorder levels and 90-day sales velocity per product.",
    analysis: "Classifies every product: fast mover, steady, slow, dead stock.",
    finding: "Wheat Flour 10kg turns 6x/quarter; Tea Powder 1kg has 12 units against a 40-unit reorder level.",
    explanation: "Velocity is computed from the business's own fulfilled orders, not estimates.",
    action: "Reorder Tea Powder now; consider a promotion to move slow stock.",
  },
  {
    id: "cash", name: "Cash Flow Forecast",
    input: "Receivables due dates, payables, and the expense run-rate.",
    analysis: "Projects inflows and outflows week by week from dated records.",
    finding: "A Rs 2.1L shortfall is projected in week 3 if overdue invoices stay unpaid.",
    explanation: "Inflows assume historical payment delays; outflows use recurring expense patterns.",
    action: "Prioritise collection on the three largest overdue invoices this week.",
  },
  {
    id: "dq", name: "Data Quality",
    input: "Customer, product, supplier and invoice records scanned for duplicates and gaps.",
    analysis: "Normalised-name and phone matching for duplicates; completeness checks for required fields.",
    finding: "2 possible duplicate customers, 4 products missing sale price, 1 negative stock.",
    explanation: "Each issue shows the records, the evidence and a suggested review; nothing is merged automatically.",
    action: "Review each issue in the Data Quality tab; merging always needs approval.",
  },
  {
    id: "inthealth", name: "Integration Health",
    input: "Store connections, integration logs and alert channel configuration.",
    analysis: "Status, last sync, recent errors and credential state per connection.",
    finding: "WooCommerce store: healthy, synced 2h ago. Telegram alerts: not configured.",
    explanation: "Secrets are never displayed; only whether each credential is configured.",
    action: "Configure the Telegram bot in Settings to enable owner alerts.",
  },
];

export function IntelligenceSurface() {
  const [active, setActive] = useState(SYSTEMS[0].id);
  const s = SYSTEMS.find((x) => x.id === active) ?? SYSTEMS[0];

  return (
    <div>
      <Reveal>
        <SectionHead
          eyebrow="Business intelligence"
          title="Ten systems, one control surface."
          lede="Select an intelligence area to see what data it reads, how it analyses, what it found in the sample workspace, and what it suggests. All figures below are clearly marked sample data."
        />
      </Reveal>
      <div className="explorer">
        <div className="explorer-rail" role="tablist" aria-label="Intelligence systems">
          {SYSTEMS.map((x) => (
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
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>{s.name}</h3>
            <Badge tone="gray">Sample workspace data</Badge>
          </div>
          <dl className="intel-flow">
            {[
              ["Input data", s.input],
              ["Analysis", s.analysis],
              ["Finding", s.finding],
              ["Explanation", s.explanation],
              ["Suggested action", s.action],
            ].map(([k, v]) => (
              <div className="intel-row" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
