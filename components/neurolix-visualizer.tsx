'use client';

import React, { useEffect, useRef } from 'react';

const COMMIT_HASH = "ec52836f23170a1b601dd7e475107f314ca004186707f69836f7615901a665bd";
const HEX = "0123456789abcdef";

const clamp = (v: number, a: number, b: number) => v < a ? a : v > b ? b : v;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
const invlerp = (a: number, b: number, v: number) => clamp((v - a) / (b - a), 0, 1);
const isMobile = () => typeof window !== 'undefined' ? window.innerWidth < 768 : false;

function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2); ctx.beginPath();
  ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

function fit(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = canvas.clientWidth, h = canvas.clientHeight;
  canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h };
}

function glow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string, blur: number) {
  ctx.save(); ctx.shadowColor = color; ctx.shadowBlur = blur;
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
}

function drawPC(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, alpha: number, bright: boolean) {
  ctx.globalAlpha = alpha; ctx.lineWidth = Math.max(1, s * 0.05);
  ctx.fillStyle = '#1a2234'; ctx.strokeStyle = bright ? 'rgba(0,229,255,0.95)' : 'rgba(0,229,255,0.45)';
  rr(ctx, x - s / 2, y - s * 0.42, s, s * 0.62, s * 0.1); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = bright ? 'rgba(0,229,255,0.85)' : 'rgba(0,229,255,0.3)';
  ctx.beginPath(); ctx.moveTo(x - s * 0.28, y - s * 0.12); ctx.lineTo(x + s * 0.28, y - s * 0.12); ctx.stroke();
  ctx.strokeStyle = bright ? 'rgba(0,229,255,0.55)' : 'rgba(0,229,255,0.25)';
  ctx.beginPath(); ctx.moveTo(x, y + s * 0.2); ctx.lineTo(x, y + s * 0.32); ctx.moveTo(x - s * 0.16, y + s * 0.32); ctx.lineTo(x + s * 0.16, y + s * 0.32); ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawUser(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, alpha: number) {
  ctx.globalAlpha = alpha; ctx.strokeStyle = 'rgba(154,184,196,0.9)'; ctx.lineWidth = Math.max(1.2, s * 0.07);
  ctx.beginPath(); ctx.arc(x, y - s * 0.45, s * 0.28, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y + s * 0.55, s * 0.55, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); ctx.globalAlpha = 1;
}

function drawLock(ctx: CanvasRenderingContext2D, x: number, y: number, s: number, alpha: number) {
  ctx.globalAlpha = alpha; ctx.lineWidth = Math.max(1.2, s * 0.12);
  ctx.strokeStyle = 'rgba(0,229,255,0.95)'; ctx.fillStyle = 'rgba(0,229,255,0.12)';
  rr(ctx, x - s * 0.5, y - s * 0.1, s, s * 0.8, s * 0.12); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y - s * 0.1, s * 0.32, Math.PI, 0); ctx.stroke(); ctx.globalAlpha = 1;
}

