import React, { useState } from "react";
import "./Contact.css";
import Toast from "../../components/Common/Toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });
  };

  const closeToast = () => {
    setToast({
      message: "",
      type: "success",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/contacts/",
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
          data.detail || "Message submission failed."
        );
      }

      showToast(
        "Your message has been sent successfully!",
        "success"
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact error:", error);

      showToast(
        error.message || "Something went wrong. Please try again.",
        "error"
      );
    }
  };

  return (
    <section className="contact-page">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={closeToast}
      />

      <div className="contact-heading">
        <span>GET IN TOUCH</span>

        <h1>Contact InternX</h1>

        <p>
          Have a question or need help? We would love to hear from you.
        </p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Let's Talk</h2>

          <p>
            Whether you are a student looking for an internship or a company
            looking for talented interns, feel free to contact us.
          </p>

          <div className="contact-item">
            <strong>📧 Email</strong>
            <span>support@internx.com</span>
          </div>

          <div className="contact-item">
            <strong>📞 Phone</strong>
            <span>+91 98765 43210</span>
          </div>

          <div className="contact-item">
            <strong>📍 Location</strong>
            <span>India</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
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
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

