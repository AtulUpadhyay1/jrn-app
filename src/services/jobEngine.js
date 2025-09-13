import { axiosInstance } from "@/store/api/apiSlice"; 


export const jobService = {
  createEngine: async (data) => {
    try {
      console.log("🚀 Starting createEngine request...");
      console.log("API URL:", axiosInstance.defaults.baseURL + "job-engine");
      console.log("Payload:", data);

      const startTime = Date.now();
      const response = await axiosInstance.post("/job-engine", data);
      const endTime = Date.now();

      console.log(`✅ createEngine successful in ${endTime - startTime}ms:`, response.data);
      return response.data;
    } catch (error) {
      console.error("❌ createEngine failed:", error);

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

  // update engine
    updateEngine: async (id, data) => {
    try {
        console.log("🚀 Starting updateEngine request...");
        console.log("API URL:", axiosInstance.defaults.baseURL + `job-engine/${id}`);
        console.log("Payload:", data);
        const startTime = Date.now();
        const response = await axiosInstance.put(`/job-engine/${id}`, data);
        const endTime = Date.now();
        
        console.log(`✅ updateEngine successful in ${endTime - startTime}ms:`, response.data);
        return response.data;
    }
    catch (error) {
        console.error("❌ updateEngine failed:", error);
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

  // fetch all engines
  fetchEngines: async () => {
    try {
      console.log("🚀 Starting fetchEngines request...");
      console.log("API URL:", axiosInstance.defaults.baseURL + "job-engine");

      const startTime = Date.now();
      const response = await axiosInstance.get("/job-engine");
      const endTime = Date.now();

      console.log(`✅ fetchEngines successful in ${endTime - startTime}ms:`, response.data);
      return response.data;
    } catch (error) {
      console.error("❌ fetchEngines failed:", error);

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

  // fetch single engine by id
  fetchEngineById: async (id) => {
    try {
      console.log("🚀 Starting fetchEngineById request...");
      console.log("API URL:", axiosInstance.defaults.baseURL + `job-engine/${id}`);

      const startTime = Date.now();
      const response = await axiosInstance.get(`/job-engine/${id}`);
      const endTime = Date.now();

      console.log(`✅ fetchEngineById successful in ${endTime - startTime}ms:`, response.data);
      return response.data;
    } catch (error) {
      console.error("❌ fetchEngineById failed:", error);

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

  // update engine status
  updateEngineStatus: async (id, isActive) => {
    try {
      console.log("🚀 Starting updateEngineStatus request...");
      console.log("API URL:", axiosInstance.defaults.baseURL + `job-engine/${id}`);
      console.log("Payload:", { isActive });
      const startTime = Date.now();
      const response = await axiosInstance.get(`/job-engine/${id}`, { isActive });
      const endTime = Date.now();

      console.log(`✅ updateEngineStatus successful in ${endTime - startTime}ms:`, response.data);
      return response.data;
    } catch (error) {
      console.error("❌ updateEngineStatus failed:", error);

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
  }
};
