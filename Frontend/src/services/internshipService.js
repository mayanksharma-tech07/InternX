import api from "./api";

const getInternships = async () => {
  const response = await api.get("/internships/");
  return response.data;
};

const getInternshipById = async (id) => {
  const response = await api.get(`/internships/${id}/`);
  return response.data;
};

const createInternship = async (internshipData) => {
  const response = await api.post(
    "/internships/",
    internshipData
  );
  return response.data;
};

const updateInternship = async (id, internshipData) => {
  const response = await api.put(
    `/internships/${id}/`,
    internshipData
  );
  return response.data;
};

const deleteInternship = async (id) => {
  const response = await api.delete(
    `/internships/${id}/`
  );
  return response.data;
};

const internshipService = {
  getInternships,
  getInternshipById,
  createInternship,
  updateInternship,
  deleteInternship
};

export default internshipService;