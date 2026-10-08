import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./InternshipDetails.css";

import internships from "../../data/internships";

const InternshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const internship = internships.find(
    (item) => String(item.id) === String(id)
  );

  if (!internship) {
    return (
      <div className="details-not-found">
        <h2>Internship not found</h2>

        <button onClick={() => navigate("/internships")}>
          Back to Internships
        </button>
      </div>
    );
  }

  const handleApply = () => {
    navigate(`/apply/${internship.id}`);
  };

  return (
    <section className="internship-details">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="details-card">
        <div className="details-header">
          <div className="details-logo">
            {internship.logo}
          </div>

          <div>
            <h1>{internship.title}</h1>
            <p>{internship.company}</p>
          </div>
        </div>

        <div className="details-info">
          <div>
            <span>📍 Location</span>
            <strong>{internship.location}</strong>
          </div>

          <div>
            <span>💼 Type</span>
            <strong>{internship.type}</strong>
          </div>

          <div>
            <span>💰 Stipend</span>
            <strong>{internship.stipend}</strong>
          </div>

          <div>
            <span>⏳ Duration</span>
            <strong>{internship.duration}</strong>
          </div>
        </div>

        <div className="details-description">
          <h2>About this Internship</h2>

          <p>{internship.description}</p>
        </div>

        <div className="skills-section">
          <h2>Required Skills</h2>

          <div className="skills-list">
            {internship.skills.map((skill, index) => (
              <span key={index}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <button
          className="details-apply-btn"
          onClick={handleApply}
        >
          Apply Now
        </button> 
      </div>
    </section>
  );
};

export default InternshipDetails;