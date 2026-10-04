import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as effortLine, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
import { c as useRaf, i as NIGHT, o as fitCanvas, r as FROST, s as prefersReducedMotion, t as CYAN } from "./engine-DUbwf_mN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/focus-D0cpEwtW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FocusGame({ best, onFinish, onBreath }) {
	const canvasRef = (0, import_react.useRef)(null);
	const phaseRef = (0, import_react.useRef)("ready");
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [score, setScore] = (0, import_react.useState)(0);
	const sim = (0, import_react.useRef)({
		t: 0,
		rx: 0,
		ry: 0,
		score: 0,
		shown: 0,
		breaths: 0,
		near: 0
	});
	const ring = (0, import_react.useRef)({
		x: 0,
		y: 0,
		ready: false
	});
	const done = (0, import_react.useRef)(false);
	const end = ENDINGS.focus;
	function setBoth(p) {
		phaseRef.current = p;
		setPhase(p);
	}
	function begin() {
		done.current = false;
		sim.current = {
			t: 0,
			rx: 0,
			ry: 0,
			score: 0,
			shown: 0,
			breaths: 0,
			near: 0
		};
		ring.current.ready = false;
		setScore(0);
		setBoth("play");
	}
	function finish() {
		const s = Math.floor(sim.current.score);
		if (done.current || s <= 0) return;
		done.current = true;
		setScore(s);
		setBoth("over");
		blip(528, .16, .025);
		onFinish(s);
	}
	useRaf(phase === "play", (dt) => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;
		const { w, h } = fitCanvas(canvas, ctx);
		const s = sim.current;
		const reduced = prefersReducedMotion();
		s.t += dt * (reduced ? .45 : 1);
		const cx = w / 2;
		const cy = h / 2;
		const mx = Math.sin(s.t * .65) * w * .28;
		const my = Math.cos(s.t * .48) * h * .22;
		const tx = cx + mx;
		const ty = cy + my;
		if (!ring.current.ready) ring.current = {
			x: cx,
			y: cy,
			ready: true
		};
		1 - Math.exp(-8 * dt);
		ring.current.x += (ring.current.x - ring.current.x) * 0;
		const followX = ring.current.x;
		const followY = ring.current.y;
		if (Math.hypot(followX - tx, followY - ty) < 42) {
			s.score += dt * 14;
			s.near += dt;
			if (s.near > 8) {
				s.near = 0;
				s.breaths += 1;
				onBreath();
			}
		}
		const shown = Math.floor(s.score);
		if (shown !== s.shown) {
			s.shown = shown;
			setScore(shown);
		}
		ctx.fillStyle = NIGHT;
		ctx.fillRect(0, 0, w, h);
		ctx.beginPath();
		ctx.strokeStyle = FROST;
		ctx.globalAlpha = .8;
		ctx.lineWidth = 2;
		ctx.arc(followX, followY, 36, 0, Math.PI * 2);
		ctx.stroke();
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.fillStyle = CYAN;
		ctx.arc(tx, ty, 8, 0, Math.PI * 2);
		ctx.fill();
	});
	function place(e) {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const rect = canvas.getBoundingClientRect();
		ring.current.x = e.clientX - rect.left;
		ring.current.y = e.clientY - rect.top;
		ring.current.ready = true;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Cosmic Focus",
		lede: "Drag the ring so it stays near the mote. No clock. Stop when you want.",
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
				children: "Stay with it"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "h-full w-full touch-none",
			onPointerDown: place,
			onPointerMove: (e) => {
				if (e.buttons) place(e);
			}
		})
	});
}
//#endregion
export { FocusGame };
