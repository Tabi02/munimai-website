"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../lib/auth";
import { Button } from "./ui";
import { IconMenu, IconX } from "./icons";

const NAV_LINKS = [
  { href: "/features", label: "Product" },
  { href: "/features#ai-workspace", label: "AI" },
  { href: "/pricing", label: "Pricing" },
  { href: "/download", label: "Download" },
  { href: "/security", label: "Security" },
];

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Aetros Biz home">
      <img src="/logo.png" alt="" className="brand-logo" />
      <span>Aetros&nbsp;<span className="brand-ai">Biz</span></span>
    </Link>
  );
}

export function SiteNav() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Wordmark />
        <nav className="nav-links" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link key={l.href + l.label} href={l.href} className="nav-link hide-m">{l.label}</Link>
          ))}
        </nav>
        <div className="nav-cta">
          {!loading && (user ? (
            <Button href="/dashboard" size="sm">Dashboard</Button>
          ) : (
            <>
              <Link href="/login" className="nav-link hide-m">Sign in</Link>
              <Button href="/register" size="sm">Get started</Button>
            </>
          ))}
          <button
            className="nav-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <IconX size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>
      <nav className={`nav-mobile${open ? " open" : ""}`} aria-label="Mobile">
        {NAV_LINKS.map((l) => (
          <Link key={l.href + l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
        ))}
        <Link href="/login" onClick={() => setOpen(false)}>Sign in</Link>
        <Link href="/register" onClick={() => setOpen(false)}>Get started</Link>
      </nav>
    </header>
  );
}

const FOOTER_COLS: Array<{ head: string; links: Array<{ href: string; label: string }> }> = [
  {
    head: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/features#ai-workspace", label: "AI workspace" },
      { href: "/features#automation", label: "Automation" },
      { href: "/pricing", label: "Pricing" },
      { href: "/download", label: "Download" },
    ],
  },
  {
    head: "Resources",
    links: [
      { href: "/demo", label: "Live demo" },
      { href: "/support", label: "Support" },
      { href: "/status", label: "System status" },
      { href: "/security", label: "Security" },
    ],
  },
  {
    head: "Company",
    links: [
      { href: "/support", label: "Contact" },
      { href: "/security", label: "Security" },
      { href: "/status", label: "Status" },
    ],
  },
  {
    head: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/refund-policy", label: "Refund Policy" },
      { href: "/license", label: "License Agreement" },
      { href: "/cookie-policy", label: "Cookie Policy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Wordmark />
            <p className="footer-tag">
              A business operating system for customers, sales, inventory, finance and AI-assisted work. Local-first, honestly licensed.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div className="footer-col" key={col.head}>
              <h5>{col.head}</h5>
              {col.links.map((l) => (
                <Link key={l.href + l.label} href={l.href}>{l.label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-base">
          <span>© 2026 Aetros Biz. All rights reserved.</span>
          <span className="right">
            <Link href="/terms">Terms</Link><span className="sep">·</span>
            <Link href="/privacy">Privacy</Link><span className="sep">·</span>
            <Link href="/cookie-policy">Cookies</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
