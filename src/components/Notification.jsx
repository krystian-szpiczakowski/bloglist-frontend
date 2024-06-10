import { useEffect } from "react";
import { useNotification } from "./notification/useNotification";

const Notification = ({ notification }) => {
  const { removeNotification } = useNotification()

  useEffect(() => {
    if (!notification) {
      return
    }

    const timer = setTimeout(() => {
      removeNotification(notification.id)
    }, 1000)

    return () => {
      clearTimeout(timer);
    }
  }, [])

  if (!notification) {
    return null;
  }

  return <div>{notification.message}</div>;
};

export default Notification;
