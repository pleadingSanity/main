export type Post = {
  id: string;
  postedAt: string;
  title: string;
  body: string;
  seedViews: number;
  seedLoves: number;
};

export const POSTS: Post[] = [
  {
    id: "door",
    postedAt: "2026-09-26T11:00:00",
    title: "You can arrive messy",
    body: "You don't have to walk in sorted. Sit down as you are. The room can take it. Nobody here is keeping a score of how together you look.",
    seedViews: 2406,
    seedLoves: 19,
  },
  {
    id: "evolution",
    postedAt: "2026-09-27T16:00:00",
    title: "Evolution, not erasure",
    body: "We don't delete the hard years to look healed. We build on the parts that kept you here. What served you stays. That's the whole rule.",
    seedViews: 3120,
    seedLoves: 240,
  },
  {
    id: "night",
    postedAt: "2026-09-28T22:10:00",
    title: "The night is not a verdict",
    body: "It's just the part of the day with fewer witnesses. You can still be decent to yourself in it. You don't have to solve your life before morning.",
    seedViews: 1644,
    seedLoves: 57,
  },
  {
    id: "return",
    postedAt: "2026-09-29T08:40:00",
    title: "Coming back is not starting over",
    body: "A bad day doesn't wipe the days you made it. Coming back is continuing. Those are different things, and the second one is kinder.",
    seedViews: 980,
    seedLoves: 8,
  },
  {
    id: "body",
    postedAt: "2026-09-29T20:00:00",
    title: "Your body kept more than the score",
    body: "It kept the hurt. It also kept your laugh, the songs you rewind, the way you check on people. Don't let the wound narrate the whole house.",
    seedViews: 2210,
    seedLoves: 101,
  },
  {
    id: "companion",
    postedAt: "2026-09-30T09:30:00",
    title: "What Arron is, and isn't",
    body: "Arron can sit with a sentence. Arron is not a therapist, and a paragraph is not treatment. If you're unsafe, get to a person near you. This house is a light, not a clinic.",
    seedViews: 1890,
    seedLoves: 22,
  },
  {
    id: "grandad",
    postedAt: "2026-09-30T19:00:00",
    title: "A service we don't embroider",
    body: "Shane's grandad, Private A.L. Cooper, Royal Army Ordnance Corps, was Mentioned in Despatches. The citation is in the London Gazette, 29 November 1945. We don't invent a war story around that. We just refuse to let a quiet service go unnamed.",
    seedViews: 760,
    seedLoves: 46,
  },
  {
    id: "breath",
    postedAt: "2026-10-01T08:15:00",
    title: "A breath is a door, not a cure",
    body: "You can open it without promising to be fine on the other side. In, hold, out. Then you're allowed to still be in the middle of a hard day.",
    seedViews: 2544,
    seedLoves: 128,
  },
  {
    id: "order",
    postedAt: "2026-10-01T18:40:00",
    title: "This feed does not rank you",
    body: "Newest first. Nobody is paid to shove the loudest pain to the top. If a line helps, leave a love. There is no button for tearing it down.",
    seedViews: 640,
    seedLoves: 11,
  },
  {
    id: "ask",
    postedAt: "2026-10-02T09:00:00",
    title: "Asking is not the opposite of strength",
    body: "Strength got you this far. Help is how it lasts. You can want both. Tell someone who knows your real name. You don't have to perform recovery to deserve a reply.",
    seedViews: 1333,
    seedLoves: 63,
  },
  {
    id: "free",
    postedAt: "2026-10-02T15:20:00",
    title: "Free means free",
    body: "Talk, play, the feed, the journal of this device — none of it is behind a paywall. We don't sell your words. If support for the work exists, it stays outside the door, never between you and the room.",
    seedViews: 1511,
    seedLoves: 88,
  },
  {
    id: "play",
    postedAt: "2026-10-03T21:10:00",
    title: "The games are small on purpose",
    body: "Cards. Stars. A lantern. A tone. If play feels wrong today, leave it. The door still works without a score. Effort is the thing we celebrate, not a perfect run.",
    seedViews: 420,
    seedLoves: 14,
  },
  {
    id: "stay",
    postedAt: "2026-10-04T08:00:00",
    title: "Water counts",
    body: "If all you do is read this and drink some water, that is a complete use of the sanctuary. You don't owe it a performance of getting better.",
    seedViews: 188,
    seedLoves: 7,
  },
  {
    id: "shame",
    postedAt: "2026-10-04T12:40:00",
    title: "Shame is a poor teacher",
    body: "It can get you moving for a day and then it eats the week. Pride, the quiet kind, is different. It says: you returned. That's enough to build on.",
    seedViews: 96,
    seedLoves: 4,
  },
];

