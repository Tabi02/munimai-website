import Link from "next/link";
import { SiteNav, SiteFooter } from "./site";
import { Reveal } from "./ui";

const DOCS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/license", label: "License Agreement" },
  { href: "/cookie-policy", label: "Cookie Policy" },
];

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <div className="om-page-hero" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ paddingBottom: 48 }}>
          <Reveal>
            <div className="om-kicker">Legal</div>
            <h1 className="om-ph-title">{title}</h1>
            <p className="om-lead">Last updated {updated}</p>
          </Reveal>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 56, paddingBottom: 72 }}>
        <div className="legal-wrap">
          <nav className="legal-toc hide-m" aria-label="Legal documents">
            {DOCS.map((d) => (
              <Link key={d.href} href={d.href} aria-current={d.label === title ? "page" : undefined}
                style={d.label === title ? { color: "var(--ink)", background: "var(--surface-2)", fontWeight: 600 } : undefined}>
                {d.label}
              </Link>
            ))}
          </nav>
          <article className="legal-doc">
            {children}
            <p className="small faint" style={{ marginTop: 48, borderTop: "1px solid var(--line)", paddingTop: 20 }}>
              These documents are standard starting terms for Aetros Biz. Have them reviewed by a
              qualified legal professional in your jurisdiction before relying on them commercially.
            </p>
          </article>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
