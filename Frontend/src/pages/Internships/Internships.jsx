import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Internships.css";

import InternshipCard from "../../components/InternshipCard/InternshipCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterPanel from "../../components/FilterPanel/FilterPanel";

import internships from "../../data/internships";

const Internships = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const filteredInternships = internships.filter((internship) => {
    const search = searchTerm.toLowerCase();
    const locationSearch = location.toLowerCase();

    const matchesSearch =
      internship.title.toLowerCase().includes(search) ||
      internship.company.toLowerCase().includes(search) ||
      internship.location.toLowerCase().includes(search);

    const matchesLocation =
      internship.location.toLowerCase().includes(locationSearch);

    const matchesType =
      !type || internship.type.toLowerCase() === type.toLowerCase();

    const matchesCategory =
      !category ||
      internship.title.toLowerCase().includes(category.toLowerCase()) ||
      internship.skills.some((skill) =>
        skill.toLowerCase().includes(category.toLowerCase())
      );

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesCategory
    );
  });

  const handleViewMore = (internship) => {
    navigate(`/internship-details/${internship.id}`);
  };

  const handleApply = (internship) => {
    navigate(`/apply/${internship.id}`);
  };

  return (
    <section className="internships-page">
      <div className="internships-heading">
        <span>EXPLORE OPPORTUNITIES</span>

        <h1>Find Your Perfect Internship</h1>

        <p>
          Discover internships from companies across different fields.
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <FilterPanel
        location={location}
        setLocation={setLocation}
        type={type}
        setType={setType}
        category={category}
        setCategory={setCategory}
      />

      <div className="internships-results">
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
          <p className="internships-no-result">
            No internships found.
          </p>
        )}
      </div>
    </section>
  );
};

export default Internships;