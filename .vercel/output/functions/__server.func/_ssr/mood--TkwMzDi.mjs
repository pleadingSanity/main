import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as MOODS, l as effortLine, n as GAMES, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mood--TkwMzDi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MoodGame({ best, onFinish, onMood }) {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [pick, setPick] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const mood = MOODS.find((m) => m.id === pick);
	const room = GAMES.find((g) => g.slug === mood?.room);
	const end = ENDINGS.mood;
	function begin() {
		setPick(null);
		setScore(0);
		setPhase("play");
	}
	function choose(id) {
		setPick(id);
		onMood(id);
		blip(432, .1, .02);
	}
	function finish() {
		if (!pick) return;
		setScore(40);
		setPhase("over");
		blip(528, .16, .028);
		onFinish(40);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Mood Journey",
		lede: "Name the weather. Not a diagnosis, and not a file on you beyond this device.",
		phase,
		score: phase === "over" ? score : pick ? 40 : 0,
		best,
		endTitle: end.title,
		endBody: effortLine(score, best, end.body),
		onAgain: begin,
		onRest: finish,
		children: phase !== "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full place-items-center px-6 text-center text-sm text-muted",
			children: phase === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg",
				onClick: begin,
				children: "Name it"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col gap-3 overflow-auto p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: MOODS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => choose(m.id),
					className: `tap min-h-12 rounded-2xl border px-3 text-sm ${pick === m.id ? "border-primary text-primary" : "border-line"}`,
					children: m.label
				}, m.id))
			}), mood && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed",
					children: mood.line
				}), room && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/games/$slug",
					params: { slug: room.slug },
					className: "mt-3 inline-flex min-h-11 items-center text-sm text-primary",
					children: ["If you want a room: ", room.title]
				})]
			})]
		})
	});
}
//#endregion
export { MoodGame };
