"use client";

import { useEffect, useRef, useState } from "react";

/* ---------- Button ---------- */
export function Button({
  children, variant = "primary", size, href, onClick, disabled, type, block,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "lg";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "button";
  block?: boolean;
}) {
  const cls = `btn btn-${variant}${size ? ` btn-${size}` : ""}${block ? " btn-block" : ""}`;
  if (href) return <a className={cls} href={href}>{children}</a>;
  return <button className={cls} onClick={onClick} disabled={disabled} type={type || "button"}>{children}</button>;
}

/* ---------- Badge ---------- */
export function Badge({ tone = "gray", children }: {
  tone?: "green" | "amber" | "red" | "accent" | "gray";
  children: React.ReactNode;
}) {
  return <span className={`badge badge-${tone}`}><span className="dot" />{children}</span>;
}

/* ---------- Field ---------- */
export function Field({ label, hint, error, children }: {
  label: string; hint?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="field">
      <label className="label">{label}</label>
      {children}
      {hint && !error && <div className="field-hint">{hint}</div>}
      {error && <div className="field-error" role="alert">{error}</div>}
    </div>
  );
}

/* ---------- Tabs ---------- */
export function Tabs<T extends string>({ tabs, active, onChange, label }: {
  tabs: Array<{ id: T; label: string }>;
  active: T;
  onChange: (id: T) => void;
  label?: string;
}) {
  return (
    <div className="tabs" role="tablist" aria-label={label || "Sections"}>
      {tabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={active === t.id}
          className="tab"
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Section head: eyebrow + title + lede ---------- */
export function SectionHead({ eyebrow, title, lede }: {
  eyebrow?: string; title: string; lede?: string;
}) {
  return (
    <div style={{ marginBottom: 40, maxWidth: 760 }}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}

/* ---------- Data table ---------- */
export interface Column { key: string; header: string; align?: "left" | "right" | "center"; mono?: boolean }

export function DataTable({ columns, rows, caption }: {
  columns: Column[];
  rows: Array<Record<string, React.ReactNode>>;
  caption?: string;
}) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        {caption && <caption className="small faint" style={{ textAlign: "left", padding: "10px 14px" }}>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} className={c.align === "right" ? "t-right" : c.align === "center" ? "t-center" : ""}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key}
                  className={`${c.align === "right" ? "t-right" : c.align === "center" ? "t-center" : ""}${c.mono ? " num" : ""}`}>
                  {r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Skeleton loaders ---------- */
export function Skeleton({ width = "100%", height = 14, style }: {
  width?: string | number; height?: string | number; style?: React.CSSProperties;
}) {
  return <div className="skel" style={{ width, height, ...style }} aria-hidden="true" />;
}

export function TableSkeleton({ rows = 6, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="skel-table" role="status" aria-label="Loading table">
      <div className="skel-row" style={{ marginBottom: 16 }}>
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} height={12} width={`${90 / cols}%`} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div className="skel-row" key={r}>
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} height={14} width={c === 0 ? "22%" : `${68 / (cols - 1)}%`} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div role="status" aria-label="Loading page">
      <Skeleton height={30} width="38%" style={{ marginBottom: 12 }} />
      <Skeleton height={16} width="62%" style={{ marginBottom: 28 }} />
      <TableSkeleton rows={7} cols={5} />
    </div>
  );
}

/* ---------- Empty state ---------- */
export function EmptyState({ title, body, actions }: {
  title: string; body: string; actions?: React.ReactNode;
}) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{body}</p>
      {actions && <div className="empty-actions">{actions}</div>}
    </div>
  );
}

/* ---------- Scroll reveal: one subtle entrance ---------- */
export function Reveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 },
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
