import React from "react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-glow hero-glow-one"></div>
      <div className="hero-glow hero-glow-two"></div>

      <div className="container hero-container">
        <div className="hero-content">

          <div className="hero-badge">
            <Sparkles size={15} />
            <span>Build Your Career With Confidence</span>
          </div>

          <h1>
            Find the Internship
            <span className="gradient-text"> That Builds Your Future.</span>
          </h1>

          <p>
            Discover meaningful internships from innovative companies,
            gain real-world experience, and take your first step toward
            an exciting career.
          </p>

          <div className="hero-actions">
            <Link to="/internships" className="hero-primary-btn">
              Explore Internships
              <ArrowRight size={18} />
            </Link>

            <Link to="/signup" className="hero-secondary-btn">
              Get Started
            </Link>
          </div>

          <div className="hero-search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search internships, roles, skills..."
            />
            <button type="button">Search</button>
          </div>

          <div className="hero-stats">
            <div>
              <strong>5K+</strong>
              <span>Internships</span>
            </div>

            <div>
              <strong>1.2K+</strong>
              <span>Companies</span>
            </div>

            <div>
              <strong>15K+</strong>
              <span>Students</span>
            </div>
          </div>

        </div>

        <div className="hero-visual">
          <div className="hero-card-main">
            <div className="hero-card-top">
              <span className="hero-card-dot"></span>
              <span>Featured Opportunity</span>
            </div>

            <div className="hero-company-icon">
              <Sparkles size={28} />
            </div>

            <h3>Frontend Developer Intern</h3>
            <p>TechNova Solutions</p>

            <div className="hero-card-info">
              <span>Remote</span>
              <span>₹15K / month</span>
            </div>

            <Link to="/internships" className="hero-card-btn">
              View Opportunity
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="hero-floating-card hero-floating-top">
            <span>✓</span>
            <div>
              <strong>10K+</strong>
              <small>Successful Careers</small>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-bottom">
            <span>★</span>
            <div>
              <strong>4.9/5</strong>
              <small>Student Rating</small>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;