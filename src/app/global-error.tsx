"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container" style={{ padding: "120px 24px", textAlign: "center" }}>
          <p className="eyebrow">Something went wrong</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32 }}>This page hit an error.</h1>
          <p className="muted" style={{ maxWidth: "52ch", margin: "12px auto 24px" }}>
            It was not caused by anything you did. Try again, or go back to the homepage and continue from there.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={() => reset()}>Try again</button>
            <a className="btn btn-secondary" href="/">Homepage</a>
          </div>
        </div>
      </body>
    </html>
  );
}
