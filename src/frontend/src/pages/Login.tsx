import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  "Lacak 10 tantangan setiap hari selama 30 hari",
  "Progress tersimpan di cloud, aman & permanen",
  "Visualisasi progres dengan grafik harian",
];

export default function LoginPage() {
  const { login, isLoggingIn, isInitializing } = useInternetIdentity();

  const isLoading = isLoggingIn || isInitializing;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-sm bg-card rounded-3xl shadow-elevated border border-border p-8 flex flex-col items-center text-center"
      >
        {/* Logo / icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-5"
        >
          <Zap size={28} className="text-accent" strokeWidth={2} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="text-2xl font-bold text-foreground tracking-tight mb-1"
        >
          Lockedin
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="text-sm text-muted-foreground mb-7"
        >
          30 Days Self Discipline Challenge
        </motion.p>

        {/* Feature list */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
          className="w-full space-y-2.5 mb-7 text-left"
        >
          {FEATURES.map((feat) => (
            <li
              key={feat}
              className="flex items-start gap-2.5 text-sm text-muted-foreground"
            >
              <ShieldCheck
                size={16}
                className="text-accent mt-0.5 flex-shrink-0"
                strokeWidth={2}
              />
              <span>{feat}</span>
            </li>
          ))}
        </motion.ul>

        {/* Login button */}
        <motion.button
          data-ocid="login-btn"
          type="button"
          onClick={login}
          disabled={isLoading}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 rounded-2xl bg-foreground text-background font-semibold text-sm transition-all duration-200 ease-in-out hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-subtle"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 rounded-full border-2 border-background/40 border-t-background animate-spin" />
              Menghubungkan…
            </span>
          ) : (
            "Masuk dengan Internet Identity"
          )}
        </motion.button>

        <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
          Login aman tanpa password menggunakan Internet Identity —{" "}
          <span className="text-foreground font-medium">
            tidak ada akun Gmail diperlukan
          </span>
          .
        </p>
      </motion.div>

      {/* Branding */}
      <p className="mt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground transition-smooth"
        >
          caffeine.ai
        </a>
      </p>
    </div>
  );
}
