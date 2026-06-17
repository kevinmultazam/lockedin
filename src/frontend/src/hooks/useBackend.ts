import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import {
  type CommunityUserStats,
  DEFAULT_CHALLENGES,
  type DayData,
  type UserProfile,
} from "../types";

const TOTAL_DAYS = 30;
const DEFAULT_CHALLENGES_COUNT = DEFAULT_CHALLENGES.length; // 10 — for streak/completion %
const TOTAL_CHALLENGES = 15; // 10 default + 5 random bonus slots

function buildAppState(
  currentDay: bigint,
  allProgressRaw: Array<[bigint, boolean[]]>,
) {
  const currentDayNum = Number(currentDay);

  const progressMap = new Map<number, boolean[]>();
  for (const [day, challenges] of allProgressRaw) {
    progressMap.set(Number(day), challenges);
  }

  const allProgress: DayData[] = Array.from({ length: TOTAL_DAYS }, (_, i) => ({
    day: i + 1,
    challenges: progressMap.get(i + 1) ?? Array(TOTAL_CHALLENGES).fill(false),
  }));

  return { currentDay: currentDayNum, allProgress };
}

function msUntilEndOfDay(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(23, 59, 59, 999);
  return midnight.getTime() - now.getTime();
}

export function useProfile() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<UserProfile | null>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProfile();
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
  });
}

export function useSetUsername() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.setUsername(username);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}

export function useAppState() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["appState"],
    queryFn: async () => {
      if (!actor) return null;
      const [currentDay, allProgressRaw] = await Promise.all([
        actor.getCurrentDay(),
        actor.getAllProgress(),
      ]);
      return buildAppState(currentDay, allProgressRaw);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
  });
}

export function useCurrentDayProgress() {
  const { data: state } = useAppState();
  if (!state) return null;
  return state.allProgress.find((d) => d.day === state.currentDay) ?? null;
}

export function useAllProgress() {
  const { data: state } = useAppState();
  return state?.allProgress ?? [];
}

export function useCurrentDay() {
  const { data: state } = useAppState();
  return state?.currentDay ?? 1;
}

// Pool of random challenges (outside the 10 defaults)
const RANDOM_CHALLENGE_POOL = [
  "Cold shower 3 menit",
  "Masak makanan sehat",
  "Baca artikel tentang topik baru",
  "Stretching 15 menit",
  "Mati lampu digital 1 jam (no screen)",
  "Bicara dengan orang baru",
  "Dengarkan podcast edukatif 30 menit",
  "Rapikan dan bersihkan meja kerja",
  "Latihan pernapasan 10 menit",
  "Jalan kaki 30 menit di luar",
  "Tidak minum kopi hari ini",
  "Buat to-do list untuk besok",
  "Telepon atau chat keluarga/teman",
  "Baca 5 halaman buku non-fiksi",
  "Foto satu hal indah hari ini",
  "Pelajari satu kata baru dalam bahasa asing",
  "Buat satu kebaikan kecil untuk orang lain",
  "Tidur siang 20 menit (power nap)",
  "Latihan visual focus: lihat jauh 20 menit",
  "Tulis 3 hal yang kamu syukuri",
  "Kurangi gula hari ini",
  "Atur ulang jadwal mingguan",
  "Rapikan inbox email",
  "Berdiri dan bergerak setiap jam sekali",
];

// Seeded random pick using date as seed (client-side daily consistency)
function getDailyRandomPool(count: number): string[] {
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const pool = [...RANDOM_CHALLENGE_POOL];
  const result: string[] = [];
  let s = seed;
  for (let i = 0; i < count; i++) {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    const idx = s % pool.length;
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}

export function useDailyRandomChallenge() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<string[]>({
    queryKey: ["dailyRandomChallenge"],
    queryFn: async () => {
      if (!actor) return getDailyRandomPool(5);
      // Call backend once to ensure daily sync, then derive 5 from pool client-side
      await actor.getDailyRandomChallenge();
      return getDailyRandomPool(5);
    },
    enabled: !!actor && !actorFetching,
    staleTime: msUntilEndOfDay(),
  });
}

export function useCommunityStats() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<CommunityUserStats[]>({
    queryKey: ["communityStats"],
    queryFn: async () => {
      if (!actor) return [];
      const raw = await actor.getCommunityStats();
      return raw.map((u) => ({
        ...u,
        totalPoints: Number(u.totalPoints),
      }));
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 10_000,
  });
}

export function useMyAnalytics() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["myAnalytics"],
    queryFn: async () => {
      if (!actor) return null;
      const raw = await actor.getMyAnalytics();
      return buildAppState(BigInt(1), raw);
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 5_000,
  });
}

export function useStreak() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<number>({
    queryKey: ["streak"],
    queryFn: async () => {
      if (!actor) return 0;
      const result = await actor.getStreak();
      return Number(result);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
    refetchInterval: 30_000,
  });
}

export function useTotalPoints() {
  const { actor, isFetching: actorFetching } = useActor(createActor);

  return useQuery<number>({
    queryKey: ["totalPoints"],
    queryFn: async () => {
      if (!actor) return 0;
      const result = await actor.getTotalPoints();
      return Number(result);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 30_000,
  });
}

export function useSetChallenge() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      day,
      challengeIndex,
      completed,
    }: {
      day: number;
      challengeIndex: number;
      completed: boolean;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.setChallenge(BigInt(day), BigInt(challengeIndex), completed);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appState"] });
      qc.invalidateQueries({ queryKey: ["streak"] });
    },
  });
}

export function useNextDay() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      await actor.nextDay();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appState"] });
      qc.invalidateQueries({ queryKey: ["streak"] });
    },
  });
}

export function useResetProgress() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      await actor.resetProgress();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appState"] });
      qc.invalidateQueries({ queryKey: ["streak"] });
    },
  });
}

export function calcDayCompletion(dayData: DayData): number {
  const done = dayData.challenges
    .slice(0, DEFAULT_CHALLENGES_COUNT)
    .filter(Boolean).length;
  return Math.round((done / DEFAULT_CHALLENGES_COUNT) * 100);
}

export function calcOverallCompletion(
  allProgress: DayData[],
  currentDay: number,
): number {
  const completedDays = allProgress
    .slice(0, currentDay)
    .filter((d) =>
      d.challenges.slice(0, DEFAULT_CHALLENGES_COUNT).every(Boolean),
    ).length;
  return Math.round((completedDays / TOTAL_DAYS) * 100);
}
