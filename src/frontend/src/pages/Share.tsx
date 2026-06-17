import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  calcDayCompletion,
  calcOverallCompletion,
  useAllProgress,
  useAppState,
  useCurrentDay,
  useCurrentDayProgress,
  useStreak,
} from "../hooks/useBackend";
import { useProfile } from "../hooks/useBackend";
import type { DayData } from "../types";

/** Mini sparkline showing 30 bars of progress */
function Sparkline({
  allProgress,
  currentDay,
}: { allProgress: DayData[]; currentDay: number }) {
  return (
    <div className="flex items-end gap-[3px] h-10">
      {allProgress.map((day) => {
        const done = day.challenges.filter(Boolean).length;
        const pct = done / 10;
        const isFuture = day.day > currentDay;
        const heightPct = isFuture ? 0.06 : Math.max(pct, 0.06);
        const opacity = isFuture ? 0.15 : pct >= 1 ? 1 : pct > 0 ? 0.55 : 0.2;
        return (
          <div
            key={`spark-${day.day}`}
            className="flex-1 rounded-sm"
            style={{
              height: `${heightPct * 100}%`,
              backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            }}
          />
        );
      })}
    </div>
  );
}

/** The shareable card visual — NO SVG icons, only text/emoji/CSS */
function ShareCardVisual({
  username,
  streak,
  todayPct,
  overallPct,
  currentDay,
  allProgress,
}: {
  username: string;
  streak: number;
  todayPct: number;
  overallPct: number;
  currentDay: number;
  allProgress: DayData[];
}) {
  return (
    <div
      className="relative w-[360px] rounded-3xl overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(160deg, #111111 0%, #1a1a1a 100%)",
        minHeight: "560px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Subtle top accent glow */}
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Header: app name */}
      <div className="relative z-10 flex items-center justify-between px-7 pt-7 pb-2">
        <span
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Lockedin
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "10px",
          }}
        >
          30 Days Challenge
        </span>
      </div>

      {/* Username */}
      <div className="relative z-10 px-7 pt-4">
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "12px",
            fontWeight: 500,
          }}
        >
          {username}
        </p>
      </div>

      {/* Streak — hero number, using emoji instead of SVG icon */}
      <div className="relative z-10 px-7 pt-5 pb-2 flex items-end gap-3">
        <div className="flex items-center gap-2" style={{ lineHeight: 1 }}>
          {/* Plain text emoji — renders reliably in html2canvas */}
          <span
            style={{
              fontSize: "32px",
              lineHeight: 1,
              marginBottom: "4px",
              display: "inline-block",
            }}
          >
            🔥
          </span>
          <span
            style={{
              color: "#ffffff",
              fontSize: "64px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {streak}
          </span>
        </div>
        <span
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: "13px",
            fontWeight: 500,
            paddingBottom: "10px",
          }}
        >
          hari berturut-turut
        </span>
      </div>

      {/* Divider */}
      <div
        className="relative z-10 mx-7 my-5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      />

      {/* Stats row */}
      <div className="relative z-10 px-7 flex gap-6">
        {/* Today */}
        <div className="flex-1">
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "10px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 4,
            }}
          >
            Hari Ini
          </p>
          <p
            style={{
              color: "#ffffff",
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {todayPct}
            <span
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.45)",
                fontWeight: 500,
              }}
            >
              %
            </span>
          </p>
        </div>

        {/* Overall */}
        <div className="flex-1">
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "10px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 4,
            }}
          >
            Overall
          </p>
          <p
            style={{
              color: "#ffffff",
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {overallPct}
            <span
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.45)",
                fontWeight: 500,
              }}
            >
              %
            </span>
          </p>
        </div>

        {/* Day number */}
        <div className="flex-1">
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "10px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 4,
            }}
          >
            Hari
          </p>
          <p
            style={{
              color: "#ffffff",
              fontSize: "36px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {currentDay}
            <span
              style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.45)",
                fontWeight: 500,
              }}
            >
              /30
            </span>
          </p>
        </div>
      </div>

      {/* Sparkline chart */}
      <div className="relative z-10 px-7 mt-8 flex-1">
        <p
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "9px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 8,
          }}
        >
          30-Day Trend
        </p>
        <Sparkline allProgress={allProgress} currentDay={currentDay} />
      </div>

      {/* Footer */}
      <div className="relative z-10 px-7 py-6 mt-auto flex items-center justify-between">
        <span
          style={{
            color: "rgba(255,255,255,0.18)",
            fontSize: "10px",
            fontWeight: 500,
          }}
        >
          lockedin.app
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.12)",
            fontSize: "10px",
          }}
        >
          {new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

/** Wait for fonts + next paint, then capture el as a Blob */
async function captureCardAsBlob(el: HTMLElement): Promise<Blob> {
  // 1. Ensure all fonts (Poppins) are fully loaded
  await document.fonts.ready;

  // 2. Wait for next animation frame so the DOM is painted and settled
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 100)),
  );

  // 3. Capture with solid white background (null causes transparency issues in some browsers)
  const canvas = await html2canvas(el, {
    backgroundColor: "#ffffff",
    scale: 2,
    useCORS: true,
    allowTaint: true,
    imageTimeout: 15000,
    logging: false,
    // Ensure full element dimensions are captured
    width: el.offsetWidth,
    height: el.offsetHeight,
    scrollX: 0,
    scrollY: 0,
  });

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(
            new Error(
              "canvas.toBlob() returned null — image generation failed",
            ),
          );
        }
      },
      "image/png",
      1.0,
    );
  });
}

