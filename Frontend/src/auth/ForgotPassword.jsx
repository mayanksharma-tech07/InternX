import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setMessage(
      "Email verified successfully. You can now reset your password."
    );

    setTimeout(() => {
      navigate("/reset-password");
    }, 1000);
  };

  return (
    <section className="forgot-page">
      <div className="forgot-card">

        <div className="forgot-icon">🔐</div>

        <span className="forgot-eyebrow">
          ACCOUNT RECOVERY
        </span>

        <h1>Forgot Password?</h1>

        <p>
          Enter your registered email address and we'll help
          you reset your password.
        </p>

        {error && (
          <div className="forgot-error">
            {error}
          </div>
        )}

        {message && (
          <div className="forgot-success">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">
            Continue
          </button>

        </form>

        <Link to="/login" className="forgot-back">
          ← Back to Login
        </Link>

      </div>
    </section>
  );
};

export default ForgotPassword;