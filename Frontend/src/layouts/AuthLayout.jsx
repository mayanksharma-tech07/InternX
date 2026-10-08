import React from "react";
import { Outlet, Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import "./AuthLayout.css";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-brand">
        <Link to="/" className="auth-logo">
          <span className="auth-logo-mark">
            <BriefcaseBusiness size={21} />
          </span>

          <span className="auth-logo-text">
            Intern<span>X</span>
          </span>
        </Link>

        <p>Find internships. Build your career.</p>
      </div>

      <main className="auth-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;