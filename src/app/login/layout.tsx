import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in | Aetros Biz",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://aetros-biz.vercel.app/login" },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
