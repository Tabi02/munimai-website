import type { Metadata } from "next";
import { AuthProvider } from "../lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "MunimAI OS — Aapka AI Munim",
  description:
    "MunimAI OS aapki invoicing, inventory aur customers ko locally chalata hai — AI ke saath. No cloud lock-in. Aapka data aapke paas.",
  icons: { icon: "/favicon.png" },
  verification: { google: "bx5m2MX3zJM3fhIEIfUisjmtKO4ip2kAeTGdF_1Lyug" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
