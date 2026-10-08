import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import InternshipCard from "../../components/InternshipCard/InternshipCard";
import SearchBar from "../../components/SearchBar/SearchBar";

import internships from "../../data/internships";
import companies from "../../data/companies";
import categories from "../../data/categories";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleViewMore = (internship) => {
    navigate(`/internship-details/${internship.id}`);
  };

  const handleApply = (internship) => {
    navigate(`/apply/${internship.id}`);
  };

  const filteredInternships = internships.filter((internship) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      internship.title.toLowerCase().includes(search) ||
      internship.company.toLowerCase().includes(search) ||
      internship.location.toLowerCase().includes(search) ||
      internship.type.toLowerCase().includes(search)
    );
  });

  return (
    <section className="internship-section">
      <div className="section-heading">
        <span>EXPLORE OPPORTUNITIES</span>

        <h2>Latest Internship Opportunities</h2>

        <p>
          Find the right internship and start building your career.
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="internship-grid">
        {filteredInternships.length > 0 ? (
          filteredInternships.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
              onViewMore={handleViewMore}
              onApply={handleApply}
            />
          ))
        ) : (
          <p className="no-result">
            No internships found.
          </p>
        )}
      </div>

      <div className="home-data-info">
        <p>
          Explore internships from {companies.length} companies
          across {categories.length} career categories.
        </p>
      </div>
    </section>
  );
};

export default Home;