import { useMemo, useState } from "react";
import { GameFrame } from "@/components/games/frame";
import { ENDINGS, effortLine } from "@/lib/content";
import { blip } from "@/lib/audio";

type Tile = { id: number; k: number; c: number; r: number; on: boolean };

const GLYPH = ["○", "◇", "△", "＋", "✦", "◌", "▢", "✧"];

function deal(): Tile[] {
  const kinds = [0, 1, 2, 3, 4, 5, 6, 7, 0, 1, 2, 3, 4, 5, 6, 7];
  for (let i = kinds.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = kinds[i]!;
    kinds[i] = kinds[j]!;
    kinds[j] = a;
  }
  return kinds.map((k, i) => ({ id: i, k, c: i % 4, r: Math.floor(i / 4), on: true }));
}

function aligned(a: Tile, b: Tile, tiles: Tile[]) {
  if (a.k !== b.k || a.id === b.id) return false;
  if (a.c === b.c) {
    const lo = Math.min(a.r, b.r);
    const hi = Math.max(a.r, b.r);
    return !tiles.some((t) => t.on && t.c === a.c && t.r > lo && t.r < hi);
  }
  if (a.r === b.r) {
    const lo = Math.min(a.c, b.c);
    const hi = Math.max(a.c, b.c);
    return !tiles.some((t) => t.on && t.r === a.r && t.c > lo && t.c < hi);
  }
  return false;
}

export function ConnectGame({ best, onFinish }: { best: number; onFinish: (n: number) => void }) {
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [pick, setPick] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [bad, setBad] = useState(false);
  const end = ENDINGS.connect;
  const left = tiles.filter((t) => t.on).length;

  function begin() {
    setTiles(deal());
    setPick(null);
    setScore(0);
    setBad(false);
    setPhase("play");
  }

  function finish(s: number) {
    if (s <= 0) return;
    setScore(s);
    setPhase("over");
    blip(528, 0.18, 0.03);
    onFinish(s);
  }

  function tap(tile: Tile) {
    if (!tile.on || phase !== "play") return;
    if (pick === null) {
      setPick(tile.id);
      blip(432, 0.05, 0.016);
      return;
    }
    if (pick === tile.id) {
      setPick(null);
      return;
    }
    const a = tiles.find((t) => t.id === pick);
    if (!a) return;
    if (aligned(a, tile, tiles)) {
      const next = tiles.map((t) => (t.id === a.id || t.id === tile.id ? { ...t, on: false } : t));
      const s = score + 25;
      setTiles(next);
      setScore(s);
      setPick(null);
      setBad(false);
      blip(963, 0.08, 0.022);
      if (next.every((t) => !t.on)) finish(s + 40);
      return;
    }
    setBad(true);
    setPick(null);
    blip(285, 0.08, 0.018);
  }

  const stuck = useMemo(() => {
    const live = tiles.filter((t) => t.on);
    for (let i = 0; i < live.length; i++) {
      for (let j = i + 1; j < live.length; j++) {
        if (aligned(live[i]!, live[j]!, tiles)) return false;
      }
    }
    return live.length > 0;
  }, [tiles]);

  return (
    <GameFrame
      title="Cosmic Connect"
      lede="Tap two matching marks on the same row or column if nothing sits between them."
      phase={phase}
      score={score}
      best={best}
      endTitle={end.title}
      endBody={effortLine(score, best, end.body)}
      onAgain={begin}
      onRest={() => finish(score)}
      footer={
        phase === "ready" ? (
          <button type="button" className="tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg" onClick={begin}>
            Open the sky
          </button>
        ) : phase === "play" ? (
          <button type="button" className="tap min-h-11 rounded-full border border-line px-4 text-sm text-muted" onClick={begin}>
            Fresh sky
          </button>
        ) : null
      }
    >
      {phase === "ready" ? (
        <div className="grid h-full place-items-center px-6 text-center text-sm text-muted">
          Straight lines only. A blocked path just means try another pair.
        </div>
      ) : (
        <div className="grid h-full place-items-center">
          <div className="grid grid-cols-4 gap-2 p-4">
            {tiles.map((tile) => (
              <button
                key={tile.id}
                type="button"
                disabled={!tile.on}
                onClick={() => tap(tile)}
                className={`tap grid size-14 place-items-center rounded-xl border text-xl ${
                  !tile.on
                    ? "border-transparent text-transparent"
                    : pick === tile.id
                      ? "border-primary bg-surface text-primary"
                      : "border-line bg-surface text-fg"
                }`}
                aria-label={tile.on ? `Mark ${tile.k + 1}` : "Cleared"}
              >
                {tile.on ? GLYPH[tile.k] : ""}
              </button>
            ))}
          </div>
          {stuck && phase === "play" && (
            <p className="px-4 text-center text-sm text-muted">No clear line left. Fresh sky, or keep what you joined.</p>
          )}
          <p className="sr-only">{left} still lit. {bad ? "That pair didn't join." : ""}</p>
        </div>
      )}
    </GameFrame>
  );
}
