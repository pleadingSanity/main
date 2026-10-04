import { useState } from "react";
import { GameFrame } from "@/components/games/frame";
import { ENDINGS, TRUTHS, effortLine } from "@/lib/content";
import { blip } from "@/lib/audio";

export function TruthGame({ best, onFinish }: { best: number; onFinish: (n: number) => void }) {
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [i, setI] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const end = ENDINGS.truth;
  const card = TRUTHS[i];

  function begin() {
    setI(0);
    setCorrect(0);
    setPicked(null);
    setScore(0);
    setPhase("play");
  }

  function choose(ok: boolean) {
    if (!card || picked !== null) return;
    const hit = ok === card.ok;
    setPicked(ok);
    if (hit) {
      setCorrect((c) => c + 1);
      blip(741, 0.08, 0.02);
    } else blip(285, 0.08, 0.018);
  }

  function next() {
    if (picked === null) return;
    if (i + 1 >= TRUTHS.length) {
      const s = Math.max(10, correct * 15);
      setScore(s);
      setPhase("over");
      blip(528, 0.18, 0.03);
      onFinish(s);
      return;
    }
    setI((n) => n + 1);
    setPicked(null);
  }

  return (
    <GameFrame
      title="Truth Tag"
      lede="Ten lines. Say if they hold. Then read why. No clock."
      phase={phase}
      score={phase === "over" ? score : correct * 15}
      best={best}
      endTitle={end.title}
      endBody={effortLine(score, best, end.body)}
      onAgain={begin}
    >
      {phase !== "play" || !card ? (
        <div className="grid h-full place-items-center px-6 text-center">
          {phase === "ready" && (
            <button type="button" className="tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg" onClick={begin}>
              Begin
            </button>
          )}
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between gap-4 p-4">
          <p className="text-xs text-muted">
            {i + 1} of {TRUTHS.length}
          </p>
          <p className="text-lg leading-relaxed text-fg">{card.line}</p>
          {picked === null ? (
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="tap min-h-12 rounded-2xl bg-primary font-medium text-bg" onClick={() => choose(true)}>
                Holds
              </button>
              <button type="button" className="tap min-h-12 rounded-2xl border border-line" onClick={() => choose(false)}>
                Doesn't
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-sm leading-relaxed text-muted">{card.why}</p>
              <button type="button" className="tap min-h-12 rounded-full bg-primary font-medium text-bg" onClick={next}>
                {i + 1 >= TRUTHS.length ? "Keep this" : "Next"}
              </button>
            </div>
          )}
        </div>
      )}
    </GameFrame>
  );
}
