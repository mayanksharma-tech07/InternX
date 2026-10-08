import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyApplications.css";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = localStorage.getItem("internxToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/applications/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unable to fetch applications");
        }

        const data = await response.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Applications fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <section className="student-page">
      <div className="student-page-heading">
        <div>
          <span>APPLICATIONS</span>
          <h1>My Applications</h1>
          <p>Track the internships you have applied for.</p>
        </div>

        <Link to="/internships" className="student-page-btn">
          Find Internships
        </Link>
      </div>

      {loading ? (
        <div className="student-empty-card">
          <div>⏳</div>
          <h2>Loading applications...</h2>
          <p>Please wait while we fetch your applications.</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="student-empty-card">
          <div>📄</div>
          <h2>No applications yet</h2>
          <p>Your internship applications will appear here.</p>

          <Link to="/internships">
            Explore Internships
          </Link>
        </div>
      ) : (
        <div className="student-applications-list">
          {applications.map((application) => (
            <div
              className="application-history-card"
              key={application.id}
            >
              <div className="application-history-top">
                <div>
                  <span className="application-label">
                    APPLICATION
                  </span>

                  <h2>
                    {application.internship
                      ? `Internship #${application.internship}`
                      : "Internship Application"}
                  </h2>
                </div>

                <span className="application-status">
                  Submitted
                </span>
              </div>

              <div className="application-history-details">
                <div>
                  <span>Name</span>
                  <strong>{application.name}</strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{application.email}</strong>
                </div>

                <div>
                  <span>Contact</span>
                  <strong>{application.contact}</strong>
                </div>

                <div>
                  <span>Applied On</span>
                  <strong>
                    {application.applied_at
                      ? new Date(
                          application.applied_at
                        ).toLocaleDateString()
                      : "—"}
                  </strong>
                </div>
              </div>

              {application.message && (
                <div className="application-message">
                  <span>Message</span>
                  <p>{application.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MyApplications;

