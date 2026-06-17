import { createRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { Route as rootRoute } from "./__root";

const SettingsPage = lazy(() => import("../pages/Settings"));

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <SettingsPage />
    </Suspense>
  ),
});
