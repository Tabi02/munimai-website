/* Renders design screenshots to static HTML.
   Usage: npx tsx scripts/preview.tsx <name> [out.html]
   names: home, demo-sales, demo-ai, demo-auto, features, pricing */
import React from "react";
(globalThis as unknown as { React: typeof React }).React = React;
import { renderToStaticMarkup } from "react-dom/server";
import fs from "fs";
import path from "path";
import LandingPage from "../src/app/page";
import FeaturesPage from "../src/app/features/page";
import { AuthProvider } from "../src/lib/auth";
import { SiteNav, SiteFooter } from "../src/components/site";
import { ProductDemo, type TabId } from "../src/components/demo";
import { PricingTable } from "../src/components/pricing";
import { SectionHead, Reveal } from "../src/components/ui";
import { countryByCode } from "../src/lib/geo";

const name = process.argv[2] || "home";
const out = process.argv[3] || `/tmp/preview/${name}.html`;
// Preview renders run outside a browser: force the India store so pricing
// screenshots match what most visitors see.
(globalThis as unknown as { localStorage?: unknown }).localStorage = {
  getItem: (k: string) => (k === "munimai-country" ? "IN" : null),
  setItem: () => {},
  removeItem: () => {},
};
const css = fs.readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");
const IN = countryByCode("IN");

const fontLink =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700" +
  "&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap";

function DemoShot({ tab, title, lede }: { tab: TabId; title: string; lede: string }) {
  return (
    <>
      <SiteNav />
      <section className="section-tight">
        <div className="container" style={{ paddingTop: 40 }}>
          <SectionHead eyebrow="Product demo" title={title} lede={lede} />
          <div style={{ marginTop: 24 }}>
            <ProductDemo country={IN} initialTab={tab} />
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

function PricingShot() {
  return (
    <>
      <SiteNav />
      <section className="section-tight">
        <div className="container" style={{ paddingTop: 40 }}>
          <SectionHead
            eyebrow="Pricing"
            title="Choose the operating capacity your business needs."
            lede="Per business, per month. Every plan includes the full product, local-first software and free updates."
          />
          <div style={{ marginTop: 24 }}>
            <PricingTable country={IN} annual={true} />
            <p className="small faint" style={{ marginTop: 16 }}>
              Prices shown in INR. Annual billing saves two months.
            </p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </>
  );
}

const PAGES: Record<string, React.ReactElement> = {
  home: <LandingPage />,
  "demo-sales": (
    <DemoShot tab="sales" title="Sales, live." lede="Quotations, orders and invoices sharing the same customers, products and money." />
  ),
  "demo-ai": (
    <DemoShot tab="ai" title="AI inside the business." lede="Seven specialists analyse your real records, recommend the next step, and wait for approval." />
  ),
  "demo-auto": (
    <DemoShot tab="automation" title="Routine work, handled." lede="Overdue reminders, low-stock alerts and follow-ups that run themselves, with you in control." />
  ),
  features: <FeaturesPage />,
  pricing: <PricingShot />,
};

const page = PAGES[name];
if (!page) {
  console.error("unknown page:", name, "— expected one of", Object.keys(PAGES).join(", "));
  process.exit(1);
}

let html = renderToStaticMarkup(
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href={fontLink} rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </head>
    <body>
      <AuthProvider>{page}</AuthProvider>
      <script dangerouslySetInnerHTML={{
        __html: `document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('visible')});`,
      }} />
    </body>
  </html>
);

html = html.replaceAll('src="/logo.png"', 'src="logo.png"');
html = html.replaceAll("src='/logo.png'", "src='logo.png'");

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, "<!DOCTYPE html>" + html);
console.log("wrote", out, html.length, "chars");
