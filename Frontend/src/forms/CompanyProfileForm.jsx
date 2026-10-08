import React, { useState } from "react";

const CompanyProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    industry: "",
    location: "",
    website: "",
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
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Company Profile</h2>

      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Company Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
      />

      <input
        type="text"
        name="industry"
        placeholder="Industry"
        value={formData.industry}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Company Location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <input
        type="url"
        name="website"
        placeholder="Company Website"
        value={formData.website}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Company Description"
        value={formData.description}
        onChange={handleChange}
        rows="5"
      />

      <button type="submit">
        Save Company Profile
      </button>
    </form>
  );
};

export default CompanyProfileForm;