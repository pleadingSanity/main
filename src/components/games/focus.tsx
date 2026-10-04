import { useRef, useState, type PointerEvent } from "react";
import { GameFrame } from "@/components/games/frame";
import { CYAN, FROST, NIGHT } from "@/components/games/palette";
import { fitCanvas, prefersReducedMotion, useRaf } from "@/components/games/engine";
import { ENDINGS, effortLine } from "@/lib/content";
import { blip } from "@/lib/audio";

export function FocusGame({
  best,
  onFinish,
  onBreath,
}: {
  best: number;
  onFinish: (n: number) => void;
  onBreath: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef<"ready" | "play" | "over">("ready");
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [score, setScore] = useState(0);
  const sim = useRef({ t: 0, rx: 0, ry: 0, score: 0, shown: 0, breaths: 0, near: 0 });
  const ring = useRef({ x: 0, y: 0, ready: false });
  const done = useRef(false);
  const end = ENDINGS.focus;

  function setBoth(p: "ready" | "play" | "over") {
    phaseRef.current = p;
    setPhase(p);
  }

  function begin() {
    done.current = false;
    sim.current = { t: 0, rx: 0, ry: 0, score: 0, shown: 0, breaths: 0, near: 0 };
    ring.current.ready = false;
    setScore(0);
    setBoth("play");
  }

  function finish() {
    const s = Math.floor(sim.current.score);
    if (done.current || s <= 0) return;
    done.current = true;
    setScore(s);
    setBoth("over");
    blip(528, 0.16, 0.025);
    onFinish(s);
  }

  useRaf(phase === "play", (dt) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const { w, h } = fitCanvas(canvas, ctx);
    const s = sim.current;
    const reduced = prefersReducedMotion();
    s.t += dt * (reduced ? 0.45 : 1);
    const cx = w / 2;
    const cy = h / 2;
    const mx = Math.sin(s.t * 0.65) * w * 0.28;
    const my = Math.cos(s.t * 0.48) * h * 0.22;
    const tx = cx + mx;
    const ty = cy + my;
    if (!ring.current.ready) {
      ring.current = { x: cx, y: cy, ready: true };
    }
    const k = 1 - Math.exp(-8 * dt);
    ring.current.x += (ring.current.x - ring.current.x) * 0;
    const followX = ring.current.x;
    const followY = ring.current.y;
    const dist = Math.hypot(followX - tx, followY - ty);
    if (dist < 42) {
      s.score += dt * 14;
      s.near += dt;
      if (s.near > 8) {
        s.near = 0;
        s.breaths += 1;
        onBreath();
      }
    }
    const shown = Math.floor(s.score);
    if (shown !== s.shown) {
      s.shown = shown;
      setScore(shown);
    }
    ctx.fillStyle = NIGHT;
    ctx.fillRect(0, 0, w, h);
    ctx.beginPath();
    ctx.strokeStyle = FROST;
    ctx.globalAlpha = 0.8;
    ctx.lineWidth = 2;
    ctx.arc(followX, followY, 36, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.fillStyle = CYAN;
    ctx.arc(tx, ty, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  function place(e: PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    ring.current.x = e.clientX - rect.left;
    ring.current.y = e.clientY - rect.top;
    ring.current.ready = true;
  }

  return (
    <GameFrame
      title="Cosmic Focus"
      lede="Drag the ring so it stays near the mote. No clock. Stop when you want."
      phase={phase}
      score={score}
      best={best}
      endTitle={end.title}
      endBody={effortLine(score, best, end.body)}
      onAgain={begin}
      onRest={finish}
    >
      {phase === "ready" ? (
        <div className="grid h-full place-items-center px-6 text-center">
          <button type="button" className="tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg" onClick={begin}>
            Stay with it
          </button>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="h-full w-full touch-none"
          onPointerDown={place}
          onPointerMove={(e) => {
            if (e.buttons) place(e);
          }}
        />
      )}
    </GameFrame>
  );
}
