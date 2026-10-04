import { useRef, useState } from "react";
import { GameFrame } from "@/components/games/frame";
import { ENDINGS, effortLine } from "@/lib/content";
import { blip } from "@/lib/audio";

type Card = { id: number; r: number; s: number };
type Board = {
  peaks: (Card | null)[][];
  stock: Card[];
  waste: Card[];
  recycle: number;
  removed: number;
  flips: number;
};

const COVERS: number[][] = [[1, 2], [3, 4], [4, 5], [], [], []];
const RANKS = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUIT = ["spades", "hearts", "clubs", "diamonds"];
const ROWS = [[0], [1, 2], [3, 4, 5]];

function shuffle(): Card[] {
  const cards: Card[] = [];
  let id = 1;
  for (let s = 0; s < 4; s++) {
    for (let r = 1; r <= 13; r++) cards.push({ id: id++, r, s });
  }
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = cards[i]!;
    cards[i] = cards[j]!;
    cards[j] = a;
  }
  return cards;
}

function deal(): Board {
  const d = shuffle();
  const peaks: (Card | null)[][] = [];
  for (let p = 0; p < 3; p++) {
    const row: (Card | null)[] = [];
    for (let i = 0; i < 6; i++) row.push(d.pop() ?? null);
    peaks.push(row);
  }
  return { peaks, stock: d, waste: [], recycle: 1, removed: 0, flips: 0 };
}

function isFree(peak: (Card | null)[], i: number) {
  return Boolean(peak[i]) && COVERS[i]!.every((k) => peak[k] == null);
}

function allClear(b: Board) {
  return b.peaks.every((p) => p.every((c) => c == null));
}

function scoreOf(b: Board, win: boolean) {
  return b.removed * 20 + (win ? 80 : 0) + (b.removed === 0 && b.flips > 0 ? 10 : 0);
}

function CardFace({
  card,
  free,
  hinted,
  onClick,
}: {
  card: Card;
  free: boolean;
  hinted: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={!free}
      onClick={onClick}
      aria-label={`${RANKS[card.r]} of ${SUIT[card.s]}`}
      className={`tap grid h-11 w-9 place-items-center rounded-md border text-[11px] leading-none ${
        hinted ? "border-primary" : "border-line"
      } ${free ? "bg-surface" : "bg-bg opacity-70"} ${card.s % 2 === 1 ? "text-flare" : "text-fg"}`}
    >
      <span className="font-medium">{RANKS[card.r]}</span>
      <span className="uppercase">{SUIT[card.s]?.slice(0, 1)}</span>
    </button>
  );
}

