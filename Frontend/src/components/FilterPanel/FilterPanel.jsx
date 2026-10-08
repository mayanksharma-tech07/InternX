import React from "react";
import "./FilterPanel.css";

const FilterPanel = ({
  location,
  setLocation,
  type,
  setType,
  category,
  setCategory
}) => {
  const clearFilters = () => {
    setLocation("");
    setType("");
    setCategory("");
  };

  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label>Location</label>

        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Work Type</label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Work From Office">Work From Office</option>
          <option value="Work From Home">Work From Home</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Web Development">Web Development</option>
          <option value="Software Development">
            Software Development
          </option>
          <option value="Frontend Development">
            Frontend Development
          </option>
          <option value="Backend Development">
            Backend Development
          </option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Data & Analytics">Data & Analytics</option>
          <option value="Mobile Development">
            Mobile Development
          </option>
          <option value="Cloud & DevOps">Cloud & DevOps</option>
        </select>
      </div>

      <button
        className="clear-filter-btn"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterPanel;