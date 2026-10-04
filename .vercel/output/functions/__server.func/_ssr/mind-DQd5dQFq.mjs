import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as MIND_BEATS, l as effortLine, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mind-DQd5dQFq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MindGame({ best, onFinish }) {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [i, setI] = (0, import_react.useState)(0);
	const [reply, setReply] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const beat = MIND_BEATS[i];
	const end = ENDINGS.mind;
	function begin() {
		setI(0);
		setReply(null);
		setScore(0);
		setPhase("play");
	}
	function pick(text) {
		setReply(text);
		blip(432, .08, .02);
	}
	function next() {
		if (!reply) return;
		if (i + 1 >= MIND_BEATS.length) {
			setScore(80);
			setPhase("over");
			blip(528, .18, .03);
			onFinish(80);
			return;
		}
		setI((n) => n + 1);
		setReply(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Mind Mode",
		lede: "Four thoughts. Two answers each. Neither is marked wrong.",
		phase,
		score: phase === "over" ? score : i * 20,
		best,
		endTitle: end.title,
		endBody: effortLine(score, best, end.body),
		onAgain: begin,
		children: phase !== "play" || !beat ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full place-items-center",
			children: phase === "ready" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg",
				onClick: begin,
				children: "Walk it"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col justify-between gap-4 overflow-auto p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Step ",
					i + 1,
					" of ",
					MIND_BEATS.length
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-lg leading-relaxed",
				children: beat.thought
			})] }), reply ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: reply
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap min-h-12 rounded-full bg-primary font-medium text-bg",
					onClick: next,
					children: i + 1 >= MIND_BEATS.length ? "Keep this walk" : "Next thought"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap min-h-12 rounded-2xl border border-line px-3 text-left text-sm",
					onClick: () => pick(beat.a.reply),
					children: beat.a.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap min-h-12 rounded-2xl border border-line px-3 text-left text-sm",
					onClick: () => pick(beat.b.reply),
					children: beat.b.label
				})]
			})]
		})
	});
}
//#endregion
export { MindGame };
