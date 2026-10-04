import { useRef, useState } from "react";
import { GameFrame } from "@/components/games/frame";
import { ENDINGS, effortLine } from "@/lib/content";
import { blip, type Tone } from "@/lib/audio";

const TONE: Tone[] = [432, 528, 741, 963];

export function RhythmGame({ best, onFinish }: { best: number; onFinish: (n: number) => void }) {
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [lit, setLit] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [note, setNote] = useState("Listen.");
  const seq = useRef<number[]>([]);
  const mode = useRef<"show" | "input">("show");
  const at = useRef(0);
  const phrases = useRef(0);
  const busy = useRef(false);
  const end = ENDINGS.rhythm;

  function sleep(ms: number) {
    return new Promise((r) => window.setTimeout(r, ms));
  }

  async function playback(pattern: number[]) {
    busy.current = true;
    mode.current = "show";
    setNote("Listen.");
    await sleep(400);
    for (const step of pattern) {
      setLit(step);
      blip(TONE[step] ?? 528, 0.12, 0.02);
      await sleep(420);
      setLit(null);
      await sleep(180);
    }
    mode.current = "input";
    at.current = 0;
    busy.current = false;
    setNote("Your turn. The window is wide.");
  }

  async function begin() {
    const first = [Math.floor(Math.random() * 4)];
    seq.current = first;
    phrases.current = 0;
    setScore(0);
    setPhase("play");
    await playback(first);
  }

  async function tap(i: number) {
    if (phase !== "play" || mode.current !== "input" || busy.current) return;
    setLit(i);
    window.setTimeout(() => setLit(null), 160);
    const expect = seq.current[at.current];
    if (i !== expect) {
      blip(285, 0.1, 0.018);
      setNote("Again, from the start of the phrase. No mark against you.");
      await playback(seq.current);
      return;
    }
    blip(TONE[i] ?? 528, 0.1, 0.02);
    at.current += 1;
    if (at.current < seq.current.length) return;
    phrases.current += 1;
    const s = phrases.current * 40;
    setScore(s);
    if (phrases.current >= 4) {
      setPhase("over");
      blip(528, 0.2, 0.03);
      onFinish(s);
      return;
    }
    seq.current = [...seq.current, Math.floor(Math.random() * 4)];
    await playback(seq.current);
  }

  function finish() {
    if (score <= 0) return;
    setPhase("over");
    onFinish(score);
  }

  return (
    <GameFrame
      title="Rhythm Resonance"
      lede="Four pads. Hear a short phrase, tap it back. Misses replay. They don't scold."
      phase={phase}
      score={score}
      best={best}
      endTitle={end.title}
      endBody={effortLine(score, best, end.body)}
      onAgain={() => void begin()}
      onRest={finish}
    >
      <div className="flex h-full flex-col items-center justify-center gap-4 p-4">
        {phase === "ready" ? (
          <button type="button" className="tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg" onClick={() => void begin()}>
            Hear the phrase
          </button>
        ) : (
          <>
            <p className="text-sm text-muted" aria-live="polite">
              {note}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Pad ${i + 1}`}
                  onClick={() => void tap(i)}
                  className={`tap size-24 rounded-full border ${lit === i ? "border-primary bg-primary/20" : "border-line bg-surface"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </GameFrame>
  );
}
