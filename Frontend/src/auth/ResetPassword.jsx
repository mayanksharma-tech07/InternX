import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill both password fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSuccess("Password reset successfully.");

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <section className="reset-page">
      <div className="reset-card">

        <div className="reset-icon">🔑</div>

        <span className="reset-eyebrow">
          CREATE NEW PASSWORD
        </span>

        <h1>Reset Password</h1>

        <p>
          Create a new secure password for your InternX account.
        </p>

        {error && (
          <div className="reset-error">
            {error}
          </div>
        )}

        {success && (
          <div className="reset-success">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="reset-field">
            <label>New Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="reset-field">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button type="submit">
            Reset Password
          </button>

        </form>

        <Link to="/login" className="reset-back">
          ← Back to Login
        </Link>

      </div>
    </section>
  );
};

export default ResetPassword;