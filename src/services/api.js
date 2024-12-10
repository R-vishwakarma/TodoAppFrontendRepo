import axios from "axios";

import TokenService from "./tokenService";

const api = axios.create({
  baseURL: "https://localhost:7152", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in all outgoing requests
api.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken(); // Retrieve token from TokenService
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling token expiration or errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      TokenService.removeToken(); // Remove token on 401 Unauthorized
      // Optionally, redirect to login or notify the user
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;


