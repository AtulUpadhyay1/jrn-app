import { axiosInstance } from "@/store/api/apiSlice";

const userSkillService = {
    // Fetch user skills
    getRolePlayCategories: async () => {
      try {
        console.log("📡 Fetching role play categories...");
        const response = await axiosInstance.get("/role-play-categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_access_token")}`,
          },
        });
        console.log("✅ getRolePlayCategories successful:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ getRolePlayCategories failed:", error);

      let message = "Something went wrong";
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        message = error.response.data?.message || `Error ${error.response.status}`;
      } else if (error.request) {
        message = "No response from server";
      } else {
        message = error.message;
      }
  
      return {
        success: false,
        message
      };
      }
    },
    // get role play user cases
    getRolePlayUseCases: async () => {
      try {
        console.log("📡 Fetching role play use cases...");
        const response = await axiosInstance.get("/role-play-use-cases", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_access_token")}`,
          },
        });
        console.log("✅ getRolePlayUseCases successful:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ getRolePlayUseCases failed:", error);

      let message = "Something went wrong";
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        message = error.response.data?.message || `Error ${error.response.status}`;
      } else if (error.request) {
        message = "No response from server";
      } else {
        message = error.message;
      }
  
      return {
        success: false,
        message
      };
      }
    },    
}

export default userSkillService;