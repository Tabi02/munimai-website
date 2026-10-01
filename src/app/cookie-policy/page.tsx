import { LegalPage } from "../../components/legal";

export const metadata = { title: "Cookie Policy | Aetros Biz" };

const sections: [string, string][] = [
  ["1. What we use", "The Aetros Biz website uses a small number of cookies and browser storage entries, and nothing more than it needs. There is no advertising on this site and we do not sell browsing data."],
  ["2. Strictly necessary", "Sign-in sessions, security tokens and your remembered preferences (such as country, currency and language) are stored so the site works. Without these, sign-in and checkout cannot function."],
  ["3. Analytics", "We may use privacy-respecting, aggregated analytics to understand which pages are visited. Analytics never sees your business data, which lives in the desktop app on your machine."],
  ["4. The desktop app", "The desktop application does not use advertising cookies or cross-site trackers. It contacts our servers only for licensing, updates, and the cloud features you explicitly enable, such as device sync."],
  ["5. Your choices", "You can clear cookies and site data in your browser at any time; you will simply be signed out and your preferences reset. The site does not show a consent banner because it sets no non-essential cookies for anonymous visitors."],
  ["6. Changes", "If we introduce any non-essential cookies in future, this policy will be updated first and a consent choice will be offered where required by law."],
];

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" updated="October 1, 2026">
      {sections.map(([h, p]) => (
        <section key={h}>
          <h2>{h}</h2>
          <p>{p}</p>
        </section>
      ))}
    </LegalPage>
  );
}
