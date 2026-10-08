import api from "./api";

const login = async (credentials) => {
  const response = await api.post("/auth/login/", credentials);
  return response.data;
};

const signup = async (userData) => {
  const response = await api.post("/auth/register/", userData);
  return response.data;
};

const logout = async () => {
  const response = await api.post("/auth/logout/");
  return response.data;
};

const getProfile = async () => {
  const response = await api.get("/auth/profile/");
  return response.data;
};

const updateProfile = async (userData) => {
  const response = await api.put("/auth/profile/", userData);
  return response.data;
};

const authService = {
  login,
  signup,
  logout,
  getProfile,
  updateProfile
};

export default authService;