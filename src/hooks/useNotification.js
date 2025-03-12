import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

export default function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  const { addNotification, removeNotification, clearNotifications } = context;

  // Helper functions for common notification types
  const success = (message, options = {}) => {
    addNotification({
      type: "success",
      message,
      duration: 5000,
      ...options,
    });
  };

  const error = (message, options = {}) => {
    addNotification({
      type: "error",
      message,
      duration: 7000,
      ...options,
    });
  };

  const info = (message, options = {}) => {
    addNotification({
      type: "info",
      message,
      duration: 5000,
      ...options,
    });
  };

  const warning = (message, options = {}) => {
    addNotification({
      type: "warning",
      message,
      duration: 6000,
      ...options,
    });
  };

  return {
    success,
    error,
    info,
    warning,
    notify: addNotification,
    remove: removeNotification,
    clearAll: clearNotifications,
    notifications: context.notifications,
  };
}
