import { axiosInstance } from "@/store/api/apiSlice";

const profileService = {
  getProfile: async () => {
      try {
        console.log("📡 Fetching profile data...");
        const response = await axiosInstance.get("/profile");
        console.log("✅ getProfile successful:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ getProfile failed:", error);

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
};

export default profileService;