function drawHexToken(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number) {
  ctx.globalAlpha = alpha; ctx.beginPath();
  for (let i = 0; i < 6; i++) { const ang = Math.PI / 3 * i - Math.PI / 6; const px = x + r * Math.cos(ang), py = y + r * Math.sin(ang); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath();
  ctx.fillStyle = 'rgba(0,229,255,0.18)'; ctx.strokeStyle = 'rgba(0,229,255,0.95)'; ctx.lineWidth = 1.5; ctx.fill();
  ctx.save(); ctx.shadowColor = 'rgba(0,229,255,0.8)'; ctx.shadowBlur = 10; ctx.stroke(); ctx.restore();
  ctx.strokeStyle = 'rgba(0,229,255,0.95)'; ctx.lineWidth = 1.6; ctx.beginPath();
  ctx.moveTo(x - r * 0.35, y); ctx.lineTo(x - r * 0.05, y + r * 0.3); ctx.lineTo(x + r * 0.4, y - r * 0.35); ctx.stroke(); ctx.globalAlpha = 1;
}

function buildField(count: number, seed: number) {
  const rng = mulberry32(seed); const nodes: any[] = [];
  const cols = Math.ceil(Math.sqrt(count * 1.4)), rows = Math.ceil(count / cols); let made = 0;
  for (let r = 0; r < rows && made < count; r++) for (let c = 0; c < cols && made < count; c++) {
    const gx = (c + 0.5) / cols, gy = (r + 0.5) / rows;
    nodes.push({ x: clamp(gx + (rng() - 0.5) * 0.7 / cols, 0.04, 0.96), y: clamp(gy + (rng() - 0.5) * 0.7 / rows, 0.06, 0.94), ph: rng() * Math.PI * 2 }); made++;
  }
  const edges: number[][] = [], seen = new Set();
  for (let i = 0; i < nodes.length; i++) {
    const d: number[][] = [];
    for (let j = 0; j < nodes.length; j++) { if (i === j) continue; const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y; d.push([dx * dx + dy * dy, j]); }
    d.sort((a, b) => a[0] - b[0]);
    for (let k = 0; k < 2; k++) { const j = d[k][1]; const key = i < j ? i + '-' + j : j + '-' + i; if (!seen.has(key)) { seen.add(key); edges.push([i, j]); } }
  }
  let ti = 0, best = 1e9; for (let i = 0; i < nodes.length; i++) { const dx = nodes[i].x - 0.5, dy = nodes[i].y - 0.46, dd = dx * dx + dy * dy; if (dd < best) { best = dd; ti = i; } }
  return { nodes, edges, target: ti };
}

function layout(n: any, W: number, H: number, m: number) { return { x: m + n.x * (W - 2 * m), y: m + n.y * (H - 2 * m) }; }
function makeTravelers(num: number, edgeCount: number, rng: () => number) { const t: any[] = []; for (let i = 0; i < num; i++) t.push({ e: Math.floor(rng() * edgeCount), t: rng(), s: 0.10 + rng() * 0.18 }); return t; }

function progressOf(sectionEl: HTMLElement) {
  const rect = sectionEl.getBoundingClientRect();
  const track = rect.height - window.innerHeight;
  if (track <= 0) return 0;
  return clamp(-rect.top / track, 0, 1);
}

function setHUD(caps: HTMLElement[], steps: HTMLElement[], phase: number, ref: { last: number }) {
  if (ref.last === phase) return;
  ref.last = phase;
  caps.forEach((c) => {
    if (Number(c.getAttribute('data-phase')) === phase) {
      c.style.opacity = '1'; c.style.transform = 'translateY(0)';
    } else {
      c.style.opacity = '0'; c.style.transform = 'translateY(10px)';
    }
  });
  steps.forEach((s) => {
    if (Number(s.getAttribute('data-step')) === phase) s.style.color = 'var(--accent)';
    else s.style.color = 'var(--text-secondary)';
  });
}

function renderHash(settle: number) {
  const reveal = Math.floor(settle * COMMIT_HASH.length);
  let out = "";
  for (let i = 0; i < COMMIT_HASH.length; i++) {
    out += (i < reveal) ? COMMIT_HASH[i] : HEX[(Math.random() * 16) | 0];
  }
  return out;
}

export default function NeurolixVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasARef = useRef<HTMLCanvasElement>(null);
  const canvasBRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (REDUCED || !containerRef.current || !canvasARef.current || !canvasBRef.current) return;

    const secA = containerRef.current.querySelector('#sceneA') as HTMLElement;
    const secB = containerRef.current.querySelector('#sceneB') as HTMLElement;
    const canvasA = canvasARef.current;
    const canvasB = canvasBRef.current;
    
    const heroText = containerRef.current.querySelector('#hero-text') as HTMLElement;
    const capsA = Array.from(containerRef.current.querySelectorAll('.cap-a')) as HTMLElement[];
    const capsB = Array.from(containerRef.current.querySelectorAll('.cap-b')) as HTMLElement[];
    const stepsA = Array.from(containerRef.current.querySelectorAll('.steps-a span')) as HTMLElement[];
    const stepsB = Array.from(containerRef.current.querySelectorAll('.steps-b span')) as HTMLElement[];
    const railFillA = containerRef.current.querySelector('.rail-fill-a') as HTMLElement;
    const railFillB = containerRef.current.querySelector('.rail-fill-b') as HTMLElement;
    
    const hashline = containerRef.current.querySelector('#hashline') as HTMLElement;
    const hashText = containerRef.current.querySelector('#hashText') as HTMLElement;
    const hlLabel = containerRef.current.querySelector('#hlLabel') as HTMLElement;
    const hlTx = containerRef.current.querySelector('#hlTx') as HTMLElement;

    const hudRefA = { last: -2 };
    const hudRefB = { last: -2 };

    let sizeA = fit(canvasA);
    const nA = isMobile() ? 14 : 30;
    const fieldA = buildField(nA, 90210);
    const travA = makeTravelers(isMobile() ? 4 : 9, fieldA.edges.length, mulberry32(42));
    
    // RIMAPPATURA FASI: -1 è la Hero Text, 0-3 è la navigazione
    const phaseA = (P: number) => P < 0.08 ? -1 : P < 0.28 ? 0 : P < 0.52 ? 1 : P < 0.76 ? 2 : 3;

    let sizeB = fit(canvasB);
    const netLayers = isMobile() ? [3, 4, 3] : [5, 6, 6, 4];
    const phaseB = (P: number) => P < 0.40 ? 0 : P < 0.70 ? 1 : 2;
    let lastScramble = 0;
    let scrambleCache = "";

    const handleResize = () => {
      sizeA = fit(canvasA);
      sizeB = fit(canvasB);
    };
    window.addEventListener('resize', handleResize);

    let isRunning = true;
    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      if (!isRunning) return;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = now / 1000;

      // SCENE A (Hero + Rete)
      const rectA = secA.getBoundingClientRect();
      if (rectA.bottom > -80 && rectA.top < window.innerHeight + 80) {
        const P = progressOf(secA);
        const { ctx, w, h } = sizeA;
        const m = Math.min(w, h) * 0.1;
        
        // Dissolvenza e parallasse per la Hero Text
        if (heroText) {
          const heroOp = clamp(1 - (P * 12), 0, 1);
          heroText.style.opacity = heroOp.toString();
          heroText.style.pointerEvents = heroOp > 0.1 ? 'auto' : 'none';
          heroText.style.transform = `translateY(${P * 150}px)`; 
        }

        // Calcolo Animazioni (Spaziate per lasciar respirare la Hero)
        const p1 = smooth(invlerp(0.28, 0.48, P));
        const p2 = smooth(invlerp(0.52, 0.72, P));
        const p3 = smooth(invlerp(0.76, 0.95, P));
        const Z = isMobile() ? 2.8 : 4.6;
        
        const fieldC = layout({ x: 0.5, y: 0.5 }, w, h, m);
        const tgt = layout(fieldA.nodes[fieldA.target], w, h, m);
        const zoom = lerp(1, Z, p1);
        const focus = { x: lerp(fieldC.x, tgt.x, p1), y: lerp(fieldC.y, tgt.y, p1) };
        const cx = w / 2, cy = h / 2;
        const S = (pt: any) => ({ x: (pt.x - focus.x) * zoom + cx, y: (pt.y - focus.y) * zoom + cy });
        
        ctx.clearRect(0, 0, w, h);
        const iso = p3, edgeAlpha = 0.10 * (1 - 0.95 * iso), pulseAlpha = (1 - p1) * (1 - iso);
        
        ctx.lineWidth = Math.max(1, zoom * 0.5); ctx.strokeStyle = `rgba(0,229,255,${edgeAlpha.toFixed(3)})`; ctx.beginPath();
        for (const [i, j] of fieldA.edges) {
          const a = S(layout(fieldA.nodes[i], w, h, m)), b = S(layout(fieldA.nodes[j], w, h, m));
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
        } ctx.stroke();
        
        if (pulseAlpha > 0.02) {
          for (const tr of travA) {
            tr.t += tr.s * dt; if (tr.t > 1) { tr.t = 0; tr.e = (tr.e + 1) % fieldA.edges.length; }
            const [i, j] = fieldA.edges[tr.e];
            const a = S(layout(fieldA.nodes[i], w, h, m)), b = S(layout(fieldA.nodes[j], w, h, m));
            ctx.globalAlpha = pulseAlpha;
            glow(ctx, lerp(a.x, b.x, tr.t), lerp(a.y, b.y, tr.t), 2.0, 'rgba(0,229,255,0.9)', 9);
            ctx.globalAlpha = 1;
          }
        }
        
        for (let i = 0; i < fieldA.nodes.length; i++) {
          if (i === fieldA.target) continue;
          const p = S(layout(fieldA.nodes[i], w, h, m));
          const s = zoom * 10 * (1 + 0.05 * Math.sin(t * 1.4 + fieldA.nodes[i].ph));
          const a = 0.85 * (1 - 0.85 * iso);
          if (a > 0.02) drawPC(ctx, p.x, p.y, s, a, false);
        }
        
        const targetC = S(tgt);
        const baseS = zoom * 11, encS = baseS * lerp(1, 2.4, Math.max(p2 * 0.4, p3));
        const boundaryT = Math.max(p2, p3);
        
        if (boundaryT > 0.01) {
          const bw = encS * 2.0, bh = encS * 2.0;
          ctx.globalAlpha = 0.5 + 0.5 * p3; ctx.lineWidth = 1.5 + 2.5 * p3;
          ctx.strokeStyle = `rgba(0,229,255,${(0.4 + 0.6 * p3).toFixed(2)})`;
          ctx.fillStyle = `rgba(0,229,255,${(0.04 + 0.08 * p3).toFixed(3)})`;
          rr(ctx, targetC.x - bw / 2, targetC.y - bh / 2, bw, bh, encS * 0.28); ctx.fill(); ctx.stroke();
          if (p3 > 0) {
            ctx.save(); ctx.shadowColor = 'rgba(0,229,255,0.8)'; ctx.shadowBlur = 18 * p3; ctx.strokeStyle = `rgba(0,229,255,${(0.7 * p3).toFixed(2)})`;
            rr(ctx, targetC.x - bw / 2, targetC.y - bh / 2, bw, bh, encS * 0.28); ctx.stroke(); ctx.restore();
          } ctx.globalAlpha = 1;
        }
        
        drawPC(ctx, targetC.x, targetC.y - (p3 * encS * 0.15), encS, 1, true);
        glow(ctx, targetC.x, targetC.y - (p3 * encS * 0.15), 2.5 * Math.max(0.4, p1), 'rgba(0,229,255,0.8)', 14 * p1);
        
        if (p2 > 0.01 && p3 < 0.99) {
          const userPos = { x: targetC.x - encS * 2.2, y: targetC.y }, entry = { x: targetC.x - encS * 1.05, y: targetC.y };
          drawUser(ctx, userPos.x, userPos.y, encS * 0.8, p2 * (1 - p3));
          const travelT = smooth(clamp(p2, 0, 1));
          const pkt = { x: lerp(userPos.x, entry.x, travelT), y: targetC.y };
          const pktAlpha = (p3 < 0.5 ? 1 : (1 - smooth(invlerp(0.5, 0.95, p3)))) * p2;
          if (pktAlpha > 0.02) {
            ctx.globalAlpha = pktAlpha; const ps = encS * 0.42; ctx.fillStyle = 'rgba(0,229,255,0.18)';
            ctx.strokeStyle = 'rgba(0,229,255,0.95)'; ctx.lineWidth = 1.5;
            rr(ctx, pkt.x - ps / 2, pkt.y - ps / 2, ps, ps, ps * 0.22); ctx.fill(); ctx.stroke();
            drawLock(ctx, pkt.x, pkt.y, ps * 0.42, pktAlpha * 0.9); ctx.globalAlpha = 1;
          }
        }
        if (p3 > 0.15) drawLock(ctx, targetC.x, targetC.y - encS * 1.25, encS * 0.5, p3);
        
        setHUD(capsA, stepsA, phaseA(P), hudRefA);
        
        // RailFill non deve crescere durante la Hero Phase (-1)
        const railP = clamp(invlerp(0.08, 1, P), 0, 1);
        railFillA.style.height = `${(railP * 100).toFixed(1)}%`;
      }

      // SCENE B
      const rectB = secB.getBoundingClientRect();
      if (rectB.bottom > -80 && rectB.top < window.innerHeight + 80) {
        const P = progressOf(secB);
        const { ctx, w, h } = sizeB;
        
        const c_val = smooth(invlerp(0.00, 0.40, P));
        const a_val = smooth(invlerp(0.40, 0.70, P));
        const v_val = smooth(invlerp(0.70, 1.00, P));
        ctx.clearRect(0, 0, w, h);

        const cx = w / 2, cy = h * (isMobile() ? 0.30 : 0.40);
        const encW = Math.min(w * 0.82, 560), encH = Math.min(h * (isMobile() ? 0.36 : 0.42), 340);
        const ex = cx - encW / 2, ey = cy - encH / 2;

        ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(0,229,255,0.7)'; ctx.fillStyle = 'rgba(0,229,255,0.05)';
        rr(ctx, ex, ey, encW, encH, 22); ctx.fill(); ctx.stroke();
        ctx.save(); ctx.shadowColor = 'rgba(0,229,255,0.5)'; ctx.shadowBlur = 16; rr(ctx, ex, ey, encW, encH, 22); ctx.stroke(); ctx.restore();
        drawLock(ctx, cx, ey - 6, 26, 1);
        
        ctx.globalAlpha = 0.4 + 0.5 * v_val; ctx.fillStyle = 'rgba(154,184,196,0.9)'; ctx.font = `${isMobile() ? '10px' : '11px'} ui-monospace, 'SF Mono', Menlo, monospace`;
        ctx.textAlign = 'center'; ctx.fillText('memory encrypted · data never leaves', cx, ey + encH + 20); ctx.globalAlpha = 1;

        const padX = encW * 0.12, padY = encH * 0.20, innerW = encW - 2 * padX, innerH = encH - 2 * padY;
        const CP = { x: cx, y: ey + encH - padY * 0.4 };
        const wave = (t * 0.45) % 1;
        const netAlpha = (0.25 + 0.75 * c_val) * (1 - a_val);
        const L = netLayers.length; const pts: any[] = [];
        
        for (let li = 0; li < L; li++) {
          const lx0 = ex + padX + innerW * (L === 1 ? 0.5 : li / (L - 1)); const n = netLayers[li]; const col: any[] = [];
          for (let k = 0; k < n; k++) {
            const ly = ey + padY + innerH * (n === 1 ? 0.5 : k / (n - 1));
            col.push({ x: lerp(lx0, CP.x, a_val), y: lerp(ly, CP.y, a_val), lf: (L === 1 ? 0 : li / (L - 1)) });
          } pts.push(col);
        }
        
        if (netAlpha > 0.02) {
          ctx.lineWidth = 1;
          for (let li = 0; li < L - 1; li++) {
            for (const A of pts[li]) for (const B of pts[li + 1]) {
              const lit = 1 - Math.min(1, Math.abs(wave - (A.lf + 0.5 / (L - 1))) * 4);
              ctx.strokeStyle = `rgba(0,229,255,${(netAlpha * (0.05 + 0.18 * lit)).toFixed(3)})`;
              ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
            }
          }
          for (let li = 0; li < L; li++) {
            for (const A of pts[li]) {
              const lit = 1 - Math.min(1, Math.abs(wave - A.lf) * 4);
              const r = (2.0 + 2.2 * lit) * (1 - 0.4 * a_val); ctx.globalAlpha = netAlpha;
              if (lit > 0.5) glow(ctx, A.x, A.y, r, 'rgba(0,229,255,0.9)', 8 * lit);
              else { ctx.fillStyle = 'rgba(0,229,255,0.55)'; ctx.beginPath(); ctx.arc(A.x, A.y, r, 0, Math.PI * 2); ctx.fill(); }
              ctx.globalAlpha = 1;
            }
          }
        }
        if (a_val > 0.05) {
          const coreAlpha = a_val * (1 - v_val * 0.2);
          glow(ctx, CP.x, CP.y, 3 + 5 * a_val, `rgba(0,229,255,${(0.9 * coreAlpha).toFixed(2)})`, 16 * a_val);
        }

        const chainY = h * (isMobile() ? 0.72 : 0.86); const bs = isMobile() ? 15 : 20, gap = bs * 1.8;
        const blocks = [{ x: cx - gap, y: chainY }, { x: cx, y: chainY }, { x: cx + gap, y: chainY }];
        ctx.strokeStyle = 'rgba(0,229,255,0.25)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(blocks[0].x, chainY); ctx.lineTo(blocks[2].x, chainY); ctx.stroke();
        for (let bi = 0; bi < 3; bi++) {
          const b = blocks[bi]; const recv = bi === 1 ? v_val : 0;
          ctx.fillStyle = 'rgba(26,34,52,0.95)'; ctx.strokeStyle = `rgba(0,229,255,${(0.4 + 0.55 * recv).toFixed(2)})`; ctx.lineWidth = 1.5 + 2 * recv;
          rr(ctx, b.x - bs / 2, b.y - bs / 2, bs, bs, 4); ctx.fill(); ctx.stroke();
          if (recv > 0) {
            ctx.save(); ctx.shadowColor = 'rgba(0,229,255,0.8)'; ctx.shadowBlur = 14 * recv; ctx.strokeStyle = `rgba(0,229,255,${(0.8 * recv).toFixed(2)})`;
            rr(ctx, b.x - bs / 2, b.y - bs / 2, bs, bs, 4); ctx.stroke(); ctx.restore();
          }
        }
        ctx.fillStyle = 'rgba(154,184,196,0.8)'; ctx.font = `10px ui-monospace, 'SF Mono', Menlo, monospace`; ctx.textAlign = 'center';
        ctx.globalAlpha = 0.5 + 0.5 * v_val; ctx.fillText('BASE MAINNET', cx, chainY + bs + 14); ctx.globalAlpha = 1;

        if (v_val > 0.01) {
          const from = { x: CP.x, y: CP.y }, to = { x: cx, y: chainY - bs * 0.6 }; const tt = smooth(v_val);
          const px = lerp(from.x, to.x, tt), py = lerp(from.y, to.y, tt);
          ctx.strokeStyle = 'rgba(0,229,255,0.25)'; ctx.setLineDash([3, 5]); ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(from.x, from.y); ctx.lineTo(px, py); ctx.stroke(); ctx.setLineDash([]);
          drawHexToken(ctx, px, py, isMobile() ? 8 : 11, 1);
        }

        if (P > 0.34) {
          hashline.style.opacity = '1';
          if (a_val >= 1) {
            if (scrambleCache !== COMMIT_HASH) { scrambleCache = COMMIT_HASH; hashText.textContent = COMMIT_HASH; }
            hlLabel.textContent = 'SHA-256 COMMITMENT'; hashText.style.color = 'var(--accent)';
          } else {
            if (now - lastScramble > 55) { lastScramble = now; scrambleCache = renderHash(a_val); hashText.textContent = scrambleCache; }
            hlLabel.textContent = 'SHA-256 COMMITMENT · COMPUTING…'; hashText.style.color = 'var(--text-primary)';
          }
          if (v_val > 0.6) {
            hlTx.style.opacity = '1'; hlTx.style.pointerEvents = 'auto';
          } else {
            hlTx.style.opacity = '0'; hlTx.style.pointerEvents = 'none';
          }
        } else {
          hashline.style.opacity = '0';
        }

        setHUD(capsB, stepsB, phaseB(P), hudRefB);
        railFillB.style.height = `${(P * 100).toFixed(1)}%`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="neurolix-visualizer bg-[var(--bg-primary)] font-sans text-[var(--text-primary)]">
      
      {/* SCENE A (Hero + Network + Zoom) */}
      <section id="sceneA" className="relative h-[450vh] md:h-[450vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          {/* Canvas Wrapper - Occupa tutto lo spazio superiore dinamicamente */}
          <div className="flex-1 relative w-full">
            <canvas ref={canvasARef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(120% 100% at 50% 50%, transparent 60%, rgba(10,14,26,0.6) 100%)' }} aria-hidden="true"></div>
            
          {/* HERO TEXT OVERLAY (Ottimizzato per Mobile) */}
          <div id="hero-text" 
            className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pb-[14vh] md:pb-0"
            style={{ transition: 'opacity 0.1s' }}
          >
            {/* Il Badge superiore */}
            <span style={{
              display: 'inline-block',
              marginBottom: '28px',
              fontSize: '11px',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: '1px solid #00E5FF',
              backgroundColor: 'rgba(0, 229, 255, 0.08)',
              color: '#00E5FF',
              backdropFilter: 'blur(4px)',
              fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            }}>
              Building in public · Base L2 · Confidential AI
            </span>
            
            {/* Il Titolo Principale - Forzatura contrasto e formato nativo */}
            <h1 style={{
              fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(38px, 5.2vw, 60px)",
              lineHeight: "1.05",
              letterSpacing: "-0.04em",
              textTransform: "none",
              fontWeight: "800",
              margin: "0 0 24px 0",
              padding: 0,
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale"
            }}>
              <span style={{ color: "#FFFFFF" }}>Confidential AI Compute.</span><br />
              <span style={{ 
                color: "#00E5FF",
                textShadow: "0 0 30px rgba(0, 229, 255, 0.35)" 
              }}>
                Verified On-Chain.
              </span>
            </h1>

            {/* Il Paragrafo Descrittivo */}
            <p style={{
              fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: "17px",
              lineHeight: "1.6",
              color: "#9ca3af",
              maxWidth: "540px",
              margin: "0 0 40px 0",
              WebkitFontSmoothing: "antialiased"
            }}>
              DePIN infrastructure for AI training and inference on regulated data.
              Hardware-enforced privacy in TEE enclaves, cryptographic attestation anchored to Base L2.
            </p>
            
            {/* I Pulsanti di Azione */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <a href="https://medium.com/@neurolixprotocol" target="_blank" rel="noopener noreferrer"
                 style={{
                   display: 'inline-flex',
                   alignItems: 'center',
                   padding: '12px 26px',
                   fontSize: '14px',
                   fontWeight: 600,
                   borderRadius: '4px',
                   textDecoration: 'none',
                   backgroundColor: '#00E5FF',
                   color: '#0a0e1a',
                   fontFamily: "Inter, -apple-system, sans-serif",
                   transition: 'background-color 0.2s'
                 }}>
                Read the documentation
              </a>
              <a href="https://base-sepolia.blockscout.com/tx/0x7028c7a621f262753cfce13f060f388be00afabcc0e5930248dbadc1f09e5c5b" target="_blank" rel="noopener noreferrer"
                 style={{
                   display: 'inline-flex',
                   alignItems: 'center',
                   padding: '12px 26px',
                   fontSize: '14px',
                   fontWeight: 600,
                   borderRadius: '4px',
                   textDecoration: 'none',
                   border: '1px solid #1f2937',
                   backgroundColor: 'rgba(17,24,39,0.75)',
                   color: '#f3f4f6',
                   backdropFilter: 'blur(4px)',
                   fontFamily: "Inter, -apple-system, sans-serif",
                   transition: 'border-color 0.2s'
                 }}>
                View on-chain proof →
              </a>
            </div>
          </div>

          </div> {/* <-- Chiusura fondamentale del Canvas Wrapper */}

          {/* HUD CARDS SCENE A - Inserito nel normale flusso flex */}
          <div className="relative z-10 shrink-0 flex justify-center pointer-events-none px-4 md:px-6 pb-8 md:pb-[6vh] w-full">
            <div className="relative w-full max-w-[560px] min-h-[90px] md:min-h-[104px] hudA">
              {[
                { step: '01 / NETWORK', title: 'A mesh of confidential compute nodes', desc: 'Independent providers, each running a hardware-secured enclave.' },
                { step: '02 / TARGET NODE', title: 'Zooming into a single provider', desc: "A workload is routed to one node's Trusted Execution Environment." },
                { step: '03 / INPUT', title: 'Sensitive data enters the enclave', desc: 'The prompt is encrypted in transit — readable only inside the boundary.' },
                { step: '04 / SEALED', title: 'Memory encrypted at silicon level', desc: 'The boundary locks. Data is now isolated inside the hardware.' }
              ].map((cap, i) => (
                <div key={i} data-phase={i} className="cap-a absolute left-0 right-0 bottom-0 border border-[var(--border)] border-l-2 border-l-[var(--accent)] rounded-xl p-4 opacity-0 translate-y-2 transition-all duration-500" style={{ background: 'rgba(17,24,39,0.82)', backdropFilter: 'blur(10px)' }}>
                  <div className="font-mono text-[10px] md:text-[11px] tracking-[2px] text-[var(--accent)]">{cap.step}</div>
                  <div className="text-[14px] md:text-[17px] font-bold my-0.5 md:my-1 text-[var(--text-primary)]">{cap.title}</div>
                  <div className="text-[12px] md:text-[13px] text-[var(--text-secondary)] leading-relaxed">{cap.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RAILS SCENE A */}
          <div className="hidden md:block absolute top-1/2 right-[22px] -translate-y-1/2 z-10 w-[2px] h-[180px] bg-[var(--border)] rounded-sm overflow-hidden opacity-0 transition-opacity duration-500" style={{ opacity: 1 }}> {/* La rail potrebbe essere nascosta in hero phase volendo */}
            <div className="rail-fill-a absolute top-0 left-0 w-full bg-[var(--accent)] h-0 transition-all duration-100" style={{ boxShadow: '0 0 10px var(--accent)' }}></div>
          </div>
          <div className="hidden md:flex absolute top-1/2 right-[30px] -translate-y-1/2 z-10 flex-col justify-between h-[180px] steps-a">
            {['NET', 'NODE', 'IN', 'SEAL'].map((s, i) => (
              <span key={i} data-step={i} className="font-mono text-[9px] text-[var(--text-secondary)] tracking-[1px] transition-colors duration-300">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SCENE B (Compute -> Chain) */}
      <section id="sceneB" className="relative h-[360vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          {/* Canvas Wrapper */}
          <div className="flex-1 relative w-full">
            <canvas ref={canvasBRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(120% 100% at 50% 50%, transparent 60%, rgba(10,14,26,0.6) 100%)' }} aria-hidden="true"></div>

            <div id="hashline" className="absolute left-0 right-0 bottom-[36%] md:bottom-[22vh] z-10 flex flex-col items-center gap-1.5 px-4 md:px-6 pointer-events-none opacity-0 transition-opacity duration-500">
            <div id="hlLabel" className="font-mono text-[9px] md:text-[10px] tracking-[2px] text-[var(--accent)]">SHA-256 COMMITMENT · COMPUTING…</div>
            <code id="hashText" className="font-mono text-[10px] sm:text-[12px] md:text-[15px] text-[var(--text-primary)] border border-[var(--border)] rounded-lg px-3 py-1.5 md:px-4 md:py-2 max-w-[94vw] break-all text-center leading-[1.4]" style={{ background: 'rgba(17,24,39,0.85)', backdropFilter: 'blur(4px)' }}>
              ________________________________________________________________
            </code>
            <a id="hlTx" href="https://basescan.org/tx/0x7028c7a621f262753cfce13f060f388be00afabcc0e5930248dbadc1f09e5c5b" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] md:text-[11px] text-[var(--accent)] opacity-0 transition-opacity duration-500 hover:underline mt-0.5 pointer-events-none">
              anchored on Base Mainnet · tx 0x7028…5c5b ↗
            </a>
          </div>

          </div> {/* <-- Chiusura fondamentale del Canvas Wrapper */}

          {/* HUD CARDS SCENE B - Inserito nel normale flusso flex */}
          <div className="relative z-10 shrink-0 flex justify-center pointer-events-none px-4 md:px-6 pb-8 md:pb-[6vh] w-full">
            <div className="relative w-full max-w-[560px] min-h-[136px] md:min-h-[104px] hudB">
              {[
                { step: '05 / COMPUTE', title: 'Inference runs inside the boundary', desc: 'GPT-2 · 124M params in an AMD SEV enclave. Data is in clear only inside.' },
                { step: '06 / ATTESTATION', title: 'The session is hashed into a SHA-256 commitment', desc: 'A cryptographic commitment is produced — proof, not data.' },
                { step: '07 / VERIFY', title: 'Anchored on Base Mainnet', desc: 'Only the commitment leaves the enclave. Anyone can verify it on-chain.' }
              ].map((cap, i) => (
                <div key={i} data-phase={i} className="cap-b absolute left-0 right-0 bottom-0 border border-[var(--border)] border-l-2 border-l-[var(--accent)] rounded-xl p-4 opacity-0 translate-y-2 transition-all duration-500" style={{ background: 'rgba(17,24,39,0.82)', backdropFilter: 'blur(10px)' }}>
                  <div className="font-mono text-[10px] md:text-[11px] tracking-[2px] text-[var(--accent)]">{cap.step}</div>
                  <div className="text-[14px] md:text-[17px] font-bold my-0.5 md:my-1 text-[var(--text-primary)]">{cap.title}</div>
                  <div className="text-[12px] md:text-[13px] text-[var(--text-secondary)] leading-relaxed">{cap.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block absolute top-1/2 right-[22px] -translate-y-1/2 z-10 w-[2px] h-[180px] bg-[var(--border)] rounded-sm overflow-hidden">
            <div className="rail-fill-b absolute top-0 left-0 w-full bg-[var(--accent)] h-0 transition-all duration-100" style={{ boxShadow: '0 0 10px var(--accent)' }}></div>
          </div>
          <div className="hidden md:flex absolute top-1/2 right-[30px] -translate-y-1/2 z-10 flex-col justify-between h-[180px] steps-b">
            {['CPU', 'ATTEST', 'CHAIN'].map((s, i) => (
              <span key={i} data-step={i} className="font-mono text-[9px] text-[var(--text-secondary)] tracking-[1px] transition-colors duration-300">{s}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}