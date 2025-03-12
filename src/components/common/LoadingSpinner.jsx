// src/components/common/LoadingSpinner.jsx

import { useLoading } from "@/context/LoadingContext";

const LoadingSpinner = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 dark:bg-opacity-70">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
    </div>
  );
};

export default LoadingSpinner;
