import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useSanctuary, n as GAMES } from "./sanctuary-store-C-B1SQP6.mjs";
import { t as Art } from "./art-DoAwP5jz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/games-vVyVVQyv.js
var import_jsx_runtime = require_jsx_runtime();
function GamesPage() {
	const hydrated = useSanctuary((s) => s.hydrated);
	const best = useSanctuary((s) => s.best);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl",
			children: "Play"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: "No ads. No paywall. No clock chasing you off the page. Personal bests celebrate the try, not a perfect run. Mute lives in the header."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-2 gap-3",
			children: GAMES.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/games/$slug",
				params: { slug: game.slug },
				className: "tap glass block overflow-hidden rounded-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Art, {
					src: `/media/${game.slug}.jpg`,
					alt: "",
					className: "aspect-square w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "block p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-base text-fg",
							children: game.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs leading-relaxed text-muted",
							children: game.span
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-2 block text-xs tabular-nums text-primary",
							children: ["Best ", hydrated ? best[game.slug] ?? "—" : "—"]
						})
					]
				})]
			}) }, game.slug))
		})]
	});
}
//#endregion
export { GamesPage as component };
