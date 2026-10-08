import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {type === "success" ? "✓" : "!"}
      </div>

      <div className="toast-content">
        <strong>
          {type === "success" ? "Success" : "Error"}
        </strong>

        <p>{message}</p>
      </div>

      <button
        className="toast-close"
        onClick={onClose}
        type="button"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;