"use client";

import { useState } from "react";
import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site";
import { Button } from "@/components/ui";

type NeedId = "invoices" | "stock" | "customers" | "marketing" | "reports" | "store";

const NEEDS: { id: NeedId; icon: string; label: string; hint: string }[] = [
  { id: "invoices", icon: "🧾", label: "Invoices & billing", hint: "GST bills, payment follow-up" },
  { id: "stock", icon: "📦", label: "Stock & inventory", hint: "Low-stock alerts, valuations" },
  { id: "customers", icon: "🤝", label: "Customers", hint: "Records, history, segments" },
  { id: "marketing", icon: "📣", label: "Marketing", hint: "WhatsApp / SMS / email campaigns" },
  { id: "reports", icon: "📊", label: "Reports & accounts", hint: "P&L, kharcha, top customers" },
  { id: "store", icon: "🌐", label: "Online store", hint: "Shopify / WooCommerce sync" },
];

const ANALYSIS: Record<NeedId, { understanding: string; modules: string[]; automations: string[]; previewTitle: string; previewRows: [string, string][] }> = {
  invoices: {
    understanding: "Aapko professional GST invoices chahiye jo banane me seconds len, aur pending payments ka picha AI khud kare.",
    modules: ["Invoices — GST ke saath bill banao", "Customers — har grahak ka ledger", "Vasool Agent — overdue ka follow-up"],
    automations: ["Payment aane par receipt entry", "Overdue invoice par daily reminder"],
    previewTitle: "Invoices workspace",
    previewRows: [["INV-0001 · Sharma Traders", "₹12,400 — Sent"], ["INV-0002 · Gupta & Sons", "₹8,900 — Overdue"], ["INV-0003 · Walk-in sale", "₹1,200 — Paid"]],
  },
  stock: {
    understanding: "Aapko real-time stock chahiye — kaunsa item khatm hone wala hai, ye pata chalne se pehle pata chal jaye.",
    modules: ["Inventory — SKU, stock, reorder level", "Orders — sale par stock auto-katega", "Stock Manager — AI se reorder advice"],
    automations: ["Low stock par notification", "Order fulfill par stock deduction"],
    previewTitle: "Inventory workspace",
    previewRows: [["Atta 5kg (SKU-001)", "42 pcs — OK"], ["Sugar 1kg (SKU-002)", "6 pcs — Low ⚠"], ["Tea 250g (SKU-003)", "120 pcs — OK"]],
  },
  customers: {
    understanding: "Aapko har grahak ka poora record ek jagah chahiye — kaun kitna kharidta hai, kaun kab se nahi aaya.",
    modules: ["Customers — record, tags, history", "Grahak Manager — AI se relationship tips", "Marketing — segment-wise campaigns"],
    automations: ["Naya customer add par welcome note", "30 din se inactive par offer"],
    previewTitle: "Customers workspace",
    previewRows: [["Sharma Traders", "₹48,200 lifetime · VIP"], ["Gupta & Sons", "₹21,500 lifetime"], ["Ramesh Kumar", "30 din se inactive"]],
  },
  marketing: {
    understanding: "Aapko apne customers tak seedha pahunchna hai — WhatsApp, SMS aur email par offers bhejna, bina kisi agency ke.",
    modules: ["Marketing — campaign banao, template likho", "Customers — tag-wise audience", "Kharcha Tracker — campaign cost vs sale"],
    automations: ["Festival par auto campaign draft", "Campaign ke baad performance summary"],
    previewTitle: "Marketing workspace",
    previewRows: [["Diwali Offer — WhatsApp", "240 bheje · 38 jawab"], ["New stock alert — SMS", "180 bheje"], ["Festival mailer — Email", "draft me"]],
  },
  reports: {
    understanding: "Aapko har mahine ka saaf hisaab chahiye — kitna aaya, kitna gaya, kaunsa customer sabse valuable hai.",
    modules: ["Analytics — revenue, kharcha, top customers", "Accounting — monthly P&L", "Report Generator — AI se summary"],
    automations: ["Mahine ke end par P&L summary", "Kharcha budget cross par alert"],
    previewTitle: "Analytics workspace",
    previewRows: [["Is mahine revenue", "₹1,84,000"], ["Is mahine kharcha", "₹96,500"], ["Net profit", "₹87,500"]],
  },
  store: {
    understanding: "Aapko apna online store is system se jodna hai — orders aur products dono taraf sync hon.",
    modules: ["Online Store — Shopify / WooCommerce connect", "Orders — online orders local system me", "Inventory — product sync"],
    automations: ["Naya online order par notification", "Product update par sync"],
    previewTitle: "Online Store workspace",
    previewRows: [["myshop.myshopify.com", "Connected · 2 ghante pehle sync"], ["Kal ke orders", "14 orders sync hue"], ["Products", "86 matched · 3 naye"]],
  },
};

const ANALYSIS_STEPS = ["Aapki baat samajh raha hun…", "Business data dekh raha hun…", "Solution bana raha hun…"];

