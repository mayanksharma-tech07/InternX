import React, { useState } from "react";
import "./InternshipForm.css";

const InternshipForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    stipend: "",
    duration: "",
    skills: "",
    description: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit({
        ...formData,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      });
    }
  };

  return (
    <section className="internship-form-section">
      <div className="internship-form-card">
        <h1>Post Internship</h1>
        <p>Create a new internship opportunity.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Internship Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Work Type</option>
            <option value="Work From Office">Work From Office</option>
            <option value="Work From Home">Work From Home</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>

          <input
            type="text"
            name="stipend"
            placeholder="Stipend"
            value={formData.stipend}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (HTML, CSS, React)"
            value={formData.skills}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Internship Description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            required
          />

          <button type="submit">
            Post Internship
          </button>
        </form>
      </div>
    </section>
  );
};

export default InternshipForm;