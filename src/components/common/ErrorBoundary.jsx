// src/components/common/ErrorBoundary.jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We apologize for the inconvenience. Please try refreshing the page
              or contact support if the problem persists.
            </p>
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white rounded-md shadow focus:outline-none"
              >
                Refresh Page
              </button>
            </div>

            {/* Display error details in development mode only */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded text-left overflow-auto">
                <p className="text-red-600 dark:text-red-400 font-mono text-sm mb-2">
                  {this.state.error && this.state.error.toString()}
                </p>
                <p className="text-gray-700 dark:text-gray-300 font-mono text-xs">
                  {this.state.errorInfo &&
                    this.state.errorInfo.componentStack
                      .split("\n")
                      .map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
