import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as effortLine, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rhythm-DRdQt36u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TONE = [
	432,
	528,
	741,
	963
];
function RhythmGame({ best, onFinish }) {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [lit, setLit] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [note, setNote] = (0, import_react.useState)("Listen.");
	const seq = (0, import_react.useRef)([]);
	const mode = (0, import_react.useRef)("show");
	const at = (0, import_react.useRef)(0);
	const phrases = (0, import_react.useRef)(0);
	const busy = (0, import_react.useRef)(false);
	const end = ENDINGS.rhythm;
	function sleep(ms) {
		return new Promise((r) => window.setTimeout(r, ms));
	}
	async function playback(pattern) {
		busy.current = true;
		mode.current = "show";
		setNote("Listen.");
		await sleep(400);
		for (const step of pattern) {
			setLit(step);
			blip(TONE[step] ?? 528, .12, .02);
			await sleep(420);
			setLit(null);
			await sleep(180);
		}
		mode.current = "input";
		at.current = 0;
		busy.current = false;
		setNote("Your turn. The window is wide.");
	}
	async function begin() {
		const first = [Math.floor(Math.random() * 4)];
		seq.current = first;
		phrases.current = 0;
		setScore(0);
		setPhase("play");
		await playback(first);
	}
	async function tap(i) {
		if (phase !== "play" || mode.current !== "input" || busy.current) return;
		setLit(i);
		window.setTimeout(() => setLit(null), 160);
		if (i !== seq.current[at.current]) {
			blip(285, .1, .018);
			setNote("Again, from the start of the phrase. No mark against you.");
			await playback(seq.current);
			return;
		}
		blip(TONE[i] ?? 528, .1, .02);
		at.current += 1;
		if (at.current < seq.current.length) return;
		phrases.current += 1;
		const s = phrases.current * 40;
		setScore(s);
		if (phrases.current >= 4) {
			setPhase("over");
			blip(528, .2, .03);
			onFinish(s);
			return;
		}
		seq.current = [...seq.current, Math.floor(Math.random() * 4)];
		await playback(seq.current);
	}
	function finish() {
		if (score <= 0) return;
		setPhase("over");
		onFinish(score);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Rhythm Resonance",
		lede: "Four pads. Hear a short phrase, tap it back. Misses replay. They don't scold.",
		phase,
		score,
		best,
		endTitle: end.title,
		endBody: effortLine(score, best, end.body),
		onAgain: () => void begin(),
		onRest: finish,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-full flex-col items-center justify-center gap-4 p-4",
			children: phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg",
				onClick: () => void begin(),
				children: "Hear the phrase"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				"aria-live": "polite",
				children: note
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					0,
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": `Pad ${i + 1}`,
					onClick: () => void tap(i),
					className: `tap size-24 rounded-full border ${lit === i ? "border-primary bg-primary/20" : "border-line bg-surface"}`
				}, i))
			})] })
		})
	});
}
//#endregion
export { RhythmGame };