export function reachMessage(loves: number): string | null {
  if (loves >= 100) {
    return "You've touched so many hearts. You are a beacon. This is what hope looks like.";
  }
  if (loves >= 50) {
    return "You are beautiful. Your story matters more than you know. Keep shining.";
  }
  if (loves >= 10) {
    return "Your light is reaching people. Thank you for being brave enough to share.";
  }
  return null;
}

export type Progress = {
  loves: number;
  viewed: number;
  breaths: number;
  runs: number;
  visits: number;
  streak: number;
  tried: number;
  best: number;
  dailies: number;
  rising: number;
  xp: number;
};

export type Milestone = {
  id: string;
  title: string;
  hint: string;
  message: string;
  test: (p: Progress) => boolean;
};

export const MILESTONES: Milestone[] = [
  {
    id: "landed",
    title: "Through the door",
    hint: "Open the sanctuary",
    message: "You made it through the door. Some nights that is the whole bravery.",
    test: (p) => p.visits >= 1,
  },
  {
    id: "first-game",
    title: "A while in the room",
    hint: "Finish any game",
    message: "You played. Not to beat the night. Just to be in it for a while.",
    test: (p) => p.runs >= 1,
  },
  {
    id: "breath-3",
    title: "Three soft returns",
    hint: "Three breaths or three tones",
    message: "Three times you stayed with yourself. Your body kept a small promise.",
    test: (p) => p.breaths >= 3,
  },
  {
    id: "first-love",
    title: "Warmth left behind",
    hint: "Leave a love on the feed",
    message: "You left warmth where someone might find it later. That counts.",
    test: (p) => p.loves >= 1,
  },
  {
    id: "reader",
    title: "You let it sit",
    hint: "Read six notes",
    message: "You let the words sit with you. Reading is a way of not being alone.",
    test: (p) => p.viewed >= 6,
  },
  {
    id: "daily",
    title: "Today's small ask",
    hint: "Keep a daily gentle mission",
    message: "You did the gentle thing asked of you today. That's plenty.",
    test: (p) => p.dailies >= 1,
  },
  {
    id: "rhythm",
    title: "A rhythm, if you want it",
    hint: "Reach 400 in any game",
    message: "You found a rhythm in one of the rooms. Keep it if it helps. Leave it if it doesn't.",
    test: (p) => p.best >= 400,
  },
  {
    id: "return",
    title: "You came back",
    hint: "Open the sanctuary on another day",
    message: "You came back. The you from yesterday is still welcome here. Evolution, not erasure.",
    test: (p) => p.streak >= 2,
  },
  {
    id: "five-loves",
    title: "Five kindnesses",
    hint: "Leave five loves",
    message: "Five times you chose kindness instead of scrolling past. I see that.",
    test: (p) => p.loves >= 5,
  },
  {
    id: "rising",
    title: "Rising Light",
    hint: "Keep three gentle missions in one week",
    message: "Rising Light. Not because you were perfect. Because you returned.",
    test: (p) => p.rising >= 1,
  },
  {
    id: "all-games",
    title: "Every room",
    hint: "Try all twelve games",
    message: "You walked every room. None of them asked you to arrive fixed.",
    test: (p) => p.tried >= 12,
  },
  {
    id: "ten-loves",
    title: "The feed is warmer",
    hint: "Leave ten loves",
    message: "The feed is warmer because you were here. That's a real thing, not a metric.",
    test: (p) => p.loves >= 10,
  },
];

export const GAMES = [
  {
    slug: "solitaire",
    title: "Sanity Solitaire",
    lede: "Three small peaks. Turn a card, then play one rank either side. Fresh deal, undo, and a hint when you want one.",
    span: "A quiet table",
  },
  {
    slug: "connect",
    title: "Cosmic Connect",
    lede: "Join two matching stars if the line between them is clear. Clear the sky, or leave it.",
    span: "A short sky",
  },
  {
    slug: "truth",
    title: "Truth Tag",
    lede: "A handful of lines. True or not. No trap, no timer. The point is to look twice.",
    span: "Ten lines",
  },
  {
    slug: "focus",
    title: "Cosmic Focus",
    lede: "Keep the ring near the drifting mote. There is no clock. Stop when you've had enough.",
    span: "As long as you stay",
  },
  {
    slug: "nebula",
    title: "Number Nebula",
    lede: "Slide the shards. Matching numbers fold into a brighter one. A full sky is not a failure.",
    span: "A garden of numbers",
  },
  {
    slug: "pattern",
    title: "Pattern Galaxy",
    lede: "Watch the order of stars, then trace it. A miss means we show you again, kindly.",
    span: "Memory, not speed",
  },
  {
    slug: "memory",
    title: "Memory Ocean",
    lede: "Turn two shells. Keep the pairs. The ocean doesn't rush you.",
    span: "Eight pairs",
  },
  {
    slug: "rhythm",
    title: "Rhythm Resonance",
    lede: "Four soft pads. Hear the phrase, tap it back. The window is wide on purpose.",
    span: "A short song",
  },
  {
    slug: "dash",
    title: "Stardust Dash",
    lede: "Drift the lantern through dust. Rest whenever you like. Missing a void is not a verdict.",
    span: "Until you rest",
  },
  {
    slug: "healing",
    title: "Healing Hz",
    lede: "Six tones we keep in the house. Soft sines only. Not a treatment. Hold one and let it go.",
    span: "Sit as long as you need",
  },
  {
    slug: "mind",
    title: "Mind Mode",
    lede: "A few hard thoughts, and two ways to answer. Neither is a failing. Walk to the end.",
    span: "Four steps",
  },
  {
    slug: "mood",
    title: "Mood Journey",
    lede: "Name the weather inside, not a diagnosis. The sky shifts. You can change the name tomorrow.",
    span: "One true word",
  },
] as const;

