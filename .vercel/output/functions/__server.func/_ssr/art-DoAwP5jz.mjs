import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/art-DoAwP5jz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Art({ src, alt, className, eager }) {
	const [ok, setOk] = (0, import_react.useState)(true);
	if (!ok) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `bg-surface ${className ?? ""}`,
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className,
		loading: eager ? "eager" : "lazy",
		onError: () => setOk(false)
	});
}
//#endregion
export { Art as t };
