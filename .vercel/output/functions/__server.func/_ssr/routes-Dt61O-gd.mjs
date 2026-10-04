import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as localDay, h as useSanctuary, n as GAMES, p as missionFor, u as levelInfo } from "./sanctuary-store-C-B1SQP6.mjs";
import { t as Art } from "./art-DoAwP5jz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dt61O-gd.js
var import_jsx_runtime = require_jsx_runtime();
var DOORS = [
	{
		to: "/games",
		title: "Play",
		body: "Twelve rooms. Leave any of them. Effort is the score that matters."
	},
	{
		to: "/feed",
		title: "Feed",
		body: "Arron, newest first. A love if a line meets you. No dislike."
	},
	{
		to: "/path",
		title: "Path",
		body: "Notes that arrive when you show up. Not a badge shop."
	},
	{
		to: "/launch",
		title: "Rise",
		body: "How this grows without erasing the work, and without a paywall."
	}
];
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
	const met = hydrated && mission.met({
		todayLoves,
		todayViews,
		todayRuns,
		todayBreaths
	});
	const kept = hydrated && dailyDone === localDay();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rise flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Art, {
				eager: true,
				src: "/media/hero.jpg",
				alt: "A cosmic brain of starlight with one cyan tear, the sanctuary mark.",
				className: "aspect-video w-full rounded-2xl border border-line object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-[0.2em] text-primary uppercase",
				children: "Ascension"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl text-fg",
				children: "A place to land."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
				className: "border-l border-primary pl-4 text-base leading-relaxed text-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "I made this because some nights the quiet gets too loud, and the places that say they'll help want a performance of being fine." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3",
						children: "This is the sanctuary. Twelve small rooms you can leave. Notes from Arron that don't rank your pain. A path that notices when you show up, and says so like a person."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3",
						children: "I'm not above any of this. I built it from the same floor. If all you do is look at the mark and drink some water, you used it properly."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3",
						children: "Evolution, not erasure. What kept you here stays. We build on it."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "mt-3 text-sm text-muted",
						children: "Shane Cooper"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-2xl p-4",
				"aria-label": "Today",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-primary",
						children: mission.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 leading-relaxed",
						children: mission.text
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: kept ? "Today is kept. You can stop." : met ? "That's done. You can keep it." : "Whenever you're ready. Missing it changes nothing about you."
					}),
					met && !kept && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "tap mt-3 min-h-11 rounded-full bg-primary px-4 text-sm font-medium text-bg",
						onClick: claimDaily,
						children: "Keep today"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid grid-cols-3 gap-2 text-center",
				"aria-label": "On this device",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: level.name,
						value: hydrated ? `Lv ${level.level}` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Loves",
						value: hydrated ? String(loves) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Streak",
						value: hydrated ? String(streak) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Rooms",
						value: hydrated ? `${tried}/${GAMES.length}` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Soft",
						value: hydrated ? String(breaths) : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Light",
						value: hydrated ? String(xp) : "—"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 overflow-hidden rounded-full bg-line",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full origin-left bg-primary",
					style: { transform: `scaleX(${hydrated ? level.into / level.span : 0})` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid gap-3",
				children: DOORS.map((door) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: door.to,
					className: "tap glass block rounded-2xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg text-fg",
						children: door.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm leading-relaxed text-muted",
						children: door.body
					})]
				}) }, door.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "Not a therapist. Not a clinic. If you're unsafe, get to a person near you. Loves, scores, and the name you give the weather stay on this device. Forget-me is on the Path."
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line px-2 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 tabular-nums text-fg",
			children: value
		})]
	});
}
//#endregion
export { Home as component };
