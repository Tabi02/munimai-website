"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* Restrained 3D business data flow: Customer -> Order -> Inventory -> Invoice
   -> Payment -> Accounting -> Analytics -> AI recommendation.
   Matte Ledger palette, gentle motion, click-to-select via raycasting.
   Reduced-motion users get a static scene. */

export type FlowNode = {
  id: string;
  label: string;
  desc: string;
  sample: string;
  modules: string;
  ai: string;
};

export const FLOW_NODES: FlowNode[] = [
  { id: "customer", label: "Customer", desc: "Who the business serves.", sample: "Royal Sweets, Mumbai. Dues Rs 5.1L.", modules: "Customers", ai: "Customer Care drafts the reply; Collections prioritises the dues." },
  { id: "order", label: "Order", desc: "What was asked for.", sample: "SO-2084: Sugar 50kg x 40, confirmed.", modules: "Orders + Live Tracker", ai: "Orders specialist watches the pipeline and explains delays." },
  { id: "inventory", label: "Inventory", desc: "What leaves the shelf.", sample: "Sugar 50kg: 210 in stock, reorder at 120.", modules: "Inventory", ai: "Inventory AI flags the stockout 9 days out." },
  { id: "invoice", label: "Invoice", desc: "What is billed.", sample: "INV-1043: Rs 5.1L, due 12 Oct.", modules: "GST Invoices", ai: "Sales specialist drafts it; Accountant explains the tax." },
  { id: "payment", label: "Payment", desc: "What comes back.", sample: "Rs 8.65L received against INV-1042.", modules: "Accounting", ai: "Collections drafts the reminder; the owner sends it." },
  { id: "accounting", label: "Accounting", desc: "Where it is recorded.", sample: "Ledger updated; P&L reflects the sale.", modules: "Accounting, Expenses", ai: "Accountant explains the books in plain language." },
  { id: "analytics", label: "Analytics", desc: "What it means.", sample: "Revenue +12% vs Aug; Sugar turns 6x.", modules: "Analytics, Intelligence", ai: "Reports specialist writes the daily briefing." },
  { id: "ai", label: "AI recommendation", desc: "What to do next.", sample: "Reorder Tea Powder: 60 units, basis shown.", modules: "AI Assistant, Automation", ai: "Proposal waits for approval; then the workflow runs." },
];

const PAPER = 0xece7d8;
const INK = 0x2a2620;
const ACCENT = 0x0e6b5d;
const LINE = 0xc6bca1;

function makeLabel(text: string): THREE.Sprite {
  const c = document.createElement("canvas");
  c.width = 512; c.height = 128;
  const g = c.getContext("2d")!;
  g.fillStyle = "rgba(0,0,0,0)";
  g.fillRect(0, 0, 512, 128);
  g.font = "600 44px 'IBM Plex Sans', sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillStyle = "#2a2620";
  g.fillText(text, 256, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
  const sp = new THREE.Sprite(mat);
  sp.scale.set(2.6, 0.65, 1);
  return sp;
}

export function FlowScene({ onSelect, selected }: { onSelect: (id: string) => void; selected: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w = mount.clientWidth || 800;
    const h = Math.min(460, Math.max(320, w * 0.5));

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 3.2, 11);
    camera.lookAt(0, 0.4, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dir = new THREE.DirectionalLight(0xffffff, 1.1);
    dir.position.set(4, 8, 6);
    scene.add(dir);

    const group = new THREE.Group();
    scene.add(group);

    const n = FLOW_NODES.length;
    const spacing = 2.6;
    const meshes: THREE.Mesh[] = [];
    const geo = new THREE.BoxGeometry(1.7, 1.7, 1.7);
    const matBase = new THREE.MeshStandardMaterial({ color: PAPER, roughness: 0.85, metalness: 0.05 });
    const matSel = new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.7, metalness: 0.05 });

    FLOW_NODES.forEach((node, i) => {
      const x = (i - (n - 1) / 2) * spacing;
      const y = Math.sin((i / (n - 1)) * Math.PI) * 0.9;
      const mesh = new THREE.Mesh(geo, matBase.clone());
      mesh.position.set(x, y, 0);
      mesh.userData.nodeId = node.id;
      group.add(mesh);
      meshes.push(mesh);
      const label = makeLabel(node.label);
      label.position.set(x, y + 1.45, 0);
      group.add(label);
      if (i < n - 1) {
        const x2 = (i + 1 - (n - 1) / 2) * spacing;
        const y2 = Math.sin(((i + 1) / (n - 1)) * Math.PI) * 0.9;
        const pts = [new THREE.Vector3(x + 0.95, y, 0), new THREE.Vector3(x2 - 0.95, y2, 0)];
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: LINE })
        );
        group.add(line);
      }
    });

    const ray = new THREE.Raycaster();
    const ptr = new THREE.Vector2();
    const click = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ptr.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(ptr, camera);
      const hit = ray.intersectObjects(meshes)[0];
      if (hit) onSelectRef.current((hit.object as THREE.Mesh).userData.nodeId);
    };
    renderer.domElement.addEventListener("pointerdown", click);
    renderer.domElement.style.cursor = "pointer";

    // gentle drag to rotate
    let dragging = false, px = 0, rotY = 0, targetRotY = 0;
    const down = (e: PointerEvent) => { dragging = true; px = e.clientX; };
    const move = (e: PointerEvent) => { if (dragging) { targetRotY += (e.clientX - px) * 0.004; px = e.clientX; } };
    const up = () => { dragging = false; };
    renderer.domElement.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      rotY += (targetRotY - rotY) * 0.08;
      group.rotation.y = rotY + (reduced ? 0 : Math.sin(t * 0.18) * 0.06);
      meshes.forEach((m, i) => {
        const sel = FLOW_NODES[i].id === selectedRef.current;
        (m.material as THREE.MeshStandardMaterial).color.setHex(sel ? ACCENT : PAPER);
        m.position.y += ((sel ? 0.35 : 0) - (m.position.y - Math.sin((i / (n - 1)) * Math.PI) * 0.9)) * 0.1;
        if (!reduced) m.rotation.y = Math.sin(t * 0.4 + i) * 0.08;
      });
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      const nw = mount.clientWidth || 800;
      const nh = Math.min(460, Math.max(320, nw * 0.5));
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      renderer.domElement.removeEventListener("pointerdown", click);
      renderer.domElement.removeEventListener("pointerdown", down);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        const mt = m.material as THREE.Material | THREE.Material[];
        if (Array.isArray(mt)) mt.forEach((x) => x.dispose());
        else if (mt) mt.dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="flow3d" role="img" aria-label="Interactive 3D diagram of business data flow" />;
}
