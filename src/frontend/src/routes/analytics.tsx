import { createRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { Route as rootRoute } from "./__root";

const AnalyticsPage = lazy(() => import("../pages/Analytics"));

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <AnalyticsPage />
    </Suspense>
  ),
});
