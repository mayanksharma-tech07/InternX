
// frontend/src/forms/ApplicationForm.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../components/Common/Toast";
import "./ApplicationForm.css";

const API_BASE_URL = "https://internx-backend-kzn5.onrender.com";

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

  // Fetch internship details from Django backend
  useEffect(() => {
    const controller = new AbortController();

    const fetchInternship = async () => {
      setLoading(true);
      setError("");
      setInternship(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/internships/${id}/`,
          { signal: controller.signal }
        );

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          throw new Error(
            data?.detail ||
              data?.error ||
              "Internship not found. Please try again."
          );
        }

        // Handle an API that returns either one object
        // or an object containing the internship.
        const internshipData = data?.results
          ? data.results.find(
              (item) => String(item.id) === String(id)
            )
          : data?.internship || data;

        if (
          !internshipData ||
          String(internshipData.id) !== String(id)
        ) {
          throw new Error(
            "Internship not found for this ID."
          );
        }

        setInternship(internshipData);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Internship fetch error:", err);
        setError(
          err.message ||
            "Unable to load internship details."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchInternship();
    } else {
      setError("Internship ID is missing.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [id]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast({ message: "", type: "success" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit application to Django backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!internship) {
      showToast("Internship details are unavailable.", "error");
      return;
    }

    const token = localStorage.getItem("internxToken");

    if (!token) {
      showToast("Please login before applying.", "error");

      setTimeout(() => {
        navigate("/login");
      }, 2000);

      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/applications/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            internship: Number(id),
            name: formData.name.trim(),
            email: formData.email.trim(),
            contact: formData.contact.trim(),
            address: formData.address.trim(),
            resume: formData.resume.trim(),
            message: formData.message.trim(),
          }),
        }
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          data?.detail ||
          data?.error ||
          data?.non_field_errors?.[0] ||
          Object.entries(data || {})
            .map(([field, messages]) =>
              `${field}: ${
                Array.isArray(messages)
                  ? messages.join(", ")
                  : String(messages)
              }`
            )
            .join(" | ") ||
          `Application failed (${response.status}).`;

        throw new Error(errorMessage);
      }

      showToast(
        "Your application has been submitted successfully!",
        "success"
      );

      setFormData({
        name: "",
        email: "",
        contact: "",
        address: "",
        resume: "",
        message: "",
      });
    } catch (err) {
      console.error("Application submission error:", err);

      showToast(
        err.message ||
          "Unable to submit application. Please try again.",
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

  if (error || !internship) {
    return (
      <section className="application-not-found">
        <h2>Internship not found</h2>
        <p>{error || "Internship details are unavailable."}</p>

        <button
          type="button"
          onClick={() => navigate("/internships")}
        >
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
            Apply for <strong>{internship.title}</strong>
          </p>

          <div className="application-internship-info">
            <span>
              🏢{" "}
              {internship.company_name ||
                internship.company ||
                "Company"}
            </span>

            <span>📍 {internship.location || "Not specified"}</span>

            <span>
              ⏳ {internship.duration || "Not specified"}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="application-field">
            <label htmlFor="application-name">Full Name</label>
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
            <label htmlFor="application-address">Address</label>
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

