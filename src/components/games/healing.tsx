import { useEffect, useRef, useState } from "react";
import { GameFrame } from "@/components/games/frame";
import { ENDINGS, TONES, effortLine } from "@/lib/content";
import { blip, startPad, stopPad, unlockAudio } from "@/lib/audio";

export function HealingGame({
  best,
  onFinish,
  onBreath,
}: {
  best: number;
  onFinish: (n: number) => void;
  onBreath: () => void;
}) {
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [held, setHeld] = useState<number | null>(null);
  const [heard, setHeard] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const heardRef = useRef<number[]>([]);
  const started = useRef(0);
  const end = ENDINGS.healing;

  useEffect(() => () => stopPad(), []);

  function begin() {
    heardRef.current = [];
    setHeard([]);
    setHeld(null);
    setScore(0);
    setPhase("play");
  }

  function down(freq: (typeof TONES)[number]["freq"]) {
    unlockAudio();
    started.current = performance.now();
    setHeld(freq);
    startPad(freq);
  }

  function up(freq: number) {
    stopPad();
    setHeld(null);
    const long = performance.now() - started.current > 350;
    if (!long || heardRef.current.includes(freq)) return;
    const next = [...heardRef.current, freq];
    heardRef.current = next;
    setHeard(next);
    setScore(next.length * 20);
    onBreath();
    blip(741, 0.05, 0.012);
  }

  function finish() {
    if (score <= 0) return;
    setPhase("over");
    stopPad();
    blip(528, 0.2, 0.028);
    onFinish(score);
  }

  return (
    <GameFrame
      title="Healing Hz"
      lede="Hold a tone. Only these six, and only softly. They are not medicine."
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
            Sit with the tones
          </button>
        </div>
      ) : (
        <ul className="grid h-full content-center gap-2 p-3">
          {TONES.map((tone) => (
            <li key={tone.freq}>
              <button
                type="button"
                className={`tap flex min-h-12 w-full items-center justify-between rounded-2xl border px-4 text-left ${
                  held === tone.freq ? "border-primary bg-surface" : "border-line"
                }`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  down(tone.freq);
                }}
                onPointerUp={() => up(tone.freq)}
                onPointerLeave={() => {
                  if (held === tone.freq) up(tone.freq);
                }}
              >
                <span>
                  <span className="tabular-nums text-primary">{tone.name}</span>
                  <span className="mt-0.5 block text-xs text-muted">{tone.note}</span>
                </span>
                {heard.includes(tone.freq) && <span className="text-xs text-primary">Kept</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </GameFrame>
  );
}
