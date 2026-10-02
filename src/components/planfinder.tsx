"use client";

import { useState } from "react";
import { Button, Reveal } from "./ui";
import { PLANS, planPrice } from "./pricing";
import type { CountryInfo } from "../lib/geo";

/* Plan finder: answer three questions, get a recommended plan.
   Prices come from the same pricing data as the comparison table. */

type Answers = { team: string | null; branches: string | null; ai: string | null };

const QUESTIONS: Array<{ key: keyof Answers; q: string; opts: string[] }> = [
  { key: "team", q: "How many people will use it?", opts: ["Just me", "2–5", "6–25", "25+"] },
  { key: "branches", q: "How many branches or counters?", opts: ["1", "2–3", "4+"] },
  { key: "ai", q: "Do you want AI assistance and automation?", opts: ["Yes", "Not yet"] },
];

function recommend(a: Answers): string {
  if (a.team === "25+" || a.branches === "4+") return "enterprise";
  if (a.team === "6–25" || a.branches === "2–3") return "scale";
  if (a.team === "2–5" || a.ai === "Yes") return "business";
  return "starter";
}

const PLAN_BLURB: Record<string, string> = {
  starter: "For a single shop getting organised.",
  business: "For growing businesses with staff.",
  scale: "For multi-counter and multi-branch work.",
  enterprise: "Custom terms for larger organisations.",
};

export function PlanFinder({ country, annual }: { country: CountryInfo; annual: boolean }) {
  const [answers, setAnswers] = useState<Answers>({ team: null, branches: null, ai: null });
  const done = answers.team && answers.branches && answers.ai;
  const slug = done ? recommend(answers) : null;
  const plan = PLANS.find((p) => p.slug === slug);

  return (
    <div className="plan-finder">
      <Reveal>
        <h2 style={{ marginTop: 0 }}>Which plan fits your business?</h2>
        <p className="muted">Answer three questions; we will point at the plan that matches. No email required.</p>
      </Reveal>
      {QUESTIONS.map((qq) => (
        <div key={qq.key} className="finder-q">
          <p className="finder-q-label">{qq.q}</p>
          <div className="finder-opts" role="group" aria-label={qq.q}>
            {qq.opts.map((o) => (
              <button
                key={o}
                aria-pressed={answers[qq.key] === o}
                className={`finder-opt${answers[qq.key] === o ? " is-active" : ""}`}
                onClick={() => setAnswers({ ...answers, [qq.key]: o })}
              >
                {o}
              </button>
            ))}
          </div>
        </div>
      ))}
      {done && plan && (
        <div className="finder-result">
          <div>
            <span className="eyebrow">Recommended</span>
            <h3 style={{ margin: "6px 0 4px" }}>{plan.name}</h3>
            <p className="muted small" style={{ margin: 0 }}>{PLAN_BLURB[plan.slug]}</p>
            <p className="plan-price" style={{ marginTop: 10 }}>
              {planPrice(plan.slug, plan.price_cents, country, annual)}
              <span className="plan-per"> {plan.slug === "enterprise" ? "" : annual ? "per month, billed annually" : "per month"}</span>
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Button href="/register" size="sm">{plan.slug === "enterprise" ? "Talk to us" : "Start free trial"}</Button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setAnswers({ team: null, branches: null, ai: null })}
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
