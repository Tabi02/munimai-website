/* Country-aware customization: currency, locale, language defaults.
 * Detection is timezone-based (no external IP service needed); the user can
 * always override via the pickers, which persist to localStorage. */

/** Supported site languages. */
export type Lang = "en" | "hi" | "es" | "pt" | "fr" | "de";

export interface CountryInfo {
  code: string;      // ISO-2
  name: string;
  currency: string;  // ISO-4217
  locale: string;    // Intl locale
  lang: Lang;        // default site language
  taxLabel: string;  // invoice tax label
}

/* Major markets first; INR is the base price currency. */
export const COUNTRIES: CountryInfo[] = [
  { code: "IN", name: "India", currency: "INR", locale: "en-IN", lang: "hi", taxLabel: "GST" },
  { code: "US", name: "United States", currency: "USD", locale: "en-US", lang: "en", taxLabel: "Sales Tax" },
  { code: "GB", name: "United Kingdom", currency: "GBP", locale: "en-GB", lang: "en", taxLabel: "VAT" },
  { code: "AE", name: "UAE", currency: "AED", locale: "en-AE", lang: "en", taxLabel: "VAT" },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", locale: "en-SA", lang: "en", taxLabel: "VAT" },
  { code: "SG", name: "Singapore", currency: "SGD", locale: "en-SG", lang: "en", taxLabel: "GST" },
  { code: "AU", name: "Australia", currency: "AUD", locale: "en-AU", lang: "en", taxLabel: "GST" },
  { code: "CA", name: "Canada", currency: "CAD", locale: "en-CA", lang: "en", taxLabel: "GST/HST" },
  { code: "DE", name: "Germany", currency: "EUR", locale: "de-DE", lang: "de", taxLabel: "VAT" },
  { code: "FR", name: "France", currency: "EUR", locale: "fr-FR", lang: "fr", taxLabel: "VAT" },
  { code: "NL", name: "Netherlands", currency: "EUR", locale: "nl-NL", lang: "en", taxLabel: "VAT" },
  { code: "ES", name: "Spain", currency: "EUR", locale: "es-ES", lang: "es", taxLabel: "VAT" },
  { code: "IT", name: "Italy", currency: "EUR", locale: "it-IT", lang: "en", taxLabel: "VAT" },
  { code: "PK", name: "Pakistan", currency: "PKR", locale: "en-PK", lang: "en", taxLabel: "GST" },
  { code: "BD", name: "Bangladesh", currency: "BDT", locale: "en-BD", lang: "en", taxLabel: "VAT" },
  { code: "NP", name: "Nepal", currency: "NPR", locale: "en-NP", lang: "en", taxLabel: "VAT" },
  { code: "LK", name: "Sri Lanka", currency: "LKR", locale: "en-LK", lang: "en", taxLabel: "VAT" },
  { code: "MY", name: "Malaysia", currency: "MYR", locale: "en-MY", lang: "en", taxLabel: "SST" },
  { code: "ID", name: "Indonesia", currency: "IDR", locale: "id-ID", lang: "en", taxLabel: "VAT" },
  { code: "PH", name: "Philippines", currency: "PHP", locale: "en-PH", lang: "en", taxLabel: "VAT" },
  { code: "TH", name: "Thailand", currency: "THB", locale: "th-TH", lang: "en", taxLabel: "VAT" },
  { code: "VN", name: "Vietnam", currency: "VND", locale: "vi-VN", lang: "en", taxLabel: "VAT" },
  { code: "JP", name: "Japan", currency: "JPY", locale: "ja-JP", lang: "en", taxLabel: "Consumption Tax" },
  { code: "KR", name: "South Korea", currency: "KRW", locale: "ko-KR", lang: "en", taxLabel: "VAT" },
  { code: "CN", name: "China", currency: "CNY", locale: "zh-CN", lang: "en", taxLabel: "VAT" },
  { code: "ZA", name: "South Africa", currency: "ZAR", locale: "en-ZA", lang: "en", taxLabel: "VAT" },
  { code: "NG", name: "Nigeria", currency: "NGN", locale: "en-NG", lang: "en", taxLabel: "VAT" },
  { code: "KE", name: "Kenya", currency: "KES", locale: "en-KE", lang: "en", taxLabel: "VAT" },
  { code: "BR", name: "Brazil", currency: "BRL", locale: "pt-BR", lang: "pt", taxLabel: "ICMS" },
  { code: "MX", name: "Mexico", currency: "MXN", locale: "es-MX", lang: "es", taxLabel: "VAT" },
  { code: "QA", name: "Qatar", currency: "QAR", locale: "en-QA", lang: "en", taxLabel: "VAT" },
  { code: "KW", name: "Kuwait", currency: "KWD", locale: "en-KW", lang: "en", taxLabel: "VAT" },
  { code: "OM", name: "Oman", currency: "OMR", locale: "en-OM", lang: "en", taxLabel: "VAT" },
  { code: "BH", name: "Bahrain", currency: "BHD", locale: "en-BH", lang: "en", taxLabel: "VAT" },
  { code: "NZ", name: "New Zealand", currency: "NZD", locale: "en-NZ", lang: "en", taxLabel: "GST" },
];

