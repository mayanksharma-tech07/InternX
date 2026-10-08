import React, { useState } from "react";

const StudentSettings = () => {
  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [applicationUpdates, setApplicationUpdates] =
    useState(true);

  return (
    <section className="student-settings-page">
      <div className="settings-heading">
        <span>ACCOUNT SETTINGS</span>
        <h1>Settings</h1>
        <p>
          Manage your account preferences and notifications.
        </p>
      </div>

      <div className="settings-card">
        <div className="settings-section">
          <div>
            <h2>Email Notifications</h2>
            <p>
              Receive important updates through email.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={() =>
                setEmailNotifications(!emailNotifications)
              }
            />

            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-section">
          <div>
            <h2>Application Updates</h2>
            <p>
              Get notified when your application status changes.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={applicationUpdates}
              onChange={() =>
                setApplicationUpdates(!applicationUpdates)
              }
            />

            <span className="slider"></span>
          </label>
        </div>

        <div className="settings-section danger-section">
          <div>
            <h2>Account</h2>
            <p>
              Account management options will be available here.
            </p>
          </div>

          <button className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudentSettings;