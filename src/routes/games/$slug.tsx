import { lazy, Suspense } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { GAMES, type GameSlug } from "@/lib/content";
import { useSanctuary } from "@/lib/sanctuary-store";

const SolitaireGame = lazy(() =>
  import("@/components/games/solitaire").then((m) => ({ default: m.SolitaireGame })),
);
const ConnectGame = lazy(() =>
  import("@/components/games/connect").then((m) => ({ default: m.ConnectGame })),
);
const TruthGame = lazy(() => import("@/components/games/truth").then((m) => ({ default: m.TruthGame })));
const FocusGame = lazy(() => import("@/components/games/focus").then((m) => ({ default: m.FocusGame })));
const NebulaGame = lazy(() => import("@/components/games/nebula").then((m) => ({ default: m.NebulaGame })));
const PatternGame = lazy(() =>
  import("@/components/games/pattern").then((m) => ({ default: m.PatternGame })),
);
const MemoryGame = lazy(() => import("@/components/games/memory").then((m) => ({ default: m.MemoryGame })));
const RhythmGame = lazy(() => import("@/components/games/rhythm").then((m) => ({ default: m.RhythmGame })));
const DashGame = lazy(() => import("@/components/games/dash").then((m) => ({ default: m.DashGame })));
const HealingGame = lazy(() =>
  import("@/components/games/healing").then((m) => ({ default: m.HealingGame })),
);
const MindGame = lazy(() => import("@/components/games/mind").then((m) => ({ default: m.MindGame })));
const MoodGame = lazy(() => import("@/components/games/mood").then((m) => ({ default: m.MoodGame })));

export const Route = createFileRoute("/games/$slug")({
  component: Room,
  head: () => ({ meta: [{ title: "Play — Pleading Sanity" }] }),
});

function isSlug(value: string): value is GameSlug {
  return GAMES.some((g) => g.slug === value);
}

function Room() {
  const { slug } = Route.useParams();
  const best = useSanctuary((s) => (isSlug(slug) ? (s.best[slug] ?? 0) : 0));
  const recordRun = useSanctuary((s) => s.recordRun);
  const recordBreaths = useSanctuary((s) => s.recordBreaths);
  const setMood = useSanctuary((s) => s.setMood);

  if (!isSlug(slug)) {
    return (
      <div>
        <h1 className="text-3xl">That room isn't here.</h1>
        <Link to="/games" className="mt-4 inline-flex min-h-11 items-center text-primary">
          Back to play
        </Link>
      </div>
    );
  }

  const finish = (score: number) => recordRun(slug, score);

  return (
    <Suspense fallback={<p className="text-muted">Opening the room…</p>}>
      {slug === "solitaire" && <SolitaireGame best={best} onFinish={finish} />}
      {slug === "connect" && <ConnectGame best={best} onFinish={finish} />}
      {slug === "truth" && <TruthGame best={best} onFinish={finish} />}
      {slug === "focus" && (
        <FocusGame best={best} onFinish={finish} onBreath={() => recordBreaths(1)} />
      )}
      {slug === "nebula" && <NebulaGame best={best} onFinish={finish} />}
      {slug === "pattern" && <PatternGame best={best} onFinish={finish} />}
      {slug === "memory" && <MemoryGame best={best} onFinish={finish} />}
      {slug === "rhythm" && <RhythmGame best={best} onFinish={finish} />}
      {slug === "dash" && <DashGame best={best} onFinish={finish} />}
      {slug === "healing" && (
        <HealingGame best={best} onFinish={finish} onBreath={() => recordBreaths(1)} />
      )}
      {slug === "mind" && <MindGame best={best} onFinish={finish} />}
      {slug === "mood" && <MoodGame best={best} onFinish={finish} onMood={setMood} />}
    </Suspense>
  );
}