export const countryByCode = (code: string): CountryInfo =>
  COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[1]; // US fallback

/* Timezone prefix → country. Best-effort default; user can override. */
const TZ_MAP: Array<[string, string]> = [
  ["Asia/Kolkata", "IN"], ["Asia/Calcutta", "IN"],
  ["America/New_York", "US"], ["America/Chicago", "US"], ["America/Denver", "US"], ["America/Los_Angeles", "US"], ["America/", "US"],
  ["Europe/London", "GB"], ["Europe/Dublin", "GB"],
  ["Europe/Berlin", "DE"], ["Europe/Paris", "FR"], ["Europe/Amsterdam", "NL"], ["Europe/Madrid", "ES"], ["Europe/Rome", "IT"], ["Europe/", "DE"],
  ["Asia/Dubai", "AE"], ["Asia/Riyadh", "SA"], ["Asia/Karachi", "PK"], ["Asia/Dhaka", "BD"], ["Asia/Kathmandu", "NP"], ["Asia/Colombo", "LK"],
  ["Asia/Singapore", "SG"], ["Asia/Kuala_Lumpur", "MY"], ["Asia/Jakarta", "ID"], ["Asia/Manila", "PH"], ["Asia/Bangkok", "TH"],
  ["Asia/Tokyo", "JP"], ["Asia/Seoul", "KR"], ["Asia/Shanghai", "CN"], ["Asia/Qatar", "QA"], ["Asia/Kuwait", "KW"], ["Asia/Muscat", "OM"], ["Asia/Bahrain", "BH"],
  ["Australia/", "AU"], ["Pacific/Auckland", "NZ"],
  ["America/Toronto", "CA"], ["America/Vancouver", "CA"],
  ["America/Sao_Paulo", "BR"], ["America/Mexico_City", "MX"],
  ["Africa/Johannesburg", "ZA"], ["Africa/Lagos", "NG"], ["Africa/Nairobi", "KE"],
];

export function detectCountryCode(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    for (const [prefix, code] of TZ_MAP) {
      if (tz === prefix || (prefix.endsWith("/") && tz.startsWith(prefix))) return code;
    }
    for (const [prefix, code] of TZ_MAP) {
      if (tz.startsWith(prefix)) return code;
    }
  } catch { /* ignore */ }
  return "US";
}

const LS_COUNTRY = "munimai-country";
const LS_LANG = "munimai-lang";

export function storedCountryCode(): string | null {
  try { return localStorage.getItem(LS_COUNTRY); } catch { return null; }
}
export function storeCountryCode(code: string): void {
  try { localStorage.setItem(LS_COUNTRY, code); } catch { /* ignore */ }
}
export function storedLang(): Lang | null {
  try {
    const v = localStorage.getItem(LS_LANG);
    return ["en", "hi", "es", "pt", "fr", "de"].includes(v ?? "") ? (v as Lang) : null;
  } catch { return null; }
}
export function storeLang(lang: Lang): void {
  try { localStorage.setItem(LS_LANG, lang); } catch { /* ignore */ }
}

/* ---------- currency conversion (INR base, approximate rates) ---------- */

const RATES: Record<string, number> = { // 1 INR → currency
  INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095, AED: 0.044, SAR: 0.045,
  SGD: 0.016, AUD: 0.018, CAD: 0.016, PKR: 3.35, BDT: 1.44, NPR: 1.6,
  LKR: 3.6, MYR: 0.056, IDR: 195, PHP: 0.7, THB: 0.42, VND: 310,
  JPY: 1.85, KRW: 16.8, CNY: 0.086, ZAR: 0.22, NGN: 18.5, KES: 1.56,
  BRL: 0.068, MXN: 0.24, QAR: 0.044, KWD: 0.0037, OMR: 0.0046,
  BHD: 0.0045, NZD: 0.02,
};

