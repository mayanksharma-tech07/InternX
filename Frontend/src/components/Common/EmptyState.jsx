// frontend/src/components/common/EmptyState.jsx

import React from "react";
import { Inbox } from "lucide-react";

const EmptyState = ({
  icon = <Inbox size={48} />,
  title = "No Data Found",
  message = "There is nothing to display here right now.",
  action = null,
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {icon}
      </div>

      <h3 className="empty-state-title">
        {title}
      </h3>

      <p className="empty-state-message">
        {message}
      </p>

      {action && (
        <div className="empty-state-action">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;