export function SolitaireGame({ best, onFinish }: { best: number; onFinish: (n: number) => void }) {
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [board, setBoard] = useState<Board | null>(null);
  const [hist, setHist] = useState<Board[]>([]);
  const [hint, setHint] = useState<number | "stock" | null>(null);
  const [score, setScore] = useState(0);
  const done = useRef(false);

  function begin() {
    done.current = false;
    setBoard(deal());
    setHist([]);
    setHint(null);
    setScore(0);
    setPhase("play");
  }

  function bank(b: Board, win: boolean) {
    if (done.current) return;
    const s = scoreOf(b, win);
    if (s <= 0 && !win) return;
    done.current = true;
    setScore(s);
    setPhase("over");
    if (win) blip(528, 0.22, 0.03);
    onFinish(s);
  }

  function play(p: number, i: number) {
    if (!board || done.current) return;
    const peak = board.peaks[p];
    if (!peak || !isFree(peak, i)) return;
    const card = peak[i];
    const top = board.waste[board.waste.length - 1];
    if (!card || !top || Math.abs(card.r - top.r) !== 1) return;
    const next = structuredClone(board);
    next.peaks[p]![i] = null;
    next.waste.push(card);
    next.removed += 1;
    setHist((h) => [...h.slice(-40), board]);
    setBoard(next);
    setHint(null);
    blip(741, 0.06, 0.02);
    if (allClear(next)) bank(next, true);
  }

  function flip() {
    if (!board || done.current) return;
    const next = structuredClone(board);
    if (next.stock.length) {
      const c = next.stock.pop();
      if (c) next.waste.push(c);
    } else if (next.recycle > 0 && next.waste.length > 1) {
      const top = next.waste.pop();
      next.stock = [...next.waste].reverse();
      next.waste = top ? [top] : [];
      next.recycle -= 1;
    } else return;
    next.flips += 1;
    setHist((h) => [...h.slice(-40), board]);
    setBoard(next);
    setHint(null);
    blip(432, 0.05, 0.016);
  }

  function undo() {
    const prev = hist[hist.length - 1];
    if (!prev || done.current) return;
    setBoard(prev);
    setHist((h) => h.slice(0, -1));
    setHint(null);
  }

  function showHint() {
    if (!board) return;
    const top = board.waste[board.waste.length - 1];
    if (!top) {
      setHint(board.stock.length || board.recycle ? "stock" : null);
      return;
    }
    for (let p = 0; p < 3; p++) {
      const peak = board.peaks[p]!;
      for (let i = 0; i < 6; i++) {
        const c = peak[i];
        if (c && isFree(peak, i) && Math.abs(c.r - top.r) === 1) {
          setHint(c.id);
          return;
        }
      }
    }
    setHint(board.stock.length || (board.recycle > 0 && board.waste.length > 1) ? "stock" : null);
  }

  const live = board ? scoreOf(board, false) : 0;
  const end = ENDINGS.solitaire;

  return (
    <GameFrame
      title="Sanity Solitaire"
      lede="Three peaks. Turn the stock, then play a free card one rank higher or lower. Kings don't meet aces."
      phase={phase}
      score={phase === "over" ? score : live}
      best={best}
      endTitle={end.title}
      endBody={effortLine(score, best, end.body)}
      onAgain={begin}
      onRest={board ? () => bank(board, false) : undefined}
      footer={
        phase === "ready" ? (
          <button type="button" className="tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg" onClick={begin}>
            Deal
          </button>
        ) : phase === "play" && board ? (
          <div className="flex flex-wrap gap-2">
            <button type="button" className="tap min-h-11 rounded-full border border-line px-4 text-sm" onClick={undo} disabled={!hist.length}>
              Undo
            </button>
            <button type="button" className="tap min-h-11 rounded-full border border-line px-4 text-sm" onClick={showHint}>
              Hint
            </button>
            <button type="button" className="tap min-h-11 rounded-full border border-line px-4 text-sm" onClick={begin}>
              Fresh deal
            </button>
          </div>
        ) : null
      }
    >
      {phase === "ready" || !board ? (
        <div className="grid h-full place-items-center px-6 pb-16 text-center text-sm text-muted">
          Free cards are the ones nothing sits on. One pass through the stock when it runs dry.
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between gap-2 p-2 pt-12">
          <div className="flex justify-center gap-2 overflow-x-auto">
            {board.peaks.map((peak, p) => (
              <div key={p} className="flex shrink-0 flex-col items-center gap-1">
                {ROWS.map((row, r) => (
                  <div key={r} className="flex gap-1">
                    {row.map((i) => {
                      const card = peak[i];
                      if (!card) return <span key={i} className="h-11 w-9" />;
                      return (
                        <CardFace
                          key={card.id}
                          card={card}
                          free={isFree(peak, i)}
                          hinted={hint === card.id}
                          onClick={() => play(p, i)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={flip}
              className={`tap grid h-14 w-11 place-items-center rounded-md border text-xs ${
                hint === "stock" ? "border-primary text-primary" : "border-line text-muted"
              }`}
            >
              {board.stock.length ? board.stock.length : board.recycle ? "Pass" : "—"}
            </button>
            <div className="grid h-14 w-11 place-items-center rounded-md border border-line bg-surface text-sm">
              {board.waste.length ? (
                <span className={board.waste[board.waste.length - 1]!.s % 2 === 1 ? "text-flare" : "text-fg"}>
                  {RANKS[board.waste[board.waste.length - 1]!.r]}
                </span>
              ) : (
                <span className="text-xs text-muted">Turn</span>
              )}
            </div>
          </div>
        </div>
      )}
    </GameFrame>
  );
}