export default function DemoPage() {
  const [need, setNeed] = useState<NeedId | null>(null);
  const [problem, setProblem] = useState("");
  const [stage, setStage] = useState<"pick" | "describe" | "analyzing" | "plan" | "workspace">("pick");
  const [stepIdx, setStepIdx] = useState(0);

  const startAnalyze = () => {
    setStage("analyzing");
    setStepIdx(0);
    let i = 0;
    const t = setInterval(() => {
      i++;
      if (i < ANALYSIS_STEPS.length) { setStepIdx(i); }
      else { clearInterval(t); setStage("plan"); }
    }, 900);
  };

  const a = need ? ANALYSIS[need] : null;

  return (
    <>
      <SiteNav />
      <main className="section" style={{ paddingTop: 64 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>Interactive demo</p>
          <h1 style={{ fontSize: 40, marginBottom: 8 }}>Dekho — MunimAI OS kaise kaam karta hai</h1>
          <p className="card-sub" style={{ fontSize: 16, marginBottom: 32 }}>
            Apni zaroorat chuno, apni problem batao — aur dekho AI kaise use samajhkar workspace banata hai.
            <strong> Ye demo sample data ke saath hai</strong>; real app me yahan aapka asli data hota hai.
          </p>

          {stage === "pick" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
              {NEEDS.map((n) => (
                <button key={n.id} className="card card-hover" style={{ textAlign: "left", cursor: "pointer", color: "var(--text)" }}
                  onClick={() => { setNeed(n.id); setStage("describe"); }}>
                  <div style={{ fontSize: 28 }}>{n.icon}</div>
                  <div className="card-title" style={{ marginTop: 8 }}>{n.label}</div>
                  <div className="card-sub">{n.hint}</div>
                </button>
              ))}
            </div>
          )}

          {stage === "describe" && need && (
            <div className="card">
              <div className="card-title">Apni problem batao — apne shabdon me</div>
              <p className="card-sub" style={{ marginBottom: 12 }}>
                Jaise: <em>“{NEEDS.find((n) => n.id === need)!.label} me sabse badi dikkat ye hai ki…”</em>
              </p>
              <textarea className="input" rows={4} style={{ width: "100%", resize: "vertical" }}
                placeholder="Yahan likho… (khaali bhi chhod sakte ho — demo chal jayega)"
                value={problem} onChange={(e) => setProblem(e.target.value)} />
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <Button onClick={startAnalyze}>Analyze karo →</Button>
                <button className="btn btn-ghost" onClick={() => setStage("pick")}>← Wapas</button>
              </div>
            </div>
          )}

          {stage === "analyzing" && (
            <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>{ANALYSIS_STEPS[stepIdx]}</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 18 }}>
                {ANALYSIS_STEPS.map((_, i) => (
                  <div key={i} style={{ width: 48, height: 6, borderRadius: 3, background: i <= stepIdx ? "var(--accent)" : "var(--border)" }} />
                ))}
              </div>
            </div>
          )}

          {stage === "plan" && a && (
            <div>
              <div className="card" style={{ borderColor: "var(--accent)" }}>
                <div className="card-title">✓ Samajh gaya</div>
                <p style={{ margin: "8px 0 0" }}>{a.understanding}</p>
                {problem.trim() && (
                  <p className="card-sub" style={{ marginTop: 10 }}>Aapne kaha: <em>“{problem.trim().slice(0, 200)}”</em></p>
                )}
              </div>
              <div className="card" style={{ marginTop: 12 }}>
                <div className="card-title">Proposed changes — review karo</div>
                <p className="card-sub" style={{ marginBottom: 10 }}>Ye modules aur automations aapke workspace me add honge. Kuch pasand na aaye to hata sakte ho (real app me).</p>
                <ul style={{ margin: "0 0 6px", paddingLeft: 20, lineHeight: 1.9 }}>
                  {a.modules.map((m) => <li key={m}>✅ {m}</li>)}
                  {a.automations.map((m) => <li key={m}>⚙️ {m}</li>)}
                </ul>
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <Button onClick={() => setStage("workspace")}>Apply karo — workspace banao</Button>
                  <button className="btn btn-ghost" onClick={() => setStage("describe")}>← Problem badlo</button>
                </div>
              </div>
            </div>
          )}

          {stage === "workspace" && a && (
            <div>
              <div className="card" style={{ borderColor: "var(--accent)" }}>
                <div className="card-title">🎉 {a.previewTitle} taiyaar hai</div>
                <p className="card-sub">Ye wahi workspace hai jo real app me khulega — sample data ke saath.</p>
                <div style={{ marginTop: 14, border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ background: "var(--bg-elev)", padding: "10px 16px", fontWeight: 700, borderBottom: "1px solid var(--border)" }}>
                    {a.previewTitle}
                  </div>
                  {a.previewRows.map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                      <span>{k}</span><span className="card-sub" style={{ fontWeight: 600, color: "var(--text)" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
                  <Button href="/register">Free me start karo →</Button>
                  <button className="btn btn-ghost" onClick={() => { setStage("pick"); setNeed(null); setProblem(""); }}>Nayi demo try karo</button>
                </div>
              </div>
              <p className="card-sub" style={{ marginTop: 16, textAlign: "center" }}>
                Real app download karke apna asli data jodo — <Link href="/#pricing" style={{ color: "var(--accent)" }}>plans dekho</Link>
              </p>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
