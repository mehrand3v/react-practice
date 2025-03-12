import { createContext, useReducer, useContext } from "react";

// Initial state
const initialState = {
  notifications: [],
};

// Actions
const ADD_NOTIFICATION = "ADD_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

// Reducer
function notificationReducer(state, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: Date.now(), ...action.payload },
        ],
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
}

// Create context
const NotificationContext = createContext();

// Provider component
export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Actions
  const addNotification = (notification) => {
    dispatch({ type: ADD_NOTIFICATION, payload: notification });

    // Auto-dismiss notifications after timeout if they're not persistent
    if (!notification.persistent) {
      setTimeout(() => {
        dispatch({ type: REMOVE_NOTIFICATION, payload: notification.id });
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id) => {
    dispatch({ type: REMOVE_NOTIFICATION, payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: CLEAR_NOTIFICATIONS });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        addNotification,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
