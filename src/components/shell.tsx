import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Compass, House, Sparkles, Volume2, VolumeX, Waypoints } from "lucide-react";
import { Starfield } from "@/components/starfield";
import { milestoneById } from "@/lib/content";
import { resumeAudio, stopPad, unlockAudio } from "@/lib/audio";
import { useSanctuary } from "@/lib/sanctuary-store";

const NAV = [
  { to: "/", label: "Home", icon: House },
  { to: "/games", label: "Play", icon: Sparkles },
  { to: "/feed", label: "Feed", icon: BookOpen },
  { to: "/path", label: "Path", icon: Waypoints },
  { to: "/launch", label: "Rise", icon: Compass },
] as const;

function onPath(path: string, href: string) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

export function Shell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const hydrated = useSanctuary((s) => s.hydrated);
  const muted = useSanctuary((s) => s.muted);
  const toggleMuted = useSanctuary((s) => s.toggleMuted);
  const celebration = useSanctuary((s) => s.celebration);
  const dismiss = useSanctuary((s) => s.dismissCelebration);
  const markVisit = useSanctuary((s) => s.markVisit);
  const unseen = useSanctuary((s) => s.unlocked.some((id) => !s.readUnlocks.includes(id)));
  const [online, setOnline] = useState(true);
  const reward = celebration ? milestoneById(celebration) : undefined;

  useEffect(() => {
    const go = () => unlockAudio();
    window.addEventListener("pointerdown", go);
    const onVis = () => {
      if (document.hidden) stopPad();
      else resumeAudio();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pointerdown", go);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (hydrated) markVisit();
  }, [hydrated, markVisit]);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  return (
    <div className="relative min-h-dvh text-fg">
      <Starfield />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-primary focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="min-h-11 font-display text-lg leading-none text-fg">
            Pleading Sanity
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Ascension</span>
            <button
              type="button"
              className="tap grid size-11 place-items-center rounded-full border border-line text-primary"
              aria-pressed={muted}
              aria-label={muted ? "Turn sound on" : "Mute sound"}
              onClick={() => {
                if (!muted) stopPad();
                toggleMuted();
              }}
            >
              {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            </button>
          </div>
        </div>
        {!online && (
          <p className="mx-auto max-w-lg px-4 pb-2 text-xs text-muted">
            You're offline. The rooms, the feed, and what you've kept still work on this device.
          </p>
        )}
      </header>
      <main id="content" className="relative z-10 mx-auto w-full max-w-lg px-4 pt-5 pb-32">
        {children}
      </main>
      {reward && (
        <div className="fixed inset-x-0 bottom-24 z-30 mx-auto w-full max-w-lg px-4">
          <div className="glass rounded-2xl p-4" role="status" aria-live="polite">
            <p className="text-xs tracking-wide text-primary">{reward.title}</p>
            <p className="mt-2 leading-relaxed text-fg">{reward.message}</p>
            <button
              type="button"
              className="tap mt-3 min-h-11 rounded-full bg-primary px-4 text-sm font-medium text-bg"
              onClick={dismiss}
            >
              I'll keep this
            </button>
          </div>
        </div>
      )}
      <nav className="dock fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/90 backdrop-blur-md" aria-label="Sanctuary">
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {NAV.map((item) => {
            const active = onPath(path, item.to);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs ${active ? "text-primary" : "text-muted"}`}
                >
                  <Icon className="size-5" aria-hidden />
                  {item.label}
                  {item.to === "/path" && unseen && (
                    <span className="absolute top-2 right-4 size-1.5 rounded-full bg-flare" aria-label="New note on the path" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
