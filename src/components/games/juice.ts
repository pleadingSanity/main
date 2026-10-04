import { CYAN, FROST } from "@/components/games/palette";

export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  r: number;
};

export function burst(list: Particle[], x: number, y: number, n: number, speed: number) {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n + Math.random() * 0.4;
    const s = speed * (0.45 + Math.random() * 0.6);
    list.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0.45,
      max: 0.45,
      r: 1.3 + Math.random() * 1.5,
    });
  }
  if (list.length > 80) list.splice(0, list.length - 80);
}

export function stepParticles(list: Particle[], dt: number) {
  for (let i = list.length - 1; i >= 0; i--) {
    const p = list[i];
    if (!p) continue;
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.life <= 0) list.splice(i, 1);
  }
}

export function drawParticles(ctx: CanvasRenderingContext2D, list: Particle[]) {
  ctx.save();
  for (const p of list) {
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = CYAN;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

export function traumaOffset(trauma: number, t: number) {
  const s = trauma * trauma;
  const n1 = Math.sin(t * 37) * Math.cos(t * 15);
  const n2 = Math.cos(t * 29) * Math.sin(t * 18);
  return { x: n1 * 7 * s, y: n2 * 5 * s };
}

export function drawStars(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  for (let i = 0; i < 28; i++) {
    const x = ((i * 97) % 100) / 100 * w;
    const y = ((i * 53) % 100) / 100 * h;
    const a = 0.15 + 0.2 * (0.5 + 0.5 * Math.sin(t * 0.8 + i));
    ctx.globalAlpha = a;
    ctx.fillStyle = i % 7 === 0 ? CYAN : FROST;
    ctx.fillRect(x, y, 1.4, 1.4);
  }
  ctx.globalAlpha = 1;
}
