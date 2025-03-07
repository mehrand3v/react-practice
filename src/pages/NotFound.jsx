// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-purple-500">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90 transition-all duration-300"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
