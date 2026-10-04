import { useRef, useState } from "react";
import { GameFrame } from "@/components/games/frame";
import { CYAN, FLARE, FROST, NIGHT } from "@/components/games/palette";
import { burst, drawParticles, stepParticles, traumaOffset, type Particle } from "@/components/games/juice";
import { fitCanvas, prefersReducedMotion, useRaf } from "@/components/games/engine";
import { ENDINGS, effortLine } from "@/lib/content";
import { blip } from "@/lib/audio";

type Bit = { lane: number; y: number; dust: boolean };

type Sim = {
  t: number;
  lane: number;
  y: number;
  spawn: number;
  bits: Bit[];
  dust: number;
  lanterns: number;
  particles: Particle[];
  trauma: number;
  dead: boolean;
};

function make(): Sim {
  return { t: 0, lane: 1, y: 0, spawn: 0.2, bits: [], dust: 0, lanterns: 3, particles: [], trauma: 0, dead: false };
}

export function DashGame({ best, onFinish }: { best: number; onFinish: (n: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<Sim>(make());
  const phaseRef = useRef<"ready" | "play" | "over">("ready");
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [score, setScore] = useState(0);
  const [lanterns, setLanterns] = useState(3);
  const done = useRef(false);
  const end = ENDINGS.dash;

  function setBoth(p: "ready" | "play" | "over") {
    phaseRef.current = p;
    setPhase(p);
  }

  function currentScore() {
    const s = simRef.current;
    return s.dust * 10 + Math.floor(s.t * 2);
  }

  function finish(force = false) {
    const raw = currentScore();
    const s = force ? Math.max(raw, 8) : raw;
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
    setLanterns(3);
    setBoth("play");
  }

  function shift(dir: number) {
    if (phaseRef.current !== "play") return;
    simRef.current.lane = Math.max(0, Math.min(2, simRef.current.lane + dir));
  }

  useRaf(phase === "play", (dt) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { w, h } = fitCanvas(canvas, ctx);
    const sim = simRef.current;
    const reduced = prefersReducedMotion();
    if (!sim.dead) {
      sim.t += dt;
      const speed = (reduced ? 70 : 110) + Math.min(80, sim.t * 2);
      sim.spawn -= dt;
      if (sim.spawn <= 0) {
        sim.spawn = reduced ? 1.1 : 0.85;
        sim.bits.push({
          lane: Math.floor(Math.random() * 3),
          y: -20,
          dust: Math.random() < 0.62,
        });
      }
      const py = h * 0.78;
      for (const bit of sim.bits) bit.y += speed * dt;
      const keep: Bit[] = [];
      for (const bit of sim.bits) {
        if (Math.abs(bit.y - py) < 22 && bit.lane === sim.lane) {
          const x = ((bit.lane + 0.5) * w) / 3;
          if (bit.dust) {
            sim.dust += 1;
            burst(sim.particles, x, py, 8, 60);
            blip(963, 0.05, 0.018);
          } else {
            sim.lanterns -= 1;
            sim.trauma = Math.min(1, sim.trauma + 0.45);
            setLanterns(sim.lanterns);
            blip(285, 0.1, 0.02);
            if (sim.lanterns <= 0) {
                sim.dead = true;
                finish(true);
              }
          }
          continue;
        }
        if (bit.y < h + 30) keep.push(bit);
      }
      sim.bits = keep;
      const shown = currentScore();
      setScore(shown);
    }
    if (!reduced) sim.trauma = Math.max(0, sim.trauma - dt * 1.3);
    else sim.trauma = 0;
    stepParticles(sim.particles, dt);
    const shake = traumaOffset(sim.trauma, sim.t);
    ctx.fillStyle = NIGHT;
    ctx.fillRect(0, 0, w, h);
    ctx.save();
    ctx.translate(shake.x, shake.y);
    for (let lane = 0; lane < 3; lane++) {
      ctx.strokeStyle = "rgba(238,246,255,0.12)";
      ctx.beginPath();
      ctx.moveTo(((lane + 0.5) * w) / 3, 0);
      ctx.lineTo(((lane + 0.5) * w) / 3, h);
      ctx.stroke();
    }
    for (const bit of sim.bits) {
      const x = ((bit.lane + 0.5) * w) / 3;
      ctx.beginPath();
      ctx.fillStyle = bit.dust ? CYAN : "transparent";
      ctx.strokeStyle = bit.dust ? CYAN : FLARE;
      ctx.lineWidth = 2;
      ctx.arc(x, bit.y, bit.dust ? 8 : 12, 0, Math.PI * 2);
      if (bit.dust) ctx.fill();
      else ctx.stroke();
    }
    const px = ((sim.lane + 0.5) * w) / 3;
    ctx.beginPath();
    ctx.fillStyle = FROST;
    ctx.arc(px, h * 0.78, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    drawParticles(ctx, sim.particles);
  });

  return (
    <GameFrame
      title="Stardust Dash"
      lede="Move the lantern. Collect the bright dust. Let the hollow rings pass. Rest when you like."
      phase={phase}
      score={score}
      best={best}
      endTitle={end.title}
      endBody={effortLine(score, best, end.body)}
      onAgain={begin}
      onRest={finish}
      hud={<p className="pointer-events-none absolute top-3 right-3 text-xs text-muted">{lanterns} lanterns</p>}
      footer={
        phase === "play" ? (
          <div className="grid grid-cols-2 gap-2">
            <button type="button" className="tap min-h-14 rounded-2xl border border-line text-primary" onClick={() => shift(-1)}>
              Left
            </button>
            <button type="button" className="tap min-h-14 rounded-2xl border border-line text-primary" onClick={() => shift(1)}>
              Right
            </button>
          </div>
        ) : phase === "ready" ? (
          <button type="button" className="tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg" onClick={begin}>
            Light the lantern
          </button>
        ) : null
      }
    >
      {phase === "ready" ? (
        <div className="grid h-full place-items-center px-6 text-center text-sm text-muted">
          Three lanes. Bright motes are yours. Hollow rings are only weather.
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="h-full w-full touch-none"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") shift(-1);
            if (e.key === "ArrowRight") shift(1);
          }}
          tabIndex={0}
        />
      )}
    </GameFrame>
  );
}