export type GameSlug = (typeof GAMES)[number]["slug"];

export const ENDINGS: Record<GameSlug, { title: string; body: string }> = {
  solitaire: {
    title: "The table can rest.",
    body: "You sat with the cards. That's a complete visit, cleared or not.",
  },
  connect: {
    title: "The threads can drop.",
    body: "You joined what you joined. The rest of the sky will wait.",
  },
  truth: {
    title: "You looked twice.",
    body: "Knowing some and missing some is how a mind stays honest.",
  },
  focus: {
    title: "You can look away.",
    body: "Attention, given freely, is the whole practice.",
  },
  nebula: {
    title: "The sky is allowed to be full.",
    body: "Merging what matched was enough. A stuck board is just weather.",
  },
  pattern: {
    title: "Enough stars.",
    body: "Memory let go. That's not a failing. The pattern will wait.",
  },
  memory: {
    title: "The pairs are held.",
    body: "You found what belonged together. The turns it took don't shame you.",
  },
  rhythm: {
    title: "The phrase is done.",
    body: "You kept time as a person, not a machine. That was the point.",
  },
  dash: {
    title: "The lantern can land.",
    body: "Distance travelled is effort. Resting is part of the journey.",
  },
  healing: {
    title: "The tone can fade.",
    body: "You sat with a sound. It was never asked to fix you.",
  },
  mind: {
    title: "You walked it.",
    body: "There wasn't a wrong turn. You stayed with the thought instead of fleeing it.",
  },
  mood: {
    title: "Named, not judged.",
    body: "A word for the weather is not a life sentence. You can rename tomorrow.",
  },
};

export function effortLine(score: number, best: number, fallback: string) {
  if (score <= 0) return fallback;
  if (best <= 0 || score > best) {
    return "A new personal best. What you tried before this still counts.";
  }
  if (score === best) return "You met your best. Effort, not a perfect record.";
  return fallback;
}

export function milestoneById(id: string) {
  return MILESTONES.find((m) => m.id === id);
}

const LEVELS = ["Ember", "Lantern", "Hearth", "Beacon", "Harbour", "Constellation"];

export function levelInfo(xp: number) {
  const safe = Math.max(0, xp);
  const level = Math.floor(safe / 80) + 1;
  const name = LEVELS[Math.min(LEVELS.length - 1, Math.floor((level - 1) / 2))] ?? "Ember";
  return { level, name, into: safe % 80, span: 80 };
}

export type TodayStats = {
  todayLoves: number;
  todayViews: number;
  todayRuns: number;
  todayBreaths: number;
};

export const MISSIONS = [
  {
    id: "love",
    title: "Leave a light",
    text: "Leave one love on a note that meets you.",
    met: (t: TodayStats) => t.todayLoves >= 1,
  },
  {
    id: "play",
    title: "Step into a room",
    text: "Finish any game, even a short visit. Leaving is allowed.",
    met: (t: TodayStats) => t.todayRuns >= 1,
  },
  {
    id: "read",
    title: "Let two notes sit",
    text: "Read two of Arron's notes. Scrolling past doesn't count — let them land.",
    met: (t: TodayStats) => t.todayViews >= 2,
  },
  {
    id: "breath",
    title: "Three soft tones",
    text: "Hold three tones in Healing Hz, or stay with Focus until the score passes thirty.",
    met: (t: TodayStats) => t.todayBreaths >= 3,
  },
] as const;

export function missionFor(day: string) {
  let n = 0;
  for (const c of day) n += c.charCodeAt(0);
  return MISSIONS[n % MISSIONS.length] ?? MISSIONS[0];
}

