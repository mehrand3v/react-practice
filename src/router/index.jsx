// src/router/index.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import RootLayout from "@components/layout/RootLayout";
import Customers from "@pages/Customers";
import Sales from "@pages/Sales";
import NotFound from "@pages/NotFound";

// Placeholder component for routes not yet implemented
const PlaceholderPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-semibold text-gray-800">Coming Soon</h1>
    <p className="mt-2 text-gray-600">
      This feature is currently under development.
    </p>
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<NotFound />}>
      {/* Existing pages */}
      <Route index element={<Customers />} />
      <Route path="sales" element={<Sales />} />

      {/* Placeholder routes for features not yet implemented */}
      <Route path="products" element={<PlaceholderPage />} />
      <Route path="users" element={<PlaceholderPage />} />
      <Route path="orders" element={<PlaceholderPage />} />
      <Route path="analytics" element={<PlaceholderPage />} />
      <Route path="settings" element={<PlaceholderPage />} />
      <Route path="inventory" element={<PlaceholderPage />} />
      <Route path="transactions" element={<PlaceholderPage />} />

      {/* Redirect example */}
      <Route path="dashboard" element={<Navigate to="/" replace />} />

      {/* Catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

export default router;
