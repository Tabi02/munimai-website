import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { AuthProvider } from "../lib/auth";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://aetros-biz.vercel.app";
const SITE_NAME = "Aetros Biz";
const SITE_DESC =
  "Aetros Biz is a local-first business management software for Indian small businesses — GST billing, inventory management, accounting, customers and AI-assisted workflows. Your data stays on your computer.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Aetros Biz | Local-First Business Management Software for India",
    template: "%s | Aetros Biz",
  },
  description: SITE_DESC,
  verification: { google: "bx5m2MX3zJM3fhIEIfUisjmtKO4ip2kAeTGdF_1Lyug" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Aetros Biz | Local-First Business Management Software for India",
    description: SITE_DESC,
    images: [{ url: "/logo.png", width: 1183, height: 1183, alt: "Aetros Biz logo" }],
  },
  twitter: {
    card: "summary",
    title: "Aetros Biz | Local-First Business Management Software for India",
    description: SITE_DESC,
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
