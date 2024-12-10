import api from "./api";
import TokenService from "./tokenService";


export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/User/login", credentials);
    const { token } = response.data;

    if (!token) {
      throw new Error("Token not received");
    }

    // Store the token
    TokenService.setToken(token);
    return response.data;


  }catch (error) {
    // Extract custom error message from the backend response
    const errorMessage =error.response?.data?.message || "An unexpected error occurred.";
    throw new Error(errorMessage); // Throw the extracted message
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/User/register", userData);
    return response.data; // Ensure the response data is returned
  } catch (error) {
    // Extract the `message` field from the backend response
    const errorMessage = error.response?.data?.message || 
                         "An unexpected error occurred during registration.";
    throw new Error(errorMessage); // Re-throw with the extracted message
  }
};

