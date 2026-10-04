import { i as __toESM } from "./_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { h as useSanctuary, n as GAMES } from "./_ssr/sanctuary-store-C-B1SQP6.mjs";
import { n as Route } from "./_ssr/router-DEomBZbs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-DQM_Hsfk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SolitaireGame = (0, import_react.lazy)(() => import("./_ssr/solitaire-BwyH9_FK.mjs").then((m) => ({ default: m.SolitaireGame })));
var ConnectGame = (0, import_react.lazy)(() => import("./_ssr/connect-CvhBlnRX.mjs").then((m) => ({ default: m.ConnectGame })));
var TruthGame = (0, import_react.lazy)(() => import("./_ssr/truth-B7VnXdEt.mjs").then((m) => ({ default: m.TruthGame })));
var FocusGame = (0, import_react.lazy)(() => import("./_ssr/focus-D0cpEwtW.mjs").then((m) => ({ default: m.FocusGame })));
var NebulaGame = (0, import_react.lazy)(() => import("./_ssr/nebula-7xHbAwfq.mjs").then((m) => ({ default: m.NebulaGame })));
var PatternGame = (0, import_react.lazy)(() => import("./_ssr/pattern-1HVJbfTq.mjs").then((m) => ({ default: m.PatternGame })));
var MemoryGame = (0, import_react.lazy)(() => import("./_ssr/memory-DZ1y2Lax.mjs").then((m) => ({ default: m.MemoryGame })));
var RhythmGame = (0, import_react.lazy)(() => import("./_ssr/rhythm-DRdQt36u.mjs").then((m) => ({ default: m.RhythmGame })));
var DashGame = (0, import_react.lazy)(() => import("./_ssr/dash-D9DnKfNH.mjs").then((m) => ({ default: m.DashGame })));
var HealingGame = (0, import_react.lazy)(() => import("./_ssr/healing-DIpLBbJr.mjs").then((m) => ({ default: m.HealingGame })));
var MindGame = (0, import_react.lazy)(() => import("./_ssr/mind-DQd5dQFq.mjs").then((m) => ({ default: m.MindGame })));
var MoodGame = (0, import_react.lazy)(() => import("./_ssr/mood--TkwMzDi.mjs").then((m) => ({ default: m.MoodGame })));
function isSlug(value) {
	return GAMES.some((g) => g.slug === value);
}
function Room() {
	const { slug } = Route.useParams();
	const best = useSanctuary((s) => isSlug(slug) ? s.best[slug] ?? 0 : 0);
	const recordRun = useSanctuary((s) => s.recordRun);
	const recordBreaths = useSanctuary((s) => s.recordBreaths);
	const setMood = useSanctuary((s) => s.setMood);
	if (!isSlug(slug)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "text-3xl",
		children: "That room isn't here."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/games",
		className: "mt-4 inline-flex min-h-11 items-center text-primary",
		children: "Back to play"
	})] });
	const finish = (score) => recordRun(slug, score);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Opening the room…"
		}),
		children: [
			slug === "solitaire" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SolitaireGame, {
				best,
				onFinish: finish
			}),
			slug === "connect" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectGame, {
				best,
				onFinish: finish
			}),
			slug === "truth" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruthGame, {
				best,
				onFinish: finish
			}),
			slug === "focus" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusGame, {
				best,
				onFinish: finish,
				onBreath: () => recordBreaths(1)
			}),
			slug === "nebula" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NebulaGame, {
				best,
				onFinish: finish
			}),
			slug === "pattern" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatternGame, {
				best,
				onFinish: finish
			}),
			slug === "memory" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryGame, {
				best,
				onFinish: finish
			}),
			slug === "rhythm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RhythmGame, {
				best,
				onFinish: finish
			}),
			slug === "dash" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashGame, {
				best,
				onFinish: finish
			}),
			slug === "healing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HealingGame, {
				best,
				onFinish: finish,
				onBreath: () => recordBreaths(1)
			}),
			slug === "mind" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MindGame, {
				best,
				onFinish: finish
			}),
			slug === "mood" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoodGame, {
				best,
				onFinish: finish,
				onMood: setMood
			})
		]
	});
}
//#endregion
export { Room as component };
