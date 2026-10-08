
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const detail = data.email?.[0] || data.password?.[0] ||
          data.username?.[0] || data.detail || "Signup failed.";
        throw new Error(detail);
      }

      navigate("/login");
    } catch (err) {
      setError(err.message || "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup-page">
      <div className="signup-container">
        <div className="signup-info">
          <span>START YOUR JOURNEY</span>
          <h1>Build Your <strong>Future With InternX</strong></h1>
          <p>Create your account and discover internship opportunities.</p>
        </div>

        <div className="signup-card">
          <div className="signup-heading">
            <span>CREATE ACCOUNT</span>
            <h2>Join InternX</h2>
            <p>Enter your details to get started.</p>
          </div>

          {error && <div className="signup-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="signup-field">
              <label>Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange}
                placeholder="Enter your full name" required />
            </div>

            <div className="signup-field">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email}
                onChange={handleChange} placeholder="Enter your email" required />
            </div>

            <div className="signup-field">
              <label>Contact Number</label>
              <input type="tel" name="contact" value={formData.contact}
                onChange={handleChange} placeholder="Enter contact number" required />
            </div>

            <div className="signup-field">
              <label>Password (minimum 8 characters)</label>
              <input type="password" name="password" value={formData.password}
                onChange={handleChange} minLength={8}
                placeholder="Create password" required />
            </div>

            <div className="signup-field">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword"
                value={formData.confirmPassword} onChange={handleChange}
                placeholder="Confirm password" required />
            </div>

            <button type="submit" className="signup-submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="signup-login">
            Already have an account? <Link to="/login"> Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;