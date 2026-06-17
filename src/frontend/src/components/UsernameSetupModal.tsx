import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSetUsername } from "../hooks/useBackend";

export default function UsernameSetupModal() {
  const [username, setUsername] = useState("");
  const [touched, setTouched] = useState(false);
  const setUsernameMutation = useSetUsername();

  const trimmed = username.trim();
  const isValid = trimmed.length >= 3 && trimmed.length <= 20;
  const showError = touched && !isValid;

  async function handleSave() {
    setTouched(true);
    if (!isValid) return;

    try {
      await setUsernameMutation.mutateAsync(trimmed);
      toast.success("Username berhasil disimpan!");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Gagal menyimpan username";
      toast.error(msg);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      aria-modal="true"
    >
      <div className="bg-card border border-border shadow-elevated rounded-3xl p-8 w-full max-w-sm mx-4 flex flex-col items-center gap-6">
        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
          <UserCircle2
            size={28}
            strokeWidth={1.5}
            className="text-foreground"
          />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2
            id="username-modal-title"
            className="text-xl font-bold text-foreground tracking-tight"
          >
            Pilih Username Kamu
          </h2>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            Username digunakan di leaderboard komunitas. Username bisa diubah
            kapan saja di halaman Pengaturan.
          </p>
        </div>

        {/* Input */}
        <div className="w-full flex flex-col gap-1.5">
          <Label
            htmlFor="username-input"
            className="text-sm font-medium text-foreground"
          >
            Username
          </Label>
          <Input
            id="username-input"
            data-ocid="username-input"
            type="text"
            placeholder="Contoh: budi_disiplin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => setTouched(true)}
            onKeyDown={handleKeyDown}
            maxLength={20}
            className="rounded-xl border-input bg-background focus-visible:ring-ring text-foreground placeholder:text-muted-foreground"
            autoFocus
            autoComplete="off"
          />
          {showError && (
            <p className="text-xs text-destructive mt-0.5">
              Username harus 3–20 karakter.
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {trimmed.length}/20 karakter
          </p>
        </div>

        {/* Save button */}
        <Button
          data-ocid="username-save-btn"
          onClick={handleSave}
          disabled={setUsernameMutation.isPending}
          className="w-full rounded-2xl font-semibold transition-smooth"
        >
          {setUsernameMutation.isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
              Menyimpan…
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} />
              Simpan Username
            </span>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Nama ini akan tampil di halaman Community untuk semua pengguna.
        </p>
      </div>
    </div>
  );
}
