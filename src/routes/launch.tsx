import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  CAPTIONS,
  HASHTAGS,
  LINKEDIN,
  OUTREACH,
  PARTNERS,
  REEL,
  WEEK,
  X_THREAD,
  YOUTUBE,
} from "@/lib/marketing";

export const Route = createFileRoute("/launch")({
  component: LaunchPage,
  head: () => ({ meta: [{ title: "Rise — Pleading Sanity" }] }),
});

function LaunchPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs tracking-[0.18em] text-primary uppercase">The next weeks</p>
        <h1 className="mt-2 text-4xl">How we grow this</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Not a promise of millions. A way to reach real people without erasing the live site, without a
          paywall, and without selling anyone's night back to them.
        </p>
      </div>

      <section className="glass rounded-2xl p-4">
        <h2 className="text-2xl">What stays free</h2>
        <p className="mt-2 text-sm leading-relaxed">
          The sanctuary, the games, and the feed. Support for the work, if it exists, stays outside the
          door. Clothing can fund the movement. It never sits between a person and the room.
        </p>
      </section>

      <section>
        <h2 className="text-2xl">Seven days</h2>
        <ol className="mt-3 flex flex-col gap-3">
          {WEEK.map((item) => (
            <li key={item.day} className="rounded-2xl border border-line p-4">
              <p className="text-xs text-primary">{item.day}</p>
              <p className="mt-2 text-sm leading-relaxed">{item.do}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="text-2xl">Six months, honestly</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Ten thousand genuine people is about four hundred a week who stay, not a spike. That is
          conversations. An ambassador is someone who already uses the room and is willing to walk a friend
          to the door. Not a downline. Count finished breaths, loves, and returns. Ignore vanity reach.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-2xl">Words you can take</h2>
        <Copy label="Hashtags" text={HASHTAGS} />
        {CAPTIONS.map((c) => (
          <Copy key={c.name} label={c.name} text={c.text} />
        ))}
        <Copy label="Reel" text={REEL} />
        <Copy label="X thread" text={X_THREAD} />
        <Copy label="LinkedIn" text={LINKEDIN} />
        <Copy label="YouTube" text={YOUTUBE} />
        <Copy label="Outreach" text={OUTREACH} />
      </section>

      <section>
        <h2 className="text-2xl">People to write to</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          These are not partners. Nobody here has agreed to anything. They are doors you can knock on as
          yourself. Don't pretend a friendship you don't have.
        </p>
        <ul className="mt-3 columns-1 gap-x-6 text-sm leading-relaxed sm:columns-2">
          {PARTNERS.map((name) => (
            <li key={name} className="mb-1">
              {name}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-line p-4">
        <h2 className="text-2xl">What we will not do</h2>
        <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-muted">
          <li>Paywall the sanctuary, the games, or the feed.</li>
          <li>Add a dislike, a ranking, or a leaderboard of suffering.</li>
          <li>Pretend Arron is a clinician.</li>
          <li>Erase the live site to replace it. This room sits beside it.</li>
          <li>Invent a war story around Private A.L. Cooper's citation.</li>
          <li>Mine a breakdown for content.</li>
        </ul>
      </section>
    </div>
  );
}

function Copy({ label, text }: { label: string; text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  return (
    <div className="rounded-2xl border border-line p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg">{label}</h3>
        <button
          type="button"
          className="tap min-h-11 rounded-full border border-line px-3 text-sm text-primary"
          onClick={() => {
            void navigator.clipboard.writeText(text).then(
              () => setState("copied"),
              () => setState("failed"),
            );
          }}
        >
          {state === "copied" ? "Copied" : state === "failed" ? "Select it" : "Copy"}
        </button>
      </div>
      <pre className="mt-3 text-sm leading-relaxed break-words whitespace-pre-wrap text-muted">{text}</pre>
    </div>
  );
}
