import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description:
        "Sign up on InternX and create your student or company account."
    },
    {
      number: "02",
      title: "Explore Internships",
      description:
        "Search internships by role, company, location and work type."
    },
    {
      number: "03",
      title: "Check Details",
      description:
        "View internship details, required skills, stipend and duration."
    },
    {
      number: "04",
      title: "Apply",
      description:
        "Submit your application directly for the internship you want."
    },
    {
      number: "05",
      title: "Track Application",
      description:
        "Keep track of your applications and interview updates."
    }
  ];

  return (
    <section className="how-it-works-page">
      <div className="how-heading">
        <span>HOW INTERNX WORKS</span>
        <h1>Start Your Internship Journey</h1>
        <p>
          Finding and applying for internships is simple with InternX.
        </p>
      </div>

      <div className="steps-container">
        {steps.map((step) => (
          <div className="step-card" key={step.number}>
            <div className="step-number">
              {step.number}
            </div>

            <h2>{step.title}</h2>

            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;