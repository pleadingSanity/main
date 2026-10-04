import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as effortLine, t as ENDINGS } from "./sanctuary-store-C-B1SQP6.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as GameFrame } from "./frame-DR75hDM1.mjs";
import { c as useRaf, i as NIGHT, n as FLARE, o as fitCanvas, r as FROST, s as prefersReducedMotion, t as CYAN } from "./engine-DUbwf_mN.mjs";
import { i as traumaOffset, n as drawParticles, r as stepParticles, t as burst } from "./juice-Dh8Vk82k.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dash-D9DnKfNH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function make() {
	return {
		t: 0,
		lane: 1,
		y: 0,
		spawn: .2,
		bits: [],
		dust: 0,
		lanterns: 3,
		particles: [],
		trauma: 0,
		dead: false
	};
}
function DashGame({ best, onFinish }) {
	const canvasRef = (0, import_react.useRef)(null);
	const simRef = (0, import_react.useRef)(make());
	const phaseRef = (0, import_react.useRef)("ready");
	const [phase, setPhase] = (0, import_react.useState)("ready");
	const [score, setScore] = (0, import_react.useState)(0);
	const [lanterns, setLanterns] = (0, import_react.useState)(3);
	const done = (0, import_react.useRef)(false);
	const end = ENDINGS.dash;
	function setBoth(p) {
		phaseRef.current = p;
		setPhase(p);
	}
	function currentScore() {
		const s = simRef.current;
		return s.dust * 10 + Math.floor(s.t * 2);
	}
	function finish(force = false) {
		const raw = currentScore();
		const s = force ? Math.max(raw, 8) : raw;
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
		setLanterns(3);
		setBoth("play");
	}
	function shift(dir) {
		if (phaseRef.current !== "play") return;
		simRef.current.lane = Math.max(0, Math.min(2, simRef.current.lane + dir));
	}
	useRaf(phase === "play", (dt) => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;
		const { w, h } = fitCanvas(canvas, ctx);
		const sim = simRef.current;
		const reduced = prefersReducedMotion();
		if (!sim.dead) {
			sim.t += dt;
			const speed = (reduced ? 70 : 110) + Math.min(80, sim.t * 2);
			sim.spawn -= dt;
			if (sim.spawn <= 0) {
				sim.spawn = reduced ? 1.1 : .85;
				sim.bits.push({
					lane: Math.floor(Math.random() * 3),
					y: -20,
					dust: Math.random() < .62
				});
			}
			const py = h * .78;
			for (const bit of sim.bits) bit.y += speed * dt;
			const keep = [];
			for (const bit of sim.bits) {
				if (Math.abs(bit.y - py) < 22 && bit.lane === sim.lane) {
					const x = (bit.lane + .5) * w / 3;
					if (bit.dust) {
						sim.dust += 1;
						burst(sim.particles, x, py, 8, 60);
						blip(963, .05, .018);
					} else {
						sim.lanterns -= 1;
						sim.trauma = Math.min(1, sim.trauma + .45);
						setLanterns(sim.lanterns);
						blip(285, .1, .02);
						if (sim.lanterns <= 0) {
							sim.dead = true;
							finish(true);
						}
					}
					continue;
				}
				if (bit.y < h + 30) keep.push(bit);
			}
			sim.bits = keep;
			const shown = currentScore();
			setScore(shown);
		}
		if (!reduced) sim.trauma = Math.max(0, sim.trauma - dt * 1.3);
		else sim.trauma = 0;
		stepParticles(sim.particles, dt);
		const shake = traumaOffset(sim.trauma, sim.t);
		ctx.fillStyle = NIGHT;
		ctx.fillRect(0, 0, w, h);
		ctx.save();
		ctx.translate(shake.x, shake.y);
		for (let lane = 0; lane < 3; lane++) {
			ctx.strokeStyle = "rgba(238,246,255,0.12)";
			ctx.beginPath();
			ctx.moveTo((lane + .5) * w / 3, 0);
			ctx.lineTo((lane + .5) * w / 3, h);
			ctx.stroke();
		}
		for (const bit of sim.bits) {
			const x = (bit.lane + .5) * w / 3;
			ctx.beginPath();
			ctx.fillStyle = bit.dust ? CYAN : "transparent";
			ctx.strokeStyle = bit.dust ? CYAN : FLARE;
			ctx.lineWidth = 2;
			ctx.arc(x, bit.y, bit.dust ? 8 : 12, 0, Math.PI * 2);
			if (bit.dust) ctx.fill();
			else ctx.stroke();
		}
		const px = (sim.lane + .5) * w / 3;
		ctx.beginPath();
		ctx.fillStyle = FROST;
		ctx.arc(px, h * .78, 11, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
		drawParticles(ctx, sim.particles);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameFrame, {
		title: "Stardust Dash",
		lede: "Move the lantern. Collect the bright dust. Let the hollow rings pass. Rest when you like.",
		phase,
		score,
		best,
		endTitle: end.title,
		endBody: effortLine(score, best, end.body),
		onAgain: begin,
		onRest: finish,
		hud: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "pointer-events-none absolute top-3 right-3 text-xs text-muted",
			children: [lanterns, " lanterns"]
		}),
		footer: phase === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tap min-h-14 rounded-2xl border border-line text-primary",
				onClick: () => shift(-1),
				children: "Left"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tap min-h-14 rounded-2xl border border-line text-primary",
				onClick: () => shift(1),
				children: "Right"
			})]
		}) : phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "tap min-h-12 rounded-full bg-primary px-6 font-medium text-bg",
			onClick: begin,
			children: "Light the lantern"
		}) : null,
		children: phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-full place-items-center px-6 text-center text-sm text-muted",
			children: "Three lanes. Bright motes are yours. Hollow rings are only weather."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
			ref: canvasRef,
			className: "h-full w-full touch-none",
			onKeyDown: (e) => {
				if (e.key === "ArrowLeft") shift(-1);
				if (e.key === "ArrowRight") shift(1);
			},
			tabIndex: 0
		})
	});
}
//#endregion
export { DashGame };
