import { LegalPage } from "../../components/legal";

export const metadata = { title: "Refund Policy | MunimAI OS" };

export default function RefundPage() {
  return (
    <LegalPage title="Refund Policy" updated="September 30, 2026">
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>14-day money-back guarantee</h2>
        <p style={{ lineHeight: 1.7 }}>
          If you are not satisfied, you can request a full refund within 14 days of your first subscription payment.
          no questions asked. Contact the support page from your account email and we will cancel the
          subscription and refund the last charge.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>After 14 days</h2>
        <p style={{ lineHeight: 1.7 }}>
          Subscription fees are billed in advance and are non-refundable for the current billing period once the
          license has been activated, except where required by law. You can cancel anytime from your dashboard.
          cancellation stops all future charges immediately, and your license remains valid until the end of the paid
          period. Your business data always stays on your devices; cancellation never deletes it.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Annual plans</h2>
        <p style={{ lineHeight: 1.7 }}>
          Annual plans cancelled after the 14-day window are not refunded for the remaining months, but the license
          stays active until the end of the paid year. Exceptions may be made for extended service outages on our side.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Chargebacks and fraud</h2>
        <p style={{ lineHeight: 1.7 }}>
          Filing a chargeback instead of requesting a refund may lead to license suspension until the dispute is
          resolved. Please contact us first. Refunds are usually processed within 5–10 business days.
        </p>
      </section>
    </LegalPage>
  );
}
