import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header skeleton */}
      <header className="bg-card border-b border-border px-6 py-5 shadow-subtle">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-32 mb-2 rounded-xl" />
            <Skeleton className="h-4 w-56 rounded-lg" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8 space-y-6">
        {/* Progress card skeleton */}
        <Skeleton className="h-32 w-full rounded-3xl" />

        {/* Challenge grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["p1", "p2", "p3", "p4", "p5", "p6"].map((k) => (
            <Skeleton key={k} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
      </main>
    </div>
  );
}
