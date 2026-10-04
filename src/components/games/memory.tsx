import { useState } from "react";
import { GameFrame } from "@/components/games/frame";
import { ENDINGS, effortLine } from "@/lib/content";
import { blip } from "@/lib/audio";

type Card = { id: number; k: number; up: boolean; held: boolean };

const KIND = ["ring", "dot", "diamond", "plus", "wave", "arc", "square", "spark"];

function deal(): Card[] {
  const ks = [...KIND, ...KIND];
  for (let i = ks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = ks[i]!;
    ks[i] = ks[j]!;
    ks[j] = a;
  }
  return ks.map((k, id) => ({ id, k: KIND.indexOf(k), up: false, held: false }));
}

function Face({ k }: { k: number }) {
  const common = "stroke-primary fill-none";
  if (k === 0) return <svg viewBox="0 0 40 40" className="size-7"><circle cx="20" cy="20" r="10" className={common} strokeWidth="2" /></svg>;
  if (k === 1) return <svg viewBox="0 0 40 40" className="size-7"><circle cx="20" cy="20" r="5" className="fill-primary" /></svg>;
  if (k === 2) return <svg viewBox="0 0 40 40" className="size-7"><path d="M20 8 L32 20 L20 32 L8 20 Z" className={common} strokeWidth="2" /></svg>;
  if (k === 3) return <svg viewBox="0 0 40 40" className="size-7"><path d="M20 8 V32 M8 20 H32" className={common} strokeWidth="2" /></svg>;
  if (k === 4) return <svg viewBox="0 0 40 40" className="size-7"><path d="M6 24 Q13 12 20 24 T34 24" className={common} strokeWidth="2" /></svg>;
  if (k === 5) return <svg viewBox="0 0 40 40" className="size-7"><path d="M10 28 A12 12 0 1 1 30 28" className={common} strokeWidth="2" /></svg>;
  if (k === 6) return <svg viewBox="0 0 40 40" className="size-7"><rect x="10" y="10" width="20" height="20" className={common} strokeWidth="2" /></svg>;
  return <svg viewBox="0 0 40 40" className="size-7"><path d="M20 8 L22 18 L32 20 L22 22 L20 32 L18 22 L8 20 L18 18 Z" className="fill-flare" /></svg>;
}

export function MemoryGame({ best, onFinish }: { best: number; onFinish: (n: number) => void }) {
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [cards, setCards] = useState<Card[]>([]);
  const [lock, setLock] = useState(false);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0);
  const end = ENDINGS.memory;
  const pairs = cards.filter((c) => c.held).length / 2;

  function begin() {
    setCards(deal());
    setLock(false);
    setTurns(0);
    setScore(0);
    setPhase("play");
  }

  function finish(s: number) {
    if (s <= 0) return;
    setScore(s);
    setPhase("over");
    blip(528, 0.2, 0.03);
    onFinish(s);
  }

  function flip(id: number) {
    if (lock || phase !== "play") return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.up || card.held) return;
    const up = cards.map((c) => (c.id === id ? { ...c, up: true } : c));
    const open = up.filter((c) => c.up && !c.held);
    setCards(up);
    blip(432, 0.04, 0.016);
    if (open.length < 2) return;
    setTurns((n) => n + 1);
    const [a, b] = open;
    if (!a || !b) return;
    if (a.k === b.k) {
      const held = up.map((c) => (c.k === a.k ? { ...c, held: true, up: true } : c));
      setCards(held);
      blip(963, 0.08, 0.02);
      const got = held.filter((c) => c.held).length / 2;
      if (got === 8) {
        const s = got * 30 + Math.max(0, 40 - turns) * 2;
        window.setTimeout(() => finish(s), 350);
      }
      return;
    }
    setLock(true);
    window.setTimeout(() => {
      setCards((curr) => curr.map((c) => (c.held ? c : { ...c, up: false })));
      setLock(false);
    }, 700);
  }

  return (
    <GameFrame
      title="Memory Ocean"
      lede="Turn two shells. Matches stay. The rest close on their own."
      phase={phase}
      score={phase === "over" ? score : Math.floor(pairs) * 30}
      best={best}
      endTitle={end.title}
      endBody={effortLine(score, best, end.body)}
      onAgain={begin}
      onRest={() => finish(Math.floor(pairs) * 30)}
    >
      {phase === "ready" ? (
        <div className="grid h-full place-items-center">
          <button type="button" className="tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg" onClick={begin}>
            Lay the shells
          </button>
        </div>
      ) : (
        <div className="grid h-full grid-cols-4 content-center gap-2 p-3">
          {cards.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => flip(card.id)}
              aria-label={card.up || card.held ? KIND[card.k] : "Face down shell"}
              className={`tap grid aspect-square place-items-center rounded-xl border ${
                card.up || card.held ? "border-primary bg-surface" : "border-line bg-bg"
              }`}
            >
              {(card.up || card.held) && <Face k={card.k} />}
            </button>
          ))}
        </div>
      )}
    </GameFrame>
  );
}
