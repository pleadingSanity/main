import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as effortLine, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/solitaire-BwyH9_FK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COVERS = [
	[1, 2],
	[3, 4],
	[4, 5],
	[],
	[],
	[]
];
var RANKS = [
	"",
	"A",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"J",
	"Q",
	"K"
];
var SUIT = [
	"spades",
	"hearts",
	"clubs",
	"diamonds"
];
var ROWS = [
	[0],
	[1, 2],
	[
		3,
		4,
		5
	]
];
function shuffle() {
	const cards = [];
	let id = 1;
	for (let s = 0; s < 4; s++) for (let r = 1; r <= 13; r++) cards.push({
		id: id++,
		r,
		s
	});
	for (let i = cards.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const a = cards[i];
		cards[i] = cards[j];
		cards[j] = a;
	}
	return cards;
}
function deal() {
	const d = shuffle();
	const peaks = [];
	for (let p = 0; p < 3; p++) {
		const row = [];
		for (let i = 0; i < 6; i++) row.push(d.pop() ?? null);
		peaks.push(row);
	}
	return {
		peaks,
		stock: d,
		waste: [],
		recycle: 1,
		removed: 0,
		flips: 0
	};
}
function isFree(peak, i) {
	return Boolean(peak[i]) && COVERS[i].every((k) => peak[k] == null);
}
function allClear(b) {
	return b.peaks.every((p) => p.every((c) => c == null));
}
function scoreOf(b, win) {
	return b.removed * 20 + (win ? 80 : 0) + (b.removed === 0 && b.flips > 0 ? 10 : 0);
}
function CardFace({ card, free, hinted, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled: !free,
		onClick,
		"aria-label": `${RANKS[card.r]} of ${SUIT[card.s]}`,
		className: `tap grid h-11 w-9 place-items-center rounded-md border text-[11px] leading-none ${hinted ? "border-primary" : "border-line"} ${free ? "bg-surface" : "bg-bg opacity-70"} ${card.s % 2 === 1 ? "text-flare" : "text-fg"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium",
			children: RANKS[card.r]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "uppercase",
			children: SUIT[card.s]?.slice(0, 1)
		})]
	});
}
function SolitaireGame({ best, onFinish }) {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [board, setBoard] = (0, import_react.useState)(null);
	const [hist, setHist] = (0, import_react.useState)([]);
	const [hint, setHint] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const done = (0, import_react.useRef)(false);
	function begin() {
		done.current = false;
		setBoard(deal());
		setHist([]);
		setHint(null);
		setScore(0);
		setPhase("play");
	}
	function bank(b, win) {
		if (done.current) return;
		const s = scoreOf(b, win);
		if (s <= 0 && !win) return;
		done.current = true;
		setScore(s);
		setPhase("over");
		if (win) blip(528, .22, .03);
		onFinish(s);
	}
	function play(p, i) {
		if (!board || done.current) return;
		const peak = board.peaks[p];
		if (!peak || !isFree(peak, i)) return;
		const card = peak[i];
		const top = board.waste[board.waste.length - 1];
		if (!card || !top || Math.abs(card.r - top.r) !== 1) return;
		const next = structuredClone(board);
		next.peaks[p][i] = null;
		next.waste.push(card);
		next.removed += 1;
		setHist((h) => [...h.slice(-40), board]);
		setBoard(next);
		setHint(null);
		blip(741, .06, .02);
		if (allClear(next)) bank(next, true);
	}
	function flip() {
		if (!board || done.current) return;
		const next = structuredClone(board);
		if (next.stock.length) {
			const c = next.stock.pop();
			if (c) next.waste.push(c);
		} else if (next.recycle > 0 && next.waste.length > 1) {
			const top = next.waste.pop();
			next.stock = [...next.waste].reverse();
			next.waste = top ? [top] : [];
			next.recycle -= 1;
		} else return;
		next.flips += 1;
		setHist((h) => [...h.slice(-40), board]);
		setBoard(next);
		setHint(null);
		blip(432, .05, .016);
	}
	function undo() {
		const prev = hist[hist.length - 1];
		if (!prev || done.current) return;
		setBoard(prev);
		setHist((h) => h.slice(0, -1));
		setHint(null);
	}
	function showHint() {
		if (!board) return;
		const top = board.waste[board.waste.length - 1];
		if (!top) {
			setHint(board.stock.length || board.recycle ? "stock" : null);
			return;
		}
		for (let p = 0; p < 3; p++) {
			const peak = board.peaks[p];
			for (let i = 0; i < 6; i++) {
				const c = peak[i];
				if (c && isFree(peak, i) && Math.abs(c.r - top.r) === 1) {
					setHint(c.id);
					return;
				}
			}
		}
		setHint(board.stock.length || board.recycle > 0 && board.waste.length > 1 ? "stock" : null);
	}
	const live = board ? scoreOf(board, false) : 0;
	const end = ENDINGS.solitaire;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Sanity Solitaire",
		lede: "Three peaks. Turn the stock, then play a free card one rank higher or lower. Kings don't meet aces.",
		phase,
		score: phase === "over" ? score : live,
		best,
		endTitle: end.title,
		endBody: effortLine(score, best, end.body),
		onAgain: begin,
		onRest: board ? () => bank(board, false) : void 0,
		footer: phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg",
			onClick: begin,
			children: "Deal"
		}) : phase === "play" && board ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap min-h-11 rounded-full border border-line px-4 text-sm",
					onClick: undo,
					disabled: !hist.length,
					children: "Undo"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap min-h-11 rounded-full border border-line px-4 text-sm",
					onClick: showHint,
					children: "Hint"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap min-h-11 rounded-full border border-line px-4 text-sm",
					onClick: begin,
					children: "Fresh deal"
				})
			]
		}) : null,
		children: phase === "ready" || !board ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full place-items-center px-6 pb-16 text-center text-sm text-muted",
			children: "Free cards are the ones nothing sits on. One pass through the stock when it runs dry."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col justify-between gap-2 p-2 pt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center gap-2 overflow-x-auto",
				children: board.peaks.map((peak, p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex shrink-0 flex-col items-center gap-1",
					children: ROWS.map((row, r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1",
						children: row.map((i) => {
							const card = peak[i];
							if (!card) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-11 w-9" }, i);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFace, {
								card,
								free: isFree(peak, i),
								hinted: hint === card.id,
								onClick: () => play(p, i)
							}, card.id);
						})
					}, r))
				}, p))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: flip,
					className: `tap grid h-14 w-11 place-items-center rounded-md border text-xs ${hint === "stock" ? "border-primary text-primary" : "border-line text-muted"}`,
					children: board.stock.length ? board.stock.length : board.recycle ? "Pass" : "—"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-14 w-11 place-items-center rounded-md border border-line bg-surface text-sm",
					children: board.waste.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: board.waste[board.waste.length - 1].s % 2 === 1 ? "text-flare" : "text-fg",
						children: RANKS[board.waste[board.waste.length - 1].r]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: "Turn"
					})
				})]
			})]
		})
	});
}
//#endregion
export { SolitaireGame };
