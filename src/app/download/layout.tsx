import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download Aetros Biz for Windows | Free 14-Day Trial",
  description: "Download Aetros Biz for Windows — local-first business management software with GST billing, inventory and AI workflows. Free 14-day trial, your data stays on your computer.",
  openGraph: { title: "Download Aetros Biz for Windows | Free 14-Day Trial", description: "Download Aetros Biz for Windows — local-first business management software with GST billing, inventory and AI workflows. Free 14-day trial, your data stays on your computer." },
  twitter: { title: "Download Aetros Biz for Windows | Free 14-Day Trial", description: "Download Aetros Biz for Windows — local-first business management software with GST billing, inventory and AI workflows. Free 14-day trial, your data stays on your computer." },
  alternates: { canonical: "https://aetros-biz.vercel.app/download" },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
