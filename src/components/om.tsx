"use client";

import { motion } from "framer-motion";
import { Button, Reveal } from "./ui";

/* Shared OpenMotion-style pieces for inner pages:
 * PageHero (centered kicker + serif headline + lede) and CtaBand. */

const EASE = [0.16, 1, 0.3, 1] as const;

export function PageHero({ kicker, title, lede, children }: {
  kicker: string; title: React.ReactNode; lede?: string; children?: React.ReactNode;
}) {
  return (
    <section className="om-page-hero">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="om-kicker">{kicker}</div>
          <h1 className="om-ph-title">{title}</h1>
          {lede && <p className="om-lead">{lede}</p>}
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function CtaBand({ title, body, actions }: {
  title?: React.ReactNode; body?: string; actions?: React.ReactNode;
}) {
  return (
    <section className="om-block">
      <div className="container">
        <Reveal>
          <div className="om-cta">
            <h2>{title ?? <>All the intelligence.<br />None of the cloud fees.</>}</h2>
            <p>{body ?? "Aetros Biz is free while we\u2019re building. Download it, run it on your own machine, keep every rupee of insight."}</p>
            <div className="om-ticks"><span>Free download</span><span>Works offline</span><span>No account needed</span></div>
            {actions ?? <Button href="/download" size="lg" variant="white">Download Aetros Biz</Button>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
