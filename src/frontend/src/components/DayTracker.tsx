import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

const TOTAL_DAYS = 30;

interface DayTrackerProps {
  currentDay: number;
  overallPercent: number;
  todayPercent: number;
  isLoading: boolean;
  onNextDay: () => void;
  isPending?: boolean;
}

function CircleProgress({
  percent,
  size = 96,
}: {
  percent: number;
  size?: number;
}) {
  const r = (size - 10) / 2;
  const circumference = 2 * Math.PI * r;
  const dash = (percent / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="oklch(var(--muted))"
        strokeWidth={8}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="oklch(var(--accent))"
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference - dash}`}
        className="transition-all duration-700 ease-in-out"
      />
    </svg>
  );
}

export function DayTracker({
  currentDay,
  overallPercent,
  todayPercent,
  isLoading,
  onNextDay,
  isPending = false,
}: DayTrackerProps) {
  if (isLoading) {
    return (
      <div className="bg-card rounded-3xl shadow-card border border-border p-6 flex flex-col gap-4">
        <Skeleton className="h-6 w-32 rounded-xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-4 w-48 rounded-xl" />
      </div>
    );
  }

  const isLastDay = currentDay >= TOTAL_DAYS;

  return (
    <div className="bg-card rounded-3xl shadow-card border border-border p-6">
      {/* Day header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
            Current Day
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-5xl font-bold text-foreground leading-none">
              {currentDay}
            </span>
            <span className="text-xl text-muted-foreground">
              / {TOTAL_DAYS}
            </span>
          </div>
        </div>

        {/* Circle progress */}
        <div className="relative">
          <CircleProgress percent={todayPercent} size={88} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-foreground leading-none">
              {todayPercent}%
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
              today
            </span>
          </div>
        </div>
      </div>

      {/* Overall progress bar */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-muted-foreground font-medium">
            30-Day Overall
          </span>
          <span className="text-xs font-medium text-foreground">
            {overallPercent}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-700 ease-in-out"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      {/* Next day button */}
      {!isLastDay ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              data-ocid="next-day-trigger"
              variant="outline"
              size="sm"
              className={cn(
                "w-full rounded-2xl border-border hover:border-accent/40 hover:bg-accent/5 transition-smooth",
                "text-sm font-medium",
              )}
            >
              <span>Advance to Day {currentDay + 1}</span>
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl border-border max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                Move to Day {currentDay + 1}?
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                You'll advance to Day {currentDay + 1} of {TOTAL_DAYS}. Today's
                progress is saved and cannot be changed.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 mt-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-2xl"
                >
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  data-ocid="next-day-confirm"
                  size="sm"
                  className="flex-1 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={onNextDay}
                  disabled={isPending}
                >
                  {isPending ? "Advancing…" : "Confirm"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="text-center py-2">
          <span className="text-sm font-medium text-accent">
            🎉 Challenge Complete!
          </span>
        </div>
      )}
    </div>
  );
}