export const TRUTHS: { line: string; ok: boolean; why: string }[] = [
  {
    line: "Private A.L. Cooper, Royal Army Ordnance Corps, was Mentioned in Despatches.",
    ok: true,
    why: "The citation is in the London Gazette, 29 November 1945. We don't add a story past that.",
  },
  {
    line: "That Gazette citation is dated 29 November 1945.",
    ok: true,
    why: "Same record. The date is part of telling it truly.",
  },
  {
    line: "Water freezes at 0°C at ordinary pressure.",
    ok: true,
    why: "A plain fact. Useful when the mind wants drama.",
  },
  {
    line: "Asking for help means you have already failed.",
    ok: false,
    why: "Strength got you here. Help is how it lasts.",
  },
  {
    line: "This sanctuary sells the words you read.",
    ok: false,
    why: "Your loves, scores, and names stay on this device. We don't sell them.",
  },
  {
    line: "A breath is the same thing as a cure.",
    ok: false,
    why: "A breath is a door. You can open it and still be in a hard day.",
  },
  {
    line: "Evolution, not erasure, means delete the hard years.",
    ok: false,
    why: "It means the opposite. Keep what kept you. Build on it.",
  },
  {
    line: "Arron is a doctor.",
    ok: false,
    why: "Arron is a companion in this house. Not a clinician. Not treatment.",
  },
  {
    line: "You can dislike a note and push it down the feed.",
    ok: false,
    why: "Love only. There is no dislike, and no ranking.",
  },
  {
    line: "The night decides what you're worth.",
    ok: false,
    why: "The night is just quieter. It doesn't get a vote.",
  },
];

export const MIND_BEATS: {
  thought: string;
  a: { label: string; reply: string };
  b: { label: string; reply: string };
}[] = [
  {
    thought: "I should be further on by now.",
    a: {
      label: "Then I'll force a leap.",
      reply: "Forcing is how people go missing from their own life. The next stair is allowed to be small.",
    },
    b: {
      label: "I'm still on the stair that kept me.",
      reply: "That's a true place to stand. Further can wait without being cancelled.",
    },
  },
  {
    thought: "If I rest, I'll fall behind myself.",
    a: {
      label: "Rest is part of the work.",
      reply: "A lantern that never lands goes out. Sitting down is not quitting.",
    },
    b: {
      label: "I'll keep going and resent it.",
      reply: "You can keep going. Just don't call the resentment discipline. Name it, then choose.",
    },
  },
  {
    thought: "Other people make this look easy.",
    a: {
      label: "I'm only seeing their outside.",
      reply: "Feeds are shop windows. You don't know the night they had. Compare less. Return more.",
    },
    b: {
      label: "I'll copy them until I vanish.",
      reply: "Copying a surface won't give you their life. Your route is allowed to look like yours.",
    },
  },
  {
    thought: "I don't want to perform being fine.",
    a: {
      label: "Then I won't. Not here.",
      reply: "Good. This room doesn't need the performance. Water, a game, a note. Then you can go.",
    },
    b: {
      label: "I'll say I'm fine and mean 'not now'.",
      reply: "'Not now' is an honest sentence. You don't owe anyone the full story on demand.",
    },
  },
];

export const MOODS: { id: string; label: string; line: string; room: GameSlug }[] = [
  {
    id: "heavy",
    label: "Heavy",
    line: "Heavy is a weight, not a character flaw. Put one thing down. The cards can wait with you.",
    room: "solitaire",
  },
  {
    id: "restless",
    label: "Restless",
    line: "Restless energy wants a lane. Give it a lantern, not a lecture.",
    room: "dash",
  },
  {
    id: "flat",
    label: "Flat",
    line: "Flat is still a weather. You don't have to invent a spark. A slow tone is enough.",
    room: "healing",
  },
  {
    id: "tender",
    label: "Tender",
    line: "Tender means something got through. Be gentle with the rest of the hour.",
    room: "memory",
  },
  {
    id: "bright",
    label: "Bright",
    line: "Bright is allowed. You don't have to dull it to seem serious. Play if you want.",
    room: "connect",
  },
  {
    id: "unsure",
    label: "Unsure",
    line: "Unsure is an honest name. You can stand there without picking a costume.",
    room: "focus",
  },
];

export const TONES: { freq: 174 | 285 | 432 | 528 | 741 | 963; name: string; note: string }[] = [
  { freq: 174, name: "174", note: "Low and close. A floor, not a promise." },
  { freq: 285, name: "285", note: "A warm step up. Still soft." },
  { freq: 432, name: "432", note: "The one we use when the room needs easing." },
  { freq: 528, name: "528", note: "Brighter. Kindness, not a cure." },
  { freq: 741, name: "741", note: "Clear, short of sharp." },
  { freq: 963, name: "963", note: "High and quiet. Don't hold it long." },
];
