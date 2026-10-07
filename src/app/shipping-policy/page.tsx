import { LegalPage } from "../../components/legal";

export const metadata = { title: "Shipping Policy | Aetros Biz", alternates: { canonical: "https://aetros-biz.vercel.app/shipping-policy" } };

export default function ShippingPage() {
  return (
    <LegalPage title="Shipping Policy" updated="October 7, 2026">
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Digital products only — no physical shipping</h2>
        <p style={{ lineHeight: 1.7 }}>
          Aetros Biz sells digital products only: the Aetros Biz desktop application and software license keys.
          No physical goods are sold, so nothing is shipped to a postal address and no shipping charges apply.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>How you receive your purchase</h2>
        <p style={{ lineHeight: 1.7 }}>
          Immediately after a successful payment, your download link and license key are delivered to the email
          address you provided at checkout. In most cases delivery is instant; if your payment needs extra
          verification it can take up to a few hours. The download page on this website accepts the same email
          address if you ever need to re-download an installer.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>License activation</h2>
        <p style={{ lineHeight: 1.7 }}>
          Your license key activates the app on your own devices — no account sign-in is required for activation.
          Activation and license checks work offline; the app never uploads your business data to our servers.
        </p>
      </section>
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Delivery problems</h2>
        <p style={{ lineHeight: 1.7 }}>
          If you paid but did not receive your download link or license key within 24 hours, contact us from
          the support page using the same email address you paid with, and we will resend your delivery
          immediately. If we cannot deliver, you are entitled to a full refund under our Refund Policy.
        </p>
      </section>
    </LegalPage>
  );
}
