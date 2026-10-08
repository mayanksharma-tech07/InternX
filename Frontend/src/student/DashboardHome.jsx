import React from "react";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  return (
    <section className="dashboard-home">
      <div className="dashboard-home-hero">
        <div>
          <span>YOUR CAREER SPACE</span>
          <h1>Build your future with InternX.</h1>
          <p>
            Discover opportunities, apply to internships and
            keep everything organized in one place.
          </p>
        </div>

        <Link to="/internships">
          Find Internships →
        </Link>
      </div>

      <div className="dashboard-home-grid">
        <div className="dashboard-info-card">
          <span>Applications</span>
          <strong>0</strong>
          <p>No applications yet.</p>
        </div>

        <div className="dashboard-info-card">
          <span>Saved</span>
          <strong>0</strong>
          <p>Save internships you like.</p>
        </div>

        <div className="dashboard-info-card">
          <span>Interviews</span>
          <strong>0</strong>
          <p>Your upcoming interviews.</p>
        </div>
      </div>
    </section>
  );
};

export default DashboardHome;