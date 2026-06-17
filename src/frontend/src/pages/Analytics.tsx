import { Activity, Award, Calendar, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { ProgressChart } from "../components/ProgressChart";
import {
  calcDayCompletion,
  useMyAnalytics,
  useProfile,
} from "../hooks/useBackend";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
}

function StatCard({ icon, label, value, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4 shadow-sm"
    >
      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium mb-0.5">
          {label}
        </p>
        <p className="text-xl font-semibold text-foreground font-display truncate">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function PulseIndicator({ lastUpdated }: { lastUpdated: Date | null }) {
  const [label, setLabel] = useState("Diperbarui baru saja");

  useEffect(() => {
    if (!lastUpdated) return;
    setLabel("Diperbarui baru saja");
    const timer = setTimeout(
      () => setLabel("Sinkron otomatis setiap 5 detik"),
      3000,
    );
    return () => clearTimeout(timer);
  }, [lastUpdated]);

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default function Analytics() {
  const { data: profile } = useProfile();
  const { data: analyticsState, dataUpdatedAt } = useMyAnalytics();
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (dataUpdatedAt) {
      setLastUpdated(new Date(dataUpdatedAt));
    }
  }, [dataUpdatedAt]);

  const allProgress = analyticsState?.allProgress ?? [];
  const currentDay = analyticsState?.currentDay ?? 1;

  const hasAnyProgress = allProgress.some((d) => d.challenges.some(Boolean));

  const avgDaily = (() => {
    const activeDays = allProgress
      .slice(0, currentDay)
      .filter((d) => d.challenges.some(Boolean));
    if (activeDays.length === 0) return 0;
    const total = activeDays.reduce((sum, d) => sum + calcDayCompletion(d), 0);
    return Math.round(total / activeDays.length);
  })();

  const activeDays = allProgress
    .slice(0, currentDay)
    .filter((d) => d.challenges.some(Boolean)).length;

  const bestDay = (() => {
    const completions = allProgress.slice(0, currentDay).map(calcDayCompletion);
    return completions.length > 0 ? Math.max(...completions) : 0;
  })();

  const username = profile?.username ?? "Pengguna";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="text-2xl font-bold text-foreground font-display">
          Analitik
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Progress kamu,{" "}
          <span className="font-medium text-foreground">{username}</span>
        </p>
      </motion.div>

      {hasAnyProgress ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <StatCard
              icon={<TrendingUp size={18} />}
              label="Rata-rata harian"
              value={`${avgDaily}%`}
              delay={0.05}
            />
            <StatCard
              icon={<Calendar size={18} />}
              label="Total hari aktif"
              value={`${activeDays} dari 30`}
              delay={0.1}
            />
            <StatCard
              icon={<Award size={18} />}
              label="Hari terbaik"
              value={`${bestDay}%`}
              delay={0.15}
            />
          </div>

          {/* Chart Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-accent" />
                <h2 className="text-sm font-semibold text-foreground font-display">
                  Progres 30 Hari
                </h2>
              </div>
              <PulseIndicator lastUpdated={lastUpdated} />
            </div>
            <ProgressChart allProgress={allProgress} currentDay={currentDay} />
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-accent" />
                <span className="text-xs text-muted-foreground">Selesai</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-accent/45" />
                <span className="text-xs text-muted-foreground">Sebagian</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-muted" />
                <span className="text-xs text-muted-foreground">
                  Belum dimulai
                </span>
              </div>
            </div>
          </motion.div>
        </>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="bg-card border border-border rounded-2xl p-10 text-center shadow-sm"
          data-ocid="analytics-empty-state"
        >
          <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <TrendingUp size={28} className="text-accent" />
          </div>
          <h2 className="text-base font-semibold text-foreground font-display mb-2">
            Belum ada data analitik
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
            Mulai tantangan harianmu untuk melihat analytics!
          </p>
          <div className="mt-6 flex justify-center">
            <PulseIndicator lastUpdated={lastUpdated} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
