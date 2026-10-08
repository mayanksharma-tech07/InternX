import React from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyCard.css";

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  const handleViewCompany = () => {
    navigate("/company-details", {
      state: {
        company: company
      }
    });
  };

  return (
    <div className="company-card">
      <div className="company-card-logo">
        {company.logo}
      </div>

      <div className="company-card-content">
        <h3>{company.name}</h3>

        <p className="company-industry">
          {company.industry}
        </p>

        <div className="company-card-info">
          <span>📍 {company.location}</span>
          <span>💼 {company.internships} Internships</span>
        </div>

        <p className="company-description">
          {company.description}
        </p>

        <button
          className="company-view-btn"
          onClick={handleViewCompany}
        >
          View Company
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;