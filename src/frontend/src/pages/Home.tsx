import { Skeleton } from "@/components/ui/skeleton";
import { Flame, Star, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { ChallengeList } from "../components/ChallengeItem";
import { DayTracker } from "../components/DayTracker";
import { ProgressChart } from "../components/ProgressChart";
import { ResetButton } from "../components/ResetButton";
import {
  calcDayCompletion,
  calcOverallCompletion,
  useAllProgress,
  useAppState,
  useCommunityStats,
  useCurrentDay,
  useCurrentDayProgress,
  useNextDay,
  useProfile,
  useResetProgress,
  useSetChallenge,
  useStreak,
  useTotalPoints,
} from "../hooks/useBackend";
import { DEFAULT_CHALLENGES } from "../types";

// ── Streak card ──────────────────────────────────────────────────────────────

function StreakCard({
  streak,
  isLoading,
}: { streak: number; isLoading: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.04, ease: "easeOut" }}
      className="bg-card rounded-3xl shadow-card border border-border p-5 flex items-center gap-4"
      data-ocid="streak-card"
    >
      <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center flex-shrink-0">
        <Flame className="w-6 h-6 text-orange-500" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-16 rounded-xl mb-1" />
            <Skeleton className="h-3 w-28 rounded-lg" />
          </>
        ) : (
          <>
            <p
              className="text-3xl font-bold text-foreground leading-none"
              data-ocid="streak-value"
            >
              {streak}
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Hari Berturut-turut
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ── Points card ──────────────────────────────────────────────────────────────

function PointsCard({
  points,
  isLoading,
}: { points: number; isLoading: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
      className="bg-card rounded-3xl shadow-card border border-border p-5 flex items-center gap-4"
      data-ocid="points-card"
    >
      <div className="w-12 h-12 rounded-2xl bg-yellow-50 flex items-center justify-center flex-shrink-0">
        <Star
          className="w-6 h-6 text-yellow-500"
          strokeWidth={2}
          fill="currentColor"
        />
      </div>
      <div className="min-w-0">
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-20 rounded-xl mb-1" />
            <Skeleton className="h-3 w-24 rounded-lg" />
          </>
        ) : (
          <>
            <p
              className="text-3xl font-bold text-foreground leading-none"
              data-ocid="points-value"
            >
              {points.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Total Poin
            </p>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ── Achievement definitions ───────────────────────────────────────────────────

interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredPoints: number;
  isSpecial?: boolean;
}

const POINT_ACHIEVEMENTS: AchievementDef[] = [
  {
    id: "bronze",
    name: "Bronze Warrior",
    description: "Kumpulkan 500 poin dari tantangan harian",
    icon: "🥉",
    requiredPoints: 500,
  },
  {
    id: "silver",
    name: "Silver Discipline",
    description: "Capai 1.000 poin — konsistensi terbukti",
    icon: "🥈",
    requiredPoints: 1000,
  },
  {
    id: "gold",
    name: "Gold Mindset",
    description: "1.500 poin — dedikasi di level berikutnya",
    icon: "🥇",
    requiredPoints: 1500,
  },
  {
    id: "platinum",
    name: "Platinum Elite",
    description: "2.000 poin — selamat bergabung dengan elite",
    icon: "💎",
    requiredPoints: 2000,
  },
];

const CHAMPION_ACHIEVEMENT: AchievementDef = {
  id: "champion",
  name: "Community Champion",
  description: "Raih posisi #1 di leaderboard komunitas",
  icon: "👑",
  requiredPoints: 0,
  isSpecial: true,
};

// ── Single achievement card ───────────────────────────────────────────────────

function AchievementCard({
  achievement,
  totalPoints,
  unlocked,
  index,
}: {
  achievement: AchievementDef;
  totalPoints: number;
  unlocked: boolean;
  index: number;
}) {
  const { requiredPoints, isSpecial } = achievement;
  const progress = isSpecial ? 0 : Math.min(totalPoints, requiredPoints);
  const progressPct = isSpecial
    ? 0
    : Math.round((progress / requiredPoints) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
      data-ocid={`achievement.item.${index + 1}`}
      className={[
        "rounded-2xl border p-4 flex items-start gap-3.5 transition-smooth",
        unlocked
          ? "bg-card border-accent/30 shadow-card"
          : "bg-muted/40 border-border opacity-80",
      ].join(" ")}
      style={
        unlocked
          ? {
              boxShadow:
                "0 0 0 1px oklch(0.72 0.09 134 / 0.25), 0 4px 16px oklch(0.72 0.09 134 / 0.08)",
            }
          : undefined
      }
    >
      {/* Icon */}
      <div
        className={[
          "w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0",
          unlocked ? "bg-accent/10" : "bg-muted",
        ].join(" ")}
      >
        <span className={unlocked ? "" : "grayscale opacity-50"}>
          {achievement.icon}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p
            className={[
              "text-sm font-semibold leading-tight",
              unlocked ? "text-foreground" : "text-muted-foreground",
            ].join(" ")}
          >
            {achievement.name}
          </p>
          {unlocked && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent text-accent-foreground text-[9px] flex-shrink-0"
            >
              ✓
            </motion.span>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-snug">
          {achievement.description}
        </p>

        {/* Progress bar for point-based achievements */}
        {!isSpecial && !unlocked && (
          <div className="mt-2.5">
            <div className="flex justify-between text-[10px] text-muted-foreground mb-1">
              <span>
                {progress.toLocaleString()} / {requiredPoints.toLocaleString()}{" "}
                pts
              </span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent/50 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${progressPct}%` }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.07 + 0.2,
                }}
              />
            </div>
          </div>
        )}

        {/* Special label for champion */}
        {isSpecial && !unlocked && (
          <p className="text-[10px] text-muted-foreground mt-1.5 italic">
            Jadilah #1 di komunitas untuk membuka ini
          </p>
        )}
      </div>

      {/* Trophy icon for unlocked */}
      {unlocked && (
        <Trophy
          className="w-4 h-4 text-accent flex-shrink-0 mt-0.5"
          strokeWidth={2}
        />
      )}
    </motion.div>
  );
}

// ── Achievements section ──────────────────────────────────────────────────────

function AchievementsSection({
  totalPoints,
  isLoading,
  currentUsername,
  communityStats,
}: {
  totalPoints: number;
  isLoading: boolean;
  currentUsername: string;
  communityStats: Array<{ username: string; totalPoints: number }>;
}) {
  const isChampion =
    communityStats.length > 0 && communityStats[0].username === currentUsername;

  const allAchievements = [...POINT_ACHIEVEMENTS, CHAMPION_ACHIEVEMENT];

  return (
    <motion.div
      className="bg-card rounded-3xl shadow-card border border-border p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.24, ease: "easeOut" }}
      data-ocid="achievements-section"
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
          <Trophy className="w-4 h-4 text-accent" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground leading-tight">
            Pencapaian
          </h2>
          <p className="text-xs text-muted-foreground">
            Buka badge berdasarkan poin yang terkumpul
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(
            ["ach-s-1", "ach-s-2", "ach-s-3", "ach-s-4", "ach-s-5"] as const
          ).map((k) => (
            <Skeleton key={k} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {allAchievements.map((ach, i) => {
            const unlocked = ach.isSpecial
              ? isChampion
              : totalPoints >= ach.requiredPoints;
            return (
              <AchievementCard
                key={ach.id}
                achievement={ach}
                totalPoints={totalPoints}
                unlocked={unlocked}
                index={i}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const { isLoading, error } = useAppState();
  const currentDay = useCurrentDay();
  const currentDayData = useCurrentDayProgress();
  const allProgress = useAllProgress();
  const { data: streak = 0, isLoading: streakLoading } = useStreak();
  const { data: totalPoints = 0, isLoading: pointsLoading } = useTotalPoints();
  const { data: communityStats = [] } = useCommunityStats();
  const { data: profile } = useProfile();

  const setChallenge = useSetChallenge();
  const nextDay = useNextDay();
  const resetProgress = useResetProgress();

  const todayPercent = currentDayData ? calcDayCompletion(currentDayData) : 0;
  const overallPercent = calcOverallCompletion(allProgress, currentDay);
  const completedCount = currentDayData
    ? currentDayData.challenges.slice(0, 10).filter(Boolean).length
    : 0;
  const totalCount = DEFAULT_CHALLENGES.length;
  const allDone =
    currentDayData?.challenges.slice(0, 10).every(Boolean) ?? false;

  function handleToggle(index: number, completed: boolean) {
    setChallenge.mutate({ day: currentDay, challengeIndex: index, completed });
  }

  async function handleNextDay() {
    await nextDay.mutateAsync();
    toast.success(`Hari ${currentDay + 1} dimulai! Terus semangat 🔥`);
  }

  async function handleReset() {
    await resetProgress.mutateAsync();
    toast.success("Progress direset. Mulai fresh! 🌱");
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="text-muted-foreground text-sm">
          Gagal memuat data. Coba refresh halaman.
        </p>
      </div>
    );
  }

  const currentUsername = profile?.username ?? "";
  const statsForChampion = communityStats.map((s) => ({
    username: s.username,
    totalPoints: s.totalPoints,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-8 space-y-5">
      {/* Row 1: Day Tracker + Streak + Points + Chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left column: Day tracker, Streak, Points */}
        <motion.div
          className="md:col-span-1 flex flex-col gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <DayTracker
            currentDay={currentDay}
            overallPercent={overallPercent}
            todayPercent={todayPercent}
            isLoading={isLoading}
            onNextDay={handleNextDay}
            isPending={nextDay.isPending}
          />
          <StreakCard streak={streak} isLoading={isLoading || streakLoading} />
          <PointsCard
            points={totalPoints}
            isLoading={isLoading || pointsLoading}
          />
        </motion.div>

        {/* Progress chart */}
        <motion.div
          className="md:col-span-2 bg-card rounded-3xl shadow-card border border-border p-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                30-Day Progress
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Riwayat penyelesaian harian
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                100%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent/45 inline-block" />
                Sebagian
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-muted inline-block" />
                Belum
              </span>
            </div>
          </div>
          {isLoading ? (
            <Skeleton className="h-[180px] w-full rounded-2xl" />
          ) : (
            <ProgressChart allProgress={allProgress} currentDay={currentDay} />
          )}
        </motion.div>
      </div>

      {/* Row 2: Challenge checklist */}
      <motion.div
        className="bg-card rounded-3xl shadow-card border border-border p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }}
      >
        {/* Section header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-foreground leading-tight">
              Tantangan Hari Ini
            </h2>
            {isLoading ? (
              <Skeleton className="h-4 w-40 rounded-xl mt-1" />
            ) : (
              <p
                className="text-sm text-muted-foreground mt-0.5"
                data-ocid="daily-completion-label"
              >
                {completedCount} / {totalCount} selesai —{" "}
                <span className="text-accent font-medium">{todayPercent}%</span>
              </p>
            )}
          </div>
          <ResetButton
            onReset={handleReset}
            isPending={resetProgress.isPending}
          />
        </div>

        {/* Today progress bar */}
        <div className="mb-5">
          <div
            className="h-2 bg-muted rounded-full overflow-hidden"
            data-ocid="daily-progress-bar"
          >
            <div
              className="h-full bg-accent rounded-full transition-all duration-700 ease-in-out"
              style={{ width: `${todayPercent}%` }}
            />
          </div>
        </div>

        {/* Challenge list */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 10 }, (_, i) => (
              <Skeleton
                key={`challenge-skeleton-${i + 1}`}
                className="h-[72px] w-full rounded-2xl"
              />
            ))}
          </div>
        ) : (
          <ChallengeList
            dayData={currentDayData}
            onToggle={handleToggle}
            disabled={setChallenge.isPending}
          />
        )}
      </motion.div>

      {/* Row 3: Achievements */}
      <AchievementsSection
        totalPoints={totalPoints}
        isLoading={isLoading || pointsLoading}
        currentUsername={currentUsername}
        communityStats={statsForChampion}
      />

      {/* Day complete banner */}
      <AnimatePresence>
        {allDone && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-accent/10 border border-accent/25 rounded-3xl p-6 text-center shadow-card"
            data-ocid="completion-banner"
          >
            <p className="text-3xl mb-2">🎉</p>
            <h3 className="text-lg font-bold text-foreground">
              Hari {currentDay} Selesai!
            </h3>
            <p className="text-sm text-muted-foreground mt-1.5">
              Semua 10 tantangan tercapai. Disiplin itu bertumbuh.
              {currentDay < 30 &&
                " Lanjutkan ke hari berikutnya untuk menjaga konsistensi."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
