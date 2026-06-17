import { createRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { Route as rootRoute } from "./__root";

const ChallengesPage = lazy(() => import("../pages/Challenges"));

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/challenges",
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <ChallengesPage />
    </Suspense>
  ),
});
