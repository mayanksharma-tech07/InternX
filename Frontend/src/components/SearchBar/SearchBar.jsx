import React from "react";
import "./SearchBar.css";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-container">

      <div className="search-box">
        <span className="search-icon">🔍</span>

        <input
          type="text"
          placeholder="Search by role, company or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchTerm && (
          <button
            className="clear-search"
            onClick={() => setSearchTerm("")}
          >
            ✕
          </button>
        )}
      </div>

    </div>
  );
};

export default SearchBar;