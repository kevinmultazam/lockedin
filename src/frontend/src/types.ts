export interface Challenge {
  id: number;
  label: string;
  description: string;
  completed: boolean;
}

export interface DayData {
  day: number;
  challenges: boolean[];
}

export interface AppState {
  currentDay: number;
  allProgress: DayData[];
}

export interface UserProfile {
  username: string;
  joinedAt: bigint;
}

export interface CommunityUserStats {
  username: string;
  todayCompletion: number;
  overallCompletion: number;
  currentDay: bigint;
  currentStreak: bigint;
  totalPoints: number;
}

export const DEFAULT_CHALLENGES: Omit<Challenge, "completed">[] = [
  {
    id: 0,
    label: "Membaca buku 10 halaman",
    description: "Buku saat ini: 'Atomic Habits'",
  },
  {
    id: 1,
    label: "Exercise 1 jam",
    description: "Latihan kekuatan atau kardio",
  },
  {
    id: 2,
    label: "Lari 5 km",
    description: "Di luar ruangan atau treadmill",
  },
  {
    id: 3,
    label: "Minum air 2 liter",
    description: "Gunakan botol minum reusable",
  },
  {
    id: 4,
    label: "Bangun pagi sebelum jam 7",
    description: "Tanpa snooze, tanpa pengecualian",
  },
  {
    id: 5,
    label: "Tidak main social media lebih dari 1 jam",
    description: "Gunakan screen time limit",
  },
  {
    id: 6,
    label: "Belajar / skill development 1 jam",
    description: "Kursus, buku, atau latihan",
  },
  {
    id: 7,
    label: "Journaling 10 menit",
    description: "Refleksi kemenangan dan pelajaran",
  },
  {
    id: 8,
    label: "Meditasi 10 menit",
    description: "Sesi terpandu atau diam",
  },
  {
    id: 9,
    label: "Tidur sebelum jam 11 malam",
    description: "Rutinitas wind down mulai jam 10",
  },
];
