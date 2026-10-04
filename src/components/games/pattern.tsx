import { useRef, useState, type PointerEvent } from "react";
import { GameFrame } from "@/components/games/frame";
import { CYAN, FROST, NIGHT } from "@/components/games/palette";
import { burst, drawParticles, stepParticles, type Particle } from "@/components/games/juice";
import { cssPoint, fitCanvas, useRaf } from "@/components/games/engine";
import { ENDINGS, effortLine } from "@/lib/content";
import { blip } from "@/lib/audio";

const STAR = [
  { x: 0.5, y: 0.2 },
  { x: 0.8, y: 0.38 },
  { x: 0.7, y: 0.72 },
  { x: 0.3, y: 0.72 },
  { x: 0.2, y: 0.38 },
  { x: 0.5, y: 0.48 },
];

type Sim = {
  seq: number[];
  mode: "show" | "input";
  clock: number;
  at: number;
  lives: number;
  score: number;
  particles: Particle[];
  dead: boolean;
};

function make(): Sim {
  return {
    seq: [Math.floor(Math.random() * STAR.length)],
    mode: "show",
    clock: 0,
    at: 0,
    lives: 3,
    score: 0,
    particles: [],
    dead: false,
  };
}

export function PatternGame({ best, onFinish }: { best: number; onFinish: (n: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<Sim>(make());
  const phaseRef = useRef<"ready" | "play" | "over">("ready");
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const done = useRef(false);
  const end = ENDINGS.pattern;

  function setBoth(p: "ready" | "play" | "over") {
    phaseRef.current = p;
    setPhase(p);
  }

  function finish(s: number) {
    if (done.current || s <= 0) return;
    done.current = true;
    setScore(s);
    setBoth("over");
    blip(528, 0.16, 0.028);
    onFinish(s);
  }

  function begin() {
    done.current = false;
    simRef.current = make();
    setScore(0);
    setLives(3);
    setBoth("play");
  }

  useRaf(phase === "play", (dt) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { w, h } = fitCanvas(canvas, ctx);
    const sim = simRef.current;
    if (sim.mode === "show" && !sim.dead) {
      sim.clock += dt;
      const slot = 0.7;
      const idx = Math.floor(sim.clock / slot);
      if (idx >= sim.seq.length) {
        sim.mode = "input";
        sim.at = 0;
      }
    }
    stepParticles(sim.particles, dt);
    ctx.fillStyle = NIGHT;
    ctx.fillRect(0, 0, w, h);
    const showIdx =
      sim.mode === "show" ? Math.floor(sim.clock / 0.7) : -1;
    const showing = sim.mode === "show" && sim.clock % 0.7 < 0.42;
    STAR.forEach((star, i) => {
      const x = star.x * w;
      const y = star.y * h;
      const hot = showing && sim.seq[showIdx] === i;
      ctx.beginPath();
      ctx.fillStyle = hot ? CYAN : FROST;
      ctx.globalAlpha = hot ? 1 : 0.75;
      ctx.arc(x, y, hot ? 16 : 10, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    if (sim.mode === "input" && sim.at > 0) {
      ctx.strokeStyle = CYAN;
      ctx.globalAlpha = 0.7;
      ctx.beginPath();
      for (let n = 0; n < sim.at; n++) {
        const s = STAR[sim.seq[n] ?? 0];
        if (!s) continue;
        const x = s.x * w;
        const y = s.y * h;
        if (n === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    drawParticles(ctx, sim.particles);
  });

  function tap(e: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    const sim = simRef.current;
    if (!canvas || phaseRef.current !== "play" || sim.mode !== "input" || sim.dead) return;
    const p = cssPoint(canvas, e);
    const rect = canvas.getBoundingClientRect();
    let hit = -1;
    let bestD = 36;
    STAR.forEach((star, i) => {
      const d = Math.hypot(star.x * rect.width - p.x, star.y * rect.height - p.y);
      if (d < bestD) {
        bestD = d;
        hit = i;
      }
    });
    if (hit < 0) return;
    if (hit !== sim.seq[sim.at]) {
      sim.lives -= 1;
      setLives(sim.lives);
      blip(285, 0.1, 0.02);
      if (sim.lives <= 0) {
        sim.dead = true;
        finish(sim.score);
        return;
      }
      sim.mode = "show";
      sim.clock = 0;
      return;
    }
    burst(sim.particles, p.x, p.y, 8, 70);
    blip(741, 0.06, 0.02);
    sim.at += 1;
    if (sim.at < sim.seq.length) return;
    sim.score = sim.seq.length * 80;
    setScore(sim.score);
    sim.seq.push(Math.floor(Math.random() * STAR.length));
    sim.mode = "show";
    sim.clock = 0;
    blip(528, 0.08, 0.02);
  }

  return (
    <GameFrame
      title="Pattern Galaxy"
      lede="Watch which stars wake, then tap them in order. Three gentle misses, then we stop."
      phase={phase}
      score={score}
      best={best}
      endTitle={end.title}
      endBody={effortLine(score, best, end.body)}
      onAgain={begin}
      onRest={() => finish(simRef.current.score)}
      hud={
        <p className="pointer-events-none absolute top-3 right-3 text-xs text-muted">
          {lives} quiet misses left
        </p>
      }
    >
      {phase === "ready" ? (
        <div className="grid h-full place-items-center">
          <button type="button" className="tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg" onClick={begin}>
            Watch the stars
          </button>
        </div>
      ) : (
        <canvas ref={canvasRef} className="h-full w-full touch-none" onPointerDown={tap} />
      )}
    </GameFrame>
  );
}
