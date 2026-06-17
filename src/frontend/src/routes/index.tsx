import { createRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { Route as rootRoute } from "./__root";

const HomePage = lazy(() => import("../pages/Home"));

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <HomePage />
    </Suspense>
  ),
});
