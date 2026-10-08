import React, { useEffect, useState } from "react";
import "./DashboardCompanies.css";
import api from "../../services/api";

const emptyForm = {
  name: "",
  industry: "",
  location: "",
  description: "",
  website: "",
  logo: "",
  internships: 0,
};

const DashboardCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("internxToken");

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.get("/companies/");
      setCompanies(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error(err);
      setError("Companies load nahi ho pa rahi hain.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (company) => {
    setEditingId(company.id);

    setFormData({
      name: company.name || "",
      industry: company.industry || "",
      location: company.location || "",
      description: company.description || "",
      website: company.website || "",
      logo: company.logo || "",
      internships: company.internships ?? 0,
    });

    setShowForm(true);
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Company name required hai.");
      return;
    }

    if (!formData.industry.trim()) {
      setError("Industry required hai.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location required hai.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const headers = {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      };

      const payload = {
        ...formData,
        internships: Number(formData.internships) || 0,
      };

      let response;

      if (editingId) {
        response = await fetch(
          `http://127.0.0.1:8000/api/companies/${editingId}/`,
          {
            method: "PUT",
            headers,
            body: JSON.stringify(payload),
          }
        );
      } else {
        response = await fetch(
          "http://127.0.0.1:8000/api/companies/",
          {
            method: "POST",
            headers,
            body: JSON.stringify(payload),
          }
        );
      }

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        throw new Error(
          data?.detail ||
            "Company save nahi ho paayi."
        );
      }

      closeForm();
      await loadCompanies();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Kya aap is company ko delete karna chahte hain?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(
        `http://127.0.0.1:8000/api/companies/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Company delete nahi ho paayi.");
      }

      if (editingId === id) {
        closeForm();
      }

      await loadCompanies();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const value = search.toLowerCase();

    return (
      company.name?.toLowerCase().includes(value) ||
      company.industry?.toLowerCase().includes(value) ||
      company.location?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="dashboard-companies-page">
      <div className="dashboard-companies-header">
        <div>
          <span className="dashboard-companies-eyebrow">
            ADMIN PANEL
          </span>

          <h1>Manage Companies</h1>

          <p>
            Add, update and manage internship companies
            from your dashboard.
          </p>
        </div>

        <button
          className="dashboard-company-add-btn"
          onClick={openAddForm}
        >
          + Add Company
        </button>
      </div>

      {error && (
        <div className="dashboard-company-error">
          {error}
        </div>
      )}

      {showForm && (
        <div className="dashboard-company-form-card">
          <div className="dashboard-company-form-heading">
            <div>
              <span>
                {editingId ? "UPDATE COMPANY" : "NEW COMPANY"}
              </span>

              <h2>
                {editingId
                  ? "Edit Company"
                  : "Add New Company"}
              </h2>
            </div>

            <button
              type="button"
              className="dashboard-company-close"
              onClick={closeForm}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="dashboard-company-form-grid">
              <label>
                Company Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                />
              </label>

              <label>
                Industry
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  placeholder="e.g. Information Technology"
                />
              </label>

              <label>
                Location
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Raipur, India"
                />
              </label>

              <label>
                Website
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </label>

              <label>
                Logo / Icon
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="e.g. 💻"
                />
              </label>

              <label>
                Internships
                <input
                  type="number"
                  min="0"
                  name="internships"
                  value={formData.internships}
                  onChange={handleChange}
                  placeholder="0"
                />
              </label>

              <label className="dashboard-company-full">
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write company description..."
                  rows="5"
                />
              </label>
            </div>

            <div className="dashboard-company-form-actions">
              <button
                type="button"
                className="dashboard-company-cancel"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="dashboard-company-save"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Company"
                  : "Save Company"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="dashboard-company-toolbar">
        <div>
          <h2>Company Records</h2>
          <span>
            {companies.length} companies available
          </span>
        </div>

        <input
          type="text"
          className="dashboard-company-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company..."
        />
      </div>

      {loading ? (
        <div className="dashboard-company-empty">
          Loading companies...
        </div>
      ) : filteredCompanies.length === 0 ? (
        <div className="dashboard-company-empty">
          <div>⌕</div>
          <h3>No companies found</h3>
          <p>
            Add a company or try another search.
          </p>
        </div>
      ) : (
        <div className="dashboard-company-grid">
          {filteredCompanies.map((company) => (
            <div
              className="dashboard-company-card"
              key={company.id}
            >
              <div className="dashboard-company-card-top">
                <div className="dashboard-company-logo">
                  {company.logo || "🏢"}
                </div>

                <div>
                  <h3>{company.name}</h3>
                  <span>{company.industry}</span>
                </div>
              </div>

              <div className="dashboard-company-info">
                <p>
                  <strong>Location</strong>
                  {company.location || "Not available"}
                </p>

                <p>
                  <strong>Internships</strong>
                  {company.internships ?? 0}
                </p>
              </div>

              <p className="dashboard-company-description">
                {company.description ||
                  "No company description available."}
              </p>

              <div className="dashboard-company-actions">
                <button
                  className="dashboard-company-edit"
                  onClick={() => openEditForm(company)}
                >
                  Edit
                </button>

                <button
                  className="dashboard-company-delete"
                  onClick={() => handleDelete(company.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardCompanies;