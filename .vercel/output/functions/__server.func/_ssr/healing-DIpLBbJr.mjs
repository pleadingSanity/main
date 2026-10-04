import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as effortLine, s as TONES, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { a as stopPad, i as startPad, o as unlockAudio, r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/healing-DIpLBbJr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HealingGame({ best, onFinish, onBreath }) {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [held, setHeld] = (0, import_react.useState)(null);
	const [heard, setHeard] = (0, import_react.useState)([]);
	const [score, setScore] = (0, import_react.useState)(0);
	const heardRef = (0, import_react.useRef)([]);
	const started = (0, import_react.useRef)(0);
	const end = ENDINGS.healing;
	(0, import_react.useEffect)(() => () => stopPad(), []);
	function begin() {
		heardRef.current = [];
		setHeard([]);
		setHeld(null);
		setScore(0);
		setPhase("play");
	}
	function down(freq) {
		unlockAudio();
		started.current = performance.now();
		setHeld(freq);
		startPad(freq);
	}
	function up(freq) {
		stopPad();
		setHeld(null);
		if (!(performance.now() - started.current > 350) || heardRef.current.includes(freq)) return;
		const next = [...heardRef.current, freq];
		heardRef.current = next;
		setHeard(next);
		setScore(next.length * 20);
		onBreath();
		blip(741, .05, .012);
	}
	function finish() {
		if (score <= 0) return;
		setPhase("over");
		stopPad();
		blip(528, .2, .028);
		onFinish(score);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Healing Hz",
		lede: "Hold a tone. Only these six, and only softly. They are not medicine.",
		phase,
		score,
		best,
		endTitle: end.title,
		endBody: effortLine(score, best, end.body),
		onAgain: begin,
		onRest: finish,
		children: phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full place-items-center px-6 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg",
				onClick: begin,
				children: "Sit with the tones"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid h-full content-center gap-2 p-3",
			children: TONES.map((tone) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: `tap flex min-h-12 w-full items-center justify-between rounded-2xl border px-4 text-left ${held === tone.freq ? "border-primary bg-surface" : "border-line"}`,
				onPointerDown: (e) => {
					e.preventDefault();
					down(tone.freq);
				},
				onPointerUp: () => up(tone.freq),
				onPointerLeave: () => {
					if (held === tone.freq) up(tone.freq);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums text-primary",
					children: tone.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-0.5 block text-xs text-muted",
					children: tone.note
				})] }), heard.includes(tone.freq) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-primary",
					children: "Kept"
				})]
			}) }, tone.freq))
		})
	});
}
//#endregion
export { HealingGame };
