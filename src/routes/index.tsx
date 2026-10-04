import { Link, createFileRoute } from "@tanstack/react-router";
import { Art } from "@/components/art";
import { GAMES, levelInfo, missionFor } from "@/lib/content";
import { localDay, useSanctuary } from "@/lib/sanctuary-store";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({ meta: [{ title: "Pleading Sanity" }] }),
});

const DOORS = [
  { to: "/games", title: "Play", body: "Twelve rooms. Leave any of them. Effort is the score that matters." },
  { to: "/feed", title: "Feed", body: "Arron, newest first. A love if a line meets you. No dislike." },
  { to: "/path", title: "Path", body: "Notes that arrive when you show up. Not a badge shop." },
  { to: "/launch", title: "Rise", body: "How this grows without erasing the work, and without a paywall." },
] as const;

function Home() {
  const hydrated = useSanctuary((s) => s.hydrated);
  const xp = useSanctuary((s) => s.xp);
  const streak = useSanctuary((s) => s.streak);
  const loves = useSanctuary((s) => s.loves.length);
  const breaths = useSanctuary((s) => s.breaths);
  const tried = useSanctuary((s) => s.tried.length);
  const todayLoves = useSanctuary((s) => s.todayLoves);
  const todayViews = useSanctuary((s) => s.todayViews);
  const todayRuns = useSanctuary((s) => s.todayRuns);
  const todayBreaths = useSanctuary((s) => s.todayBreaths);
  const dailyDone = useSanctuary((s) => s.dailyDone);
  const claimDaily = useSanctuary((s) => s.claimDaily);
  const level = levelInfo(hydrated ? xp : 0);
  const mission = missionFor(localDay());
  const met = hydrated && mission.met({ todayLoves, todayViews, todayRuns, todayBreaths });
  const kept = hydrated && dailyDone === localDay();

  return (
    <div className="rise flex flex-col gap-6">
      <Art
        eager
        src="/media/hero.jpg"
        alt="A cosmic brain of starlight with one cyan tear, the sanctuary mark."
        className="aspect-video w-full rounded-2xl border border-line object-cover"
      />
      <div>
        <p className="text-xs tracking-[0.2em] text-primary uppercase">Ascension</p>
        <h1 className="mt-2 text-4xl text-fg">A place to land.</h1>
      </div>
      <blockquote className="border-l border-primary pl-4 text-base leading-relaxed text-fg">
        <p>
          I made this because some nights the quiet gets too loud, and the places that say they'll help
          want a performance of being fine.
        </p>
        <p className="mt-3">
          This is the sanctuary. Twelve small rooms you can leave. Notes from Arron that don't rank your
          pain. A path that notices when you show up, and says so like a person.
        </p>
        <p className="mt-3">
          I'm not above any of this. I built it from the same floor. If all you do is look at the mark and
          drink some water, you used it properly.
        </p>
        <p className="mt-3">Evolution, not erasure. What kept you here stays. We build on it.</p>
        <footer className="mt-3 text-sm text-muted">Shane Cooper</footer>
      </blockquote>

      <section className="glass rounded-2xl p-4" aria-label="Today">
        <p className="text-xs text-primary">{mission.title}</p>
        <p className="mt-2 leading-relaxed">{mission.text}</p>
        <p className="mt-3 text-sm text-muted">
          {kept ? "Today is kept. You can stop." : met ? "That's done. You can keep it." : "Whenever you're ready. Missing it changes nothing about you."}
        </p>
        {met && !kept && (
          <button type="button" className="tap mt-3 min-h-11 rounded-full bg-primary px-4 text-sm font-medium text-bg" onClick={claimDaily}>
            Keep today
          </button>
        )}
      </section>

      <section className="grid grid-cols-3 gap-2 text-center" aria-label="On this device">
        <Stat label={level.name} value={hydrated ? `Lv ${level.level}` : "—"} />
        <Stat label="Loves" value={hydrated ? String(loves) : "—"} />
        <Stat label="Streak" value={hydrated ? String(streak) : "—"} />
        <Stat label="Rooms" value={hydrated ? `${tried}/${GAMES.length}` : "—"} />
        <Stat label="Soft" value={hydrated ? String(breaths) : "—"} />
        <Stat label="Light" value={hydrated ? String(xp) : "—"} />
      </section>
      <div className="h-1 overflow-hidden rounded-full bg-line" aria-hidden>
        <div
          className="h-full origin-left bg-primary"
          style={{ transform: `scaleX(${hydrated ? level.into / level.span : 0})` }}
        />
      </div>

      <ul className="grid gap-3">
        {DOORS.map((door) => (
          <li key={door.to}>
            <Link to={door.to} className="tap glass block rounded-2xl p-4">
              <span className="text-lg text-fg">{door.title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{door.body}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-sm leading-relaxed text-muted">
        Not a therapist. Not a clinic. If you're unsafe, get to a person near you. Loves, scores, and the
        name you give the weather stay on this device. Forget-me is on the Path.
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line px-2 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 tabular-nums text-fg">{value}</p>
    </div>
  );
}
