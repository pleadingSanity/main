import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as effortLine, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/connect-CvhBlnRX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GLYPH = [
	"○",
	"◇",
	"△",
	"＋",
	"✦",
	"◌",
	"▢",
	"✧"
];
function deal() {
	const kinds = [
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7
	];
	for (let i = kinds.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const a = kinds[i];
		kinds[i] = kinds[j];
		kinds[j] = a;
	}
	return kinds.map((k, i) => ({
		id: i,
		k,
		c: i % 4,
		r: Math.floor(i / 4),
		on: true
	}));
}
function aligned(a, b, tiles) {
	if (a.k !== b.k || a.id === b.id) return false;
	if (a.c === b.c) {
		const lo = Math.min(a.r, b.r);
		const hi = Math.max(a.r, b.r);
		return !tiles.some((t) => t.on && t.c === a.c && t.r > lo && t.r < hi);
	}
	if (a.r === b.r) {
		const lo = Math.min(a.c, b.c);
		const hi = Math.max(a.c, b.c);
		return !tiles.some((t) => t.on && t.r === a.r && t.c > lo && t.c < hi);
	}
	return false;
}
function ConnectGame({ best, onFinish }) {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [tiles, setTiles] = (0, import_react.useState)([]);
	const [pick, setPick] = (0, import_react.useState)(null);
	const [score, setScore] = (0, import_react.useState)(0);
	const [bad, setBad] = (0, import_react.useState)(false);
	const end = ENDINGS.connect;
	const left = tiles.filter((t) => t.on).length;
	function begin() {
		setTiles(deal());
		setPick(null);
		setScore(0);
		setBad(false);
		setPhase("play");
	}
	function finish(s) {
		if (s <= 0) return;
		setScore(s);
		setPhase("over");
		blip(528, .18, .03);
		onFinish(s);
	}
	function tap(tile) {
		if (!tile.on || phase !== "play") return;
		if (pick === null) {
			setPick(tile.id);
			blip(432, .05, .016);
			return;
		}
		if (pick === tile.id) {
			setPick(null);
			return;
		}
		const a = tiles.find((t) => t.id === pick);
		if (!a) return;
		if (aligned(a, tile, tiles)) {
			const next = tiles.map((t) => t.id === a.id || t.id === tile.id ? {
				...t,
				on: false
			} : t);
			const s = score + 25;
			setTiles(next);
			setScore(s);
			setPick(null);
			setBad(false);
			blip(963, .08, .022);
			if (next.every((t) => !t.on)) finish(s + 40);
			return;
		}
		setBad(true);
		setPick(null);
		blip(285, .08, .018);
	}
	const stuck = (0, import_react.useMemo)(() => {
		const live = tiles.filter((t) => t.on);
		for (let i = 0; i < live.length; i++) for (let j = i + 1; j < live.length; j++) if (aligned(live[i], live[j], tiles)) return false;
		return live.length > 0;
	}, [tiles]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Cosmic Connect",
		lede: "Tap two matching marks on the same row or column if nothing sits between them.",
		phase,
		score,
		best,
		endTitle: end.title,
		endBody: effortLine(score, best, end.body),
		onAgain: begin,
		onRest: () => finish(score),
		footer: phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg",
			onClick: begin,
			children: "Open the sky"
		}) : phase === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "tap min-h-11 rounded-full border border-line px-4 text-sm text-muted",
			onClick: begin,
			children: "Fresh sky"
		}) : null,
		children: phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full place-items-center px-6 text-center text-sm text-muted",
			children: "Straight lines only. A blocked path just means try another pair."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid h-full place-items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-2 p-4",
					children: tiles.map((tile) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !tile.on,
						onClick: () => tap(tile),
						className: `tap grid size-14 place-items-center rounded-xl border text-xl ${!tile.on ? "border-transparent text-transparent" : pick === tile.id ? "border-primary bg-surface text-primary" : "border-line bg-surface text-fg"}`,
						"aria-label": tile.on ? `Mark ${tile.k + 1}` : "Cleared",
						children: tile.on ? GLYPH[tile.k] : ""
					}, tile.id))
				}),
				stuck && phase === "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-4 text-center text-sm text-muted",
					children: "No clear line left. Fresh sky, or keep what you joined."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "sr-only",
					children: [
						left,
						" still lit. ",
						bad ? "That pair didn't join." : ""
					]
				})
			]
		})
	});
}
//#endregion
export { ConnectGame };
