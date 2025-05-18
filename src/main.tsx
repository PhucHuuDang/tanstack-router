import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import * as Sentry from "@sentry/browser";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { ErrorBoundary } from "./components/ErrorBoundary";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";

// Initialize Sentry
Sentry.init({
  dsn: import.meta.env.VITE_REACT_SENTRY, // Replace with your actual DSN
  integrations: [Sentry.browserTracingIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of transactions, adjust in production
  sendDefaultPii: true,
  tracePropagationTargets: ["localhost", "https://localhost:3000"],
});

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
