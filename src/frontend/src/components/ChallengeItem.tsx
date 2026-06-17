import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { DEFAULT_CHALLENGES, type DayData } from "../types";

interface ChallengeItemProps {
  index: number;
  completed: boolean;
  onToggle: (index: number, completed: boolean) => void;
  disabled?: boolean;
}

export function ChallengeItem({
  index,
  completed,
  onToggle,
  disabled = false,
}: ChallengeItemProps) {
  const challenge = DEFAULT_CHALLENGES[index];
  if (!challenge) return null;

  return (
    <button
      type="button"
      data-ocid={`challenge-item-${index}`}
      disabled={disabled}
      onClick={() => onToggle(index, !completed)}
      className={cn(
        "group w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ease-in-out text-left",
        "shadow-card hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        completed
          ? "bg-accent/8 border-accent/20"
          : "bg-card border-border hover:border-accent/30 hover:bg-secondary/40",
        disabled && "opacity-50 cursor-not-allowed",
      )}
      aria-pressed={completed}
      aria-label={`${challenge.label}: ${completed ? "completed" : "not completed"}`}
    >
      {/* Checkbox */}
      <div
        className={cn(
          "flex-shrink-0 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ease-in-out",
          completed
            ? "bg-accent border-accent"
            : "border-border group-hover:border-accent/50",
        )}
      >
        <Check
          size={14}
          strokeWidth={2.5}
          className={cn(
            "transition-all duration-200 ease-in-out",
            completed
              ? "opacity-100 scale-100 text-accent-foreground"
              : "opacity-0 scale-50",
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
          {challenge.label}
        </p>
        <p
          className={cn(
            "text-xs mt-0.5 leading-tight transition-all duration-300 ease-in-out",
            completed ? "text-muted-foreground/60" : "text-muted-foreground",
          )}
        >
          {challenge.description}
        </p>
      </div>

      {/* Completion badge */}
      {completed && (
        <div className="flex-shrink-0">
          <span className="text-xs font-medium text-accent px-2 py-0.5 rounded-full bg-accent/10">
            Done
          </span>
        </div>
      )}
    </button>
  );
}

interface ChallengeListProps {
  dayData: DayData | null;
  onToggle: (index: number, completed: boolean) => void;
  disabled?: boolean;
}

export function ChallengeList({
  dayData,
  onToggle,
  disabled = false,
}: ChallengeListProps) {
  const challenges =
    dayData?.challenges ?? Array(DEFAULT_CHALLENGES.length).fill(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {DEFAULT_CHALLENGES.map((challenge, index) => (
        <ChallengeItem
          key={challenge.id}
          index={index}
          completed={challenges[index] ?? false}
          onToggle={onToggle}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
