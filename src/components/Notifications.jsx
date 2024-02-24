import Notification from "./Notification";
const Notifications = ({ notifications }) => {
  return (
    <div>
      {notifications.map((notification) => {
        return <Notification key={notification.id} message={notification.message} />;
      })}
    </div>
  );
};

export default Notifications;
