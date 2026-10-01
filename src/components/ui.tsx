"use client";

import { useEffect, useRef, useState } from "react";

export function Button({
  children, variant = "primary", size, href, onClick, disabled, type,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "danger-ghost";
  size?: "sm";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "button";
}) {
  const cls = `btn btn-${variant}${size === "sm" ? " btn-sm" : ""}`;
  if (href) return <a className={cls} href={href}>{children}</a>;
  return <button className={cls} onClick={onClick} disabled={disabled} type={type || "button"}>{children}</button>;
}

export function Card({ children, className = "", hover = false, style }: {
  children: React.ReactNode; className?: string; hover?: boolean; style?: React.CSSProperties;
}) {
  return <div className={`card${hover ? " card-hover" : ""} ${className}`} style={style}>{children}</div>;
}

export function Field({ label, children, error }: {
  label: string; children: React.ReactNode; error?: string;
}) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      {children}
      {error && <div className="muted" style={{ color: "var(--danger)", marginTop: 6 }}>{error}</div>}
    </div>
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const saved = localStorage.getItem("bizai_theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("bizai_theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "badge-green", trialing: "badge-violet",
    past_due: "badge-amber", grace_period: "badge-amber",
    expired: "badge-red", cancelled: "badge-red", suspended: "badge-red", revoked: "badge-red",
  };
  const label = status.replace(/_/g, " ");
  return <span className={`badge ${map[status] || "badge-gray"}`}><span className="dot" />{label}</span>;
}

export function CopyKey({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="keybox">
      <span>{value}</span>
      <button
        className="btn btn-ghost btn-sm"
        onClick={() => {
          navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>
    </div>
  );
}

export function Spinner() {
  return <div className="skeleton" style={{ minHeight: 120 }} />;
}

/* Branded full-page loader: MunimAI OS logo with a pulsing ring + shimmer bar. */
export function BrandLoader({ label }: { label?: string }) {
  return (
    <div className="brand-loader" role="status" aria-live="polite">
      <div className="brand-loader-ring">
        <img src="/logo.png" alt="MunimAI OS" className="brand-loader-logo" />
      </div>
      <div className="brand-loader-bar"><span /></div>
      {label && <p className="muted" style={{ fontSize: 13.5 }}>{label}</p>}
    </div>
  );
}

/* Scroll-reveal wrapper: fades + rises into view once. */
export function Reveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal${visible ? " visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}
