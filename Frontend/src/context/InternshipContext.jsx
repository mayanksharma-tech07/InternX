import React, { createContext, useContext, useState } from "react";

const InternshipContext = createContext();

const InternshipProvider = ({ children }) => {
  const [internships, setInternships] = useState([]);

  const addInternship = (internship) => {
    setInternships((prev) => [...prev, internship]);
  };

  const updateInternship = (id, updatedData) => {
    setInternships((prev) =>
      prev.map((internship) =>
        internship.id === id
          ? { ...internship, ...updatedData }
          : internship
      )
    );
  };

  const deleteInternship = (id) => {
    setInternships((prev) =>
      prev.filter((internship) => internship.id !== id)
    );
  };

  return (
    <InternshipContext.Provider
      value={{
        internships,
        setInternships,
        addInternship,
        updateInternship,
        deleteInternship
      }}
    >
      {children}
    </InternshipContext.Provider>
  );
};

export const useInternships = () => {
  return useContext(InternshipContext);
};

export default InternshipProvider;