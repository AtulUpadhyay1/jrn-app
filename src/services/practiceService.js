import { axiosInstance } from "@/store/api/apiSlice";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetch role play use case details by ID
 * @param {number|string} id - The ID of the role play use case
 * @returns {Promise} Promise that resolves to role play use case details
 */
export const fetchRolePlayUseCaseById = async (id) => {
  try {
    const response = await axiosInstance.get(`/role-play-use-cases/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch role play use case:", error);
    throw error;
  }
};

/**
 * Custom hook to fetch role play use case details using React Query
 * @param {number|string} id - The ID of the role play use case
 * @returns {Object} Query result with data, isLoading, error, etc.
 */
export const useRolePlayUseCase = (id) => {
  return useQuery({
    queryKey: ["rolePlayUseCase", id],
    queryFn: () => fetchRolePlayUseCaseById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

const practiceService = {
  getRolePlayUseCaseById: fetchRolePlayUseCaseById,
};

export default practiceService;
