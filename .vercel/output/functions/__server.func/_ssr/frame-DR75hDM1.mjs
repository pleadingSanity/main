import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as ArrowLeft, o as RotateCcw } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/frame-DR75hDM1.js
var import_jsx_runtime = require_jsx_runtime();
function GameFrame({ title, lede, phase, score, best, endTitle, endBody, onAgain, onRest, children, footer, hud }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/games",
					className: "mb-3 inline-flex min-h-11 items-center gap-1 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
						className: "size-4",
						"aria-hidden": true
					}), "All rooms"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl text-fg",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: lede
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stage relative overflow-hidden rounded-2xl border border-line bg-bg",
				children: [
					children,
					phase === "ready" && footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-auto",
							children: footer
						})
					}),
					phase === "over" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg/80 px-6 text-center backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl text-fg",
								children: endTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-xs text-sm leading-relaxed text-muted",
								children: endBody
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "tabular-nums text-primary",
								children: [score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-muted",
									children: [" · best ", Math.max(best, score)]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "tap inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 font-medium text-bg",
								onClick: onAgain,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
									className: "size-4",
									"aria-hidden": true
								}), "Again"]
							})
						]
					}),
					phase === "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pointer-events-none absolute top-3 left-3 rounded-full border border-line bg-bg/75 px-3 py-1 text-sm tabular-nums text-fg",
						children: [score, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [" · best ", Math.max(best, score)]
						})]
					}),
					phase === "play" && hud
				]
			}),
			phase === "play" && onRest && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "tap min-h-11 rounded-full border border-line text-sm text-muted",
				onClick: onRest,
				children: "That's enough — keep this"
			}),
			phase !== "ready" && footer,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs leading-relaxed text-muted",
				children: "Stays on this device. No signal needed once the room is open. Sound is a soft sine, and mute in the header wins."
			})
		]
	});
}
//#endregion
export { GameFrame as t };
