import { axiosInstance } from "@/store/api/apiSlice";

// Role Play Category service functions
export const rolePlayCategoryService = {
  // Get all role play categories
  getCategories: async () => {
    try {
      console.log("🚀 Fetching role play categories...");
      
      const response = await axiosInstance.get("/admin/role-play-categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
        },
      });
      
      console.log("✅ Categories fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to fetch categories:", error);
      throw error;
    }
  },

  // Create new role play category
  createCategory: async (categoryData) => {
    try {
      console.log("🚀 Creating new category:", categoryData);
      
      const response = await axiosInstance.post(
        "/admin/role-play-categories",
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
          },
        }
      );
      
      console.log("✅ Category created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to create category:", error);
      throw error;
    }
  },

  // Update role play category
  updateCategory: async (id, categoryData) => {
    try {
      console.log("🚀 Updating category:", id, categoryData);
      
      const response = await axiosInstance.put(
        `/admin/role-play-categories/${id}`,
        categoryData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
          },
        }
      );
      
      console.log("✅ Category updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to update category:", error);
      throw error;
    }
  },

  // Delete role play category
  deleteCategory: async (id) => {
    try {
      console.log("🚀 Deleting category:", id);
      
      const response = await axiosInstance.delete(
        `/admin/role-play-categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
          },
        }
      );
      
      console.log("✅ Category deleted successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to delete category:", error);
      throw error;
    }
  },

  // Get single role play category by ID
  getCategoryById: async (id) => {
    try {
      console.log("🚀 Fetching category by ID:", id);
      
      const response = await axiosInstance.get(
        `/admin/role-play-categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
          },
        }
      );
      
      console.log("✅ Category fetched successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to fetch category:", error);
      throw error;
    }
  },

  // Toggle category status (active/inactive)
  toggleCategoryStatus: async (id) => {
    try {
      console.log("🚀 Toggling category status:", id);
      
      const response = await axiosInstance.patch(
        `/admin/role-play-categories/${id}/toggle-status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
          },
        }
      );
      
      console.log("✅ Category status toggled successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to toggle category status:", error);
      throw error;
    }
  },
};

export default rolePlayCategoryService;