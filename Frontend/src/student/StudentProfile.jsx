import React from "react";
import { Link } from "react-router-dom";

const StudentProfile = () => {
  return (
    <section className="student-profile-page">
      <div className="profile-heading">
        <div>
          <span>MY PROFILE</span>
          <h1>Student Profile</h1>
          <p>Keep your profile updated for better opportunities.</p>
        </div>

        <Link to="/dashboard/settings">
          Settings
        </Link>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          👤
        </div>

        <div className="profile-details">
          <h2>Student Name</h2>
          <p>student@example.com</p>

          <div className="profile-info-grid">
            <div>
              <span>College</span>
              <strong>Not added</strong>
            </div>

            <div>
              <span>Course</span>
              <strong>Not added</strong>
            </div>

            <div>
              <span>Skills</span>
              <strong>Not added</strong>
            </div>

            <div>
              <span>Phone</span>
              <strong>Not added</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-resume-card">
        <div>
          <span>RESUME</span>
          <h2>Build your professional profile</h2>
          <p>
            Add your education, skills and resume to improve
            your internship opportunities.
          </p>
        </div>

        <Link to="/dashboard/settings">
          Update Profile
        </Link>
      </div>
    </section>
  );
};

export default StudentProfile;