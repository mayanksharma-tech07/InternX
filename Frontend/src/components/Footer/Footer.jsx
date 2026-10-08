import React from "react";
import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="logo-mark">
              <BriefcaseBusiness size={20} />
            </span>
            <span>Intern<span>X</span></span>
          </Link>

          <p>
            Discover meaningful internships, connect with
            great companies, and start building your career.
          </p>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <Link to="/internships">Internships</Link>
          <Link to="/companies">Companies</Link>
          <Link to="/about">About Us</Link>
          <Link to="/how-it-works">How It Works</Link>
        </div>

        <div className="footer-links">
          <h4>For Students</h4>
          <Link to="/signup">Create Account</Link>
          <Link to="/login">Login</Link>
          <Link to="/internships">Find Internship</Link>
          <Link to="/contact">Support</Link>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>

          <p>
            <Mail size={16} />
            hello@internx.com
          </p>

          <p>
            <Phone size={16} />
            +91 98765 43210
          </p>

          <p>
            <MapPin size={16} />
            India
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 InternX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;