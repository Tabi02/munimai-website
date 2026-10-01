import { LegalPage } from "../../components/legal";

export const metadata = { title: "Privacy Policy — MunimAI OS" };

const sections: [string, string][] = [
  ["Information we collect", "Account information you provide (name, email, organization details), billing information processed by our payment provider (we never store full card numbers), license and device records (device identifiers, activation timestamps), and support communications. The desktop application may send anonymized crash reports only if you opt in."],
  ["How we use data", "To provide and bill for the service, to verify licenses and enforce device limits, to prevent fraud and abuse, to provide support, and to improve the commercial service. We do not sell your personal information."],
  ["Business data stays yours", "MunimAI OS is local-first. Your customers, invoices, inventory, and other business records live in a database on your own devices. We cannot see, access, or process your business data — it never leaves your machines except through integrations you explicitly configure."],
  ["AI processing", "When you use the AI assistant, your prompts and relevant business context are sent to the AI provider you configured (using your own API key) to generate responses. We do not route your AI traffic through our servers and do not retain your prompts."],
  ["Third-party services", "Payment processing (Stripe or equivalent), and any integrations you connect (payment gateways, messaging, stores) are governed by those providers' privacy policies. Your third-party credentials are encrypted with your device's OS keychain and never transmitted to us."],
  ["Cookies", "The website uses strictly necessary cookies for sign-in sessions and preferences. We do not use advertising trackers."],
  ["Security", "Account passwords are stored as salted hashes, license entitlements are cryptographically signed, and billing webhooks are signature-verified. No method is perfect; report suspected issues to support@business-ai.example.com."],
  ["Data retention", "Account and billing records are kept while your account is active and as required by tax law afterwards. License records are kept to enforce device limits and prevent fraud. You can request deletion of your account data at any time."],
  ["Data export and deletion", "Your business data is already on your devices — use the in-app Backup feature to export it. To delete your commercial account (profile, subscriptions, licenses), contact support; this never deletes data on your devices."],
  ["International transfers", "The commercial service may be hosted outside your country. By using it you consent to processing in those locations under appropriate safeguards."],
  ["Children", "MunimAI OS is a business product and is not directed at children under 16."],
  ["Your rights", "Depending on your jurisdiction you may have rights to access, correct, export, or delete your personal data, and to object to certain processing. Contact support@business-ai.example.com to exercise them."],
  ["Contact", "Privacy questions: support@business-ai.example.com."],
];

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 30, 2026">
      {sections.map(([h, p]) => (
        <section key={h} style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>{h}</h2>
          <p style={{ lineHeight: 1.7, color: "var(--text)" }}>{p}</p>
        </section>
      ))}
    </LegalPage>
  );
}