/** Convert Blob to base64 data URL — fallback for mobile Safari */
function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("FileReader failed"));
    reader.readAsDataURL(blob);
  });
}

/** Trigger download via anchor click — most reliable cross-browser method */
async function triggerDownload(blob: Blob, filename: string): Promise<void> {
  // Primary method: blob URL (works in Chrome, Firefox, desktop Safari)
  try {
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    // Small delay before cleanup to allow the click to register
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch {
    // Fallback: base64 data URL (works in mobile Safari where blob URLs fail silently)
    const dataUrl = await blobToDataUrl(blob);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
    document.body.removeChild(link);
  }
}

export default function SharePage() {
  const { isLoading } = useAppState();
  const { data: profile } = useProfile();
  const currentDay = useCurrentDay();
  const currentDayData = useCurrentDayProgress();
  const allProgress = useAllProgress();
  const { data: streak = 0, isLoading: streakLoading } = useStreak();
  const username = profile?.username ?? "Pengguna";
  const todayPct = currentDayData ? calcDayCompletion(currentDayData) : 0;
  const overallPct = calcOverallCompletion(allProgress, currentDay);

  const loading = isLoading || streakLoading;
  const shareCardRef = useRef<HTMLDivElement>(null);
  const [capturing, setCapturing] = useState(false);

  async function handleDownload() {
    if (!shareCardRef.current) return;
    setCapturing(true);
    try {
      const blob = await captureCardAsBlob(shareCardRef.current);
      await triggerDownload(blob, `lockedin-${username}-day${currentDay}.png`);
      toast.success("Gambar berhasil diunduh!");
    } catch (err) {
      console.error("Download failed:", err);
      toast.error("Gagal mengunduh gambar. Coba screenshot manual ya!");
    } finally {
      setCapturing(false);
    }
  }

  async function handleInstagramShare() {
    if (!shareCardRef.current) return;
    setCapturing(true);
    try {
      const blob = await captureCardAsBlob(shareCardRef.current);
      const file = new File([blob], `lockedin-${username}.png`, {
        type: "image/png",
      });

      // Web Share API with files (supported on mobile browsers)
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: "Lockedin – 30 Days Challenge",
          text: `${username} — 🔥 ${streak} hari berturut-turut | Hari ${currentDay}/30 | ${todayPct}% hari ini`,
          files: [file],
        });
      } else {
        // Fallback: download image and hint user to share manually
        await triggerDownload(
          blob,
          `lockedin-${username}-day${currentDay}.png`,
        );
        toast.info(
          "Gambar sudah didownload. Upload ke Instagram Stories dari galeri kamu!",
          { duration: 6000 },
        );
      }
    } catch (err) {
      // User cancelled share — don't show error
      const isAbort = err instanceof Error && err.name === "AbortError";
      if (!isAbort) {
        toast.error("Gagal share ke Instagram. Coba download dulu.");
      }
    } finally {
      setCapturing(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8 pb-28 md:pb-10 space-y-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-1"
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Bagikan Progress
        </h1>
        <p className="text-sm text-muted-foreground">
          Kartu progres personal kamu — download atau bagikan ke Instagram!
        </p>
      </motion.div>

      {/* Card preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        className="flex justify-center"
        data-ocid="share.card"
      >
        {loading ? (
          <Skeleton className="w-[360px] h-[560px] rounded-3xl" />
        ) : (
          <div ref={shareCardRef}>
            <ShareCardVisual
              username={username}
              streak={streak}
              todayPct={todayPct}
              overallPct={overallPct}
              currentDay={currentDay}
              allProgress={allProgress}
            />
          </div>
        )}
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="flex flex-col gap-3"
      >
        {/* Download button */}
        <Button
          size="lg"
          variant="outline"
          className="w-full rounded-2xl font-semibold h-12 border-2 transition-all duration-200 hover:shadow-md"
          onClick={handleDownload}
          disabled={loading || capturing}
          data-ocid="share.download_button"
        >
          <Download className="w-4 h-4 mr-2" />
          {capturing ? "Memproses..." : "Download Gambar"}
        </Button>

        {/* Instagram Stories button */}
        <button
          type="button"
          onClick={handleInstagramShare}
          disabled={loading || capturing}
          data-ocid="share.instagram_button"
          className="w-full h-12 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background:
              "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            fontFamily: "'Poppins', sans-serif",
            color: "#ffffff",
          }}
        >
          {/* Plain text IG icon instead of SVG */}
          <span style={{ fontSize: "16px", lineHeight: 1 }}>📸</span>
          {capturing ? "Memproses..." : "Share ke Instagram Stories"}
        </button>
      </motion.div>

      {/* Info note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-xs text-muted-foreground px-2"
      >
        Share langsung dari perangkat mobile. Di desktop, download dulu lalu
        upload ke Instagram.
      </motion.p>
    </div>
  );
}
