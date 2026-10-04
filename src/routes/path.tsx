import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { levelInfo, MILESTONES } from "@/lib/content";
import { useSanctuary } from "@/lib/sanctuary-store";

export const Route = createFileRoute("/path")({
  component: PathPage,
  head: () => ({ meta: [{ title: "Path — Pleading Sanity" }] }),
});

function PathPage() {
  const hydrated = useSanctuary((s) => s.hydrated);
  const unlocked = useSanctuary((s) => s.unlocked);
  const xp = useSanctuary((s) => s.xp);
  const streak = useSanctuary((s) => s.streak);
  const dailies = useSanctuary((s) => s.dailies);
  const rising = useSanctuary((s) => s.risingWeeks.length);
  const markPathRead = useSanctuary((s) => s.markPathRead);
  const forget = useSanctuary((s) => s.forget);
  const [armed, setArmed] = useState(false);
  const level = levelInfo(hydrated ? xp : 0);

  useEffect(() => {
    if (hydrated) markPathRead();
  }, [hydrated, unlocked, markPathRead]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-4xl">Path</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          These are not trophies. They're a person noticing you came back. {level.name}, quiet level{" "}
          <span className="tabular-nums">{hydrated ? level.level : "—"}</span>.
        </p>
      </div>
      <dl className="grid grid-cols-3 gap-2 text-center">
        <div className="rounded-2xl border border-line py-3">
          <dt className="text-xs text-muted">Streak</dt>
          <dd className="mt-1 tabular-nums">{hydrated ? streak : "—"}</dd>
        </div>
        <div className="rounded-2xl border border-line py-3">
          <dt className="text-xs text-muted">Days kept</dt>
          <dd className="mt-1 tabular-nums">{hydrated ? dailies : "—"}</dd>
        </div>
        <div className="rounded-2xl border border-line py-3">
          <dt className="text-xs text-muted">Rising Light</dt>
          <dd className="mt-1 tabular-nums">{hydrated ? rising : "—"}</dd>
        </div>
      </dl>
      <ul className="flex flex-col gap-3">
        {MILESTONES.map((m) => {
          const open = hydrated && unlocked.includes(m.id);
          return (
            <li key={m.id} className="glass rounded-2xl p-4">
              <p className="text-xs text-primary">{open ? "Kept" : "Ahead"}</p>
              <h2 className="mt-1 text-xl">{m.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{open ? m.message : m.hint}</p>
            </li>
          );
        })}
      </ul>
      <section className="rounded-2xl border border-line p-4">
        <h2 className="text-xl">Forget this device</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Clears loves, scores, moods, and notes stored here. It does not write to anyone else. It cannot
          be undone.
        </p>
        {armed ? (
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="tap min-h-11 rounded-full bg-primary px-4 text-sm font-medium text-bg" onClick={forget}>
              Yes, forget me here
            </button>
            <button type="button" className="tap min-h-11 rounded-full border border-line px-4 text-sm" onClick={() => setArmed(false)}>
              Keep my progress
            </button>
          </div>
        ) : (
          <button type="button" className="tap mt-3 min-h-11 text-sm text-muted underline" onClick={() => setArmed(true)}>
            Forget this device
          </button>
        )}
      </section>
    </div>
  );
}
