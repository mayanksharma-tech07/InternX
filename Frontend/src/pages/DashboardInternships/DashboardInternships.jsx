import React, { useEffect, useState } from "react";
import "./DashboardInternships.css";

const API_URL = "http://127.0.0.1:8000/api";

const emptyForm = {
  company: "",
  title: "",
  description: "",
  location: "",
  duration: "",
  technology: "",
  stipend: "",
  contact: "",
  rating: 0,
};

const DashboardInternships = () => {
  const [internships, setInternships] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState(emptyForm);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("internxToken");

  const headers = {
    Authorization: `Token ${token}`,
    "Content-Type": "application/json",
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [internshipResponse, companyResponse] =
        await Promise.all([
          fetch(`${API_URL}/internships/`),
          fetch(`${API_URL}/companies/`),
        ]);

      if (!internshipResponse.ok || !companyResponse.ok) {
        throw new Error("Data load nahi ho pa raha.");
      }

      const internshipData = await internshipResponse.json();
      const companyData = await companyResponse.json();

      setInternships(
        Array.isArray(internshipData)
          ? internshipData
          : internshipData.results || []
      );

      setCompanies(
        Array.isArray(companyData)
          ? companyData
          : companyData.results || []
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openEditForm = (internship) => {
    setEditingId(internship.id);

    setFormData({
      company: internship.company || "",
      title: internship.title || "",
      description: internship.description || "",
      location: internship.location || "",
      duration: internship.duration || "",
      technology: internship.technology || "",
      stipend: internship.stipend || "",
      contact: internship.contact || "",
      rating: internship.rating ?? 0,
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

    if (!formData.company) {
      setError("Please select a company.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Internship title required hai.");
      return;
    }

    if (!formData.location.trim()) {
      setError("Location required hai.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        ...formData,
        company: Number(formData.company),
        rating: Number(formData.rating) || 0,
      };

      const url = editingId
        ? `${API_URL}/internships/${editingId}/`
        : `${API_URL}/internships/`;

      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        throw new Error(
          data?.detail || "Internship save nahi ho paayi."
        );
      }

      closeForm();
      await loadData();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Kya aap is internship ko delete karna chahte hain?"
    );

    if (!confirmed) return;

    try {
      setError("");

      const response = await fetch(
        `${API_URL}/internships/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Internship delete nahi ho paayi."
        );
      }

      if (editingId === id) {
        closeForm();
      }

      await loadData();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const filteredInternships = internships.filter((item) => {
    const value = search.toLowerCase();

    return (
      item.title?.toLowerCase().includes(value) ||
      item.location?.toLowerCase().includes(value) ||
      item.technology?.toLowerCase().includes(value) ||
      item.company_name?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="dashboard-internships-page">

      {/* HEADER */}

      <div className="dashboard-internships-header">
        <div>
          <span className="dashboard-internships-eyebrow">
            ADMIN PANEL
          </span>

          <h1>Manage Internships</h1>

          <p>
            Create, update and manage internship
            opportunities.
          </p>
        </div>

        <button
          className="dashboard-internship-add-btn"
          onClick={openAddForm}
        >
          + Add Internship
        </button>
      </div>

      {error && (
        <div className="dashboard-internship-error">
          {error}
        </div>
      )}

      {/* FORM */}

      {showForm && (
        <div className="dashboard-internship-form-card">

          <div className="dashboard-internship-form-heading">
            <div>
              <span>
                {editingId
                  ? "UPDATE INTERNSHIP"
                  : "NEW INTERNSHIP"}
              </span>

              <h2>
                {editingId
                  ? "Edit Internship"
                  : "Add New Internship"}
              </h2>
            </div>

            <button
              type="button"
              className="dashboard-internship-close"
              onClick={closeForm}
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="dashboard-internship-form-grid">

              <label>
                Company
                <select
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Company
                  </option>

                  {companies.map((company) => (
                    <option
                      key={company.id}
                      value={company.id}
                    >
                      {company.name}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Internship Title
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. React Developer Intern"
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
                Duration
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 3 Months"
                />
              </label>

              <label>
                Technology
                <input
                  type="text"
                  name="technology"
                  value={formData.technology}
                  onChange={handleChange}
                  placeholder="e.g. React, JavaScript"
                />
              </label>

              <label>
                Stipend
                <input
                  type="text"
                  name="stipend"
                  value={formData.stipend}
                  onChange={handleChange}
                  placeholder="e.g. ₹10,000 / Month"
                />
              </label>

              <label>
                Contact
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Email or phone"
                />
              </label>

              <label>
                Rating
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="4.5"
                />
              </label>

              <label className="dashboard-internship-full">
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Write internship description..."
                  rows="5"
                />
              </label>

            </div>

            <div className="dashboard-internship-form-actions">

              <button
                type="button"
                className="dashboard-internship-cancel"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="dashboard-internship-save"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Internship"
                  : "Save Internship"}
              </button>

            </div>

          </form>
        </div>
      )}

      {/* TOOLBAR */}

      <div className="dashboard-internship-toolbar">
        <div>
          <h2>Internship Records</h2>

          <span>
            {internships.length} internships available
          </span>
        </div>

        <input
          type="text"
          className="dashboard-internship-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search internship..."
        />
      </div>

      {/* LIST */}

      {loading ? (
        <div className="dashboard-internship-empty">
          Loading internships...
        </div>
      ) : filteredInternships.length === 0 ? (
        <div className="dashboard-internship-empty">
          <div>⌕</div>

          <h3>No internships found</h3>

          <p>
            Add an internship or try another search.
          </p>
        </div>
      ) : (
        <div className="dashboard-internship-grid">

          {filteredInternships.map((internship) => (
            <div
              className="dashboard-internship-card"
              key={internship.id}
            >

              <div className="dashboard-internship-card-top">

                <div className="dashboard-internship-icon">
                  💼
                </div>

                <div>
                  <h3>{internship.title}</h3>

                  <span>
                    {internship.company_name ||
                      `Company #${internship.company}`}
                  </span>
                </div>

              </div>

              <div className="dashboard-internship-info">

                <p>
                  <strong>Location</strong>
                  {internship.location || "Not available"}
                </p>

                <p>
                  <strong>Duration</strong>
                  {internship.duration || "Not available"}
                </p>

                <p>
                  <strong>Technology</strong>
                  {internship.technology || "Not available"}
                </p>

                <p>
                  <strong>Rating</strong>
                  ⭐ {internship.rating ?? 0}
                </p>

              </div>

              <p className="dashboard-internship-description">
                {internship.description ||
                  "No internship description available."}
              </p>

              <div className="dashboard-internship-meta">
                <span>
                  {internship.stipend || "Stipend not specified"}
                </span>

                <span>
                  {internship.contact || "No contact"}
                </span>
              </div>

              <div className="dashboard-internship-actions">

                <button
                  className="dashboard-internship-edit"
                  onClick={() =>
                    openEditForm(internship)
                  }
                >
                  Edit
                </button>

                <button
                  className="dashboard-internship-delete"
                  onClick={() =>
                    handleDelete(internship.id)
                  }
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

export default DashboardInternships;