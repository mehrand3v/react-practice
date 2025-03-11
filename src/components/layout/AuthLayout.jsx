// src/components/layout/AuthLayout.jsx

import { Outlet } from "react-router-dom"; // To render nested routes

const AuthLayout = () => {
  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Auth Container */}
      <div className="flex justify-center items-center min-h-screen z-10">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full mx-4">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-indigo-600">
              Welcome Back!
            </h2>
            <p className="text-gray-500 mt-2">Sign in to access your account</p>
          </div>

          {/* Form Content */}
          <Outlet />

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              &copy; 2025 Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
