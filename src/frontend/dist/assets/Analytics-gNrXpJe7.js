import { c as createLucideIcon, o as useProfile, A as useMyAnalytics, r as reactExports, t as calcDayCompletion, j as jsxRuntimeExports } from "./index-B7gz-m_n.js";
import { P as ProgressChart } from "./ProgressChart-8HbFGmer.js";
import { m as motion } from "./proxy-DcQQ3PWF.js";
import { C as Calendar } from "./calendar-D6Ag7Gkk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$2);
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
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function StatCard({ icon, label, value, delay }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] },
      className: "bg-card border border-border rounded-2xl p-5 flex items-start gap-4 shadow-sm",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium mb-0.5", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-semibold text-foreground font-display truncate", children: value })
        ] })
      ]
    }
  );
}
function PulseIndicator({ lastUpdated }) {
  const [label, setLabel] = reactExports.useState("Diperbarui baru saja");
  reactExports.useEffect(() => {
    if (!lastUpdated) return;
    setLabel("Diperbarui baru saja");
    const timer = setTimeout(
      () => setLabel("Sinkron otomatis setiap 5 detik"),
      3e3
    );
    return () => clearTimeout(timer);
  }, [lastUpdated]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-accent" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label })
  ] });
}
function Analytics() {
  const { data: profile } = useProfile();
  const { data: analyticsState, dataUpdatedAt } = useMyAnalytics();
  const [lastUpdated, setLastUpdated] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (dataUpdatedAt) {
      setLastUpdated(new Date(dataUpdatedAt));
    }
  }, [dataUpdatedAt]);
  const allProgress = (analyticsState == null ? void 0 : analyticsState.allProgress) ?? [];
  const currentDay = (analyticsState == null ? void 0 : analyticsState.currentDay) ?? 1;
  const hasAnyProgress = allProgress.some((d) => d.challenges.some(Boolean));
  const avgDaily = (() => {
    const activeDays2 = allProgress.slice(0, currentDay).filter((d) => d.challenges.some(Boolean));
    if (activeDays2.length === 0) return 0;
    const total = activeDays2.reduce((sum, d) => sum + calcDayCompletion(d), 0);
    return Math.round(total / activeDays2.length);
  })();
  const activeDays = allProgress.slice(0, currentDay).filter((d) => d.challenges.some(Boolean)).length;
  const bestDay = (() => {
    const completions = allProgress.slice(0, currentDay).map(calcDayCompletion);
    return completions.length > 0 ? Math.max(...completions) : 0;
  })();
  const username = (profile == null ? void 0 : profile.username) ?? "Pengguna";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "Analitik" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            "Progress kamu,",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: username })
          ] })
        ]
      }
    ),
    hasAnyProgress ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 18 }),
            label: "Rata-rata harian",
            value: `${avgDaily}%`,
            delay: 0.05
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { size: 18 }),
            label: "Total hari aktif",
            value: `${activeDays} dari 30`,
            delay: 0.1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 18 }),
            label: "Hari terbaik",
            value: `${bestDay}%`,
            delay: 0.15
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.45,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1]
          },
          className: "bg-card border border-border rounded-2xl p-5 shadow-sm",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 16, className: "text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground font-display", children: "Progres 30 Hari" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(PulseIndicator, { lastUpdated })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressChart, { allProgress, currentDay }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-4 pt-4 border-t border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-sm bg-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Selesai" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-sm bg-accent/45" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Sebagian" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-2.5 rounded-sm bg-muted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Belum dimulai" })
              ] })
            ] })
          ]
        }
      )
    ] }) : (
      /* Empty State */
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          transition: {
            duration: 0.4,
            delay: 0.05,
            ease: [0.25, 0.1, 0.25, 1]
          },
          className: "bg-card border border-border rounded-2xl p-10 text-center shadow-sm",
          "data-ocid": "analytics-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 28, className: "text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground font-display mb-2", children: "Belum ada data analitik" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto", children: "Mulai tantangan harianmu untuk melihat analytics!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PulseIndicator, { lastUpdated }) })
          ]
        }
      )
    )
  ] });
}
export {
  Analytics as default
};
