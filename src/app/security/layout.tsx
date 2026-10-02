import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | Local-First Data Architecture",
  description: "How Aetros Biz protects your business: OS-encrypted vault, device management, audit logs, backup and restore, human approval for AI actions.",
  openGraph: { title: "Security | Local-First Data Architecture", description: "How Aetros Biz protects your business: OS-encrypted vault, device management, audit logs, backup and restore, human approval for AI actions." },
  twitter: { title: "Security | Local-First Data Architecture", description: "How Aetros Biz protects your business: OS-encrypted vault, device management, audit logs, backup and restore, human approval for AI actions." },
  alternates: { canonical: "https://aetros-biz.vercel.app/security" },
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
