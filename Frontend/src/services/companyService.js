import api from "./api";

const getCompanies = async () => {
  const response = await api.get("/companies/");
  return response.data;
};

const getCompanyById = async (id) => {
  const response = await api.get(
    `/companies/${id}/`
  );
  return response.data;
};

const createCompany = async (companyData) => {
  const response = await api.post(
    "/companies/",
    companyData
  );
  return response.data;
};

const updateCompany = async (id, companyData) => {
  const response = await api.put(
    `/companies/${id}/`,
    companyData
  );
  return response.data;
};

const deleteCompany = async (id) => {
  const response = await api.delete(
    `/companies/${id}/`
  );
  return response.data;
};

const companyService = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};

export default companyService;