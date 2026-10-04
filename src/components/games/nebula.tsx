import { useRef, useState } from "react";
import { GameFrame } from "@/components/games/frame";
import { ENDINGS, effortLine } from "@/lib/content";
import { blip } from "@/lib/audio";

function spawn(g: number[]) {
  const open = g.flatMap((n, i) => (n === 0 ? [i] : []));
  if (!open.length) return false;
  g[open[Math.floor(Math.random() * open.length)]!] = Math.random() < 0.9 ? 2 : 4;
  return true;
}

function fresh() {
  const g = Array<number>(16).fill(0);
  spawn(g);
  spawn(g);
  return g;
}

function take(g: number[], dir: number, i: number) {
  const line: number[] = [];
  for (let k = 0; k < 4; k++) {
    if (dir === 0) line.push(g[i * 4 + k]!);
    else if (dir === 1) line.push(g[i * 4 + (3 - k)]!);
    else if (dir === 2) line.push(g[k * 4 + i]!);
    else line.push(g[(3 - k) * 4 + i]!);
  }
  return line;
}

function put(g: number[], dir: number, i: number, line: number[]) {
  for (let k = 0; k < 4; k++) {
    const v = line[k] ?? 0;
    if (dir === 0) g[i * 4 + k] = v;
    else if (dir === 1) g[i * 4 + (3 - k)] = v;
    else if (dir === 2) g[k * 4 + i] = v;
    else g[(3 - k) * 4 + i] = v;
  }
}

function squash(line: number[]) {
  const nums = line.filter((n) => n > 0);
  const out: number[] = [];
  let gained = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[i + 1]) {
      const v = (nums[i] ?? 0) * 2;
      out.push(v);
      gained += v;
      i++;
    } else out.push(nums[i] ?? 0);
  }
  while (out.length < 4) out.push(0);
  const moved = out.some((n, i) => n !== line[i]);
  return { out, gained, moved };
}

function canMove(g: number[]) {
  if (g.some((n) => n === 0)) return true;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const v = g[r * 4 + c];
      if (c < 3 && v === g[r * 4 + c + 1]) return true;
      if (r < 3 && v === g[(r + 1) * 4 + c]) return true;
    }
  }
  return false;
}

export function NebulaGame({ best, onFinish }: { best: number; onFinish: (n: number) => void }) {
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [grid, setGrid] = useState<number[]>(() => fresh());
  const [score, setScore] = useState(0);
  const origin = useRef({ x: 0, y: 0 });
  const end = ENDINGS.nebula;

  function begin() {
    setGrid(fresh());
    setScore(0);
    setPhase("play");
  }

  function finish(s: number) {
    if (s <= 0) return;
    setScore(s);
    setPhase("over");
    blip(528, 0.16, 0.028);
    onFinish(s);
  }

  function move(dir: number) {
    if (phase !== "play") return;
    const next = grid.slice();
    let gained = 0;
    let moved = false;
    for (let i = 0; i < 4; i++) {
      const line = take(next, dir, i);
      const squashed = squash(line);
      put(next, dir, i, squashed.out);
      gained += squashed.gained;
      moved = moved || squashed.moved;
    }
    if (!moved) return;
    spawn(next);
    const s = score + gained;
    setGrid(next);
    setScore(s);
    if (gained) blip(741, 0.06, 0.02);
  }

  return (
    <GameFrame
      title="Number Nebula"
      lede="Slide. Twins fold into one brighter shard. A full sky can be kept or opened again."
      phase={phase}
      score={score}
      best={best}
      endTitle={end.title}
      endBody={effortLine(score, best, end.body)}
      onAgain={begin}
      onRest={() => finish(score)}
      footer={
        phase === "play" ? (
          <div className="grid grid-cols-3 gap-2">
            <span />
            <button type="button" className="tap min-h-12 rounded-2xl border border-line" onClick={() => move(2)} aria-label="Slide up">
              Up
            </button>
            <span />
            <button type="button" className="tap min-h-12 rounded-2xl border border-line" onClick={() => move(0)} aria-label="Slide left">
              Left
            </button>
            <button type="button" className="tap min-h-12 rounded-2xl border border-line text-sm text-muted" onClick={begin}>
              Fresh
            </button>
            <button type="button" className="tap min-h-12 rounded-2xl border border-line" onClick={() => move(1)} aria-label="Slide right">
              Right
            </button>
            <span />
            <button type="button" className="tap min-h-12 rounded-2xl border border-line" onClick={() => move(3)} aria-label="Slide down">
              Down
            </button>
          </div>
        ) : phase === "ready" ? (
          <button type="button" className="tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg" onClick={begin}>
            Open a sky
          </button>
        ) : null
      }
    >
      <div
        className="grid h-full place-items-center p-3 touch-none"
        onPointerDown={(e) => {
          origin.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const dx = e.clientX - origin.current.x;
          const dy = e.clientY - origin.current.y;
          if (Math.hypot(dx, dy) < 28) return;
          if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : 0);
          else move(dy > 0 ? 3 : 2);
        }}
      >
        {phase === "ready" ? (
          <p className="px-6 text-center text-sm text-muted">Swipe or use the buttons. Nothing explodes.</p>
        ) : (
          <div>
            <div className="grid grid-cols-4 gap-2">
              {grid.map((n, i) => (
                <div
                  key={i}
                  className={`grid size-14 place-items-center rounded-xl border tabular-nums ${
                    n ? "border-primary bg-surface text-fg" : "border-line text-transparent"
                  }`}
                >
                  {n || ""}
                </div>
              ))}
            </div>
            {phase === "play" && !canMove(grid) && (
              <p className="mt-3 text-center text-sm text-muted">The sky is full. Keep it, or open another.</p>
            )}
          </div>
        )}
      </div>
    </GameFrame>
  );
}
