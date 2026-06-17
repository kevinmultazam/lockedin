import { createRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { Route as rootRoute } from "./__root";

const CommunityPage = lazy(() => import("../pages/Community"));

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/community",
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <CommunityPage />
    </Suspense>
  ),
});
