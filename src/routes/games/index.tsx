import { Link, createFileRoute } from "@tanstack/react-router";
import { Art } from "@/components/art";
import { GAMES } from "@/lib/content";
import { useSanctuary } from "@/lib/sanctuary-store";

export const Route = createFileRoute("/games/")({
  component: GamesPage,
  head: () => ({ meta: [{ title: "Play — Pleading Sanity" }] }),
});

function GamesPage() {
  const hydrated = useSanctuary((s) => s.hydrated);
  const best = useSanctuary((s) => s.best);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl">Play</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          No ads. No paywall. No clock chasing you off the page. Personal bests celebrate the try, not a
          perfect run. Mute lives in the header.
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-3">
        {GAMES.map((game) => (
          <li key={game.slug}>
            <Link
              to="/games/$slug"
              params={{ slug: game.slug }}
              className="tap glass block overflow-hidden rounded-2xl"
            >
              <Art
                src={`/media/${game.slug}.jpg`}
                alt=""
                className="aspect-square w-full object-cover"
              />
              <span className="block p-3">
                <span className="block text-base text-fg">{game.title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">{game.span}</span>
                <span className="mt-2 block text-xs tabular-nums text-primary">
                  Best {hydrated ? (best[game.slug] ?? "—") : "—"}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
