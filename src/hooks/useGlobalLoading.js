// src/hooks/useGlobalLoading.js
// import { useLoading } from "@/context/LoadingContext";

// export const useGlobalLoading = () => {
//   const { setIsLoading } = useLoading();

//   const showLoading = () => setIsLoading(true);
//   const hideLoading = () => setIsLoading(false);

//   // Helper for wrapping async functions
//   const withLoading = async (asyncFunction) => {
//     showLoading();
//     try {
//       return await asyncFunction();
//     } finally {
//       hideLoading();
//     }
//   };

//   return { showLoading, hideLoading, withLoading };
// };

// hooks/useGlobalLoading.js
import { useCallback } from 'react';
import { useLoading } from '../context/LoadingContext';

export const useGlobalLoading = () => {
  const { showLoading: show, hideLoading: hide } = useLoading();

  const showLoading = useCallback(() => {
    show();
  }, [show]);

  const hideLoading = useCallback(() => {
    hide();
  }, [hide]);

  return { showLoading, hideLoading };
};