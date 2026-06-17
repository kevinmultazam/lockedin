import { c as createLucideIcon, D as DEFAULT_CHALLENGES, j as jsxRuntimeExports, e as cn } from "./index-B7gz-m_n.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode);
function ChallengeItem({
  index,
  completed,
  onToggle,
  disabled = false
}) {
  const challenge = DEFAULT_CHALLENGES[index];
  if (!challenge) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `challenge-item-${index}`,
      disabled,
      onClick: () => onToggle(index, !completed),
      className: cn(
        "group w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ease-in-out text-left",
        "shadow-card hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        completed ? "bg-accent/8 border-accent/20" : "bg-card border-border hover:border-accent/30 hover:bg-secondary/40",
        disabled && "opacity-50 cursor-not-allowed"
      ),
      "aria-pressed": completed,
      "aria-label": `${challenge.label}: ${completed ? "completed" : "not completed"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "flex-shrink-0 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ease-in-out",
              completed ? "bg-accent border-accent" : "border-border group-hover:border-accent/50"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Check,
              {
                size: 14,
                strokeWidth: 2.5,
                className: cn(
                  "transition-all duration-200 ease-in-out",
                  completed ? "opacity-100 scale-100 text-accent-foreground" : "opacity-0 scale-50"
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
              children: challenge.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-xs mt-0.5 leading-tight transition-all duration-300 ease-in-out",
                completed ? "text-muted-foreground/60" : "text-muted-foreground"
              ),
              children: challenge.description
            }
          )
        ] }),
        completed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-accent px-2 py-0.5 rounded-full bg-accent/10", children: "Done" }) })
      ]
    }
  );
}
function ChallengeList({
  dayData,
  onToggle,
  disabled = false
}) {
  const challenges = (dayData == null ? void 0 : dayData.challenges) ?? Array(DEFAULT_CHALLENGES.length).fill(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: DEFAULT_CHALLENGES.map((challenge, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    ChallengeItem,
    {
      index,
      completed: challenges[index] ?? false,
      onToggle,
      disabled
    },
    challenge.id
  )) });
}
export {
  ChallengeList as C,
  Check as a
};
