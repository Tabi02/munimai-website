import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Demo | Explore the Workspace",
  description: "Try Aetros Biz in your browser: dashboard, customers, orders, inventory, invoices and AI workspace, running on clearly labelled sample data.",
  openGraph: { title: "Interactive Demo | Explore the Workspace", description: "Try Aetros Biz in your browser: dashboard, customers, orders, inventory, invoices and AI workspace, running on clearly labelled sample data." },
  twitter: { title: "Interactive Demo | Explore the Workspace", description: "Try Aetros Biz in your browser: dashboard, customers, orders, inventory, invoices and AI workspace, running on clearly labelled sample data." },
  alternates: { canonical: "https://aetros-biz.vercel.app/demo" },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
