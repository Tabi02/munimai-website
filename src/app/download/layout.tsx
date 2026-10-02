import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download | Aetros Biz for Windows",
  description: "Download Aetros Biz 0.4.3 for Windows. Local-first business operating system: customers, sales, inventory, finance and AI specialists.",
  openGraph: { title: "Download | Aetros Biz for Windows", description: "Download Aetros Biz 0.4.3 for Windows. Local-first business operating system: customers, sales, inventory, finance and AI specialists." },
  twitter: { title: "Download | Aetros Biz for Windows", description: "Download Aetros Biz 0.4.3 for Windows. Local-first business operating system: customers, sales, inventory, finance and AI specialists." },
  alternates: { canonical: "https://aetros-biz.vercel.app/download" },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
