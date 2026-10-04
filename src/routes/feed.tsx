import { useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { Eye, Heart } from "lucide-react";
import { POSTS, reachMessage } from "@/lib/content";
import { blip } from "@/lib/audio";
import { useSanctuary } from "@/lib/sanctuary-store";

export const Route = createFileRoute("/feed")({
  component: FeedPage,
  head: () => ({ meta: [{ title: "Feed — Pleading Sanity" }] }),
});

const notes = [...POSTS].sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1));

function FeedPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl">Arron's notes</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Newest first. No ranking. Love only — there is nowhere for a dislike to land. Arron is a
          companion, not a therapist.
        </p>
      </div>
      <ul className="flex flex-col gap-3">
        {notes.map((post) => (
          <li key={post.id}>
            <Note id={post.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Note({ id }: { id: string }) {
  const post = notes.find((p) => p.id === id);
  const ref = useRef<HTMLElement>(null);
  const hydrated = useSanctuary((s) => s.hydrated);
  const viewed = useSanctuary((s) => s.viewed.includes(id));
  const loved = useSanctuary((s) => s.loves.includes(id));
  const markViewed = useSanctuary((s) => s.markViewed);
  const giveLove = useSanctuary((s) => s.giveLove);

  useEffect(() => {
    if (!hydrated || viewed) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          markViewed(id);
          io.disconnect();
        }
      },
      { threshold: 0.65 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hydrated, viewed, markViewed, id]);

  if (!post) return null;
  const loves = post.seedLoves + (hydrated && loved ? 1 : 0);
  const views = post.seedViews + (hydrated && viewed ? 1 : 0);
  const reach = reachMessage(loves);

  return (
    <article ref={ref} className="glass rounded-2xl p-4">
      <header className="flex items-baseline justify-between gap-3">
        <p className="text-sm text-fg">
          Arron <span className="text-muted">· companion</span>
        </p>
        <time className="text-xs text-muted" dateTime={post.postedAt} suppressHydrationWarning>
          {formatDistanceToNow(new Date(post.postedAt), { addSuffix: true })}
        </time>
      </header>
      <h2 className="mt-3 text-2xl">{post.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-fg">{post.body}</p>
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          className="tap inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-3 text-sm"
          aria-pressed={loved}
          aria-label={loved ? "Love already given" : "Leave a love"}
          onClick={() => {
            if (loved) return;
            giveLove(id);
            blip(528, 0.1, 0.02);
          }}
        >
          <span className="relative grid size-5 place-items-center">
            <Heart
              className={`col-start-1 row-start-1 size-5 fill-flare text-flare transition duration-300 ${
                loved ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]"
              }`}
            />
            <Heart
              className={`col-start-1 row-start-1 size-5 text-muted transition duration-300 ${
                loved ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"
              }`}
            />
          </span>
          <span className="tabular-nums">{loves}</span>
        </button>
        <p className="inline-flex min-h-11 items-center gap-2 px-2 text-sm text-muted">
          <Eye className="size-4" aria-hidden />
          <span className="tabular-nums">{views}</span>
          <span className="sr-only">people have sat with this note</span>
        </p>
      </div>
      {reach && (
        <p className="mt-3 text-sm leading-relaxed text-primary">{reach}</p>
      )}
    </article>
  );
}
