"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 100);
    camera.position.set(0, 3.2, 11);
    camera.lookAt(0, 0.4, 0);

    scene.add(new THREE.AmbientLight(0xfffdf4, 0.75));
    const hemi = new THREE.HemisphereLight(0xfffdf4, 0xd8d2bd, 0.5);
    scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xffffff, 1.4);
    dir.position.set(4, 9, 6);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    dir.shadow.camera.left = -12; dir.shadow.camera.right = 12;
    dir.shadow.camera.top = 8; dir.shadow.camera.bottom = -8;
    scene.add(dir);
    // soft ground shadow catcher
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 12),
      new THREE.ShadowMaterial({ opacity: 0.14 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.6;
    ground.receiveShadow = true;
    scene.add(ground);

    const group = new THREE.Group();
    scene.add(group);

    const n = FLOW_NODES.length;
    const spacing = 2.6;
    const meshes: THREE.Mesh[] = [];
    const geo = new RoundedBoxGeometry(1.7, 1.7, 1.7, 4, 0.22);
    const matBase = new THREE.MeshStandardMaterial({ color: PAPER, roughness: 0.8, metalness: 0.08 });
    const nodePos: THREE.Vector3[] = [];

    FLOW_NODES.forEach((node, i) => {
      const x = (i - (n - 1) / 2) * spacing;
      const y = Math.sin((i / (n - 1)) * Math.PI) * 0.9;
      const mesh = new THREE.Mesh(geo, matBase.clone());
      mesh.position.set(x, y, 0);
      mesh.castShadow = true;
      mesh.userData.nodeId = node.id;
      mesh.userData.baseY = y;
      group.add(mesh);
      meshes.push(mesh);
      nodePos.push(new THREE.Vector3(x, y, 0));
      const label = makeLabel(node.label);
      label.position.set(x, y + 1.5, 0);
      group.add(label);
      if (i < n - 1) {
        const x2 = (i + 1 - (n - 1) / 2) * spacing;
        const y2 = Math.sin(((i + 1) / (n - 1)) * Math.PI) * 0.9;
        const a = new THREE.Vector3(x + 1.0, y, 0);
        const b = new THREE.Vector3(x2 - 1.0, y2, 0);
        // connection: thin tube instead of flat line
        const curve = new THREE.LineCurve3(a, b);
        const tube = new THREE.Mesh(
          new THREE.TubeGeometry(curve, 8, 0.035, 8, false),
          new THREE.MeshStandardMaterial({ color: LINE, roughness: 0.9 })
        );
        group.add(tube);
      }
    });

    // data packets travelling along the flow (restrained, business meaning: records moving)
    const packets: { mesh: THREE.Mesh; t: number; speed: number; from: number }[] = [];
    const packetGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const packetMat = new THREE.MeshStandardMaterial({ color: ACCENT, roughness: 0.6 });
    for (let i = 0; i < n - 1; i++) {
      const m = new THREE.Mesh(packetGeo, packetMat);
      m.castShadow = true;
      group.add(m);
      packets.push({ mesh: m, t: i / (n - 1), speed: 0.12 + (i % 3) * 0.03, from: i });
    }

    const ray = new THREE.Raycaster();
    const ptr = new THREE.Vector2();
    const pick = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ptr.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      ray.setFromCamera(ptr, camera);
      return ray.intersectObjects(meshes)[0];
    };
    const click = (e: PointerEvent) => {
      const hit = pick(e);
      if (hit) onSelectRef.current((hit.object as THREE.Mesh).userData.nodeId);
    };
    let hovered: THREE.Mesh | null = null;
    const hover = (e: PointerEvent) => {
      const hit = pick(e);
      hovered = hit ? (hit.object as THREE.Mesh) : null;
      renderer.domElement.style.cursor = hit ? "pointer" : "grab";
    };
    renderer.domElement.addEventListener("pointerdown", click);
    renderer.domElement.addEventListener("pointermove", hover);
    renderer.domElement.style.cursor = "grab";

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
        const hov = m === hovered;
        (m.material as THREE.MeshStandardMaterial).color.setHex(sel ? ACCENT : PAPER);
        const targetY = m.userData.baseY + (sel ? 0.35 : 0);
        m.position.y += (targetY - m.position.y) * 0.1;
        const targetS = hov && !sel ? 1.08 : 1;
        const cs = m.scale.x + (targetS - m.scale.x) * 0.15;
        m.scale.set(cs, cs, cs);
        if (!reduced) m.rotation.y = Math.sin(t * 0.4 + i) * 0.08;
      });
      if (!reduced) {
        for (const p of packets) {
          p.t += p.speed * 0.016;
          if (p.t > 1) p.t = 0;
          const a = nodePos[p.from].clone(); a.x += 1.0;
          const b = nodePos[p.from + 1].clone(); b.x -= 1.0;
          p.mesh.position.lerpVectors(a, b, p.t);
          p.mesh.position.y += 0.12;
        }
      } else {
        for (const p of packets) p.mesh.visible = false;
      }
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
      renderer.domElement.removeEventListener("pointermove", hover);
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
