import React, { useEffect, useState } from "react";
import "./Companies.css";

import CompanyCard from "../../components/CompanyCard/CompanyCard";
import api from "../../services/api";

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCompanies = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await api.get("/companies/");

      setCompanies(
        Array.isArray(data)
          ? data
          : data.results || []
      );
    } catch (err) {
      console.error("Error loading companies:", err);

      setError(
        "Companies load nahi hui. Django server check karein."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const search = searchTerm.toLowerCase().trim();

  const filteredCompanies = companies.filter((company) =>
    [
      company.name,
      company.industry,
      company.location,
    ].some((value) =>
      (value || "").toLowerCase().includes(search)
    )
  );

  if (loading) {
    return (
      <section className="companies-page">
        <div className="companies-loading">
          <span>⏳</span>

          <h3>Loading Companies...</h3>

          <p>
            Please wait while we fetch the latest companies.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="companies-page">

      {/* =========================
          HERO SECTION
      ========================= */}

      <div className="companies-hero">

        <div className="companies-hero-content">

          <span className="companies-eyebrow">
            DISCOVER YOUR NEXT OPPORTUNITY
          </span>

          <h1>
            Meet the Companies
            <br />
            <span>Building Your Future</span>
          </h1>

          <p>
            Explore technology teams, discover different
            career paths, and find internship opportunities
            that match your interests.
          </p>

          <div className="companies-hero-tags">
            <span>✦ Technology</span>
            <span>✦ Design</span>
            <span>✦ Data & AI</span>
            <span>✦ Remote Opportunities</span>
          </div>

        </div>


        <div
          className="companies-hero-visual"
          aria-hidden="true"
        >

          <div className="companies-orbit companies-orbit-one"></div>

          <div className="companies-orbit companies-orbit-two"></div>

          <div className="companies-hero-center">
            ✦
          </div>

          <div className="companies-float-icon companies-icon-one">
            💻
          </div>

          <div className="companies-float-icon companies-icon-two">
            🚀
          </div>

          <div className="companies-float-icon companies-icon-three">
            🤖
          </div>

          <div className="companies-float-icon companies-icon-four">
            🎨
          </div>

        </div>

      </div>


      {/* =========================
          OVERVIEW
      ========================= */}

      <div className="companies-overview">

        <div className="companies-overview-item">

          <span className="companies-overview-icon">
            🏢
          </span>

          <div>
            <strong>
              {companies.length}+
            </strong>

            <span>
              Companies
            </span>
          </div>

        </div>


        <div className="companies-overview-item">

          <span className="companies-overview-icon">
            💼
          </span>

          <div>

            <strong>
              {companies.reduce(
                (total, company) =>
                  total +
                  Number(company.internships || 0),
                0
              )}
              +
            </strong>

            <span>
              Internship Listings
            </span>

          </div>

        </div>


        <div className="companies-overview-item">

          <span className="companies-overview-icon">
            🌐
          </span>

          <div>

            <strong>
              Multiple
            </strong>

            <span>
              Career Fields
            </span>

          </div>

        </div>

      </div>


      {/* =========================
          COMPANIES LIST
      ========================= */}

      <div className="companies-list-section">

        <div className="companies-section-heading">

          <div>

            <span className="companies-eyebrow">
              YOUR CAREER STARTS HERE
            </span>

            <h2>
              Explore Companies
            </h2>

            <p>
              Find a company by name, industry, or location.
            </p>

          </div>


          <div className="companies-result-count">
            {filteredCompanies.length}{" "}
            {filteredCompanies.length === 1
              ? "company"
              : "companies"}
          </div>

        </div>


        {/* =========================
            ERROR
        ========================= */}

        {error && (
          <div
            className="companies-error"
            role="alert"
          >
            {error}
          </div>
        )}


        {/* =========================
            SEARCH
        ========================= */}

        <div className="companies-search">

          <span
            className="companies-search-icon"
            aria-hidden="true"
          >
            ⌕
          </span>

          <input
            type="search"
            placeholder="Search company, industry or location..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            aria-label="Search companies"
          />

          {searchTerm && (
            <button
              type="button"
              className="companies-clear-search"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

        </div>


        {/* =========================
            COMPANY CARDS
        ========================= */}

        {filteredCompanies.length > 0 ? (

          <div className="companies-grid">

            {filteredCompanies.map((company) => (

              <CompanyCard
                key={company.id}
                company={company}
              />

            ))}

          </div>

        ) : (

          <div className="companies-empty">

            <span>🔎</span>

            <h3>
              No companies found
            </h3>

            <p>
              Try searching with another company
              name, industry, or location.
            </p>

            <button
              type="button"
              onClick={() => setSearchTerm("")}
            >
              Show All Companies
            </button>

          </div>

        )}


        <p className="companies-demo-note">
          Company records are loaded from the Django backend.
        </p>

      </div>

    </section>
  );
};

export default Companies;