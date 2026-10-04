import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as effortLine, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/nebula-7xHbAwfq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function spawn(g) {
	const open = g.flatMap((n, i) => n === 0 ? [i] : []);
	if (!open.length) return false;
	g[open[Math.floor(Math.random() * open.length)]] = Math.random() < .9 ? 2 : 4;
	return true;
}
function fresh() {
	const g = Array(16).fill(0);
	spawn(g);
	spawn(g);
	return g;
}
function take(g, dir, i) {
	const line = [];
	for (let k = 0; k < 4; k++) if (dir === 0) line.push(g[i * 4 + k]);
	else if (dir === 1) line.push(g[i * 4 + (3 - k)]);
	else if (dir === 2) line.push(g[k * 4 + i]);
	else line.push(g[(3 - k) * 4 + i]);
	return line;
}
function put(g, dir, i, line) {
	for (let k = 0; k < 4; k++) {
		const v = line[k] ?? 0;
		if (dir === 0) g[i * 4 + k] = v;
		else if (dir === 1) g[i * 4 + (3 - k)] = v;
		else if (dir === 2) g[k * 4 + i] = v;
		else g[(3 - k) * 4 + i] = v;
	}
}
function squash(line) {
	const nums = line.filter((n) => n > 0);
	const out = [];
	let gained = 0;
	for (let i = 0; i < nums.length; i++) if (nums[i] === nums[i + 1]) {
		const v = (nums[i] ?? 0) * 2;
		out.push(v);
		gained += v;
		i++;
	} else out.push(nums[i] ?? 0);
	while (out.length < 4) out.push(0);
	const moved = out.some((n, i) => n !== line[i]);
	return {
		out,
		gained,
		moved
	};
}
function canMove(g) {
	if (g.some((n) => n === 0)) return true;
	for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
		const v = g[r * 4 + c];
		if (c < 3 && v === g[r * 4 + c + 1]) return true;
		if (r < 3 && v === g[(r + 1) * 4 + c]) return true;
	}
	return false;
}
function NebulaGame({ best, onFinish }) {
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [grid, setGrid] = (0, import_react.useState)(() => fresh());
	const [score, setScore] = (0, import_react.useState)(0);
	const origin = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const end = ENDINGS.nebula;
	function begin() {
		setGrid(fresh());
		setScore(0);
		setPhase("play");
	}
	function finish(s) {
		if (s <= 0) return;
		setScore(s);
		setPhase("over");
		blip(528, .16, .028);
		onFinish(s);
	}
	function move(dir) {
		if (phase !== "play") return;
		const next = grid.slice();
		let gained = 0;
		let moved = false;
		for (let i = 0; i < 4; i++) {
			const squashed = squash(take(next, dir, i));
			put(next, dir, i, squashed.out);
			gained += squashed.gained;
			moved = moved || squashed.moved;
		}
		if (!moved) return;
		spawn(next);
		const s = score + gained;
		setGrid(next);
		setScore(s);
		if (gained) blip(741, .06, .02);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Number Nebula",
		lede: "Slide. Twins fold into one brighter shard. A full sky can be kept or opened again.",
		phase,
		score,
		best,
		endTitle: end.title,
		endBody: effortLine(score, best, end.body),
		onAgain: begin,
		onRest: () => finish(score),
		footer: phase === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap min-h-12 rounded-2xl border border-line",
					onClick: () => move(2),
					"aria-label": "Slide up",
					children: "Up"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap min-h-12 rounded-2xl border border-line",
					onClick: () => move(0),
					"aria-label": "Slide left",
					children: "Left"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap min-h-12 rounded-2xl border border-line text-sm text-muted",
					onClick: begin,
					children: "Fresh"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap min-h-12 rounded-2xl border border-line",
					onClick: () => move(1),
					"aria-label": "Slide right",
					children: "Right"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "tap min-h-12 rounded-2xl border border-line",
					onClick: () => move(3),
					"aria-label": "Slide down",
					children: "Down"
				})
			]
		}) : phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg",
			onClick: begin,
			children: "Open a sky"
		}) : null,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full place-items-center p-3 touch-none",
			onPointerDown: (e) => {
				origin.current = {
					x: e.clientX,
					y: e.clientY
				};
			},
			onPointerUp: (e) => {
				const dx = e.clientX - origin.current.x;
				const dy = e.clientY - origin.current.y;
				if (Math.hypot(dx, dy) < 28) return;
				if (Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? 1 : 0);
				else move(dy > 0 ? 3 : 2);
			},
			children: phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-6 text-center text-sm text-muted",
				children: "Swipe or use the buttons. Nothing explodes."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-2",
				children: grid.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `grid size-14 place-items-center rounded-xl border tabular-nums ${n ? "border-primary bg-surface text-fg" : "border-line text-transparent"}`,
					children: n || ""
				}, i))
			}), phase === "play" && !canMove(grid) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-center text-sm text-muted",
				children: "The sky is full. Keep it, or open another."
			})] })
		})
	});
}
//#endregion
export { NebulaGame };
