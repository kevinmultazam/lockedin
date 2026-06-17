import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Outlet,
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import LoadingScreen from "./components/LoadingScreen";
import UsernameSetupModal from "./components/UsernameSetupModal";
import { useProfile } from "./hooks/useBackend";

const HomePage = lazy(() => import("./pages/Home"));
const ChallengesPage = lazy(() => import("./pages/Challenges"));
const CommunityPage = lazy(() => import("./pages/Community"));
const AnalyticsPage = lazy(() => import("./pages/Analytics"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const SharePage = lazy(() => import("./pages/Share"));
const LoginPage = lazy(() => import("./pages/Login"));

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <HomePage />
    </Suspense>
  ),
});

const challengesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/challenges",
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <ChallengesPage />
    </Suspense>
  ),
});

const communityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/community",
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <CommunityPage />
    </Suspense>
  ),
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <AnalyticsPage />
    </Suspense>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <SettingsPage />
    </Suspense>
  ),
});

const shareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/share",
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <SharePage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  challengesRoute,
  communityRoute,
  analyticsRoute,
  settingsRoute,
  shareRoute,
]);

const router = createRouter({
  routeTree,
  history: createMemoryHistory({ initialEntries: ["/"] }),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppWithProfile() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return <LoadingScreen />;
  }

  const needsUsername = !profile || profile.username === "";

  if (needsUsername) {
    return <UsernameSetupModal />;
  }

  return <RouterProvider router={router} />;
}

function AuthGate() {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return <LoadingScreen />;
  }

  if (!identity) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <LoginPage />
      </Suspense>
    );
  }

  return <AppWithProfile />;
}

export default function App() {
  return <AuthGate />;
}
