import { LegalPage } from "../../components/legal";

export const metadata = { title: "License Agreement | Aetros Biz" };

const sections: [string, string][] = [
  ["1. What this license covers", "This License Agreement covers the Aetros Biz desktop application and the updates we ship for it. It grants you the right to install and use the software on the number of devices your subscription plan allows, for the business named on your account."],
  ["2. What you may do", "You may install the software on your business's own computers, enter and manage your own business data, export that data at any time, and use the software's features, including AI-assisted features, in the course of running your business."],
  ["3. What you may not do", "You may not resell or sublicense the software, share your license key with another business, reverse-engineer the license verification, or use the software to process data you have no right to process."],
  ["4. Your data stays yours", "Everything you enter into Aetros Biz (customers, invoices, inventory, accounts) belongs to you. This license gives us no ownership over your data, and cancelling never deletes or locks it."],
  ["5. Updates", "While your subscription is active you receive all product updates at no extra charge. Updates may change features; we will not remove a core capability your plan was sold with during your current billing period without notice."],
  ["6. Trial", "The 14-day trial grants a full license for evaluation. When the trial ends, paid features pause until you subscribe; your data remains readable."],
  ["7. Termination of the license", "The license ends when your subscription ends or is cancelled, or if you breach this agreement and do not remedy the breach within 30 days of notice. On termination you must stop using the software, but your data remains on your machines."],
  ["8. Warranty", "The software is provided as-is, to the maximum extent permitted by law. We do not warrant that it will be error-free or meet every requirement of your business."],
  ["9. Relationship to the Terms", "This agreement works together with the Terms of Service. If they conflict on a licensing point, this License Agreement applies."],
];

export default function LicensePage() {
  return (
    <LegalPage title="License Agreement" updated="October 1, 2026">
      {sections.map(([h, p]) => (
        <section key={h}>
          <h2>{h}</h2>
          <p>{p}</p>
        </section>
      ))}
    </LegalPage>
  );
}
