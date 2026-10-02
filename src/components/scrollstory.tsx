"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHead, Reveal, Badge } from "./ui";

/* Scroll-based product story: six stages of how the business runs on Aetros Biz.
   As the user scrolls, each stage activates. Restrained motion; content is fully
   readable without scrolling effects. */

const STAGES = [
  {
    n: "01",
    title: "Business activity enters the system.",
    desc: "A sale at the counter, a supplier delivery, an expense. Every event is captured once, where it happens.",
    visual: "counter",
    caption: "Sample: SO-2084 — Sugar 50kg × 40, City Mart",
  },
  {
    n: "02",
    title: "Data becomes organized.",
    desc: "Customers, products, invoices and stock link together automatically. No retyping, no spreadsheets drifting apart.",
    visual: "organize",
    caption: "One customer record, linked to every order and invoice",
  },
  {
    n: "03",
    title: "Business Intelligence analyzes it.",
    desc: "Ten intelligence systems score the business: cash health, dues ageing, stock velocity, margin drift, data quality.",
    visual: "intel",
    caption: "Health Center: 10 dimensions from real records",
  },
  {
    n: "04",
    title: "AI specialists interpret it.",
    desc: "Fourteen specialists read the findings and explain them in plain language — what happened, why it matters.",
    visual: "ai",
    caption: "Inventory AI: Mustard Oil 15L stocks out in 9 days",
  },
  {
    n: "05",
    title: "Automation executes approved workflows.",
    desc: "Reminders, alerts and follow-ups run themselves. Anything that moves money, stock or messages waits for approval first.",
    visual: "auto",
    caption: "Workflow: low stock → proposal → approval → order",
  },
  {
    n: "06",
    title: "The owner sees the resulting business state.",
    desc: "Dashboard, inbox and calendar show what changed and what needs a decision. The loop starts again tomorrow.",
    visual: "owner",
    caption: "Morning briefing: 5 items need decisions today",
  },
];

function StageVisual({ kind }: { kind: string }) {
  // Minimal Ledger-style diagrams per stage — structured, no decoration.
  const common = "story-vis";
  if (kind === "counter") {
    return (
      <div className={common}>
        <div className="sv-row"><span className="sv-box">Sale</span><span className="sv-arrow">→</span><span className="sv-box">Order</span></div>
        <div className="sv-row"><span className="sv-box">Delivery</span><span className="sv-arrow">→</span><span className="sv-box">Stock in</span></div>
        <div className="sv-row"><span className="sv-box">Expense</span><span className="sv-arrow">→</span><span className="sv-box">Recorded</span></div>
      </div>
    );
  }
  if (kind === "organize") {
    return (
      <div className={common}>
        <div className="sv-center">City Mart</div>
        <div className="sv-row"><span className="sv-box">3 orders</span><span className="sv-box">2 invoices</span><span className="sv-box">Rs 2.1L dues</span></div>
      </div>
    );
  }
  if (kind === "intel") {
    return (
      <div className={common}>
        {[["Cash", 82], ["Dues", 62], ["Stock", 74], ["Growth", 88]].map(([k, v]) => (
          <div className="sv-meter" key={k as string}>
            <span>{k}</span>
            <div className="sv-bar"><i style={{ width: `${v}%` }} /></div>
            <span className="num">{v}</span>
          </div>
        ))}
      </div>
    );
  }
  if (kind === "ai") {
    return (
      <div className={`${common} sv-chat`}>
        <p><strong>Inventory AI:</strong> Mustard Oil 15L sells 4 units a day. 38 in stock means 9 days of cover.</p>
        <p><strong>Recommendation:</strong> order 60 units — basis shown, approval needed.</p>
      </div>
    );
  }
  if (kind === "auto") {
    return (
      <div className={common}>
        <div className="sv-row"><span className="sv-box">Trigger</span><span className="sv-arrow">→</span><span className="sv-box">Proposal</span><span className="sv-arrow">→</span><span className="sv-box sv-hi">Approval</span><span className="sv-arrow">→</span><span className="sv-box">Done</span></div>
      </div>
    );
  }
  return (
    <div className={common}>
      <div className="sv-row"><span className="sv-box sv-hi">2 approvals</span><span className="sv-box sv-hi">2 follow-ups</span><span className="sv-box">1 stock risk</span></div>
      <p className="muted small" style={{ margin: "12px 0 0" }}>Ranked by money at stake and deadline.</p>
    </div>
  );
}

export function ScrollStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i);
            setActive(i);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div>
      <Reveal>
        <SectionHead
          eyebrow="How it works"
          title="A day in the life of the business."
          lede="Not a marketing animation — the actual path a business event travels through the product, from counter to decision."
        />
      </Reveal>
      <div className="story">
        <div className="story-steps">
          {STAGES.map((s, i) => (
            <div
              key={s.n}
              ref={(el) => { refs.current[i] = el; }}
              data-i={i}
              className={`story-step${i === active ? " is-active" : ""}`}
            >
              <span className="story-n num">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="story-panel">
          <div className="story-panel-inner">
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
              <Badge tone="gray">Stage {STAGES[active].n} of 06</Badge>
            </div>
            <StageVisual kind={STAGES[active].visual} />
            <p className="muted small" style={{ marginTop: 12 }}>{STAGES[active].caption}</p>
            <p className="muted small">Sample workspace data.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
