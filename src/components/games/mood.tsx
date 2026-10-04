import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { GameFrame } from "@/components/games/frame";
import { ENDINGS, GAMES, MOODS, effortLine } from "@/lib/content";
import { blip } from "@/lib/audio";

export function MoodGame({
  best,
  onFinish,
  onMood,
}: {
  best: number;
  onFinish: (n: number) => void;
  onMood: (id: string) => void;
}) {
  const [phase, setPhase] = useState<"ready" | "play" | "over">("ready");
  const [pick, setPick] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const mood = MOODS.find((m) => m.id === pick);
  const room = GAMES.find((g) => g.slug === mood?.room);
  const end = ENDINGS.mood;

  function begin() {
    setPick(null);
    setScore(0);
    setPhase("play");
  }

  function choose(id: string) {
    setPick(id);
    onMood(id);
    blip(432, 0.1, 0.02);
  }

  function finish() {
    if (!pick) return;
    setScore(40);
    setPhase("over");
    blip(528, 0.16, 0.028);
    onFinish(40);
  }

  return (
    <GameFrame
      title="Mood Journey"
      lede="Name the weather. Not a diagnosis, and not a file on you beyond this device."
      phase={phase}
      score={phase === "over" ? score : pick ? 40 : 0}
      best={best}
      endTitle={end.title}
      endBody={effortLine(score, best, end.body)}
      onAgain={begin}
      onRest={finish}
    >
      {phase !== "play" ? (
        <div className="grid h-full place-items-center px-6 text-center text-sm text-muted">
          {phase === "ready" && (
            <button type="button" className="tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg" onClick={begin}>
              Name it
            </button>
          )}
        </div>
      ) : (
        <div className="flex h-full flex-col gap-3 overflow-auto p-3">
          <div className="grid grid-cols-2 gap-2">
            {MOODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => choose(m.id)}
                className={`tap min-h-12 rounded-2xl border px-3 text-sm ${
                  pick === m.id ? "border-primary text-primary" : "border-line"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
          {mood && (
            <div className="glass rounded-2xl p-4">
              <p className="text-sm leading-relaxed">{mood.line}</p>
              {room && (
                <Link to="/games/$slug" params={{ slug: room.slug }} className="mt-3 inline-flex min-h-11 items-center text-sm text-primary">
                  If you want a room: {room.title}
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </GameFrame>
  );
}
