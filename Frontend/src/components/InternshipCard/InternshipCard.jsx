import React from "react";
import "./InternshipCard.css";

const InternshipCard = ({ internship, onViewMore, onApply }) => {
  return (
    <div className="internship-card">

      <div className="company-logo">
        {internship.logo}
      </div>

      <div className="internship-content">
        <h3>{internship.title}</h3>

        <p className="company-name">
          {internship.company}
        </p>

        <div className="internship-info">
          <span>📍 {internship.location}</span>
          <span>💼 {internship.type}</span>
        </div>

        <div className="internship-footer">
          <span className="stipend">
            {internship.stipend}
          </span>

          <div className="card-buttons">
            <button
              className="view-btn"
              onClick={() => onViewMore(internship)}
            >
              View More
            </button>

            <button
              className="apply-btn"
              onClick={() => onApply(internship)}
            >
              Apply
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default InternshipCard;