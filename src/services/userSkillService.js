import { axiosInstance } from "@/store/api/apiSlice";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetch role play categories from the API
 * @returns {Promise} Promise that resolves to role play categories data
 */
export const fetchRolePlayCategories = async () => {
  try {
    const response = await axiosInstance.get("/role-play-categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch role play categories:", error);
    throw error;
  }
};

/**
 * Fetch role play use cases from the API
 * @returns {Promise} Promise that resolves to role play use cases data
 */
export const fetchRolePlayUseCases = async () => {
  try {
    const response = await axiosInstance.get("/role-play-use-cases", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch role play use cases:", error);
    throw error;
  }
};

/**
 * Custom hook to fetch role play categories using React Query
 * @returns {Object} Query result with data, isLoading, error, etc.
 */
export const useRolePlayCategories = () => {
  return useQuery({
    queryKey: ["rolePlayCategories"],
    queryFn: fetchRolePlayCategories,
    // staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to fetch role play use cases using React Query
 * @returns {Object} Query result with data, isLoading, error, etc.
 */
export const useRolePlayUseCases = () => {
  return useQuery({
    queryKey: ["rolePlayUseCases"],
    queryFn: fetchRolePlayUseCases,
    // staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

// Legacy export for backward compatibility
const userSkillService = {
  getRolePlayCategories: fetchRolePlayCategories,
  getRolePlayUseCases: fetchRolePlayUseCases,
};

export default userSkillService;
