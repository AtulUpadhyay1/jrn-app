import { useQuery } from "@tanstack/react-query";   
import profileApi from "../store/api/profileApi";

const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileApi.fetchProfile,
    staleTime: Infinity, // Never stale
    gcTime: Infinity,    // In v5, `cacheTime` is now `gcTime`
  });
};

export default useProfile;
