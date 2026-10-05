import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | GST Billing, Inventory, Accounting & AI",
  description: "Explore Aetros Biz features: GST billing software, inventory management, accounting, customers, orders and AI-assisted business workflows. Interactive product tour with real workspace screens.",
  openGraph: { title: "Features | GST Billing, Inventory, Accounting & AI", description: "Explore Aetros Biz features: GST billing software, inventory management, accounting, customers, orders and AI-assisted business workflows. Interactive product tour with real workspace screens." },
  twitter: { title: "Features | GST Billing, Inventory, Accounting & AI", description: "Explore Aetros Biz features: GST billing software, inventory management, accounting, customers, orders and AI-assisted business workflows. Interactive product tour with real workspace screens." },
  alternates: { canonical: "https://aetros-biz.vercel.app/features" },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
