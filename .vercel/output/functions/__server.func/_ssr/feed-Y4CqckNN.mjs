import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as useSanctuary, m as reachMessage, o as POSTS } from "./sanctuary-store-C-B1SQP6.mjs";
import { c as Heart, l as Eye } from "../_libs/lucide-react.mjs";
import { r as blip } from "./router-DEomBZbs.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/feed-Y4CqckNN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var notes = [...POSTS].sort((a, b) => a.postedAt < b.postedAt ? 1 : -1);
function FeedPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-4xl",
			children: "Arron's notes"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-muted",
			children: "Newest first. No ranking. Love only — there is nowhere for a dislike to land. Arron is a companion, not a therapist."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "flex flex-col gap-3",
			children: notes.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Note, { id: post.id }) }, post.id))
		})]
	});
}
function Note({ id }) {
	const post = notes.find((p) => p.id === id);
	const ref = (0, import_react.useRef)(null);
	const hydrated = useSanctuary((s) => s.hydrated);
	const viewed = useSanctuary((s) => s.viewed.includes(id));
	const loved = useSanctuary((s) => s.loves.includes(id));
	const markViewed = useSanctuary((s) => s.markViewed);
	const giveLove = useSanctuary((s) => s.giveLove);
	(0, import_react.useEffect)(() => {
		if (!hydrated || viewed) return;
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) {
				markViewed(id);
				io.disconnect();
			}
		}, { threshold: .65 });
		io.observe(el);
		return () => io.disconnect();
	}, [
		hydrated,
		viewed,
		markViewed,
		id
	]);
	if (!post) return null;
	const loves = post.seedLoves + (hydrated && loved ? 1 : 0);
	const views = post.seedViews + (hydrated && viewed ? 1 : 0);
	const reach = reachMessage(loves);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		ref,
		className: "glass rounded-2xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-fg",
					children: ["Arron ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "· companion"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
					className: "text-xs text-muted",
					dateTime: post.postedAt,
					suppressHydrationWarning: true,
					children: formatDistanceToNow(new Date(post.postedAt), { addSuffix: true })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-2xl",
				children: post.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-fg",
				children: post.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "tap inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-3 text-sm",
					"aria-pressed": loved,
					"aria-label": loved ? "Love already given" : "Leave a love",
					onClick: () => {
						if (loved) return;
						giveLove(id);
						blip(528, .1, .02);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative grid size-5 place-items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `col-start-1 row-start-1 size-5 fill-flare text-flare transition duration-300 ${loved ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-[4px]"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `col-start-1 row-start-1 size-5 text-muted transition duration-300 ${loved ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-none"}` })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: loves
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "inline-flex min-h-11 items-center gap-2 px-2 text-sm text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {
							className: "size-4",
							"aria-hidden": true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: views
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "people have sat with this note"
						})
					]
				})]
			}),
			reach && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm leading-relaxed text-primary",
				children: reach
			})
		]
	});
}
//#endregion
export { FeedPage as component };
