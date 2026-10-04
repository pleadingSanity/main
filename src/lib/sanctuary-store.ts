import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MILESTONES, missionFor, type Progress } from "@/lib/content";

type Save = {
  loves: string[];
  viewed: string[];
  best: Record<string, number>;
  tried: string[];
  breaths: number;
  runs: number;
  visits: number;
  streak: number;
  lastDay: string;
  unlocked: string[];
  queue: string[];
  celebration: string | null;
  muted: boolean;
  readUnlocks: string[];
  xp: number;
  todayLoves: number;
  todayViews: number;
  todayRuns: number;
  todayBreaths: number;
  dailyDone: string;
  dailies: number;
  weekClaims: string[];
  risingWeeks: string[];
  mood: string;
  moodDay: string;
};

const empty: Save = {
  loves: [],
  viewed: [],
  best: {},
  tried: [],
  breaths: 0,
  runs: 0,
  visits: 0,
  streak: 0,
  lastDay: "",
  unlocked: [],
  queue: [],
  celebration: null,
  muted: false,
  readUnlocks: [],
  xp: 0,
  todayLoves: 0,
  todayViews: 0,
  todayRuns: 0,
  todayBreaths: 0,
  dailyDone: "",
  dailies: 0,
  weekClaims: [],
  risingWeeks: [],
  mood: "",
  moodDay: "",
};

export type SanctuaryState = Save & {
  hydrated: boolean;
  markHydrated: () => void;
  markVisit: () => void;
  giveLove: (id: string) => void;
  markViewed: (id: string) => void;
  recordRun: (slug: string, score: number) => void;
  recordBreaths: (n: number) => void;
  claimDaily: () => void;
  setMood: (id: string) => void;
  dismissCelebration: () => void;
  markPathRead: () => void;
  toggleMuted: () => void;
  forget: () => void;
};

