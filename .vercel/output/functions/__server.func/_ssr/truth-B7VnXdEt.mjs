import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as TRUTHS, l as effortLine, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/truth-B7VnXdEt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TruthGame({ best, onFinish }) {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [i, setI] = (0, import_react.useState)(0);
	const [correct, setCorrect] = (0, import_react.useState)(0);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const end = ENDINGS.truth;
	const card = TRUTHS[i];
	function begin() {
		setI(0);
		setCorrect(0);
		setPicked(null);
		setScore(0);
		setPhase("play");
	}
	function choose(ok) {
		if (!card || picked !== null) return;
		const hit = ok === card.ok;
		setPicked(ok);
		if (hit) {
			setCorrect((c) => c + 1);
			blip(741, .08, .02);
		} else blip(285, .08, .018);
	}
	function next() {
		if (picked === null) return;
		if (i + 1 >= TRUTHS.length) {
			const s = Math.max(10, correct * 15);
			setScore(s);
			setPhase("over");
			blip(528, .18, .03);
			onFinish(s);
			return;
		}
		setI((n) => n + 1);
		setPicked(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Truth Tag",
		lede: "Ten lines. Say if they hold. Then read why. No clock.",
		phase,
		score: phase === "over" ? score : correct * 15,
		best,
		endTitle: end.title,
		endBody: effortLine(score, best, end.body),
		onAgain: begin,
		children: phase !== "play" || !card ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full place-items-center px-6 text-center",
			children: phase === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg",
				onClick: begin,
				children: "Begin"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col justify-between gap-4 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted",
					children: [
						i + 1,
						" of ",
						TRUTHS.length
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lg leading-relaxed text-fg",
					children: card.line
				}),
				picked === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "tap min-h-12 rounded-2xl bg-primary font-medium text-bg",
						onClick: () => choose(true),
						children: "Holds"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "tap min-h-12 rounded-2xl border border-line",
						onClick: () => choose(false),
						children: "Doesn't"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed text-muted",
						children: card.why
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "tap min-h-12 rounded-full bg-primary font-medium text-bg",
						onClick: next,
						children: i + 1 >= TRUTHS.length ? "Keep this" : "Next"
					})]
				})
			]
		})
	});
}
//#endregion
export { TruthGame };
