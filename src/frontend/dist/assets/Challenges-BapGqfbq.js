import { c as createLucideIcon, g as useAppState, h as useCurrentDay, i as useCurrentDayProgress, p as useSetChallenge, x as useDailyRandomChallenge, t as calcDayCompletion, j as jsxRuntimeExports, S as Skeleton, e as cn } from "./index-B7gz-m_n.js";
import { C as ChallengeList, a as Check } from "./ChallengeItem-Dzo-k-BL.js";
import { m as motion } from "./proxy-DcQQ3PWF.js";
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function RandomChallengeItem({
  label,
  completed,
  onToggle,
  disabled = false,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `random-challenge-item.${index + 1}`,
      disabled,
      onClick: onToggle,
      className: cn(
        "group w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ease-in-out text-left",
        "shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        completed ? "bg-amber-50/60 border-amber-300/50 dark:bg-amber-950/30 dark:border-amber-700/40" : "bg-gradient-to-r from-amber-50/40 to-orange-50/30 border-amber-200/60 hover:border-amber-300/70 hover:shadow-elevated dark:from-amber-950/20 dark:to-orange-950/10 dark:border-amber-800/40 dark:hover:border-amber-700/60",
        disabled && "opacity-50 cursor-not-allowed"
      ),
      "aria-pressed": completed,
      "aria-label": `Tantangan acak ${index + 1}: ${label}: ${completed ? "selesai" : "belum selesai"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "flex-shrink-0 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ease-in-out",
              completed ? "bg-amber-400 border-amber-400" : "border-amber-300 group-hover:border-amber-400 dark:border-amber-600"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Check,
              {
                size: 14,
                strokeWidth: 2.5,
                className: cn(
                  "transition-all duration-200 ease-in-out text-white",
                  completed ? "opacity-100 scale-100" : "opacity-0 scale-50"
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-sm font-medium leading-tight transition-all duration-300 ease-in-out",
                completed ? "line-through text-muted-foreground" : "text-foreground"
              ),
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-0.5 leading-tight text-amber-600/80 dark:text-amber-400/70", children: "Tantangan bonus — reset besok" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 flex items-center gap-1.5 flex-wrap justify-end", children: completed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-amber-600 px-2 py-0.5 rounded-full bg-amber-100/80 dark:bg-amber-900/40 dark:text-amber-400", children: "Done ✓" }) })
      ]
    }
  );
}
function Challenges() {
  const { isLoading, error } = useAppState();
  const currentDay = useCurrentDay();
  const currentDayData = useCurrentDayProgress();
  const setChallenge = useSetChallenge();
  const { data: randomChallenges, isLoading: randomLoading } = useDailyRandomChallenge();
  const todayPercent = currentDayData ? calcDayCompletion(currentDayData) : 0;
  const completedCount = currentDayData ? currentDayData.challenges.slice(0, 10).filter(Boolean).length : 0;
  function isRandomCompleted(i) {
    return (currentDayData == null ? void 0 : currentDayData.challenges[10 + i]) ?? false;
  }
  function handleToggle(index, completed) {
    setChallenge.mutate({ day: currentDay, challengeIndex: index, completed });
  }
  function handleRandomToggle(i) {
    setChallenge.mutate({
      day: currentDay,
      challengeIndex: 10 + i,
      completed: !isRandomCompleted(i)
    });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center",
        "data-ocid": "challenges.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Gagal memuat data. Coba refresh halaman." })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-10 space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "bg-card rounded-3xl shadow-card border border-border p-6",
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground leading-tight", children: "Tantangan 30 Hari" }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 rounded-xl mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-0.5", children: [
              "Hari ",
              currentDay,
              " —",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent font-medium", children: [
                completedCount,
                " / 10 selesai (",
                todayPercent,
                "%)"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-2 bg-muted rounded-full overflow-hidden",
              "data-ocid": "challenges-progress-bar",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-accent rounded-full transition-all duration-700 ease-in-out",
                  style: { width: `${todayPercent}%` }
                }
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "bg-card rounded-3xl shadow-card border border-border p-6",
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.08, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground mb-4", children: "10 Tantangan Default" }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: Array.from({ length: 10 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Skeleton,
            {
              className: "h-[72px] w-full rounded-2xl"
            },
            `challenge-skeleton-${i + 1}`
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChallengeList,
            {
              dayData: currentDayData,
              onToggle: handleToggle,
              disabled: setChallenge.isPending
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "bg-card rounded-3xl shadow-card border border-border p-6",
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.16, ease: "easeOut" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 15, className: "text-amber-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Tantangan Acak Hari Ini" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs px-2 py-0.5 rounded-full bg-amber-100/60 text-amber-700 border border-amber-200/60 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/40 font-medium", children: "5 tantangan bonus" })
          ] }),
          isLoading || randomLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: ["a", "b", "c", "d", "e"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Skeleton,
            {
              className: "h-[72px] w-full rounded-2xl"
            },
            `random-sk-${k}`
          )) }) : randomChallenges && randomChallenges.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: randomChallenges.map((challenge, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            RandomChallengeItem,
            {
              label: challenge,
              completed: isRandomCompleted(i),
              onToggle: () => handleRandomToggle(i),
              disabled: setChallenge.isPending,
              index: i
            },
            challenge
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-center h-[72px] rounded-2xl bg-muted/40 border border-border",
              "data-ocid": "random-challenge-empty",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tantangan acak tidak tersedia hari ini." })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-4 text-center", children: "Reset setiap hari pada tengah malam 🌙" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.p,
      {
        className: "text-xs text-muted-foreground/60 text-center pb-2",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4, delay: 0.28 },
        children: "Centang setiap tantangan setelah kamu menyelesaikannya hari ini."
      }
    )
  ] });
}
export {
  Challenges as default
};
