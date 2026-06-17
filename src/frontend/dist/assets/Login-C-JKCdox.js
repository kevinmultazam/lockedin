import { c as createLucideIcon, K as useInternetIdentity, j as jsxRuntimeExports } from "./index-B7gz-m_n.js";
import { m as motion } from "./proxy-DcQQ3PWF.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const FEATURES = [
  "Lacak 10 tantangan setiap hari selama 30 hari",
  "Progress tersimpan di cloud, aman & permanen",
  "Visualisasi progres dengan grafik harian"
];
function LoginPage() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();
  const isLoading = isLoggingIn || isInitializing;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5, ease: "easeOut" },
        className: "w-full max-w-sm bg-card rounded-3xl shadow-elevated border border-border p-8 flex flex-col items-center text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.4, delay: 0.1, ease: "easeOut" },
              className: "w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 28, className: "text-accent", strokeWidth: 2 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.15, ease: "easeOut" },
              className: "text-2xl font-bold text-foreground tracking-tight mb-1",
              children: "Lockedin"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.2, ease: "easeOut" },
              className: "text-sm text-muted-foreground mb-7",
              children: "30 Days Self Discipline Challenge"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.ul,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.4, delay: 0.25, ease: "easeOut" },
              className: "w-full space-y-2.5 mb-7 text-left",
              children: FEATURES.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "li",
                {
                  className: "flex items-start gap-2.5 text-sm text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ShieldCheck,
                      {
                        size: 16,
                        className: "text-accent mt-0.5 flex-shrink-0",
                        strokeWidth: 2
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: feat })
                  ]
                },
                feat
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              "data-ocid": "login-btn",
              type: "button",
              onClick: login,
              disabled: isLoading,
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, delay: 0.3, ease: "easeOut" },
              whileHover: { scale: 1.02 },
              whileTap: { scale: 0.98 },
              className: "w-full py-3.5 rounded-2xl bg-foreground text-background font-semibold text-sm transition-all duration-200 ease-in-out hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-subtle",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-full border-2 border-background/40 border-t-background animate-spin" }),
                "Menghubungkan…"
              ] }) : "Masuk dengan Internet Identity"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-4 leading-relaxed", children: [
            "Login aman tanpa password menggunakan Internet Identity —",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "tidak ada akun Gmail diperlukan" }),
            "."
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "underline underline-offset-2 hover:text-foreground transition-smooth",
          children: "caffeine.ai"
        }
      )
    ] })
  ] });
}
export {
  LoginPage as default
};
