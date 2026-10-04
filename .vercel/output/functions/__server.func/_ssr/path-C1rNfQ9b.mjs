import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useSanctuary, r as MILESTONES, u as levelInfo } from "./sanctuary-store-C-B1SQP6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/path-C1rNfQ9b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PathPage() {
	const hydrated = useSanctuary((s) => s.hydrated);
	const unlocked = useSanctuary((s) => s.unlocked);
	const xp = useSanctuary((s) => s.xp);
	const streak = useSanctuary((s) => s.streak);
	const dailies = useSanctuary((s) => s.dailies);
	const rising = useSanctuary((s) => s.risingWeeks.length);
	const markPathRead = useSanctuary((s) => s.markPathRead);
	const forget = useSanctuary((s) => s.forget);
	const [armed, setArmed] = (0, import_react.useState)(false);
	const level = levelInfo(hydrated ? xp : 0);
	(0, import_react.useEffect)(() => {
		if (hydrated) markPathRead();
	}, [
		hydrated,
		unlocked,
		markPathRead
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-4xl",
				children: "Path"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: [
					"These are not trophies. They're a person noticing you came back. ",
					level.name,
					", quiet level",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: hydrated ? level.level : "—"
					}),
					"."
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid grid-cols-3 gap-2 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Streak"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 tabular-nums",
							children: hydrated ? streak : "—"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Days kept"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 tabular-nums",
							children: hydrated ? dailies : "—"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-line py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: "Rising Light"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 tabular-nums",
							children: hydrated ? rising : "—"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex flex-col gap-3",
				children: MILESTONES.map((m) => {
					const open = hydrated && unlocked.includes(m.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "glass rounded-2xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-primary",
								children: open ? "Kept" : "Ahead"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-xl",
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: open ? m.message : m.hint
							})
						]
					}, m.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-line p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl",
						children: "Forget this device"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: "Clears loves, scores, moods, and notes stored here. It does not write to anyone else. It cannot be undone."
					}),
					armed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "tap min-h-11 rounded-full bg-primary px-4 text-sm font-medium text-bg",
							onClick: forget,
							children: "Yes, forget me here"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "tap min-h-11 rounded-full border border-line px-4 text-sm",
							onClick: () => setArmed(false),
							children: "Keep my progress"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "tap mt-3 min-h-11 text-sm text-muted underline",
						onClick: () => setArmed(true),
						children: "Forget this device"
					})
				]
			})
		]
	});
}
//#endregion
export { PathPage as component };
