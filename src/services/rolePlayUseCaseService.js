import { axiosInstance } from "@/store/api/apiSlice";

// Role Play Use Case service functions
export const rolePlayUseCaseService = {
	// Get all role play use cases
	getUseCases: async () => {
		try {
			console.log("🚀 Fetching role play use cases...");

			const response = await axiosInstance.get("/admin/role-play-use-cases", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
				},
			});
			//print admin access token
			console.log("Admin Access Token:", localStorage.getItem("admin_access_token"));

			console.log("✅ Use cases fetched successfully:", response.data);
			return response.data;
		} catch (error) {
			console.error("❌ Failed to fetch use cases:", error);
			throw error;
		}
	},

	// Create new role play use case
	createUseCase: async (useCaseData) => {
		try {
			console.log("🚀 Creating new use case:", useCaseData);

			const response = await axiosInstance.post(
				"/admin/role-play-use-cases",
				useCaseData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
					},
				}
			);

			console.log("✅ Use case created successfully:", response.data);
			return response.data;
		} catch (error) {
			console.error("❌ Failed to create use case:", error);
			throw error;
		}
	},

	// Update role play use case
	updateUseCase: async (id, useCaseData) => {
		try {
			console.log("🚀 Updating use case:", id, useCaseData);

			const response = await axiosInstance.put(
				`/admin/role-play-use-cases/${id}`,
				useCaseData,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
					},
				}
			);

			console.log("✅ Use case updated successfully:", response.data);
			return response.data;
		} catch (error) {
			console.error("❌ Failed to update use case:", error);
			throw error;
		}
	},

	// Delete role play use case
	deleteUseCase: async (id) => {
		try {
			console.log("🚀 Deleting use case:", id);

			const response = await axiosInstance.delete(
				`/admin/role-play-use-cases/${id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
					},
				}
			);

			console.log("✅ Use case deleted successfully:", response.data);
			return response.data;
		} catch (error) {
			console.error("❌ Failed to delete use case:", error);
			throw error;
		}
	},

	// Get single role play use case by ID
	getUseCaseById: async (id) => {
		try {
			console.log("🚀 Fetching use case by ID:", id);

			const response = await axiosInstance.get(
				`/admin/role-play-use-cases/${id}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
					},
				}
			);

			console.log("✅ Use case fetched successfully:", response.data);
			return response.data;
		} catch (error) {
			console.error("❌ Failed to fetch use case:", error);
			throw error;
		}
	},

	// Toggle use case status (active/inactive)
	toggleUseCaseStatus: async (id) => {
		try {
			console.log("🚀 Toggling use case status:", id);

			const response = await axiosInstance.patch(
				`/admin/role-play-use-cases/${id}/toggle-status`,
				{},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
					},
				}
			);

			console.log("✅ Use case status toggled successfully:", response.data);
			return response.data;
		} catch (error) {
			console.error("❌ Failed to toggle use case status:", error);
			throw error;
		}
	},
};

export default rolePlayUseCaseService;

