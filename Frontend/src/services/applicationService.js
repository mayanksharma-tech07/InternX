import api from "./api";

const submitApplication = async (applicationData) => {
  const response = await api.post(
    "/applications/",
    applicationData
  );
  return response.data;
};

const getApplications = async () => {
  const response = await api.get("/applications/");
  return response.data;
};

const getApplicationById = async (id) => {
  const response = await api.get(
    `/applications/${id}/`
  );
  return response.data;
};

const updateApplication = async (id, applicationData) => {
  const response = await api.put(
    `/applications/${id}/`,
    applicationData
  );
  return response.data;
};

const deleteApplication = async (id) => {
  const response = await api.delete(
    `/applications/${id}/`
  );
  return response.data;
};

const applicationService = {
  submitApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
};

export default applicationService;