import Notification from "./Notification";
const Notifications = ({ notifications }) => {
  return (
    <div>
      {notifications.map((notification) => {
        return <Notification key={notification.id} notification={notification} />;
      })}
    </div>
  );
};

export default Notifications;
