import { LegalPage } from "../../components/legal";

export const metadata = { title: "Terms of Service — MunimAI OS" };

const sections: [string, string][] = [
  ["1. Acceptance", "By creating an account, purchasing a subscription, or installing the MunimAI OS desktop application, you agree to these Terms of Service and to our Privacy Policy. If you do not agree, do not use the service."],
  ["2. Account", "You must provide accurate registration information and keep your credentials confidential. You are responsible for all activity under your account. One account may be used by the team members you invite under your plan's seat limit."],
  ["3. Subscription", "MunimAI OS is sold as a recurring subscription (monthly or annual). Your plan determines the number of devices, AI usage allowances, and features available. We may change plan pricing with at least 30 days' notice; existing billing periods are honored at the old price."],
  ["4. License", "Each paid subscription includes a license key that activates the desktop application on your devices, up to your plan's device limit. Licenses are non-transferable. We may revoke licenses used in violation of these terms, for fraud, or for chargeback abuse — your local business data is never deleted or damaged as a result."],
  ["5. Software usage", "The desktop application is local-first: your business data lives on your own machines. The app works offline within the terms of your signed entitlement (grace periods apply when offline). You may not reverse-engineer the license verification, resell the software, or use it to process data you have no right to process."],
  ["6. AI services", "The AI assistant acts on your instructions and within the autonomy settings you configure. AI output can be wrong — you are responsible for reviewing drafts, invoices, messages, and automations before they affect your business. Actions that spend money (such as ad campaigns) always require your explicit approval."],
  ["7. Third-party integrations", "Connecting payment providers, messaging services, or stores uses your own credentials, stored encrypted on your device. We never see or store your third-party API keys. You are responsible for complying with those providers' terms."],
  ["8. Payments", "Payments are processed by our payment provider (e.g. Stripe). By subscribing you authorize recurring charges until you cancel. Failed payments may suspend license renewal after the grace period."],
  ["9. Refunds", "See our Refund Policy. In general, subscription fees for the current billing period are non-refundable once the license has been activated, except where required by law."],
  ["10. Intellectual property", "We own the MunimAI OS software, brand, and website. You own your business data and the content you create with the software. We claim no ownership over your data."],
  ["11. Security", "You are responsible for keeping your devices and license key secure. We will notify you of security incidents affecting the commercial service (accounts, billing) as required by law."],
  ["12. Service availability", "We target high availability for the commercial service (accounts, licensing, billing), but the desktop application is designed to keep working offline. We are not liable for downtime of third-party services you connect."],
  ["13. Termination", "You may cancel anytime from your dashboard; cancellation stops future billing and your data remains on your devices. We may suspend accounts for abuse, non-payment, or legal reasons, with notice where practical."],
  ["14. Limitation of liability", "To the maximum extent permitted by law, our total liability is limited to the fees you paid in the 12 months before the claim. We are not liable for indirect losses such as lost profits arising from AI output or third-party outages."],
  ["15. Changes", "We may update these terms; material changes will be announced at least 30 days in advance. Continued use after the effective date constitutes acceptance."],
  ["16. Contact", "Questions about these terms: support@business-ai.example.com."],
];

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="September 30, 2026">
      {sections.map(([h, p]) => (
        <section key={h} style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>{h}</h2>
          <p style={{ lineHeight: 1.7, color: "var(--text)" }}>{p}</p>
        </section>
      ))}
    </LegalPage>
  );
}
