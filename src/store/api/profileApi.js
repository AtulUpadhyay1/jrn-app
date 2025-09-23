import profileService from "../../services/profileService";

const profileApi = {
  fetchProfile: async () => {
    const response = await profileService.getProfile();
    return response;
  },
  fetchQrCode: async () => {
    const response = await profileService.getQrCode();
    return response;
  },
  generateQrCode: async () => {
    const response = await profileService.generateQrCode();
    return response;
  },    
};

export default profileApi;
