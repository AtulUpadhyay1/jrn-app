import { axiosInstance } from "@/store/api/apiSlice";

const linkedinService = {
  createProfileSnapshot: async () => {
    try {
      console.log("📡 Creating LinkedIn profile snapshot...");
      const response = await axiosInstance.post("/linkedin-profile-ai/snapshot");
      console.log("✅ LinkedIn snapshot successful:", response.data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("❌ LinkedIn snapshot failed:", error);

      let message = "Something went wrong with LinkedIn snapshot";
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

  getSnapshotHistory: async () => {
    try {
      console.log("📡 Fetching LinkedIn snapshot history...");
      const response = await axiosInstance.get("/linkedin-profile-ai/snapshots");
      console.log("✅ Snapshot history fetch successful:", response.data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("❌ Snapshot history fetch failed:", error);

      let message = "Failed to fetch snapshot history";
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
  }
};

export default linkedinService;