// src/router/appRoutes.jsx
import React, { Suspense , useEffect, useState} from "react";
import { Navigate, Outlet } from "react-router-dom";
import RootLayout from "@components/layout/RootLayout";
import AuthLayout from "@components/layout/AuthLayout";
import ErrorPage from "@pages/ErrorPage";
import PrivateRoute from "@components/auth/PrivateRoute";
import { AnalyticsProvider } from "@/context/AnalyticsContext";
import { useGlobalLoading } from "@/hooks/useGlobalLoading";



// Lazy-loaded components
const Customers = React.lazy(() => import("@pages/Customers"));
const Sales = React.lazy(() => import("@pages/Sales"));
const NotFound = React.lazy(() => import("@pages/NotFound"));
const Profile = React.lazy(() => import("@pages/Profile"));
const Login = React.lazy(() => import("@pages/auth/Login"));
const Dashboard = React.lazy(() => import("@pages/Dashboard"));

// // Loading component for Suspense
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);



// Create a wrapper for lazy-loaded components
// const LazyWrapper = ({ component: Component }) => {
//  const { showLoading, hideLoading } = useGlobalLoading();
//  const [isLoadingLocal, setIsLoadingLocal] = useState(true); // Local loading state

//  // Sync local loading state with global loading state
//  useEffect(() => {
//    if (isLoadingLocal) {
//      showLoading(); // Show global loading when local loading is true
//    } else {
//      hideLoading(); // Hide global loading when local loading is false
//    }
//  }, [isLoadingLocal, showLoading, hideLoading]);

//  // Hide local loading when the component is mounted
//  useEffect(() => {
//    setIsLoadingLocal(false);
//  }, []);

//   return (
//     <Suspense fallback={<LoadingFallback />}>
//       <Component />
//     </Suspense>
//   );
// };

// Modify your LazyWrapper component in appRoutes.jsx
const LazyWrapper = ({ component: Component }) => {
  const { showLoading, hideLoading } = useGlobalLoading();

  useEffect(() => {
    // Show loading when component is about to mount
    showLoading();

    // Hide loading immediately after component has mounted
    return () => {
      hideLoading();
    };
  }, []);

  // Also hide loading when component has mounted
  useEffect(() => {
    const timer = setTimeout(() => {
      hideLoading();
    }, 100);

    return () => clearTimeout(timer);
  }, [hideLoading]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
};

// Placeholder page for under-development features
const PlaceholderPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
      Coming Soon
    </h1>
    <p className="mt-2 text-gray-600 dark:text-gray-400">
      This feature is currently under development.
    </p>
  </div>
);

// Create a wrapper layout that includes the AnalyticsProvider
const AnalyticsLayout = () => (
  <AnalyticsProvider>
    <Outlet />
  </AnalyticsProvider>
);

// Wrap lazy-loaded components with Suspense
// const LazyComponent = ({ component: Component }) => (
//   <Suspense fallback={<LoadingFallback />}>
//     <Component />
//   </Suspense>
// );

const routes = [
  {
    // Root element with analytics
    element: <AnalyticsLayout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <RootLayout />
          </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <LazyWrapper component={Customers} /> },
          { path: "sales", element: <LazyWrapper component={Sales} /> },
          { path: "products", element: <PlaceholderPage /> },
          { path: "users", element: <PlaceholderPage /> },
          { path: "orders", element: <PlaceholderPage /> },
          { path: "analytics", element: <PlaceholderPage /> },
          { path: "settings", element: <PlaceholderPage /> },
          { path: "inventory", element: <PlaceholderPage /> },
          { path: "transactions", element: <PlaceholderPage /> },
          { path: "profile", element: <LazyWrapper component={Profile} /> },
          { path: "dashboard", element: <LazyWrapper component={Dashboard} /> },
          { path: "*", element: <LazyWrapper component={NotFound} /> },
        ],
      },
      {
        path: "/auth", // Use a different base path for authentication routes
        element: <AuthLayout />,
        children: [
          { path: "login", element: <LazyWrapper component={Login} /> },
          // Uncomment and add more routes as needed
          // { path: "register", element: <LazyComponent component={Register} /> },
          // { path: "forgot-password", element: <LazyComponent component={ForgotPassword} /> },
        ],
      },
    ],
  },
];

export default routes;
