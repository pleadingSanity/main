import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, RotateCcw } from "lucide-react";

export function GameFrame({
  title,
  lede,
  phase,
  score,
  best,
  endTitle,
  endBody,
  onAgain,
  onRest,
  children,
  footer,
  hud,
}: {
  title: string;
  lede: string;
  phase: "ready" | "play" | "over";
  score: number;
  best: number;
  endTitle: string;
  endBody: string;
  onAgain: () => void;
  onRest?: () => void;
  children: ReactNode;
  footer?: ReactNode;
  hud?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <Link
          to="/games"
          className="mb-3 inline-flex min-h-11 items-center gap-1 text-sm text-muted"
        >
          <ArrowLeft className="size-4" aria-hidden />
          All rooms
        </Link>
        <h1 className="text-3xl text-fg">{title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">{lede}</p>
      </div>
      <div className="stage relative overflow-hidden rounded-2xl border border-line bg-bg">
        {children}
        {phase === "ready" && footer && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-4">
            <div className="pointer-events-auto">{footer}</div>
          </div>
        )}
        {phase === "over" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/80 px-6 text-center backdrop-blur-sm">
            <p className="text-2xl text-fg">{endTitle}</p>
            <p className="max-w-xs text-sm leading-relaxed text-muted">{endBody}</p>
            <p className="tabular-nums text-primary">
              {score}
              <span className="text-muted"> · best {Math.max(best, score)}</span>
            </p>
            <button
              type="button"
              className="tap inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 font-medium text-bg"
              onClick={onAgain}
            >
              <RotateCcw className="size-4" aria-hidden />
              Again
            </button>
          </div>
        )}
        {phase === "play" && (
          <div className="pointer-events-none absolute top-3 left-3 rounded-full border border-line bg-bg/75 px-3 py-1 text-sm tabular-nums text-fg">
            {score}
            <span className="text-muted"> · best {Math.max(best, score)}</span>
          </div>
        )}
        {phase === "play" && hud}
      </div>
      {phase === "play" && onRest && (
        <button
          type="button"
          className="tap min-h-11 rounded-full border border-line text-sm text-muted"
          onClick={onRest}
        >
          That's enough — keep this
        </button>
      )}
      {phase !== "ready" && footer}
      <p className="text-xs leading-relaxed text-muted">
        Stays on this device. No signal needed once the room is open. Sound is a soft sine, and
        mute in the header wins.
      </p>
    </div>
  );
}
