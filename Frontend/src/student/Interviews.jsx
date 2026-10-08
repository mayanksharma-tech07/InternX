import React from "react";

const Interviews = () => {
  const interviews = [];

  return (
    <section className="student-page">
      <div className="student-page-heading">
        <div>
          <span>INTERVIEWS</span>
          <h1>My Interviews</h1>
          <p>Stay updated with your upcoming interviews.</p>
        </div>
      </div>

      {interviews.length === 0 ? (
        <div className="student-empty-card">
          <div>🎯</div>
          <h2>No interviews scheduled</h2>
          <p>
            Interview details will appear here when a company
            schedules an interview.
          </p>
        </div>
      ) : (
        <div className="student-list">
          {interviews.map((interview) => (
            <div key={interview.id}>
              {interview.company}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Interviews;