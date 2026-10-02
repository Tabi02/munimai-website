"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { SectionHead, Reveal, Badge } from "./ui";
import { FLOW_NODES } from "./flow3d";

/* Business data flow section.
   - Static SVG diagram renders immediately (works without WebGL, on mobile, with reduced motion).
   - The 3D scene lazy-loads only when scrolled into view and WebGL is available.
   - Selecting a node (in either view) shows what it represents, sample data,
     connected modules and the relevant AI capability. */

const FlowScene = dynamic(() => import("./flow3d").then((m) => m.FlowScene), {
  ssr: false,
  loading: () => <p className="muted small">Loading 3D view…</p>,
});

function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

function FlowDiagram({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const n = FLOW_NODES.length;
  const W = 960, H = 190, pad = 70;
  const step = (W - pad * 2) / (n - 1);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="flow-svg" role="img" aria-label="Business data flow diagram">
      {FLOW_NODES.slice(0, n - 1).map((_, i) => {
        const x1 = pad + i * step + 46, x2 = pad + (i + 1) * step - 46;
        return <line key={i} x1={x1} y1={H / 2} x2={x2} y2={H / 2} stroke="var(--line-strong)" strokeWidth="2" markerEnd="url(#flowArrow)" />;
      })}
      <defs>
        <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8" fill="none" stroke="var(--line-strong)" strokeWidth="1.6" />
        </marker>
      </defs>
      {FLOW_NODES.map((node, i) => {
        const x = pad + i * step, sel = node.id === selected;
        return (
          <g key={node.id} onClick={() => onSelect(node.id)} style={{ cursor: "pointer" }} role="button" tabIndex={0}
             aria-label={node.label} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(node.id); }}>
            <rect x={x - 46} y={H / 2 - 34} width="92" height="68" rx="6"
              fill={sel ? "var(--accent)" : "var(--surface)"} stroke={sel ? "var(--accent-strong)" : "var(--line-strong)"} strokeWidth={sel ? 2.5 : 1.5} />
            <text x={x} y={H / 2 - 2} textAnchor="middle" fontSize="13.5" fontWeight="600"
              fill={sel ? "#fff" : "var(--ink)"} style={{ fontFamily: "var(--font-sans)" }}>
              {node.label.split(" ")[0]}
            </text>
            <text x={x} y={H / 2 + 16} textAnchor="middle" fontSize="13.5" fontWeight="600"
              fill={sel ? "#fff" : "var(--ink)"} style={{ fontFamily: "var(--font-sans)" }}>
              {node.label.split(" ").slice(1).join(" ")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function DataFlowSection() {
  const [selected, setSelected] = useState(FLOW_NODES[0].id);
  const [show3d, setShow3d] = useState(false);
  const [can3d, setCan3d] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const node = FLOW_NODES.find((x) => x.id === selected) ?? FLOW_NODES[0];

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse || !webglAvailable()) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setCan3d(true); setShow3d(true); io.disconnect(); } },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Reveal>
        <SectionHead
          eyebrow="How the system fits together"
          title="One flow, from customer to decision."
          lede="Every record the business enters travels the same path: customer to order to invoice to books to insight to action. Select any stage to see what it holds and which AI capability works on it."
        />
      </Reveal>
      <div className="flow-tabs" role="tablist" aria-label="Diagram style">
        <button role="tab" aria-selected={!show3d} className={`explorer-tab${!show3d ? " is-active" : ""}`} onClick={() => setShow3d(false)}>Diagram</button>
        {can3d && (
          <button role="tab" aria-selected={show3d} className={`explorer-tab${show3d ? " is-active" : ""}`} onClick={() => setShow3d(true)}>3D view</button>
        )}
      </div>
      <div className="flow-stage">
        {show3d && can3d ? (
          <FlowScene onSelect={setSelected} selected={selected} />
        ) : (
          <FlowDiagram selected={selected} onSelect={setSelected} />
        )}
      </div>
      <div className="flow-detail">
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>{node.label}</h3>
          <Badge tone="gray">Sample workspace data</Badge>
        </div>
        <p className="explorer-summary">{node.desc}</p>
        <dl className="explorer-list">
          <div className="explorer-row"><dt>Example record</dt><dd>{node.sample}</dd></div>
          <div className="explorer-row"><dt>Product modules</dt><dd>{node.modules}</dd></div>
          <div className="explorer-row"><dt>AI capability</dt><dd>{node.ai}</dd></div>
        </dl>
      </div>
    </div>
  );
}
