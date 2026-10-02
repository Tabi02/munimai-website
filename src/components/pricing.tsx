"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui";
import {
  COUNTRIES, countryByCode, detectCountryCode, customPriceFor, convertFromINR, prettyPrice, formatMoney,
  hasCustomPrice, storedCountryCode, storeCountryCode, type CountryInfo,
} from "../lib/geo";

export const PLANS = [
  { slug: "starter", name: "Starter", price_cents: 99000, blurb: "For a single shop getting organised." },
  { slug: "business", name: "Business", price_cents: 249000, blurb: "For growing businesses with staff." },
  { slug: "scale", name: "Scale", price_cents: 499000, blurb: "For multi-counter and multi-branch work." },
  { slug: "enterprise", name: "Enterprise", price_cents: 0, blurb: "Custom terms for larger organisations." },
];

/** Monthly price string; annual shows the monthly equivalent (two months free). */
export function planPrice(slug: string, cents: number, country: CountryInfo, annual: boolean): string {
  if (slug === "enterprise") return "Custom";
  const monthly = customPriceFor(slug, country.currency) ?? convertFromINR(cents, country.currency);
  const value = annual ? monthly * (10 / 12) : monthly;
  return formatMoney(prettyPrice(value, country.currency), country.currency, country.locale);
}

export function CurrencySelect({ country, onPick }: { country: CountryInfo; onPick?: (c: CountryInfo) => void }) {
  return (
    <select
      className="select"
      style={{ width: "auto", marginTop: 6 }}
      value={country.code}
      aria-label="Currency"
      onChange={(e) => {
        storeCountryCode(e.target.value);
        if (onPick) {
          onPick(countryByCode(e.target.value));
        } else {
          window.location.reload();
        }
      }}
    >
      {COUNTRIES.map((c) => (
        <option key={c.code} value={c.code}>{c.name} ({c.currency})</option>
      ))}
    </select>
  );
}

const ROWS: Array<{ cat?: string; label?: string; vals?: Array<string | null> }> = [
  { cat: "Capacity" },
  { label: "Devices", vals: ["1", "3", "10", "Unlimited"] },
  { label: "Staff accounts", vals: ["1", "5", "25", "Unlimited"] },
  { label: "Branches", vals: ["1", "1", "3", "Unlimited"] },
  { cat: "Product" },
  { label: "Customers, sales, inventory, finance", vals: ["yes", "yes", "yes", "yes"] },
  { label: "AI workspace (14 specialists)", vals: [null, "yes", "yes", "yes"] },
  { label: "Automation workflows", vals: [null, "yes", "yes", "yes"] },
  { label: "WhatsApp and Telegram owner alerts", vals: [null, "yes", "yes", "yes"] },
  { label: "Motion Studio (product videos)", vals: [null, "yes", "yes", "yes"] },
  { cat: "Data and ownership" },
  { label: "Local-first, works offline", vals: ["yes", "yes", "yes", "yes"] },
  { label: "CSV and Excel export", vals: ["yes", "yes", "yes", "yes"] },
  { label: "Data stays readable if you leave", vals: ["yes", "yes", "yes", "yes"] },
  { cat: "Support and terms" },
  { label: "Support", vals: ["Email", "Priority email", "Priority + phone", "Dedicated manager"] },
  { label: "Onboarding help", vals: [null, "yes", "yes", "yes"] },
  { label: "Free trial", vals: ["14 days", "14 days", "14 days", "Pilot"] },
  { label: "License", vals: ["Single business", "Single business", "Single business", "Custom"] },
];

function feat(v: string | null) {
  if (v === null) return <span className="tick-n">–</span>;
  if (v === "yes") return <span className="tick-y">Included</span>;
  return <span>{v}</span>;
}

export function PricingTable({ country, annual, onCurrency }: {
  country: CountryInfo; annual: boolean; onCurrency?: (c: CountryInfo) => void;
}) {
  const per = (slug: string) =>
    slug === "enterprise" ? "annual agreement" : annual ? "per month, billed annually" : "per month";
  return (
    <div className="price-table-wrap">
      <table className="price-table">
        <thead>
          <tr>
            <th style={{ width: "26%" }}>
              <span className="small faint">Plans</span>
              <div style={{ marginTop: 12 }}>
                <label className="small faint" htmlFor="currency">Currency</label><br />
                <CurrencySelect country={country} onPick={onCurrency} />
              </div>
            </th>
            {PLANS.map((p, i) => (
              <th key={p.slug} className={i === 1 ? "col-hi t-center" : "t-center"}>
                <div className="plan-name">{p.name}</div>
                <div className="plan-price">{planPrice(p.slug, p.price_cents, country, annual)}</div>
                <div className="plan-per">{per(p.slug)}</div>
                <div className="small faint" style={{ marginTop: 8 }}>{p.blurb}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => r.cat ? (
            <tr key={i} className="feat-cat"><td colSpan={5}>{r.cat}</td></tr>
          ) : (
            <tr key={i}>
              <td className="t-strong">{r.label}</td>
              {r.vals!.map((v, j) => (
                <td key={j} className={`t-center${j === 1 ? " col-hi" : ""}`}>{feat(v)}</td>
              ))}
            </tr>
          ))}
          <tr>
            <td />
            {PLANS.map((p, i) => (
              <td key={p.slug} className={`t-center${i === 1 ? " col-hi" : ""}`}>
                <Button href="/register" variant={i === 1 ? "primary" : "secondary"} size="sm">
                  {p.slug === "enterprise" ? "Talk to us" : "Start free trial"}
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function useCountry(defaultCode?: string) {
  const [country, setCountry] = useState<CountryInfo>(
    () => countryByCode(defaultCode ?? storedCountryCode() ?? "US"));
  useEffect(() => {
    if (defaultCode) return;
    setCountry(countryByCode(detectCountryCode()));
  }, [defaultCode]);
  return [country, setCountry] as const;
}

export function pricingNote(country: CountryInfo): string {
  return `Prices shown in ${country.currency}. Annual billing saves two months.` +
    (hasCustomPrice("business", country.currency) ? "" : " Converted prices are approximate; checkout shows the exact figure.");
}
