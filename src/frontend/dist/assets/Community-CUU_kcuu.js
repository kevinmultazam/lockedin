import { j as jsxRuntimeExports, y as Slot, e as cn, z as cva, n as useCommunityStats, o as useProfile, S as Skeleton, U as Users } from "./index-B7gz-m_n.js";
import { m as motion } from "./proxy-DcQQ3PWF.js";
import { S as Star, A as AnimatePresence, F as Flame } from "./index-74iOt9tZ.js";
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function CompletionBadge({ value, label }) {
  const color = value >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : value >= 50 ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-orange-50 text-orange-700 border-orange-200";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${color} transition-smooth`,
      children: label
    }
  );
}
function RankBadge({ rank }) {
  if (rank === 1) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🥇" });
  if (rank === 2) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🥈" });
  if (rank === 3) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🥉" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-semibold", children: rank });
}
function ProgressBar({ value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      className: "h-full rounded-full bg-accent",
      initial: { width: 0 },
      animate: { width: `${value}%` },
      transition: { duration: 0.8, ease: "easeOut" }
    }
  ) });
}
function PointsBadge({ points }) {
  const formatted = points.toLocaleString("id-ID");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-semibold text-amber-600", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3 h-3 fill-amber-500 text-amber-500", strokeWidth: 0 }),
    formatted,
    " pts"
  ] });
}
function UserCard({
  user,
  rank,
  isMe,
  index
}) {
  const displayName = user.username || "Pengguna Anonim";
  const currentDay = Number(user.currentDay);
  const streak = Number(user.currentStreak);
  const totalPoints = Number(user.totalPoints ?? 0);
  const isTopRank = rank === 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `community-user-card-${rank}`,
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.06, ease: "easeOut" },
      className: `relative flex items-center gap-4 px-5 py-4 rounded-2xl shadow-card border transition-smooth hover:shadow-elevated ${isTopRank ? "border-amber-300 bg-amber-50 ring-1 ring-amber-200" : isMe ? "border-accent/40 bg-accent/5 ring-1 ring-accent/20" : "border-border bg-card"}`,
      children: [
        isTopRank && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-3 text-base", "aria-hidden": "true", children: "👑" }),
        isMe && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-3 text-[10px] font-semibold text-accent uppercase tracking-widest", children: "Kamu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-9 flex items-center justify-center mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RankBadge, { rank }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${isTopRank ? "bg-amber-200" : "bg-muted"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-base font-bold uppercase ${isTopRank ? "text-amber-800" : "text-muted-foreground"}`,
                children: displayName.charAt(0)
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: displayName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "Hari ke-",
              currentDay
            ] }),
            streak > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-xs text-orange-500 font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3", strokeWidth: 2 }),
              streak
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressBar, { value: user.todayCompletion })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex flex-col items-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CompletionBadge,
            {
              value: user.todayCompletion,
              label: `${user.todayCompletion}%`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground font-medium", children: [
            "Overall: ",
            user.overallCompletion,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PointsBadge, { points: totalPoints })
        ] })
      ]
    },
    user.username
  );
}
function SkeletonCard({ index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: index * 0.06 },
      className: "flex items-center gap-4 px-5 py-4 rounded-2xl border border-border bg-card shadow-card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-full flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-full flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-1.5 w-full rounded-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20 rounded-lg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16 rounded-lg" })
        ] })
      ]
    }
  );
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "community-empty-state",
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "flex flex-col items-center justify-center py-20 gap-4 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-7 h-7 text-muted-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: "Belum ada pengguna terdaftar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Jadilah yang pertama bergabung dan tampil di papan komunitas." })
      ]
    }
  );
}
function CommunityPage() {
  const { data: stats, isLoading } = useCommunityStats();
  const { data: profile } = useProfile();
  const myUsername = (profile == null ? void 0 : profile.username) ?? "";
  const sorted = stats ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35 },
        className: "space-y-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground tracking-tight", children: "Komunitas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Papan peringkat total poin · diperbarui setiap 10 detik" })
        ]
      }
    ),
    !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.15 },
        className: "flex items-center gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "rounded-full px-3 py-1 text-xs font-semibold",
              "data-ocid": "community-member-count",
              children: [
                sorted.length,
                " anggota aktif"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "outline",
              className: "rounded-full px-3 py-1 text-xs font-semibold border-amber-200 text-amber-700 bg-amber-50",
              "data-ocid": "community-ranking-label",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: "w-3 h-3 fill-amber-500 text-amber-500 mr-1",
                    strokeWidth: 0
                  }
                ),
                "Ranking by Total Points"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isLoading ? [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, { index: i }, i)) : sorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : sorted.map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserCard,
      {
        user,
        rank: i + 1,
        isMe: !!myUsername && user.username === myUsername,
        index: i
      },
      user.username || `user-${i}`
    )) }) })
  ] });
}
export {
  CommunityPage as default
};
