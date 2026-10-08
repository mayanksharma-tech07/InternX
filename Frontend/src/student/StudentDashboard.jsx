import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <div className="student-dashboard-header">
        <div>
          <span>STUDENT DASHBOARD</span>
          <h1>Welcome back 👋</h1>
          <p>Manage your internships, applications and career journey.</p>
        </div>

        <Link to="/internships" className="explore-btn">
          Explore Internships
        </Link>
      </div>

      <div className="student-stats">
        <div className="student-stat-card">
          <div className="stat-icon">📄</div>
          <div>
            <strong>0</strong>
            <span>Applications</span>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-icon">🔖</div>
          <div>
            <strong>0</strong>
            <span>Saved Internships</span>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-icon">🎯</div>
          <div>
            <strong>0</strong>
            <span>Interviews</span>
          </div>
        </div>

        <div className="student-stat-card">
          <div className="stat-icon">🔔</div>
          <div>
            <strong>0</strong>
            <span>Notifications</span>
          </div>
        </div>
      </div>

      <div className="dashboard-quick-links">
        <Link to="/dashboard/applications">
          <span>📋</span>
          <div>
            <strong>My Applications</strong>
            <small>Track your applications</small>
          </div>
        </Link>

        <Link to="/dashboard/saved">
          <span>⭐</span>
          <div>
            <strong>Saved Internships</strong>
            <small>View saved opportunities</small>
          </div>
        </Link>

        <Link to="/dashboard/profile">
          <span>👤</span>
          <div>
            <strong>My Profile</strong>
            <small>Update your profile</small>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;