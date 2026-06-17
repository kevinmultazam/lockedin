import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Flame, Star, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCommunityStats, useProfile } from "../hooks/useBackend";
import type { CommunityUserStats } from "../types";

function CompletionBadge({ value, label }: { value: number; label: string }) {
  const color =
    value >= 80
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : value >= 50
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : "bg-orange-50 text-orange-700 border-orange-200";

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${color} transition-smooth`}
    >
      {label}
    </span>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-xl">🥇</span>;
  if (rank === 2) return <span className="text-xl">🥈</span>;
  if (rank === 3) return <span className="text-xl">🥉</span>;
  return (
    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-semibold">
      {rank}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-accent"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

function PointsBadge({ points }: { points: number }) {
  const formatted = points.toLocaleString("id-ID");
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
      <Star className="w-3 h-3 fill-amber-500 text-amber-500" strokeWidth={0} />
      {formatted} pts
    </span>
  );
}

function UserCard({
  user,
  rank,
  isMe,
  index,
}: {
  user: CommunityUserStats;
  rank: number;
  isMe: boolean;
  index: number;
}) {
  const displayName = user.username || "Pengguna Anonim";
  const currentDay = Number(user.currentDay);
  const streak = Number(user.currentStreak);
  const totalPoints = Number(user.totalPoints ?? 0);
  const isTopRank = rank === 1;

  return (
    <motion.div
      key={user.username}
      data-ocid={`community-user-card-${rank}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
      className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl shadow-card border transition-smooth hover:shadow-elevated ${
        isTopRank
          ? "border-amber-300 bg-amber-50 ring-1 ring-amber-200"
          : isMe
            ? "border-accent/40 bg-accent/5 ring-1 ring-accent/20"
            : "border-border bg-card"
      }`}
    >
      {/* Top rank crown glow */}
      {isTopRank && (
        <span className="absolute top-2 left-3 text-base" aria-hidden="true">
          👑
        </span>
      )}

      {isMe && (
        <span className="absolute top-2 right-3 text-[10px] font-semibold text-accent uppercase tracking-widest">
          Kamu
        </span>
      )}

      {/* Rank */}
      <div className="flex-shrink-0 w-9 flex items-center justify-center mt-3">
        <RankBadge rank={rank} />
      </div>

      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isTopRank ? "bg-amber-200" : "bg-muted"
        }`}
      >
        <span
          className={`text-base font-bold uppercase ${
            isTopRank ? "text-amber-800" : "text-muted-foreground"
          }`}
        >
          {displayName.charAt(0)}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {displayName}
          </p>
          <span className="text-xs text-muted-foreground">
            Hari ke-{currentDay}
          </span>
          {streak > 0 && (
            <span className="inline-flex items-center gap-0.5 text-xs text-orange-500 font-semibold">
              <Flame className="w-3 h-3" strokeWidth={2} />
              {streak}
            </span>
          )}
        </div>
        <ProgressBar value={user.todayCompletion} />
      </div>

      {/* Stats */}
      <div className="flex-shrink-0 flex flex-col items-end gap-1">
        <CompletionBadge
          value={user.todayCompletion}
          label={`${user.todayCompletion}%`}
        />
        <span className="text-[11px] text-muted-foreground font-medium">
          Overall: {user.overallCompletion}%
        </span>
        <PointsBadge points={totalPoints} />
      </div>
    </motion.div>
  );
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.06 }}
      className="flex items-center gap-4 px-5 py-4 rounded-2xl border border-border bg-card shadow-card"
    >
      <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32 rounded-lg" />
        <Skeleton className="h-1.5 w-full rounded-full" />
      </div>
      <div className="flex-shrink-0 space-y-1">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-3 w-20 rounded-lg" />
        <Skeleton className="h-3 w-16 rounded-lg" />
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      data-ocid="community-empty-state"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 gap-4 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center shadow-subtle">
        <Users className="w-7 h-7 text-muted-foreground" />
      </div>
      <p className="text-base font-semibold text-foreground">
        Belum ada pengguna terdaftar
      </p>
      <p className="text-sm text-muted-foreground max-w-xs">
        Jadilah yang pertama bergabung dan tampil di papan komunitas.
      </p>
    </motion.div>
  );
}

export default function CommunityPage() {
  const { data: stats, isLoading } = useCommunityStats();
  const { data: profile } = useProfile();
  const myUsername = profile?.username ?? "";

  // Backend already returns sorted by totalPoints desc — render in order
  const sorted = stats ?? [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-1"
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Komunitas
        </h1>
        <p className="text-sm text-muted-foreground">
          Papan peringkat total poin · diperbarui setiap 10 detik
        </p>
      </motion.div>

      {/* Stats summary badge */}
      {!isLoading && sorted.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-2"
        >
          <Badge
            variant="secondary"
            className="rounded-full px-3 py-1 text-xs font-semibold"
            data-ocid="community-member-count"
          >
            {sorted.length} anggota aktif
          </Badge>
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-xs font-semibold border-amber-200 text-amber-700 bg-amber-50"
            data-ocid="community-ranking-label"
          >
            <Star
              className="w-3 h-3 fill-amber-500 text-amber-500 mr-1"
              strokeWidth={0}
            />
            Ranking by Total Points
          </Badge>
        </motion.div>
      )}

      {/* List */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {isLoading ? (
            [0, 1, 2, 3, 4].map((i) => <SkeletonCard key={i} index={i} />)
          ) : sorted.length === 0 ? (
            <EmptyState />
          ) : (
            sorted.map((user, i) => (
              <UserCard
                key={user.username || `user-${i}`}
                user={user}
                rank={i + 1}
                isMe={!!myUsername && user.username === myUsername}
                index={i}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
