import { useState } from "react";
import { GameFrame } from "@/components/games/frame";
import { ENDINGS, MIND_BEATS, effortLine } from "@/lib/content";
import { blip } from "@/lib/audio";

export function MindGame({ best, onFinish }: { best: number; onFinish: (n: number) => void }) {
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [i, setI] = useState(0);
  const [reply, setReply] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const beat = MIND_BEATS[i];
  const end = ENDINGS.mind;

  function begin() {
    setI(0);
    setReply(null);
    setScore(0);
    setPhase("play");
  }

  function pick(text: string) {
    setReply(text);
    blip(432, 0.08, 0.02);
  }

  function next() {
    if (!reply) return;
    if (i + 1 >= MIND_BEATS.length) {
      setScore(80);
      setPhase("over");
      blip(528, 0.18, 0.03);
      onFinish(80);
      return;
    }
    setI((n) => n + 1);
    setReply(null);
  }

  return (
    <GameFrame
      title="Mind Mode"
      lede="Four thoughts. Two answers each. Neither is marked wrong."
      phase={phase}
      score={phase === "over" ? score : i * 20}
      best={best}
      endTitle={end.title}
      endBody={effortLine(score, best, end.body)}
      onAgain={begin}
    >
      {phase !== "play" || !beat ? (
        <div className="grid h-full place-items-center">
          {phase === "ready" && (
            <button type="button" className="tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg" onClick={begin}>
              Walk it
            </button>
          )}
        </div>
      ) : (
        <div className="flex h-full flex-col justify-between gap-4 overflow-auto p-4">
          <div>
            <p className="text-xs text-muted">
              Step {i + 1} of {MIND_BEATS.length}
            </p>
            <p className="mt-3 text-lg leading-relaxed">{beat.thought}</p>
          </div>
          {reply ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm leading-relaxed text-muted">{reply}</p>
              <button type="button" className="tap min-h-12 rounded-full bg-primary font-medium text-bg" onClick={next}>
                {i + 1 >= MIND_BEATS.length ? "Keep this walk" : "Next thought"}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <button type="button" className="tap min-h-12 rounded-2xl border border-line px-3 text-left text-sm" onClick={() => pick(beat.a.reply)}>
                {beat.a.label}
              </button>
              <button type="button" className="tap min-h-12 rounded-2xl border border-line px-3 text-left text-sm" onClick={() => pick(beat.b.reply)}>
                {beat.b.label}
              </button>
            </div>
          )}
        </div>
      )}
    </GameFrame>
  );
}
