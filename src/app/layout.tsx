import type { Metadata } from "next";
import { AuthProvider } from "../lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "MunimAI — Aapka AI Munim",
  description:
    "MunimAI aapki invoicing, inventory aur customers ko locally chalata hai — AI ke saath. No cloud lock-in. Aapka data aapke paas.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
