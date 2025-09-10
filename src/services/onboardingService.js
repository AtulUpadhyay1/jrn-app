import { axiosInstance } from "@/store/api/apiSlice";

export const onboardingService = {
  // Get onboarding data
  getOnboardingData: async () => {
    try {
      console.log("🚀 Fetching onboarding data...");
      const response = await axiosInstance.get("/onboarding");
      console.log("✅ Onboarding data fetched:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to fetch onboarding data:", error);
      throw error;
    }
  },

  // Update onboarding data with file uploads
  updateOnboardingDataWithFiles: async (formData, currentStep) => {
    try {
      console.log("🚀 Updating onboarding data with files...", { currentStep });
      
      // Add step to FormData
      formData.append('step', currentStep);
      
      const response = await axiosInstance.post("/onboarding", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("✅ Onboarding data with files updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to update onboarding data with files:", error);
      throw error;
    }
  },

  // Update onboarding data
  updateOnboardingData: async (stepData, currentStep) => {
    try {
      console.log("🚀 Updating onboarding data...", { stepData, currentStep });
      const response = await axiosInstance.post("/onboarding", {
        ...stepData,
        step: currentStep
      });
      console.log("✅ Onboarding data updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Failed to update onboarding data:", error);
      throw error;
    }
  },

  // Transform API data to form format
  transformApiDataToFormData: (apiData) => {
    if (!apiData || !apiData.data) return {};

    const { data } = apiData;
    const userDetail = data.user_detail || {};

    // Helper function to safely parse JSON
    const safeJsonParse = (jsonString, fallback = {}) => {
      try {
        return jsonString ? JSON.parse(jsonString) : fallback;
      } catch (error) {
        console.warn("Failed to parse JSON:", jsonString, error);
        return fallback;
      }
    };

    return {
      basicProfile: {
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        dateOfBirth: userDetail.dob || "",
        gender: userDetail.gender || "",
        location: userDetail.address || "",
        bio: userDetail.bio || "",
      },
      careerPreferences: {
        currentPosition: userDetail.current_position || "",
        experienceLevel: userDetail.experience_level || "",
        industry: userDetail.industry || "",
        desiredPosition: userDetail.desired_position || "",
        workLocationPreference: userDetail.work_location_preference || "",
        expectedSalaryRange: userDetail.expected_salary_range || "",
        jobTypePreferences: safeJsonParse(userDetail.job_type_preferences),
        skillsTechnologies: userDetail.skills_technologies || "",
      },
      purposePathways: {
        primaryPurposeCareerDevelopment: userDetail.primary_purpose_career_development || "",
        careerGoals: userDetail.career_goals || "",
        motivatesProfessionally: userDetail.motivates_professionally || "",
        areasOfInterest: safeJsonParse(userDetail.areas_of_interest),
        preferredLearningMethods: safeJsonParse(userDetail.preferred_learning_methods),
      },
      resume: {
        resume: userDetail.resume || "",
        additionalNotes: userDetail.additional_notes || "",
        linkedinUrl: userDetail.linkedin || "",
        portfolioUrl: userDetail.personal_website || "",
      },
      video: {
        videoIntroduction: userDetail.video_introduction || "",
      },
      social: {
        linkedin: userDetail.linkedin || "",
        twitter: userDetail.twitter || "",
        github: userDetail.github || "",
        personalWebsite: userDetail.personal_website || "",
        instagram: userDetail.instagram || "",
        youtube: userDetail.youtube || "",
        behance: userDetail.behance || "",
        dribbble: userDetail.dribbble || "",
      },
      subscriptions: {
        selectedPlan: userDetail.subscription_plan || "free",
        billingCycle: userDetail.billing_cycle || "monthly",
        timestamp: userDetail.subscription_timestamp || "",
      },
      summary: {
        completed: userDetail.profile_completed || false,
        completionDate: userDetail.completion_date || "",
        completionPercentage: userDetail.completion_percentage || 0,
        sectionsCompleted: userDetail.sections_completed || 0,
        totalSections: userDetail.total_sections || 0,
      },
      subscriptions: {},
      currentStep: userDetail.step || 1,
      status: userDetail.status || "pending"
    };
  },

  // Transform form data to API format
  transformFormDataToApiData: (formData, stepKey) => {
    const transformations = {
      basicProfile: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.location,
        bio: formData.bio,
      },
      careerPreferences: {
        current_position: formData.currentPosition,
        experience_level: formData.experienceLevel,
        industry: formData.industry,
        desired_position: formData.desiredPosition,
        work_location_preference: formData.workLocationPreference,
        expected_salary_range: formData.expectedSalaryRange,
        job_type_preferences: formData.jobTypePreferences ? JSON.stringify(formData.jobTypePreferences) : null,
        skills_technologies: formData.skillsTechnologies,
      },
      purposePathways: {
        primary_purpose_career_development: formData.primaryPurposeCareerDevelopment,
        career_goals: formData.careerGoals,
        motivates_professionally: formData.motivatesProfessionally,
        areas_of_interest: formData.areasOfInterest ? JSON.stringify(formData.areasOfInterest) : null,
        preferred_learning_methods: formData.preferredLearningMethods ? JSON.stringify(formData.preferredLearningMethods) : null,
      },
      resume: {
        resume: formData.resume,
        additional_notes: formData.additionalNotes,
        linkedin: formData.linkedinUrl,
        personal_website: formData.portfolioUrl,
      },
      video: {
        video_introduction: formData.videoIntroduction,
      },
      social: {
        linkedin: formData.linkedin,
        twitter: formData.twitter,
        github: formData.github,
        personal_website: formData.personalWebsite,
        instagram: formData.instagram,
        youtube: formData.youtube,
        behance: formData.behance,
        dribbble: formData.dribbble,
      },
      subscriptions: {
        subscription_plan: formData.selectedPlan,
        billing_cycle: formData.billingCycle,
        subscription_timestamp: formData.timestamp,
      },
      summary: {
        profile_completed: formData.completed,
        completion_date: formData.completionDate,
        completion_percentage: formData.completionPercentage,
        sections_completed: formData.sectionsCompleted,
        total_sections: formData.totalSections,
        status: "completed", // Update status to completed
      },
    };

    return transformations[stepKey] || {};
  }
};

export default onboardingService;
