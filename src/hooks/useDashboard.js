import { useQuery } from "@tanstack/react-query";   
import { dashboardService } from "../services/dashboardService";

const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => dashboardService.getDashboard(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,    // In v5, `cacheTime` is now `gcTime`
  });
};

export default useDashboard;