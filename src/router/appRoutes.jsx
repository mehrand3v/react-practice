// src/router/appRoutes.jsx
import { Navigate } from "react-router-dom";
import RootLayout from "@components/layout/RootLayout";
import AuthLayout from "@components/layout/AuthLayout";
import Customers from "@pages/Customers";
import Sales from "@pages/Sales";
import NotFound from "@pages/NotFound";
import ErrorPage from "@pages/ErrorPage";
import Profile from "@pages/Profile";
import Login from "@pages/auth/Login";
// import Register from "@pages/auth/Register";
// import ForgotPassword from "@pages/auth/ForgotPassword";
import PrivateRoute from "@components/auth/PrivateRoute";
import Dashboard from "@pages/Dashboard"; // Import the new Dashboard component

// Placeholder page for under-development features
const PlaceholderPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-800">Coming Soon</h1>
    <p className="mt-2 text-gray-600">
      This feature is currently under development.
    </p>
  </div>
);

const routes = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <RootLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Customers /> }, // Default route for authenticated users
      { path: "sales", element: <Sales /> },
      { path: "products", element: <PlaceholderPage /> },
      { path: "users", element: <PlaceholderPage /> },
      { path: "orders", element: <PlaceholderPage /> },
      { path: "analytics", element: <PlaceholderPage /> },
      { path: "settings", element: <PlaceholderPage /> },
      { path: "inventory", element: <PlaceholderPage /> },
      { path: "transactions", element: <PlaceholderPage /> },
      { path: "profile", element: <Profile /> }, // Profile page for authenticated users
      { path: "dashboard", element: <Dashboard /> }, // Point to the new Dashboard component
      { path: "*", element: <NotFound /> }, // Catch-all for 404
    ],
  },
  {
    path: "/auth", // Use a different base path for authentication routes
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      // { path: "register", element: <Register /> },
      // { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
];

export default routes;
