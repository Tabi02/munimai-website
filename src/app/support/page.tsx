import { SiteNav, SiteFooter } from "../../components/site";
import { PageHero } from "../../components/om";

export const metadata = { title: "Support – Aetros Biz", description: "Get help with Aetros Biz: license activation, billing, updates, backup and AI setup guides.", alternates: { canonical: "https://aetros-biz.vercel.app/support" } };

const topics = [
  ["License activation", "License key not activating? Device-limit error? First check the status in Settings → License, then deactivate the device and activate again."],
  ["Billing & subscription", "Plan upgrades/downgrades, payment method changes or invoice downloads: use the Billing section of your dashboard. For refunds, see the Refund Policy."],
  ["Desktop app updates", "Settings → About → Check for updates. Once an update is downloaded, it installs on restart."],
  ["Backup & restore", "Settings → Security Center → Backup. Keep the backup file somewhere safe (an external drive or cloud storage)."],
  ["Payment links (Razorpay)", "For the 'Create payment link' button on an invoice, Razorpay must be connected in Integrations with your own API keys."],
  ["AI assistant", "Enter your AI API key in Settings → AI Assistant. The key stays only on your device."],
];

const card = {
  border: "1px solid var(--line)",
  borderRadius: "var(--radius-s)",
  background: "var(--surface)",
  padding: 20,
} as const;

export default function SupportPage() {
  return (
    <>
      <SiteNav />
      <PageHero
        kicker="Support"
        title="How can we help?"
        lede="Browse the common topics below — most questions are answered there."
      />
      <main className="container" style={{ maxWidth: 820, paddingTop: 48, paddingBottom: 64 }}>
        <div style={{ display: "grid", gap: 12 }}>
          {topics.map(([title, body]) => (
            <div key={title} style={card}>
              <h2 style={{ fontSize: 17, margin: "0 0 8px" }}>{title}</h2>
              <p className="faint" style={{ margin: 0, fontSize: 15 }}>{body}</p>
            </div>
          ))}
        </div>
        <div style={{ ...card, padding: 24, marginTop: 24 }}>
          <h2 style={{ fontSize: 17, margin: "0 0 8px" }}>Still stuck?</h2>
          <p className="faint" style={{ margin: 0, fontSize: 15 }}>
            Direct email support is not set up yet. Until then, ask in the
            Community section of the desktop app — the team and other users help out there.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
