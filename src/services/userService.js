import { axiosInstance } from "@/store/api/apiSlice";

// Admin Users service functions
export const userService = {
  // Get all users
  getUsers: async (params = {}) => {
    try {
      console.log("🚀 Fetching users...", params);
      const response = await axiosInstance.get("/admin/users", {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
        },
      });
      console.log("✅ Users fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to fetch users:", error);
      throw error;
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      console.log("🚀 Updating user:", id, userData);
      const response = await axiosInstance.put(`/admin/users/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
        },
      });
      console.log("✅ User updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to update user:", error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      console.log("🚀 Deleting user:", id);
      const response = await axiosInstance.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
        },
      });
      console.log("✅ User deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to delete user:", error);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      console.log("🚀 Fetching user by ID:", id);
      const response = await axiosInstance.get(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
        },
      });
      console.log("✅ User fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to fetch user:", error);
      throw error;
    }
  },

  // Toggle user status (active/inactive)
  toggleUserStatus: async (id) => {
    try {
      console.log("🚀 Toggling user status:", id);
      const response = await axiosInstance.patch(`/admin/users/${id}/toggle-status`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
        },
      });
      console.log("✅ User status toggled successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to toggle user status:", error);
      throw error;
    }
  },
};

export default userService;
