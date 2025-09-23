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

    //get qr code
    getQrCode: async () => {
      try {
        console.log("📡 Fetching QR code data...");
        const response = await axiosInstance.get("/profile/qr-code");
        console.log("✅ getQrCode successful:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ getQrCode failed:", error);
        
      let message = "Something went wrong";
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        message = error.response.data?.message || `Error ${error.response.status}`;
      }
      else if (error.request) {
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


    //generate qr code
    generateQrCode: async () => {
      try {
        console.log("📡 Generating new QR code...");
        const profile_url = "https://yourapp.com/user/username"
        const response = await axiosInstance.post("/profile/generate-qr-code", { profile_url });
        console.log("✅ generateQrCode successful:", response.data);
        return response.data;
      } catch (error) {
        console.error("❌ generateQrCode failed:", error);
        
      let message = "Something went wrong";
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        message = error.response.data?.message || `Error ${error.response.status}`;
      }
      else if (error.request) {
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
