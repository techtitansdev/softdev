import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-gray-500"></div>
      <p className="ml-4 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
