import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ResetButtonProps {
  onReset: () => void;
  isPending?: boolean;
}

export function ResetButton({ onReset, isPending = false }: ResetButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          data-ocid="reset-trigger"
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-2xl transition-smooth text-xs gap-1.5"
        >
          <RotateCcw size={13} />
          Reset Progress
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-3xl border-border max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold">
            Reset semua progress?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-muted-foreground">
            Ini akan menghapus semua progress 30 hari dan mulai dari Hari 1.
            Tindakan ini tidak bisa dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2 mt-2">
          <AlertDialogCancel className="flex-1 rounded-2xl border-border">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            data-ocid="reset-confirm"
            onClick={onReset}
            disabled={isPending}
            className="flex-1 rounded-2xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Mereset…" : "Reset Semua"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
