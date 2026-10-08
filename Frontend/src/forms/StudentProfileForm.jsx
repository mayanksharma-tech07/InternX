import React, { useState } from "react";

const StudentProfileForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    skills: "",
    bio: ""
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
    <form onSubmit={handleSubmit}>
      <h2>Student Profile</h2>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
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
        required
      />

      <input
        type="text"
        name="college"
        placeholder="College Name"
        value={formData.college}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="course"
        placeholder="Course"
        value={formData.course}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="skills"
        placeholder="Skills (React, Python, Django)"
        value={formData.skills}
        onChange={handleChange}
      />

      <textarea
        name="bio"
        placeholder="About Yourself"
        value={formData.bio}
        onChange={handleChange}
        rows="5"
      />

      <button type="submit">
        Save Profile
      </button>
    </form>
  );
};

export default StudentProfileForm;