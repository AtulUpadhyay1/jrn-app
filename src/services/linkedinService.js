import { axiosInstance } from "@/store/api/apiSlice";
import { get } from "react-hook-form";

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

  getProfileAnalytics: async () => {
    try {
      console.log("📡 Fetching LinkedIn profile analytics...");
      const response = await axiosInstance.post("/linkedin-profile-ai/analyze");
      console.log("✅ Profile analytics fetch successful:", response.data);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("❌ Profile analytics fetch failed:", error);

      let message = "Failed to fetch profile analytics";
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

  // Combined method that calls both APIs sequentially
  getCompleteProfileAnalysis: async () => {
    try {
      console.log("🚀 Starting complete LinkedIn profile analysis...");
      
      // Step 1: Create profile snapshot
      console.log("📡 Step 1: Creating LinkedIn profile snapshot...");
      const snapshotResponse = await axiosInstance.post("/linkedin-profile-ai/snapshot");
      console.log("✅ LinkedIn snapshot successful:", snapshotResponse.data);
      
      // Small delay to ensure server processing is complete
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Get profile analytics (depends on the snapshot)
      console.log("📡 Step 2: Fetching LinkedIn profile analytics...");
      const analyticsResponse = await axiosInstance.post("/linkedin-profile-ai/analyze");
      console.log("✅ Profile analytics fetch successful:", analyticsResponse.data);
      
      return {
        success: true,
        data: analyticsResponse.data, // Return the final analytics data
        snapshotData: snapshotResponse.data // Also include snapshot data if needed
      };
    } catch (error) {
      console.error("❌ Complete profile analysis failed:", error);

      let message = "Failed to complete LinkedIn profile analysis";
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