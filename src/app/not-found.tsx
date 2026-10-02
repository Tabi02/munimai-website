import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "120px 24px", textAlign: "center" }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32 }}>This page does not exist.</h1>
      <p className="muted" style={{ maxWidth: "52ch", margin: "12px auto 24px" }}>
        The link may be old or mistyped. The product tour, pricing and demo are good places to continue.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
        <Link className="btn btn-primary" href="/">Homepage</Link>
        <Link className="btn btn-secondary" href="/features">Product tour</Link>
      </div>
    </div>
  );
}
