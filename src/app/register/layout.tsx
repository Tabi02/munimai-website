import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create account | Aetros Biz",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://aetros-biz.vercel.app/register" },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
