import { SiteNav, SiteFooter } from "../../components/site";
import { Badge } from "../../components/ui";
import { PageHero } from "../../components/om";

export const metadata = { title: "System Status – Aetros Biz" };

const services: Array<[string, "green" | "amber" | "gray", string]> = [
  ["Demo website", "green", "This preview site, running on temporary demo hosting"],
  ["Desktop app preview builds", "amber", "v0.1.0 test builds for Linux (not a public release yet)"],
  ["Commercial API (accounts, billing)", "gray", "In development; no production deployment yet"],
  ["License verification & releases", "gray", "Activation, signing and auto-update are not live yet"],
];

export default function StatusPage() {
  return (
    <>
      <SiteNav />
      <PageHero
        kicker="System status"
        title="Platform health"
        lede="Aetros Biz is in pre-launch. The desktop application is local-first and keeps working offline: a cloud outage never blocks your business data."
      >
        <p style={{ marginTop: 24 }}>
          <Badge tone="amber">Pre-launch demo environment</Badge>
        </p>
      </PageHero>
      <main className="container" style={{ maxWidth: 820, paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ display: "grid", gap: 12 }}>
          {services.map(([name, tone, note]) => (
            <div key={name} style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-s)", background: "var(--surface)", padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{name}</div>
                <div className="faint" style={{ fontSize: 13 }}>{note}</div>
              </div>
              <Badge tone={tone}>{tone === "green" ? "online" : tone === "amber" ? "preview" : "not yet live"}</Badge>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
