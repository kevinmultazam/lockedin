import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type DayProgress = Array<boolean>;
export type Day = bigint;
export interface CommunityUserStats {
    username: string;
    overallCompletion: number;
    totalPoints: bigint;
    currentDay: bigint;
    currentStreak: bigint;
    todayCompletion: number;
}
export type AllProgress = Array<[Day, DayProgress]>;
export interface UserProfile {
    username: string;
    joinedAt: bigint;
}
export interface backendInterface {
    getAllProgress(): Promise<AllProgress>;
    getCommunityStats(): Promise<Array<CommunityUserStats>>;
    getCurrentDay(): Promise<bigint>;
    getDailyRandomChallenge(): Promise<Array<string>>;
    getDayProgress(day: bigint): Promise<Array<boolean> | null>;
    getMyAnalytics(): Promise<AllProgress>;
    getProfile(): Promise<UserProfile | null>;
    getStreak(): Promise<bigint>;
    getTotalPoints(): Promise<bigint>;
    nextDay(): Promise<void>;
    resetProgress(): Promise<void>;
    setChallenge(day: bigint, challengeIndex: bigint, completed: boolean): Promise<void>;
    setUsername(username: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
