import profileService from "../../services/profileService";

const profileApi = {
  fetchProfile: async () => {
    const response = await profileService.getProfile();
    return response;
  },    
};

export default profileApi;
