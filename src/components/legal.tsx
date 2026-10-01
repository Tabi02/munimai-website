import { SiteNav, SiteFooter } from "./site";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="container" style={{ maxWidth: 820, paddingTop: 48, paddingBottom: 64 }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>{title}</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>Last updated: {updated}</p>
        <div className="legal-body">{children}</div>
        <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 40, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
          These documents are provided as standard starting terms for MunimAI. They should be reviewed by a
          qualified legal professional in your jurisdiction before commercial launch.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
