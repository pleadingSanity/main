import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as effortLine, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
import { a as cssPoint, c as useRaf, i as NIGHT, o as fitCanvas, r as FROST, t as CYAN } from "./engine-DUbwf_mN.mjs";
import { n as drawParticles, r as stepParticles, t as burst } from "./juice-Dh8Vk82k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pattern-1HVJbfTq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STAR = [
	{
		x: .5,
		y: .2
	},
	{
		x: .8,
		y: .38
	},
	{
		x: .7,
		y: .72
	},
	{
		x: .3,
		y: .72
	},
	{
		x: .2,
		y: .38
	},
	{
		x: .5,
		y: .48
	}
];
function make() {
	return {
		seq: [Math.floor(Math.random() * STAR.length)],
		mode: "show",
		clock: 0,
		at: 0,
		lives: 3,
		score: 0,
		particles: [],
		dead: false
	};
}
function PatternGame({ best, onFinish }) {
	const canvasRef = (0, import_react.useRef)(null);
	const simRef = (0, import_react.useRef)(make());
	const phaseRef = (0, import_react.useRef)("ready");
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [score, setScore] = (0, import_react.useState)(0);
	const [lives, setLives] = (0, import_react.useState)(3);
	const done = (0, import_react.useRef)(false);
	const end = ENDINGS.pattern;
	function setBoth(p) {
		phaseRef.current = p;
		setPhase(p);
	}
	function finish(s) {
		if (done.current || s <= 0) return;
		done.current = true;
		setScore(s);
		setBoth("over");
		blip(528, .16, .028);
		onFinish(s);
	}
	function begin() {
		done.current = false;
		simRef.current = make();
		setScore(0);
		setLives(3);
		setBoth("play");
	}
	useRaf(phase === "play", (dt) => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;
		const { w, h } = fitCanvas(canvas, ctx);
		const sim = simRef.current;
		if (sim.mode === "show" && !sim.dead) {
			sim.clock += dt;
			if (Math.floor(sim.clock / .7) >= sim.seq.length) {
				sim.mode = "input";
				sim.at = 0;
			}
		}
		stepParticles(sim.particles, dt);
		ctx.fillStyle = NIGHT;
		ctx.fillRect(0, 0, w, h);
		const showIdx = sim.mode === "show" ? Math.floor(sim.clock / .7) : -1;
		const showing = sim.mode === "show" && sim.clock % .7 < .42;
		STAR.forEach((star, i) => {
			const x = star.x * w;
			const y = star.y * h;
			const hot = showing && sim.seq[showIdx] === i;
			ctx.beginPath();
			ctx.fillStyle = hot ? CYAN : FROST;
			ctx.globalAlpha = hot ? 1 : .75;
			ctx.arc(x, y, hot ? 16 : 10, 0, Math.PI * 2);
			ctx.fill();
		});
		ctx.globalAlpha = 1;
		if (sim.mode === "input" && sim.at > 0) {
			ctx.strokeStyle = CYAN;
			ctx.globalAlpha = .7;
			ctx.beginPath();
			for (let n = 0; n < sim.at; n++) {
				const s = STAR[sim.seq[n] ?? 0];
				if (!s) continue;
				const x = s.x * w;
				const y = s.y * h;
				if (n === 0) ctx.moveTo(x, y);
				else ctx.lineTo(x, y);
			}
			ctx.stroke();
			ctx.globalAlpha = 1;
		}
		drawParticles(ctx, sim.particles);
	});
	function tap(e) {
		const canvas = canvasRef.current;
		const sim = simRef.current;
		if (!canvas || phaseRef.current !== "play" || sim.mode !== "input" || sim.dead) return;
		const p = cssPoint(canvas, e);
		const rect = canvas.getBoundingClientRect();
		let hit = -1;
		let bestD = 36;
		STAR.forEach((star, i) => {
			const d = Math.hypot(star.x * rect.width - p.x, star.y * rect.height - p.y);
			if (d < bestD) {
				bestD = d;
				hit = i;
			}
		});
		if (hit < 0) return;
		if (hit !== sim.seq[sim.at]) {
			sim.lives -= 1;
			setLives(sim.lives);
			blip(285, .1, .02);
			if (sim.lives <= 0) {
				sim.dead = true;
				finish(sim.score);
				return;
			}
			sim.mode = "show";
			sim.clock = 0;
			return;
		}
		burst(sim.particles, p.x, p.y, 8, 70);
		blip(741, .06, .02);
		sim.at += 1;
		if (sim.at < sim.seq.length) return;
		sim.score = sim.seq.length * 80;
		setScore(sim.score);
		sim.seq.push(Math.floor(Math.random() * STAR.length));
		sim.mode = "show";
		sim.clock = 0;
		blip(528, .08, .02);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Pattern Galaxy",
		lede: "Watch which stars wake, then tap them in order. Three gentle misses, then we stop.",
		phase,
		score,
		best,
		endTitle: end.title,
		endBody: effortLine(score, best, end.body),
		onAgain: begin,
		onRest: () => finish(simRef.current.score),
		hud: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "pointer-events-none absolute top-3 right-3 text-xs text-muted",
			children: [lives, " quiet misses left"]
		}),
		children: phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg",
				onClick: begin,
				children: "Watch the stars"
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "h-full w-full touch-none",
			onPointerDown: tap
		})
	});
}
//#endregion
export { PatternGame };