export function convertFromINR(inrCents: number, currency: string): number {
  return (inrCents / 100) * (RATES[currency] ?? RATES.USD);
}

/** Round converted prices to clean numbers (no one wants $5.988). */
export function prettyPrice(amount: number, currency: string): number {
  if (["JPY", "KRW", "VND", "IDR", "NGN", "PKR", "LKR", "BDT", "NPR", "PHP", "KES"].includes(currency)) {
    return Math.round(amount / 10) * 10;
  }
  // Round to whole numbers for clean pricing ($24, not $24.17)
  if (["USD", "EUR", "GBP", "AUD", "CAD", "SGD", "AED", "SAR"].includes(currency)) {
    return Math.round(amount);
  }
  if (amount >= 100) return Math.round(amount);
  return Math.round(amount * 100) / 100;
}

export function formatMoney(amount: number, currency: string, locale: string): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency", currency, maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

/** Full pipeline: INR cents → pretty converted price string. */
export function priceForCountry(inrCents: number, country: CountryInfo): string {
  const converted = convertFromINR(inrCents, country.currency);
  return formatMoney(prettyPrice(converted, country.currency), country.currency, country.locale);
}

/* ---------- custom plan prices (business-set, per market) ----------
 * Auto-conversion gives odd numbers ($5.99-style). Real businesses price
 * deliberately per market, so each plan has a custom price per currency.
 * Amounts are in major currency units (12 = $12, 990 = ₹990). */

const CUSTOM_PRICES: Record<string, Record<string, number>> = {
  starter: {
    INR: 990, USD: 12, EUR: 11, GBP: 9, AED: 45, SAR: 45, SGD: 16,
    AUD: 18, CAD: 16, PKR: 3400, BDT: 1450, NPR: 1600, LKR: 3600,
    MYR: 55, IDR: 195000, PHP: 700, THB: 420, VND: 300000, JPY: 1800,
    KRW: 16000, CNY: 85, ZAR: 220, NGN: 18000, KES: 1550, BRL: 60,
    MXN: 200, QAR: 45, KWD: 4, OMR: 5, BHD: 5, NZD: 20,
  },
  business: {
    INR: 2490, USD: 29, EUR: 27, GBP: 24, AED: 110, SAR: 110, SGD: 39,
    AUD: 45, CAD: 40, PKR: 8400, BDT: 3600, NPR: 4000, LKR: 9000,
    MYR: 130, IDR: 480000, PHP: 1700, THB: 1050, VND: 750000, JPY: 4500,
    KRW: 40000, CNY: 210, ZAR: 550, NGN: 45000, KES: 3900, BRL: 150,
    MXN: 500, QAR: 110, KWD: 9, OMR: 11, BHD: 11, NZD: 50,
  },
  scale: {
    INR: 4990, USD: 59, EUR: 55, GBP: 49, AED: 220, SAR: 220, SGD: 79,
    AUD: 89, CAD: 80, PKR: 16900, BDT: 7200, NPR: 8000, LKR: 18000,
    MYR: 260, IDR: 950000, PHP: 3400, THB: 2100, VND: 1500000, JPY: 9000,
    KRW: 80000, CNY: 420, ZAR: 1100, NGN: 90000, KES: 7800, BRL: 300,
    MXN: 1000, QAR: 220, KWD: 18, OMR: 22, BHD: 22, NZD: 100,
  },
};

/* Legacy slugs still used by the dashboard demo data and the plans API. */
CUSTOM_PRICES.pro = CUSTOM_PRICES.business;
CUSTOM_PRICES.team = CUSTOM_PRICES.scale;

/** Numeric custom price (major units), or undefined when falling back to conversion. */
export function customPriceFor(planSlug: string, currency: string): number | undefined {
  return CUSTOM_PRICES[planSlug]?.[currency];
}

/** True when a plan has a business-set price for this currency. */
export function hasCustomPrice(planSlug: string, currency: string): boolean {
  return customPriceFor(planSlug, currency) !== undefined;
}

/** Plan price for a country: custom business price first, converted fallback. */
export function planPriceForCountry(planSlug: string, inrCents: number, country: CountryInfo): string {
  const custom = CUSTOM_PRICES[planSlug]?.[country.currency];
  if (custom !== undefined) {
    return formatMoney(custom, country.currency, country.locale);
  }
  return priceForCountry(inrCents, country);
}
