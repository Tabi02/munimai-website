"use client";

import type { CountryInfo } from "../lib/geo";
import { priceForCountry } from "../lib/geo";

/* Pure-CSS macOS window showing the Aetros Biz desktop app.
 * Looks like a real product screenshot, no AI-generated decoration. */

function Icon({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const NAV = [
  { label: "Dashboard", active: true, d: "M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10" },
  { label: "Invoices", active: false, d: "M6 2h9l5 5v15H6zM14 2v6h6M9 13h7M9 17h7" },
  { label: "Inventory", active: false, d: "M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v8" },
  { label: "Customers", active: false, d: "M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M10 11a4 4 0 100-8 4 4 0 000 8M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" },
  { label: "Expenses", active: false, d: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" },
  { label: "AI Assistant", active: false, d: "M12 3l1.9 5.8L19.7 10l-5.8 1.9L12 17.7l-1.9-5.8L4.3 10l5.8-1.9zM19 15l.9 2.6 2.6.9-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9z" },
];

const INVOICES = [
  { no: "INV-1042", cust: "Sharma Traders", paise: 1240000, status: "paid" as const, label: "Paid" },
  { no: "INV-1041", cust: "Gupta Electronics", paise: 865000, status: "pending" as const, label: "Pending" },
  { no: "INV-1040", cust: "Royal Sweets", paise: 432000, status: "overdue" as const, label: "Overdue" },
  { no: "INV-1039", cust: "City Mart", paise: 2175000, status: "paid" as const, label: "Paid" },
];

export function AppWindow({ country }: { country: CountryInfo }) {
  return (
    <div className="appwin" aria-hidden="true">
      <div className="appwin-bar">
        <div className="traffic"><i /><i /><i /></div>
        <div className="appwin-title">Aetros Biz · Dashboard</div>
        <div style={{ width: 52 }} />
      </div>
      <div className="appwin-body">
        <aside className="appwin-side">
          <div className="appwin-acct">
            <div className="appwin-acct-mark">M</div>
            <div>
              <div className="appwin-acct-name">Sharma Traders</div>
              <div className="appwin-acct-sub">Pro plan</div>
            </div>
          </div>
          {NAV.map((n) => (
            <span key={n.label} className={`appwin-nav${n.active ? " active" : ""}`}>
              <Icon d={n.d} />
              {n.label}
            </span>
          ))}
        </aside>
        <div className="appwin-main">
          <h4>Good morning</h4>
          <div className="sub">Here is your business at a glance.</div>
          <div className="appwin-stats">
            <div className="appwin-stat">
              <div className="appwin-stat-k">Revenue · Sep</div>
              <div className="appwin-stat-v">{priceForCountry(24850000, country)}</div>
              <div className="appwin-stat-d">+12% vs Aug</div>
            </div>
            <div className="appwin-stat">
              <div className="appwin-stat-k">Outstanding</div>
              <div className="appwin-stat-v">{priceForCountry(1297000, country)}</div>
              <div className="appwin-stat-d" style={{ color: "var(--warning)" }}>3 invoices due</div>
            </div>
            <div className="appwin-stat">
              <div className="appwin-stat-k">Low stock</div>
              <div className="appwin-stat-v">4 items</div>
              <div className="appwin-stat-d" style={{ color: "var(--text-faint)" }}>Reorder soon</div>
            </div>
          </div>
          <div className="appwin-card">
            <div className="appwin-card-h"><span>Recent invoices</span><a>View all</a></div>
            {INVOICES.map((inv) => (
              <div className="appwin-row" key={inv.no}>
                <span className="inv">{inv.no}</span>
                <span className="cust">{inv.cust}</span>
                <span className="amt">{priceForCountry(inv.paise, country)}</span>
                <span className={`pill pill-${inv.status}`}>{inv.label}</span>
              </div>
            ))}
          </div>
          <div className="appwin-ai">
            <div className="appwin-ai-mark" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)"/></svg></div>
            <div>
              <p><strong>AI Assistant:</strong> 3 invoices are overdue totalling {priceForCountry(1297000, country)}. Want me to draft polite reminders?</p>
              <span className="mini-btn">Draft reminders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
