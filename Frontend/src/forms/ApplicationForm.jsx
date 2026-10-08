import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../components/Common/Toast";
import "./ApplicationForm.css";

const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    resume: "",
    message: "",
  });

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/internships/${id}/`
        );

        if (!response.ok) {
          throw new Error("Internship not found");
        }

        const data = await response.json();
        setInternship(data);
      } catch (err) {
        console.error("Internship fetch error:", err);
        setError("Unable to load internship details.");
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id]);

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });
  };

  const closeToast = () => {
    setToast({
      message: "",
      type: "success",
    });
  };

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("internxToken");

    if (!token) {
      showToast("Please login before applying.", "error");

      setTimeout(() => {
        navigate("/login");
      }, 3500);

      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/applications/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            internship: Number(id),
            name: formData.name,
            email: formData.email,
            contact: formData.contact,
            address: formData.address,
            resume: formData.resume,
            message: formData.message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            data.non_field_errors?.[0] ||
            "Application submission failed."
        );
      }

      // Application successfully saved in Django database
      showToast(
        "Your application has been submitted successfully!",
        "success"
      );

      // Form clear kar denge, page par hi rahenge
      setFormData({
        name: "",
        email: "",
        contact: "",
        address: "",
        resume: "",
        message: "",
      });
    } catch (err) {
      console.error("Application error:", err);

      showToast(
        err.message || "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="application-section">
        <div className="application-card">
          <p>Loading internship...</p>
        </div>
      </section>
    );
  }

  if (error && !internship) {
    return (
      <section className="application-not-found">
        <h2>Internship not found</h2>
        <p>{error}</p>

        <button onClick={() => navigate("/internships")}>
          Back to Internships
        </button>
      </section>
    );
  }

  return (
    <section className="application-section">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />

      <div className="application-card">
        <button
          type="button"
          className="application-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="application-heading">
          <span>INTERNSHIP APPLICATION</span>

          <h1>Apply for Internship</h1>

          <p>
            Apply for <strong>{internship?.title}</strong>
          </p>

          <div className="application-internship-info">
            <span>🏢 {internship?.company_name}</span>
            <span>📍 {internship?.location}</span>
            <span>⏳ {internship?.duration}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="application-field">
            <label htmlFor="application-name">
              Full Name
            </label>

            <input
              id="application-name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="application-field">
            <label htmlFor="application-email">
              Email Address
            </label>

            <input
              id="application-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="application-field">
            <label htmlFor="application-contact">
              Contact Number
            </label>

            <input
              id="application-contact"
              type="tel"
              name="contact"
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>

          <div className="application-field">
            <label htmlFor="application-address">
              Address
            </label>

            <textarea
              id="application-address"
              name="address"
              placeholder="Enter your address"
              rows="4"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="application-field">
            <label htmlFor="application-resume">
              Resume Link <small>(Optional)</small>
            </label>

            <input
              id="application-resume"
              type="url"
              name="resume"
              placeholder="https://example.com/resume"
              value={formData.resume}
              onChange={handleChange}
            />
          </div>

          <div className="application-field">
            <label htmlFor="application-message">
              Additional Message <small>(Optional)</small>
            </label>

            <textarea
              id="application-message"
              name="message"
              placeholder="Write a short message..."
              rows="4"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="application-submit"
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "Submit Application"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ApplicationForm;

