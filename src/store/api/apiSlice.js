import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

// Create axios instance with base configuration
export const axiosInstance = axios.create({
  baseURL: "/api/", // Using proxy - Vite will forward to http://localhost:8000
  timeout: 30000, // Increased to 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token if available
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage or your preferred storage method
    const token = localStorage.getItem("access_token");
    console.log("📡 Adding Authorization header with token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle common HTTP errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const response = await axiosInstance.post("/refresh", {
            refresh_token: refreshToken,
          });

          const { access_token, refresh_token: newRefreshToken, expires_in } = response.data;
          
          // Update tokens
          localStorage.setItem("access_token", access_token);
          if (newRefreshToken) {
            localStorage.setItem("refresh_token", newRefreshToken);
          }
          localStorage.setItem("expires_in", expires_in.toString());

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          
          // Retry the original request
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("token_type");
        localStorage.removeItem("expires_in");
        localStorage.removeItem("user");
        
        // Redirect to login page
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    } else if (error.response?.status === 403) {
      // Forbidden
      console.error("Access forbidden");
    } else if (error.response?.status >= 500) {
      // Server errors
      console.error("Server error:", error.response.data);
    }
    return Promise.reject(error);
  }
);

// RTK Query API slice for backward compatibility
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/", // Using proxy - Vite will forward to http://localhost:8000
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({}),
});

export default axiosInstance;
