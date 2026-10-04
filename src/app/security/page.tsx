"use client";

import { SiteNav, SiteFooter } from "../../components/site";
import { Button, Reveal } from "../../components/ui";
import { PageHero, CtaBand } from "../../components/om";

const GROUPS: Array<{ title: string; rows: Array<[string, string]> }> = [
  {
    title: "Your data",
    rows: [
      ["Local-first storage", "Your business database lives on your machine in a standard SQLite file. It is not uploaded anywhere by default."],
      ["OS-encrypted secrets", "API keys and tokens are stored in the operating system's encrypted vault. Never in plain files."],
      ["Full export", "Export customers, invoices, inventory and accounts to CSV or Excel at any time. Leaving never means losing data."],
      ["What the cloud holds", "Only licensing, billing and optional sync between your own devices. Business records stay on your machines."],
    ],
  },
  {
    title: "AI and automation",
    rows: [
      ["Your own API key", "AI features use a key you add in Settings. It is stored in the OS-encrypted vault and never leaves your device except to call the AI provider."],
      ["Approval before action", "The AI drafts, it does not act. Sending a message, recording an invoice or placing an order always waits for your explicit approval."],
      ["Audit log", "Every AI-assisted action is logged with what was done, who approved it and when."],
      ["No training on your data", "We do not use your business data to train models."],
    ],
  },
  {
    title: "Accounts and access",
    rows: [
      ["Staff roles", "Owner, manager and staff roles control who can see and change what. Sensitive actions stay with the owner."],
      ["Device licensing", "Each device is licensed individually. A lost device can be deactivated from your account."],
      ["Secure sign-in", "Passwords are hashed with a modern key-derivation function. Sessions expire and can be revoked."],
    ],
  },
  {
    title: "Software supply",
    rows: [
      ["Signed releases", "Desktop releases are published from a public repository with verifiable build provenance."],
      ["Dependency review", "Third-party libraries are pinned, reviewed and updated on a schedule."],
      ["Responsible disclosure", "Found a vulnerability? Tell us through the support page with details. We acknowledge within two business days and fix before disclosing."],
    ],
  },
];

export default function SecurityPage() {
  return (
    <>
      <SiteNav />

      <PageHero
        kicker="Security"
        title="Serious about the books means serious about their safety."
        lede="How Aetros Biz protects your data, your AI keys and your account. Written plainly, so you can hold us to it."
      />

      {GROUPS.map((g, gi) => (
        <section key={g.title} className="section-tight" style={gi > 0 ? { borderTop: "1px solid var(--line)" } : undefined}>
          <div className="container">
            <div className="split-narrow">
              <Reveal>
                <div>
                  <span className="eyebrow">{String(gi + 1).padStart(2, "0")}</span>
                  <h2>{g.title}</h2>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <dl style={{ margin: 0 }}>
                  {g.rows.map(([t, d]) => (
                    <div className="kv" key={t}><dt>{t}</dt><dd>{d}</dd></div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      <CtaBand
        title={<>Questions about security?</>}
        body="Write to us. We answer plainly and in detail."
        actions={
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Button href="/support" size="lg" variant="white">Contact support</Button>
            <Button href="/status" size="lg" variant="secondary">System status</Button>
          </div>
        }
      />

      <SiteFooter />
    </>
  );
}
