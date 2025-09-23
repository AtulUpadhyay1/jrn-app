import { axiosInstance } from "@/store/api/apiSlice"; 

export const dashboardService = {
    getDashboard: async () => {
    try {
      console.log("🚀 Starting getDashboard request...");
      console.log("API URL:", axiosInstance.defaults.baseURL + "dashboard");

      const startTime = Date.now();
      const response = await axiosInstance.get("/dashboard");
      const endTime = Date.now();

      console.log(`✅ getDashboard successful in ${endTime - startTime}ms:`, response.data);
      return response.data;
    } catch (error) {
      console.error("❌ getDashboard failed:", error);

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