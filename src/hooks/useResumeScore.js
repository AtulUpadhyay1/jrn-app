import { useQuery } from "@tanstack/react-query";   
import profileApi from "../store/api/profileApi";

const useResumeScore = () => {
  return useQuery({
    queryKey: ["resumeScore"],
    queryFn: profileApi.fetchResumeScore,
    staleTime: Infinity, // Never stale
    gcTime: Infinity,    // In v5, `cacheTime` is now `gcTime`
  });
};

export default useResumeScore;