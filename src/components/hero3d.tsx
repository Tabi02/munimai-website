"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { AppWindow } from "./appwindow";
import { priceForCountry, type CountryInfo } from "../lib/geo";

/* 3D product showcase: the app window tilted in perspective space with
 * floating insight chips at different depths. Mouse parallax + idle float.
 * All motion disabled under prefers-reduced-motion. */

const BASE_RX = 14;
const BASE_RY = -16;

function Chip({ className, kicker, value, delay, reduce }: {
  className: string; kicker: string; value: string; delay: number; reduce: boolean;
}) {
  return (
    <motion.div
      className={`om-chip ${className}`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="om-chip-k">{kicker}</div>
        <div className="om-chip-v">{value}</div>
      </motion.div>
    </motion.div>
  );
}

export function HeroScene({ country }: { country: CountryInfo }) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [BASE_RX + 5, BASE_RX - 5]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [BASE_RY - 7, BASE_RY + 7]), { stiffness: 120, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <div className="om-scene" ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="om-glow" aria-hidden="true" />
      <Chip className="om-chip-a" kicker="Cash forecast" value={priceForCountry(8420000, country) + " ▲"} delay={1.0} reduce={reduce} />
      <Chip className="om-chip-b" kicker="AI alert" value="Low stock: Cooking Oil" delay={1.15} reduce={reduce} />
      <Chip className="om-chip-c" kicker="Decision inbox" value="2 awaiting approval" delay={1.3} reduce={reduce} />
      <motion.div
        className="om-tilt"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={reduce ? { rotateX: BASE_RX, rotateY: BASE_RY } : { rotateX, rotateY }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <AppWindow country={country} />
        </motion.div>
      </motion.div>
      <div className="om-floor" aria-hidden="true" />
      <p className="small faint om-shot-cap">The actual product interface, illustrated with a sample wholesale business.</p>
    </div>
  );
}
