// components/layout/RootLayout.jsx
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./SideNavbar";
import Header from '@/components/common/Header';

function RootLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <SideNavbar />

      {/* Main content area with proper padding for mobile/desktop */}
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="px-4 sm:px-6 lg:px-8 py-6 text-gray-800 dark:text-gray-200">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

// Simple loading spinner component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
}

export default RootLayout;


