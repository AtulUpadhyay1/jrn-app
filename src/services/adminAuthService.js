import { axiosInstance } from "@/store/api/apiSlice";

// Admin Auth service functions
export const adminAuthService = {
  // Admin Login function
  login: async (email, password) => {
    try {
      console.log("🚀 Starting admin login request...");
      console.log("API URL:", axiosInstance.defaults.baseURL + "admin/login");
      console.log("Payload:", { email, password });
      
      const startTime = Date.now();
      
      const response = await axiosInstance.post("/admin/login", {
        email,
        password,
      });
      
      const endTime = Date.now();
      console.log(`✅ Admin login successful in ${endTime - startTime}ms:`, response.data);
      
      // Safely destructure admin response
      const { 
        success,
        message,
        type,
        access_token
      } = response.data || {};
      
      console.log("Admin login response:", { success, message, type, access_token });
      
      // Store admin tokens in localStorage with admin prefix
      if (access_token) {
        localStorage.setItem("admin_access_token", access_token);
      }
      if (type) {
        localStorage.setItem("admin_type", type);
      }
      
      return response.data;
    } catch (error) {
      console.error("❌ Admin login failed:");
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

  // Admin Logout function
  logout: () => {
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_type");
    localStorage.removeItem("admin_user");
  },

  // Get current admin's access token
  getAccessToken: () => {
    return localStorage.getItem("admin_access_token");
  },

  // Check if admin is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("admin_access_token");
    const type = localStorage.getItem("admin_type");
    return !!(token && type === "admin");
  },

  // Get admin user data
  getAdminUser: () => {
    const adminUser = localStorage.getItem("admin_user");
    return adminUser ? JSON.parse(adminUser) : null;
  },

  // Set admin user data
  setAdminUser: (userData) => {
    localStorage.setItem("admin_user", JSON.stringify(userData));
  },
};

export default adminAuthService;