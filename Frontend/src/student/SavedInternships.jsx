import React from "react";
import { Link } from "react-router-dom";

const SavedInternships = () => {
  const savedInternships = [];

  return (
    <section className="student-page">
      <div className="student-page-heading">
        <div>
          <span>SAVED</span>
          <h1>Saved Internships</h1>
          <p>Keep track of opportunities you want to explore.</p>
        </div>
      </div>

      {savedInternships.length === 0 ? (
        <div className="student-empty-card">
          <div>🔖</div>
          <h2>No saved internships</h2>
          <p>
            Save interesting internships and find them here later.
          </p>

          <Link to="/internships">
            Browse Internships
          </Link>
        </div>
      ) : (
        <div className="student-list">
          {savedInternships.map((internship) => (
            <div key={internship.id}>
              {internship.title}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SavedInternships;