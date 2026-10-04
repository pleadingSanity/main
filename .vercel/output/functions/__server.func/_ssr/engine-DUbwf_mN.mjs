import { i as __toESM } from "../_runtime.mjs";
import { J as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/engine-DUbwf_mN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var NIGHT = "#000103";
var CYAN = "#00fff0";
var FROST = "#eef6ff";
var FLARE = "#ff4fa8";
function fitCanvas(canvas, ctx) {
	const dpr = Math.min(2, window.devicePixelRatio || 1);
	const rect = canvas.getBoundingClientRect();
	const w = Math.max(1, rect.width);
	const h = Math.max(1, rect.height);
	const bw = Math.round(w * dpr);
	const bh = Math.round(h * dpr);
	if (canvas.width !== bw || canvas.height !== bh) {
		canvas.width = bw;
		canvas.height = bh;
	}
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	return {
		w,
		h
	};
}
function useRaf(active, frame) {
	const frameRef = (0, import_react.useRef)(frame);
	frameRef.current = frame;
	(0, import_react.useEffect)(() => {
		if (!active) return;
		let raf = 0;
		let last = performance.now();
		const loop = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
			last = now;
			frameRef.current(dt);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [active]);
}
function prefersReducedMotion() {
	return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function cssPoint(canvas, e) {
	const r = canvas.getBoundingClientRect();
	return {
		x: e.clientX - r.left,
		y: e.clientY - r.top
	};
}
//#endregion
export { cssPoint as a, useRaf as c, NIGHT as i, FLARE as n, fitCanvas as o, FROST as r, prefersReducedMotion as s, CYAN as t };
