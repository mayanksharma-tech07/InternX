import React from "react";

const Notifications = () => {
  const notifications = [];

  return (
    <section className="student-page">
      <div className="student-page-heading">
        <div>
          <span>UPDATES</span>
          <h1>Notifications</h1>
          <p>Important updates about your internship journey.</p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="student-empty-card">
          <div>🔔</div>
          <h2>You're all caught up</h2>
          <p>
            New application and interview updates will appear here.
          </p>
        </div>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <div key={notification.id}>
              {notification.message}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Notifications;