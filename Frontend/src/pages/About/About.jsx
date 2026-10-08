import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-page">
      <div className="about-hero">
        <span>ABOUT INTERNX</span>
        <h1>Connecting Talent With Opportunity</h1>
        <p>
          InternX is an internship platform that helps students discover
          meaningful opportunities and helps companies find talented interns.
        </p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make internship opportunities easier to discover,
            apply for, and manage. We want every student to get the right
            opportunity to start their professional journey.
          </p>
        </div>

        <div className="about-card">
          <h2>For Students</h2>
          <p>
            Students can explore internships by role, company, location and
            work type, view complete details and apply for opportunities.
          </p>
        </div>

        <div className="about-card">
          <h2>For Companies</h2>
          <p>
            Companies can create internship opportunities, manage applications
            and connect with talented students through InternX.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;