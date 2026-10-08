import React from "react";
import { useNavigate } from "react-router-dom";
import "./Notification.css";

const NotificationBell = ({ count = 0 }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notifications");
  };

  return (
    <button
      className="notification-bell"
      onClick={handleClick}
      aria-label="Notifications"
    >
      🔔

      {count > 0 && (
        <span className="notification-count">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
};

export default NotificationBell;