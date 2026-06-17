import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  BookmarkCheck,
  LayoutDashboard,
  LogOut,
  Moon,
  Settings,
  Share2,
  Sun,
  Users,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useBackend";

const NAV_ITEMS = [
  { to: "/", label: "Beranda", icon: LayoutDashboard },
  { to: "/challenges", label: "Tantangan", icon: BookmarkCheck },
  { to: "/community", label: "Komunitas", icon: Users },
  { to: "/analytics", label: "Analitik", icon: BarChart2 },
  { to: "/share", label: "Bagikan", icon: Share2 },
  { to: "/settings", label: "Pengaturan", icon: Settings },
];

interface LayoutProps {
  children: React.ReactNode;
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      data-ocid="theme-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      title={isDark ? "Mode terang" : "Mode gelap"}
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.5} />
      ) : (
        <Moon size={18} strokeWidth={1.5} />
      )}
    </button>
  );
}

export function Layout({ children }: LayoutProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: profile } = useProfile();

  const displayName = profile?.username
    ? profile.username
    : identity
      ? `${identity.getPrincipal().toText().slice(0, 5)}…`
      : null;

  async function handleLogout() {
    await clear();
    queryClient.clear();
  }

  return (
    <div className="min-h-screen bg-background flex transition-colors duration-300">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[130px] bg-card border-r border-border shadow-subtle fixed inset-y-0 left-0 z-20">
        <div className="flex flex-col items-center gap-1 pt-6 flex-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
            const isActive =
              to === "/" ? currentPath === "/" : currentPath.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                data-ocid={`nav-${label.toLowerCase()}`}
                className={cn(
                  "flex flex-col items-center gap-1.5 w-full px-3 py-3 rounded-2xl mx-2 text-center transition-smooth",
                  "text-muted-foreground hover:text-foreground hover:bg-secondary",
                  isActive && "bg-secondary text-foreground font-medium",
                )}
                style={{ width: "calc(100% - 16px)" }}
              >
                <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-xs leading-tight">{label}</span>
              </Link>
            );
          })}
        </div>

        {/* Theme toggle in sidebar */}
        <div className="flex flex-col items-center pb-2">
          <ThemeToggle />
        </div>

        {/* Logout in sidebar bottom */}
        {identity && (
          <div className="p-3 border-t border-border">
            <button
              type="button"
              data-ocid="sidebar-logout"
              onClick={handleLogout}
              title={identity.getPrincipal().toText()}
              className="w-full flex flex-col items-center gap-1 py-2 px-2 rounded-2xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-smooth"
            >
              <LogOut size={16} strokeWidth={1.5} />
              <span className="text-[10px] leading-tight truncate w-full text-center">
                {displayName}
              </span>
            </button>
          </div>
        )}
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:ml-[130px]">
        {/* Header */}
        <header className="bg-card border-b border-border shadow-subtle sticky top-0 z-10">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground leading-none tracking-tight">
                Lockedin
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                30 Days Self Discipline Challenge
              </p>
            </div>

            {/* Header right: theme toggle + username + logout */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {identity && (
                <>
                  <span
                    className="hidden sm:block text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full border border-border truncate max-w-[130px]"
                    title={identity.getPrincipal().toText()}
                    data-ocid="header-username"
                  >
                    {displayName}
                  </span>
                  <button
                    type="button"
                    data-ocid="header-logout"
                    onClick={handleLogout}
                    aria-label="Logout"
                    className="p-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-smooth"
                  >
                    <LogOut size={18} strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 bg-background">{children}</main>

        {/* Footer */}
        <footer className="bg-muted/40 border-t border-border py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground transition-smooth"
          >
            caffeine.ai
          </a>
        </footer>
      </div>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-20 flex justify-around px-1 py-2 shadow-elevated">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const isActive =
            to === "/" ? currentPath === "/" : currentPath.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              data-ocid={`mobile-nav-${label.toLowerCase()}`}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-smooth",
                "text-muted-foreground hover:text-foreground",
                isActive && "text-foreground",
              )}
            >
              <Icon size={19} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[9px]">{label}</span>
            </Link>
          );
        })}
        {/* Theme toggle on mobile */}
        <div className="flex flex-col items-center gap-0.5 px-2 py-1">
          <ThemeToggle />
        </div>
        {/* Logout on mobile */}
        {identity && (
          <button
            type="button"
            data-ocid="mobile-logout"
            onClick={handleLogout}
            aria-label="Logout"
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-smooth text-muted-foreground hover:text-destructive"
          >
            <LogOut size={19} strokeWidth={1.5} />
            <span className="text-[9px]">Keluar</span>
          </button>
        )}
      </nav>
    </div>
  );
}
