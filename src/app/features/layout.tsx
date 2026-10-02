import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Tour | 63 Features, 8 Systems",
  description: "Explore all 63 Aetros Biz features: 25 business modules, 14 AI specialists, 10 intelligence systems. Interactive product tour with real workspace screens.",
  openGraph: { title: "Product Tour | 63 Features, 8 Systems", description: "Explore all 63 Aetros Biz features: 25 business modules, 14 AI specialists, 10 intelligence systems. Interactive product tour with real workspace screens." },
  twitter: { title: "Product Tour | 63 Features, 8 Systems", description: "Explore all 63 Aetros Biz features: 25 business modules, 14 AI specialists, 10 intelligence systems. Interactive product tour with real workspace screens." },
  alternates: { canonical: "https://aetros-biz.vercel.app/features" },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
