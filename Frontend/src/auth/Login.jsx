
import React, { useState, useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingLogin, setCheckingLogin] = useState(true);

  // Check whether a user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("internxToken");

    if (!token) {
      setCheckingLogin(false);
      return;
    }

    // Verify the saved token with Django
    fetch("http://127.0.0.1:8000/api/auth/me/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then(async (response) => {
        if (response.ok) {
          const user = await response.json();
          localStorage.setItem("internxUser", JSON.stringify(user));
          navigate("/dashboard", { replace: true });
        } else {
          localStorage.removeItem("internxToken");
          localStorage.removeItem("internxUser");
          setCheckingLogin(false);
        }
      })
      .catch(() => {
        // Keep the saved session if the server is temporarily unreachable.
        setCheckingLogin(false);
      });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/auth/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Login failed. Please check your details."
        );
      }

      // Save the session until the user logs out
      localStorage.setItem("internxToken", data.token);
      localStorage.setItem("internxUser", JSON.stringify(data.user));

      // Replace Login history entry with Dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingLogin) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <p>Checking your session...</p>
        </div>
      </section>
    );
  }

  // If already logged in, don't show the Login form
  if (localStorage.getItem("internxToken")) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-info">
          <span className="auth-eyebrow">WELCOME BACK</span>
          <h1>
            Continue Your <span>Career Journey</span>
          </h1>
          <p>
            Login to explore internships and manage your applications.
          </p>

          <div className="auth-points">
            <div>✦ Explore internships</div>
            <div>✦ Track applications</div>
            <div>✦ Manage your profile</div>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <span>LOGIN</span>
            <h2>Welcome Back</h2>
            <p>Sign in to your InternX account.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-field">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>

            <div className="auth-field">
              <div className="password-label">
                <label htmlFor="login-password">Password</label>
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>

              <input
                id="login-password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="auth-switch">
            Don't have an account? <Link to="/signup">Create Account</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;