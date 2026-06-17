import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useProfile, useSetUsername } from "../hooks/useBackend";

function formatIndonesianDate(ms: number): string {
  return new Date(ms).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Settings() {
  const { data: profile, isLoading } = useProfile();
  const setUsername = useSetUsername();

  const [username, setUsernameValue] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (profile?.username) {
      setUsernameValue(profile.username);
      setIsDirty(false);
    }
  }, [profile?.username]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(e.target.value);
    setIsDirty(e.target.value !== (profile?.username ?? ""));
  };

  const handleSave = async () => {
    if (!isDirty || !username.trim()) return;
    try {
      await setUsername.mutateAsync(username.trim());
      toast.success("Username berhasil diperbarui!");
      setIsDirty(false);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Gagal memperbarui username.",
      );
    }
  };

  const joinedAtMs = profile?.joinedAt
    ? Number(profile.joinedAt) / 1_000_000
    : null;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Page title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Pengaturan
          </h1>
          <p className="text-sm text-muted-foreground">
            Kelola informasi akun kamu
          </p>
        </div>

        {/* Profile card */}
        <Card className="shadow-card border border-border rounded-2xl overflow-hidden">
          <CardHeader className="bg-card border-b border-border px-6 py-4">
            <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
              <User size={16} className="text-muted-foreground" />
              Pengaturan Profil
            </CardTitle>
          </CardHeader>

          <CardContent className="bg-card px-6 py-6 space-y-5">
            {/* Username field */}
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-foreground"
              >
                Username
              </Label>
              <Input
                id="username"
                data-ocid="settings-username-input"
                value={username}
                onChange={handleChange}
                placeholder="Masukkan username kamu"
                disabled={isLoading || setUsername.isPending}
                className="transition-smooth rounded-xl border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-ring disabled:opacity-50 h-10 px-4 text-sm"
                maxLength={20}
                autoComplete="off"
              />
              <p className="text-xs text-muted-foreground">
                Gunakan 3–20 karakter. Huruf, angka, dan garis bawah.
              </p>
            </div>

            {/* Joined at */}
            {joinedAtMs !== null && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar size={14} />
                <span>
                  Bergabung sejak:{" "}
                  <span className="font-medium text-foreground">
                    {formatIndonesianDate(joinedAtMs)}
                  </span>
                </span>
              </div>
            )}

            {/* Save button */}
            <div className="pt-1">
              <Button
                data-ocid="settings-save-btn"
                onClick={handleSave}
                disabled={
                  !isDirty ||
                  !username.trim() ||
                  setUsername.isPending ||
                  isLoading
                }
                className="h-10 px-6 rounded-xl text-sm font-medium transition-smooth bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {setUsername.isPending ? (
                  <span className="flex items-center gap-2">
                    <span
                      role="status"
                      aria-label="Memuat"
                      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                    />
                    Menyimpan…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save size={14} />
                    Simpan Perubahan
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
