import React from "react";
import { Link } from "react-router-dom";
import "./Resume.css";

const Resume = () => {
  return (
    <section className="student-page">
      <div className="student-page-heading">
        <div>
          <span>CAREER DOCUMENT</span>
          <h1>My Resume</h1>
          <p>Manage your resume for internship applications.</p>
        </div>
      </div>

      <div className="resume-card">
        <div className="resume-icon">
          📄
        </div>

        <h2>No resume uploaded</h2>

        <p>
          Upload your latest resume so companies can better
          understand your skills and experience.
        </p>

        <Link to="/dashboard/profile">
          Complete Profile
        </Link>
      </div>
    </section>
  );
};

export default Resume;