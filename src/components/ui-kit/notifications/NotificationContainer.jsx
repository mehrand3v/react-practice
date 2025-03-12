import { useContext } from "react";
import NotificationContext from "../../../context/NotificationContext";
import Toast from "./Toast";

export default function NotificationContainer() {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-xs">
      {notifications.map((notification) => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
