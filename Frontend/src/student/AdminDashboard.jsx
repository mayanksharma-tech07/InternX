import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://127.0.0.1:8000/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    companies: 0,
    internships: 0,
    applications: 0,
    messages: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("internxToken");

    const loadStats = async () => {
      try {
        const headers = { Authorization: `Token ${token}` };

        const endpoints = [
          ["companies", `${API}/companies/`],
          ["internships", `${API}/internships/`],
          ["applications", `${API}/applications/`],
          ["messages", `${API}/contacts/`],
        ];

        const results = await Promise.all(
          endpoints.map(async ([key, url]) => {
            const response = await fetch(url, { headers });
            if (!response.ok) {
              throw new Error("Dashboard data load nahi hua.");
            }
            const data = await response.json();
            return [key, Array.isArray(data) ? data.length : 0];
          })
        );

        setStats(Object.fromEntries(results));
      } catch (err) {
        setError(err.message);
      }
    };

    loadStats();
  }, []);

  const user = JSON.parse(localStorage.getItem("internxUser") || "null");

  return (
    <section className="student-dashboard">
      <div className="student-dashboard-header">
        <div>
          <span>ADMIN CONTROL CENTER</span>
          <h1>Welcome, {user?.name || "Mayank Sharma"}</h1>
          <p>Manage InternX companies, internships and applications.</p>
        </div>
      </div>

      {error && <p className="auth-error">{error}</p>}

      <div className="student-stats">
        <div className="student-stat-card">
          <div><strong>{stats.internships}</strong><span>Internships</span></div>
        </div>
        <div className="student-stat-card">
          <div><strong>{stats.companies}</strong><span>Companies</span></div>
        </div>
        <div className="student-stat-card">
          <div><strong>{stats.applications}</strong><span>Applications</span></div>
        </div>
        <div className="student-stat-card">
          <div><strong>{stats.messages}</strong><span>Contact Messages</span></div>
        </div>
      </div>

      <div className="dashboard-quick-links">
        <Link to="/internships">
          <span>💼</span>
          <div><strong>View Internships</strong><small>Explore current opportunities</small></div>
        </Link>
        <Link to="/companies">
          <span>🏢</span>
          <div><strong>View Companies</strong><small>Browse registered companies</small></div>
        </Link>
        <Link to="/dashboard/applications">
          <span>📋</span>
          <div><strong>Applications</strong><small>Review submitted applications</small></div>
        </Link>
      </div>
    </section>
  );
};

export default AdminDashboard;