import { SiteNav, SiteFooter } from "../../components/site";

export const metadata = { title: "System Status — MunimAI OS" };

const services: Array<[string, string, string, string]> = [
  ["Demo website", "online", "badge-green", "This preview site — running on temporary demo hosting"],
  ["Desktop app preview builds", "preview", "badge-violet", "v0.1.0 test builds for Linux — not a public release yet"],
  ["Commercial API (accounts, billing)", "not yet live", "badge-gray", "In development — no production deployment yet"],
  ["License verification & releases", "not yet live", "badge-gray", "Activation, signing and auto-update are not live yet"],
];

export default function StatusPage() {
  return (
    <>
      <SiteNav />
      <main className="container" style={{ maxWidth: 820, paddingTop: 48, paddingBottom: 64 }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>System status</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>
          <span className="badge badge-violet">Pre-launch — demo environment</span>
        </p>
        <div style={{ display: "grid", gap: 12 }}>
          {services.map(([name, state, badge, note]) => (
            <div key={name} className="card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{name}</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>{note}</div>
              </div>
              <span className={`badge ${badge}`}>{state}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 32 }}>
          MunimAI OS is in pre-launch. The desktop application is local-first and keeps working
          offline — a cloud outage never blocks your business data.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
