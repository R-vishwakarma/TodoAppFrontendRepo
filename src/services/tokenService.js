// src/services/tokenService.js

const TokenService = {
    // Save token to localStorage
    setToken: (token) => {
      localStorage.setItem("authToken", token);
    },
  
    // Retrieve token from localStorage
    getToken: () => {
      return localStorage.getItem("authToken");
    },
  
    // Remove token from localStorage
    removeToken: () => {
      localStorage.removeItem("authToken");
    },
  
    // Check if token exists
    isAuthenticated: () => {
      return !!localStorage.getItem("authToken");
    },
  };
  
  export default TokenService;
  