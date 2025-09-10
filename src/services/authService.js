import { axiosInstance } from "@/store/api/apiSlice";

// Auth service functions
export const authService = {
  // Login function
  login: async (email, password) => {
    try {
      console.log("🚀 Starting login request...");
      console.log("API URL:", axiosInstance.defaults.baseURL + "login");
      console.log("Payload:", { email, password });
      
      const startTime = Date.now();
      
      const response = await axiosInstance.post("/login", {
        email,
        password,
      });
      
      const endTime = Date.now();
      console.log(`✅ Login successful in ${endTime - startTime}ms:`, response.data);
      
      // Safely destructure with defaults
      const { 
        access_token, 
        refresh_token, 
        token_type = "Bearer", 
        expires_in = 3600 
      } = response.data || {};
      
      console.log("Extracted tokens:", { access_token, refresh_token, token_type, expires_in });
      
      // Store tokens in localStorage with safe conversion
      if (access_token) {
        localStorage.setItem("access_token", access_token);
      }
      if (refresh_token) {
        localStorage.setItem("refresh_token", refresh_token);
      }
      localStorage.setItem("token_type", token_type);
      localStorage.setItem("expires_in", String(expires_in));
      
      return response.data;
    } catch (error) {
      console.error("❌ Login failed:");
      console.error("Error type:", error.name);
      console.error("Error message:", error.message);
      console.error("Error code:", error.code);
      
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      }
      
      throw error;
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("user");
  },

  // Get current user's access token
  getAccessToken: () => {
    return localStorage.getItem("access_token");
  },

  // Get refresh token
  getRefreshToken: () => {
    return localStorage.getItem("refresh_token");
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("access_token");
    return !!token;
  },

  // Refresh token function (if your API supports it)
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axiosInstance.post("/auth/refresh", {
        refresh_token: refreshToken,
      });

      const { 
        access_token, 
        refresh_token: newRefreshToken, 
        expires_in = 3600 
      } = response.data || {};
      
      // Update tokens
      if (access_token) {
        localStorage.setItem("access_token", access_token);
      }
      if (newRefreshToken) {
        localStorage.setItem("refresh_token", newRefreshToken);
      }
      localStorage.setItem("expires_in", String(expires_in));

      return response.data;
    } catch (error) {
      // If refresh fails, logout user
      authService.logout();
      throw error;
    }
  },
};

export default authService;
