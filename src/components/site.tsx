"use client";

import Link from "next/link";
import { useAuth } from "../lib/auth";
import { STRINGS, LANGS, type Lang } from "../lib/i18n";
import { Button, ThemeToggle } from "./ui";

export function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  return (
    <select
      className="lang-select"
      value={lang}
      onChange={(e) => onChange(e.target.value as Lang)}
      aria-label="Language"
    >
      {LANGS.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}

export function SiteNav({ lang = "en", onLangChange }: { lang?: Lang; onLangChange?: (l: Lang) => void }) {
  const { user, loading } = useAuth();
  const t = STRINGS[lang].nav;
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand">
          <img src="/logo.png" alt="MunimAI OS logo" className="brand-logo" />
          Munim<span className="brand-ai">AI</span>&nbsp;OS
        </Link>
        <nav className="nav-links">
          <a href="/#features" className="nav-link hide-m">{t.features}</a>
          <a href="/#pricing" className="nav-link hide-m">{t.pricing}</a>
          <a href="/demo" className="nav-link hide-m">{t.demo}</a>
          <a href="/#faq" className="nav-link hide-m">{t.faq}</a>
          {onLangChange && <LangToggle lang={lang} onChange={onLangChange} />}
          <ThemeToggle />
          {!loading && (user ? (
            <Button href="/dashboard" size="sm">{t.dashboard} →</Button>
          ) : (
            <>
              <a href="/login" className="nav-link hide-m">{t.signin}</a>
              <Button href="/register" size="sm">{t.getstarted}</Button>
            </>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ lang = "en" }: { lang?: Lang }) {
  const t = STRINGS[lang];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" style={{ marginBottom: 14, display: "inline-flex" }}>
              <img src="/logo.png" alt="MunimAI OS logo" className="brand-logo" />
              Munim<span className="brand-ai">AI</span>&nbsp;OS
            </Link>
            <p className="footer-tag">
              {t.footerTag}
            </p>
          </div>
          <div>
            <h5>{t.footerCols.product}</h5>
            <a href="/#features">{t.footerLinks.features}</a>
            <a href="/#pricing">{t.footerLinks.pricing}</a>
            <a href="/#faq">{t.footerLinks.faq}</a>
          </div>
          <div>
            <h5>{t.footerCols.account}</h5>
            <a href="/login">{t.footerLinks.signin}</a>
            <a href="/register">{t.footerLinks.getstarted}</a>
            <a href="/dashboard">{t.footerLinks.dashboard}</a>
          </div>
          <div>
            <h5>{t.footerCols.help}</h5>
            <a href="/support">{t.footerLinks.support}</a>
            <a href="/status">{t.footerLinks.status}</a>
          </div>
          <div>
            <h5>{t.footerCols.legal}</h5>
            <a href="/terms">{t.footerLinks.terms}</a>
            <a href="/privacy">{t.footerLinks.privacy}</a>
            <a href="/refund-policy">{t.footerLinks.refund}</a>
          </div>
        </div>
        <div className="footer-legal">
          <span>{t.footerRights}</span>
          <span className="links">
            <a href="/terms">{t.footerLinks.terms}</a><span className="sep">|</span>
            <a href="/privacy">{t.footerLinks.privacy}</a><span className="sep">|</span>
            <a href="/refund-policy">{t.footerLinks.refund}</a>
          </span>
          <span>{t.footerBottom}</span>
        </div>
      </div>
    </footer>
  );
}
