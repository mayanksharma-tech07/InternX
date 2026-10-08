const API_URL = "http://127.0.0.1:8000/api";

const api = {
  get: async (endpoint) => {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Failed to submit data");
    }

    return response.json();
  }
};

export default api;