import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CompanyDetails.css";

const CompanyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const company = location.state?.company;

  if (!company) {
    return (
      <div className="company-not-found">
        <h2>Company not found</h2>

        <button onClick={() => navigate("/companies")}>
          Back to Companies
        </button>
      </div>
    );
  }

  return (
    <section className="company-details-page">
      <button
        className="company-back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="company-details-card">
        <div className="company-details-header">
          <div className="company-details-logo">
            {company.logo}
          </div>

          <div>
            <h1>{company.name}</h1>
            <p>{company.industry}</p>
          </div>
        </div>

        <div className="company-details-info">
          <div>
            <span>📍 Location</span>
            <strong>{company.location}</strong>
          </div>

          <div>
            <span>💼 Internships</span>
            <strong>{company.internships}</strong>
          </div>
        </div>

        <div className="company-about">
          <h2>About Company</h2>
          <p>{company.description}</p>
        </div>

        <button
          className="company-internship-btn"
          onClick={() => navigate("/internships")}
        >
          View Internships
        </button>
      </div>
    </section>
  );
};

export default CompanyDetails;