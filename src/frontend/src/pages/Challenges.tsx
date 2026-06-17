import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { ChallengeList } from "../components/ChallengeItem";
import {
  calcDayCompletion,
  useAppState,
  useCurrentDay,
  useCurrentDayProgress,
  useDailyRandomChallenge,
  useSetChallenge,
} from "../hooks/useBackend";

// --- Random Challenge Item ---
interface RandomChallengeItemProps {
  label: string;
  completed: boolean;
  onToggle: () => void;
  disabled?: boolean;
  index: number;
}

function RandomChallengeItem({
  label,
  completed,
  onToggle,
  disabled = false,
  index,
}: RandomChallengeItemProps) {
  return (
    <button
      type="button"
      data-ocid={`random-challenge-item.${index + 1}`}
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        "group w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ease-in-out text-left",
        "shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        completed
          ? "bg-amber-50/60 border-amber-300/50 dark:bg-amber-950/30 dark:border-amber-700/40"
          : "bg-gradient-to-r from-amber-50/40 to-orange-50/30 border-amber-200/60 hover:border-amber-300/70 hover:shadow-elevated dark:from-amber-950/20 dark:to-orange-950/10 dark:border-amber-800/40 dark:hover:border-amber-700/60",
        disabled && "opacity-50 cursor-not-allowed",
      )}
      aria-pressed={completed}
      aria-label={`Tantangan acak ${index + 1}: ${label}: ${completed ? "selesai" : "belum selesai"}`}
    >
      {/* Checkbox */}
      <div
        className={cn(
          "flex-shrink-0 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ease-in-out",
          completed
            ? "bg-amber-400 border-amber-400"
            : "border-amber-300 group-hover:border-amber-400 dark:border-amber-600",
        )}
      >
        <Check
          size={14}
          strokeWidth={2.5}
          className={cn(
            "transition-all duration-200 ease-in-out text-white",
            completed ? "opacity-100 scale-100" : "opacity-0 scale-50",
          )}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium leading-tight transition-all duration-300 ease-in-out",
            completed
              ? "line-through text-muted-foreground"
              : "text-foreground",
          )}
        >
          {label}
        </p>
        <p className="text-xs mt-0.5 leading-tight text-amber-600/80 dark:text-amber-400/70">
          Tantangan bonus — reset besok
        </p>
      </div>

      {/* Badge */}
      <div className="flex-shrink-0 flex items-center gap-1.5 flex-wrap justify-end">
        {completed && (
          <span className="text-xs font-medium text-amber-600 px-2 py-0.5 rounded-full bg-amber-100/80 dark:bg-amber-900/40 dark:text-amber-400">
            Done ✓
          </span>
        )}
      </div>
    </button>
  );
}

// --- Main Page ---
export default function Challenges() {
  const { isLoading, error } = useAppState();
  const currentDay = useCurrentDay();
  const currentDayData = useCurrentDayProgress();
  const setChallenge = useSetChallenge();

  const { data: randomChallenges, isLoading: randomLoading } =
    useDailyRandomChallenge();

  const todayPercent = currentDayData ? calcDayCompletion(currentDayData) : 0;
  const completedCount = currentDayData
    ? currentDayData.challenges.slice(0, 10).filter(Boolean).length
    : 0;

  // Indices 10–14 = random challenge slots
  function isRandomCompleted(i: number) {
    return currentDayData?.challenges[10 + i] ?? false;
  }

  function handleToggle(index: number, completed: boolean) {
    setChallenge.mutate({ day: currentDay, challengeIndex: index, completed });
  }

  function handleRandomToggle(i: number) {
    setChallenge.mutate({
      day: currentDay,
      challengeIndex: 10 + i,
      completed: !isRandomCompleted(i),
    });
  }

  if (error) {
    return (
      <div
        className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center"
        data-ocid="challenges.error_state"
      >
        <p className="text-muted-foreground text-sm">
          Gagal memuat data. Coba refresh halaman.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-10 space-y-5">
      {/* Header card */}
      <motion.div
        className="bg-card rounded-3xl shadow-card border border-border p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="mb-4">
          <h1 className="text-lg font-bold text-foreground leading-tight">
            Tantangan 30 Hari
          </h1>
          {isLoading ? (
            <Skeleton className="h-4 w-48 rounded-xl mt-1" />
          ) : (
            <p className="text-sm text-muted-foreground mt-0.5">
              Hari {currentDay} —{" "}
              <span className="text-accent font-medium">
                {completedCount} / 10 selesai ({todayPercent}%)
              </span>
            </p>
          )}
        </div>

        {/* Progress bar */}
        <div
          className="h-2 bg-muted rounded-full overflow-hidden"
          data-ocid="challenges-progress-bar"
        >
          <div
            className="h-full bg-accent rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${todayPercent}%` }}
          />
        </div>
      </motion.div>

      {/* 10 default challenges */}
      <motion.div
        className="bg-card rounded-3xl shadow-card border border-border p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
      >
        <h2 className="text-sm font-semibold text-foreground mb-4">
          10 Tantangan Default
        </h2>

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

      {/* 5 Daily random challenges */}
      <motion.div
        className="bg-card rounded-3xl shadow-card border border-border p-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={15} className="text-amber-500" />
          <h2 className="text-sm font-semibold text-foreground">
            Tantangan Acak Hari Ini
          </h2>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-amber-100/60 text-amber-700 border border-amber-200/60 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800/40 font-medium">
            5 tantangan bonus
          </span>
        </div>

        {isLoading || randomLoading ? (
          <div className="space-y-3">
            {(["a", "b", "c", "d", "e"] as const).map((k) => (
              <Skeleton
                key={`random-sk-${k}`}
                className="h-[72px] w-full rounded-2xl"
              />
            ))}
          </div>
        ) : randomChallenges && randomChallenges.length > 0 ? (
          <div className="space-y-3">
            {randomChallenges.map((challenge, i) => (
              <RandomChallengeItem
                key={challenge}
                label={challenge}
                completed={isRandomCompleted(i)}
                onToggle={() => handleRandomToggle(i)}
                disabled={setChallenge.isPending}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div
            className="flex items-center justify-center h-[72px] rounded-2xl bg-muted/40 border border-border"
            data-ocid="random-challenge-empty"
          >
            <p className="text-sm text-muted-foreground">
              Tantangan acak tidak tersedia hari ini.
            </p>
          </div>
        )}

        <p className="text-xs text-muted-foreground/60 mt-4 text-center">
          Reset setiap hari pada tengah malam 🌙
        </p>
      </motion.div>

      <motion.p
        className="text-xs text-muted-foreground/60 text-center pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.28 }}
      >
        Centang setiap tantangan setelah kamu menyelesaikannya hari ini.
      </motion.p>
    </div>
  );
}
