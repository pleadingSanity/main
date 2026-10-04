import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as effortLine, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/memory-DZ1y2Lax.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KIND = [
	"ring",
	"dot",
	"diamond",
	"plus",
	"wave",
	"arc",
	"square",
	"spark"
];
function deal() {
	const ks = [...KIND, ...KIND];
	for (let i = ks.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const a = ks[i];
		ks[i] = ks[j];
		ks[j] = a;
	}
	return ks.map((k, id) => ({
		id,
		k: KIND.indexOf(k),
		up: false,
		held: false
	}));
}
function Face({ k }) {
	const common = "stroke-primary fill-none";
	if (k === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 40 40",
		className: "size-7",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "20",
			cy: "20",
			r: "10",
			className: common,
			strokeWidth: "2"
		})
	});
	if (k === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 40 40",
		className: "size-7",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "20",
			cy: "20",
			r: "5",
			className: "fill-primary"
		})
	});
	if (k === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 40 40",
		className: "size-7",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 8 L32 20 L20 32 L8 20 Z",
			className: common,
			strokeWidth: "2"
		})
	});
	if (k === 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 40 40",
		className: "size-7",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 8 V32 M8 20 H32",
			className: common,
			strokeWidth: "2"
		})
	});
	if (k === 4) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 40 40",
		className: "size-7",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M6 24 Q13 12 20 24 T34 24",
			className: common,
			strokeWidth: "2"
		})
	});
	if (k === 5) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 40 40",
		className: "size-7",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M10 28 A12 12 0 1 1 30 28",
			className: common,
			strokeWidth: "2"
		})
	});
	if (k === 6) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 40 40",
		className: "size-7",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "10",
			y: "10",
			width: "20",
			height: "20",
			className: common,
			strokeWidth: "2"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 40 40",
		className: "size-7",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M20 8 L22 18 L32 20 L22 22 L20 32 L18 22 L8 20 L18 18 Z",
			className: "fill-flare"
		})
	});
}
function MemoryGame({ best, onFinish }) {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [cards, setCards] = (0, import_react.useState)([]);
	const [lock, setLock] = (0, import_react.useState)(false);
	const [turns, setTurns] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const end = ENDINGS.memory;
	const pairs = cards.filter((c) => c.held).length / 2;
	function begin() {
		setCards(deal());
		setLock(false);
		setTurns(0);
		setScore(0);
		setPhase("play");
	}
	function finish(s) {
		if (s <= 0) return;
		setScore(s);
		setPhase("over");
		blip(528, .2, .03);
		onFinish(s);
	}
	function flip(id) {
		if (lock || phase !== "play") return;
		const card = cards.find((c) => c.id === id);
		if (!card || card.up || card.held) return;
		const up = cards.map((c) => c.id === id ? {
			...c,
			up: true
		} : c);
		const open = up.filter((c) => c.up && !c.held);
		setCards(up);
		blip(432, .04, .016);
		if (open.length < 2) return;
		setTurns((n) => n + 1);
		const [a, b] = open;
		if (!a || !b) return;
		if (a.k === b.k) {
			const held = up.map((c) => c.k === a.k ? {
				...c,
				held: true,
				up: true
			} : c);
			setCards(held);
			blip(963, .08, .02);
			const got = held.filter((c) => c.held).length / 2;
			if (got === 8) {
				const s = got * 30 + Math.max(0, 40 - turns) * 2;
				window.setTimeout(() => finish(s), 350);
			}
			return;
		}
		setLock(true);
		window.setTimeout(() => {
			setCards((curr) => curr.map((c) => c.held ? c : {
				...c,
				up: false
			}));
			setLock(false);
		}, 700);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Memory Ocean",
		lede: "Turn two shells. Matches stay. The rest close on their own.",
		phase,
		score: phase === "over" ? score : Math.floor(pairs) * 30,
		best,
		endTitle: end.title,
		endBody: effortLine(score, best, end.body),
		onAgain: begin,
		onRest: () => finish(Math.floor(pairs) * 30),
		children: phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg",
				onClick: begin,
				children: "Lay the shells"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full grid-cols-4 content-center gap-2 p-3",
			children: cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => flip(card.id),
				"aria-label": card.up || card.held ? KIND[card.k] : "Face down shell",
				className: `tap grid aspect-square place-items-center rounded-xl border ${card.up || card.held ? "border-primary bg-surface" : "border-line bg-bg"}`,
				children: (card.up || card.held) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Face, { k: card.k })
			}, card.id))
		})
	});
}
//#endregion
export { MemoryGame };
