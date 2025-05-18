import * as Sentry from "@sentry/react";
import { Link } from "@tanstack/react-router";

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 mb-6">
                We apologize for the inconvenience. Our team has been notified
                and is working on fixing the issue.
              </p>
              <div className="space-y-4">
                <button
                  onClick={resetError}
                  className="w-full bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition-colors"
                >
                  Try Again
                </button>
                <Link
                  to="/"
                  className="block w-full text-center text-sky-500 hover:text-sky-600"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
