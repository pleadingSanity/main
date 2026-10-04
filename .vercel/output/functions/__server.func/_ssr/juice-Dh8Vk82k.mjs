import { t as CYAN } from "./engine-DUbwf_mN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/juice-Dh8Vk82k.js
function burst(list, x, y, n, speed) {
	if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	for (let i = 0; i < n; i++) {
		const a = Math.PI * 2 * i / n + Math.random() * .4;
		const s = speed * (.45 + Math.random() * .6);
		list.push({
			x,
			y,
			vx: Math.cos(a) * s,
			vy: Math.sin(a) * s,
			life: .45,
			max: .45,
			r: 1.3 + Math.random() * 1.5
		});
	}
	if (list.length > 80) list.splice(0, list.length - 80);
}
function stepParticles(list, dt) {
	for (let i = list.length - 1; i >= 0; i--) {
		const p = list[i];
		if (!p) continue;
		p.life -= dt;
		p.x += p.vx * dt;
		p.y += p.vy * dt;
		if (p.life <= 0) list.splice(i, 1);
	}
}
function drawParticles(ctx, list) {
	ctx.save();
	for (const p of list) {
		ctx.globalAlpha = Math.max(0, p.life / p.max);
		ctx.fillStyle = CYAN;
		ctx.beginPath();
		ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.restore();
}
function traumaOffset(trauma, t) {
	const s = trauma * trauma;
	const n1 = Math.sin(t * 37) * Math.cos(t * 15);
	const n2 = Math.cos(t * 29) * Math.sin(t * 18);
	return {
		x: n1 * 7 * s,
		y: n2 * 5 * s
	};
}
//#endregion
export { traumaOffset as i, drawParticles as n, stepParticles as r, burst as t };
