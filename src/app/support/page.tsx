import { SiteNav, SiteFooter } from "../../components/site";

export const metadata = { title: "Support — MunimAI OS" };

const topics = [
  ["License activation", "License key activate nahi ho rahi? Device limit ka error? Sabse pehle Settings → License me status check karo, phir device ko deactivate karke dobara activate karo."],
  ["Billing & subscription", "Plan upgrade/downgrade, payment method change, ya invoice download — dashboard ke Billing section se. Refunds ke liye Refund Policy dekho."],
  ["Desktop app updates", "Settings → About → Check for updates. Agar update download ho gaya hai to restart par install ho jayega."],
  ["Backup & restore", "Settings → Security Center → Backup. Backup file ko safe jagah (external drive ya cloud) me rakho."],
  ["Payment links (Razorpay)", "Invoice detail me 'Payment link banao' button ke liye Integrations me Razorpay connected hona chahiye apni API keys ke saath."],
  ["AI assistant", "AI API key Settings → AI Assistant me daalo. Key sirf aapke device par rehti hai."],
];

export default function SupportPage() {
  return (
    <>
      <SiteNav />
      <main className="container" style={{ maxWidth: 820, paddingTop: 48, paddingBottom: 64 }}>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>Support</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>
          Madad chahiye? Pehle neeche common topics dekho — zyadatar sawalon ka jawab wahi milega.
        </p>
        <div style={{ display: "grid", gap: 12 }}>
          {topics.map(([title, body]) => (
            <div key={title} className="card" style={{ padding: 20 }}>
              <h2 style={{ fontSize: 17, margin: "0 0 8px" }}>{title}</h2>
              <p style={{ color: "var(--muted)", margin: 0, fontSize: 15 }}>{body}</p>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 24, marginTop: 24 }}>
          <h2 style={{ fontSize: 17, margin: "0 0 8px" }}>Ab bhi issue hai?</h2>
          <p style={{ color: "var(--muted)", margin: "0 0 12px", fontSize: 15 }}>
            Humein email karo — apne plan ka email, license ka pehle 6 characters, aur
            problem ka screenshot/description zaroor bhejo taaki hum jaldi help kar saken.
          </p>
          <a className="btn" href="mailto:support@businessaios.com?subject=Support%20request%20—%20Business%20AI%20OS">
            support@businessaios.com
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