export function localDay(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function weekKey(d = new Date()) {
  const one = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  one.setDate(one.getDate() + 4 - (one.getDay() || 7));
  const yearStart = new Date(one.getFullYear(), 0, 1);
  const week = Math.ceil(((one.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${one.getFullYear()}-W${week}`;
}

function snapshot(s: SanctuaryState): Save {
  return {
    loves: s.loves,
    viewed: s.viewed,
    best: s.best,
    tried: s.tried,
    breaths: s.breaths,
    runs: s.runs,
    visits: s.visits,
    streak: s.streak,
    lastDay: s.lastDay,
    unlocked: s.unlocked,
    queue: s.queue,
    celebration: s.celebration,
    muted: s.muted,
    readUnlocks: s.readUnlocks,
    xp: s.xp,
    todayLoves: s.todayLoves,
    todayViews: s.todayViews,
    todayRuns: s.todayRuns,
    todayBreaths: s.todayBreaths,
    dailyDone: s.dailyDone,
    dailies: s.dailies,
    weekClaims: s.weekClaims,
    risingWeeks: s.risingWeeks,
    mood: s.mood,
    moodDay: s.moodDay,
  };
}

function rollDay(s: Save): Save {
  const today = localDay();
  if (s.lastDay === today) return s;
  const prev = new Date();
  prev.setDate(prev.getDate() - 1);
  const streak = s.lastDay === localDay(prev) ? s.streak + 1 : 1;
  return {
    ...s,
    lastDay: today,
    streak,
    visits: s.visits + 1,
    todayLoves: 0,
    todayViews: 0,
    todayRuns: 0,
    todayBreaths: 0,
  };
}

function toProgress(s: Save): Progress {
  const scores = Object.values(s.best);
  return {
    loves: s.loves.length,
    viewed: s.viewed.length,
    breaths: s.breaths,
    runs: s.runs,
    visits: s.visits,
    streak: s.streak,
    tried: s.tried.length,
    best: scores.length ? Math.max(...scores) : 0,
    dailies: s.dailies,
    rising: s.risingWeeks.length,
    xp: s.xp,
  };
}

function withRewards(s: Save): Save {
  const fresh = MILESTONES.filter((m) => !s.unlocked.includes(m.id) && m.test(toProgress(s))).map(
    (m) => m.id,
  );
  if (fresh.length === 0) return s;
  const unlocked = [...s.unlocked, ...fresh];
  let queue = [...s.queue, ...fresh];
  let celebration = s.celebration;
  if (!celebration && queue.length > 0) {
    celebration = queue[0] ?? null;
    queue = queue.slice(1);
  }
  return { ...s, unlocked, queue, celebration };
}

export const useSanctuary = create<SanctuaryState>()(
  persist(
    (set) => ({
      ...empty,
      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      markVisit: () => set((s) => withRewards(rollDay(snapshot(s)))),
      giveLove: (id) =>
        set((s) => {
          const base = rollDay(snapshot(s));
          if (base.loves.includes(id)) return s;
          return withRewards({
            ...base,
            loves: [...base.loves, id],
            todayLoves: base.todayLoves + 1,
            xp: base.xp + 5,
          });
        }),
      markViewed: (id) =>
        set((s) => {
          const base = rollDay(snapshot(s));
          if (base.viewed.includes(id)) return s;
          return withRewards({
            ...base,
            viewed: [...base.viewed, id],
            todayViews: base.todayViews + 1,
            xp: base.xp + 2,
          });
        }),
      recordRun: (slug, score) =>
        set((s) => {
          const base = rollDay(snapshot(s));
          const nextScore = Math.max(0, Math.floor(score));
          const best = { ...base.best, [slug]: Math.max(base.best[slug] ?? 0, nextScore) };
          const tried = base.tried.includes(slug) ? base.tried : [...base.tried, slug];
          const effort = Math.min(40, Math.floor(nextScore / 15));
          return withRewards({
            ...base,
            best,
            tried,
            runs: base.runs + 1,
            todayRuns: base.todayRuns + 1,
            xp: base.xp + 20 + effort,
          });
        }),
      recordBreaths: (n) =>
        set((s) => {
          const base = rollDay(snapshot(s));
          const add = Math.max(0, Math.floor(n));
          return withRewards({
            ...base,
            breaths: base.breaths + add,
            todayBreaths: base.todayBreaths + add,
            xp: base.xp + add * 4,
          });
        }),
      claimDaily: () =>
        set((s) => {
          const base = rollDay(snapshot(s));
          const today = localDay();
          if (base.dailyDone === today) return s;
          const mission = missionFor(today);
          if (!mission.met(base)) return s;
          const week = weekKey();
          const weekClaims = [
            ...base.weekClaims.filter((d) => weekKey(new Date(d + "T12:00:00")) === week),
            today,
          ];
          const risingWeeks =
            weekClaims.length >= 3 && !base.risingWeeks.includes(week)
              ? [...base.risingWeeks, week]
              : base.risingWeeks;
          return withRewards({
            ...base,
            dailyDone: today,
            dailies: base.dailies + 1,
            weekClaims,
            risingWeeks,
            xp: base.xp + 25,
          });
        }),
      setMood: (id) =>
        set((s) => {
          const base = rollDay(snapshot(s));
          const today = localDay();
          const add = base.moodDay === today ? 0 : 8;
          return withRewards({ ...base, mood: id, moodDay: today, xp: base.xp + add });
        }),
      dismissCelebration: () =>
        set((s) => {
          const queue = [...s.queue];
          const celebration = queue.shift() ?? null;
          return { celebration, queue };
        }),
      markPathRead: () => set((s) => ({ readUnlocks: [...s.unlocked] })),
      toggleMuted: () => set((s) => ({ muted: !s.muted })),
      forget: () => {
        useSanctuary.persist.clearStorage();
        set({ ...empty, hydrated: true });
      },
    }),
    {
      name: "ps-ascension-v4",
      version: 1,
      partialize: (s) => snapshot(s),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
