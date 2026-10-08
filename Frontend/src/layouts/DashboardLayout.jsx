
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("internxUser") || "null");
  const isAdmin = user?.role === "admin";

  const handleLogout = async () => {
    const token = localStorage.getItem("internxToken");

    try {
      if (token) {
        await fetch("http://127.0.0.1:8000/api/auth/logout/", {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      localStorage.removeItem("internxToken");
      localStorage.removeItem("internxUser");
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">InternX</div>

        <nav>
          <Link to="/dashboard">Dashboard</Link>

          {isAdmin ? (
            <>
              <Link to="/dashboard/internships">Manage Internships</Link>
              <Link to="/dashboard/companies">Manage Companies</Link>
              <Link to="/dashboard/applications">Applications</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard/profile">Profile</Link>
              <Link to="/dashboard/applications">Applications</Link>
              <Link to="/dashboard/saved">Saved Internships</Link>
              <Link to="/dashboard/interviews">Interviews</Link>
              <Link to="/dashboard/notifications">Notifications</Link>
              <Link to="/dashboard/settings">Settings</Link>
            </>
          )}
        </nav>

        <button type="button" className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;