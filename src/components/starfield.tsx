import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; p: number; tw: number; flare: boolean };

function makeStars(): Star[] {
  let s = 20261004;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  return Array.from({ length: 72 }, () => ({
    x: rand(),
    y: rand(),
    r: rand() * 1.15 + 0.25,
    p: rand() * Math.PI * 2,
    tw: 0.35 + rand() * 1.1,
    flare: rand() > 0.9,
  }));
}

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const stars = makeStars();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const draw = (t: number) => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const bw = Math.round(w * dpr);
      const bh = Math.round(h * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const glow = ctx.createRadialGradient(w * 0.7, h * 0.15, 10, w * 0.7, h * 0.2, w * 0.55);
      glow.addColorStop(0, "rgba(255,79,168,0.08)");
      glow.addColorStop(1, "rgba(0,1,3,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      const wash = ctx.createRadialGradient(w * 0.2, h * 0.8, 10, w * 0.3, h * 0.7, w * 0.6);
      wash.addColorStop(0, "rgba(0,255,240,0.05)");
      wash.addColorStop(1, "rgba(0,1,3,0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, w, h);
      for (const star of stars) {
        const tw = reduced ? 0.55 : 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.001 * star.tw + star.p));
        ctx.globalAlpha = tw;
        ctx.fillStyle = star.flare ? "#ff4fa8" : "#eef6ff";
        ctx.beginPath();
        ctx.arc(star.x * w, star.y * h, star.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    if (reduced) {
      draw(0);
      const onResize = () => draw(0);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const loop = (now: number) => {
      if (!document.hidden) draw(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 h-dvh w-full" aria-hidden />;
}
