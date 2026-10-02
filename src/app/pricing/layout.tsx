import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Honest Plans for Small Business",
  description: "Per business, per month. Every plan includes the full product, local-first software and free updates. 14-day free trial, no credit card required.",
  openGraph: { title: "Pricing | Honest Plans for Small Business", description: "Per business, per month. Every plan includes the full product, local-first software and free updates. 14-day free trial, no credit card required." },
  twitter: { title: "Pricing | Honest Plans for Small Business", description: "Per business, per month. Every plan includes the full product, local-first software and free updates. 14-day free trial, no credit card required." },
  alternates: { canonical: "https://aetros-biz.vercel.app/pricing" },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
