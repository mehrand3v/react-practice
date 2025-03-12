// src/context/LoadingContext.jsx
// import { createContext, useContext, useState } from "react";

// const LoadingContext = createContext(null);

// export const LoadingProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
//       {children}
//     </LoadingContext.Provider>
//   );
// };

// export const useLoading = () => useContext(LoadingContext);

// LoadingContext.jsx


import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};