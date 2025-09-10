import { axiosInstance } from "@/store/api/apiSlice";

// Resume service functions

export const resumeService = {
  saveEducation: async (data) => {
    try {
      console.log("🚀 Starting saveEducation request...");
      console.log("API URL:", axiosInstance.defaults.baseURL + "education");
      console.log("Payload:", data);

      const startTime = Date.now();
      const response = await axiosInstance.post("/education", data);
      const endTime = Date.now();

      console.log(`✅ saveEducation successful in ${endTime - startTime}ms:`, response.data);
      return response.data;
    } catch (error) {
      console.error("❌ saveEducation failed:", error);

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

  getEducation: async () => {
    try {
      console.log("📡 Fetching education data...");
      const response = await axiosInstance.get("/education");
      console.log("✅ getEducation successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ saveEducation failed:", error);

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

  updateEducation: async (id, data) => {
    try {
      console.log(`🛠 Updating education ID: ${id}...`);
      const response = await axiosInstance.put(`/education/${id}`, data);
      console.log("✅ updateEducation successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ saveEducation failed:", error);

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

  deleteEducation: async (id) => {
    try {
      console.log(`🗑 Deleting education ID: ${id}...`);
      const response = await axiosInstance.delete(`/education/${id}`);
      console.log("✅ deleteEducation successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ saveEducation failed:", error);

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

  // ===== SKILLS =====
  addSkill: async (data) => {
    try {
      console.log("🚀 Starting addSkill request...");
      const response = await axiosInstance.post("/skills", data);
      console.log("✅ addSkill successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ addSkill failed:", error);

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

  getSkills: async () => {
    try {
      console.log("📡 Fetching skills data...");
      const response = await axiosInstance.get("/skills");
      console.log("✅ getSkills successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ saveEducation failed:", error);

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

  updateSkill: async (id, data) => {
    try {
      console.log(`🛠 Updating skill ID: ${id}...`);
      const response = await axiosInstance.put(`/skills/${id}`, data);
      console.log("✅ updateSkill successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ saveEducation failed:", error);

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

  deleteSkill: async (id) => {
    try {
      console.log(`🗑 Deleting skill ID: ${id}...`);
      const response = await axiosInstance.delete(`/skills/${id}`);
      console.log("✅ deleteSkill successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ deleteSkill failed:", error);

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

  // ===== COMMUNICATION =====
  addCommunication: async (data) => {
    try {
      console.log("🚀 Starting addCommunication request...");
      const response = await axiosInstance.post("/communications", data);
      console.log("✅ addCommunication successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ addCommunication failed:", error);

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

  getCommunication: async () => {
    try {
      console.log("📡 Fetching communication data...");
      const response = await axiosInstance.get("/communications");
      console.log("✅ getCommunication successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ getCommunication failed:", error);

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

  updateCommunication: async (id, data) => {
    try {
      console.log(`🛠 Updating communication ID: ${id}...`);
      const response = await axiosInstance.put(`/communications/${id}`, data);
      console.log("✅ updateCommunication successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ updateCommunication failed:", error);

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

  deleteCommunication: async (id) => {
    try {
      console.log(`🗑 Deleting communication ID: ${id}...`);
      const response = await axiosInstance.delete(`/communications/${id}`);
      console.log("✅ deleteCommunication successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ deleteCommunication failed:", error);

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

  // ===== CURRICULUM =====
  addCurriculum: async (data) => {
    try {
      console.log("🚀 Starting saveCurriculum request...");
      const response = await axiosInstance.post("/curriculum", data);
      console.log("✅ saveCurriculum successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ saveEducation failed:", error);

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

  getCurriculum: async () => {
    try {
      console.log("📡 Fetching curriculum data...");
      const response = await axiosInstance.get("/curriculum");
      console.log("✅ getCurriculum successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ getCurriculum failed:", error);

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

  updateCurriculum: async (id, data) => {
    try {
      console.log(`🛠 Updating curriculum ID: ${id}...`);
      const response = await axiosInstance.put(`/curriculum/${id}`, data);
      console.log("✅ updateCurriculum successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ updateCurriculum failed:", error);

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

  deleteCurriculum: async (id) => {
    try {
      console.log(`🗑 Deleting curriculum ID: ${id}...`);
      const response = await axiosInstance.delete(`/curriculum/${id}`);
      console.log("✅ deleteCurriculum successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ deleteCurriculum failed:", error);

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

  // ===== PROJECTS =====
  addProject: async (data) => {
    try {
      console.log("🚀 Starting addProject request...");
      const response = await axiosInstance.post("/projects", data);
      console.log("✅ add Project successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ addProject failed:", error);

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

  getProjects: async () => {
    try {
      console.log("📡 Fetching projects data...");
      const response = await axiosInstance.get("/projects");
      console.log("✅ getProjects successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ getProjects failed:", error);

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

  updateProject: async (id, data) => {
    try {
      console.log(`🛠 Updating project ID: ${id}...`);
      const response = await axiosInstance.put(`/projects/${id}`, data);
      console.log("✅ updateProject successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ updateProject failed:", error);

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

  deleteProject: async (id) => {
    try {
      console.log(`🗑 Deleting project ID: ${id}...`);
      const response = await axiosInstance.delete(`/projects/${id}`);
      console.log("✅ deleteProject successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ deleteProject failed:", error);

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
  // ===== EXPERIENCE =====
  addExperience: async (data) => {
    try {
      console.log("🚀 Starting addExperience request...");
      const response = await axiosInstance.post("/experience", data);
      console.log("✅ addExperience successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ addExperience failed:", error);

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


  getExperience: async () => {
    try {
      console.log("📡 Fetching experience data...");
      const response = await axiosInstance.get("/experience");
      console.log("✅ getExperience successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ getExperience failed:", error);

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

  updateExperience: async (id, data) => {
    try {
      console.log(`🛠 Updating experience ID: ${id}...`);
      const response = await axiosInstance.put(`/experience/${id}`, data);
      console.log("✅ updateExperience successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ updateExperience failed:", error);

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


  deleteExperience: async (id) => {
    try {
      console.log(`🗑 Deleting experience ID: ${id}...`);
      const response = await axiosInstance.delete(`/experience/${id}`);
      console.log("✅ deleteExperience successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ deleteExperience failed:", error);

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

  // Get resume score api
  getResumeScore: async () => {
    try {
      console.log("📡 Fetching resume score...");
      const response = await axiosInstance.post("/resume-generate-report");
      console.log("✅ getResumeScore successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ getResumeScore failed:", error);

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

  // ===== COVER LETTER =====
  saveCoverLetter: async (data) => {
    try {
      console.log("🚀 Starting saveCoverLetter request...");
      const response = await axiosInstance.post("/cover-letters", data);
      console.log("✅ saveCoverLetter successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ saveCoverLetter failed:", error);

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

  getCoverLetters: async () => {
    try {
      console.log("📡 Fetching cover letters data...");
      const response = await axiosInstance.get("/cover-letters");
      console.log("✅ getCoverLetters successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ getCoverLetters failed:", error);

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

  updateCoverLetter: async (id, data) => {
    try {
      console.log(`🛠 Updating cover letter ID: ${id}...`)
      const response = await axiosInstance.put(`/cover-letters/${id}`, data);
      console.log("✅ updateCoverLetter successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ updateCoverLetter failed:", error);

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

  getCoverLetterAIResponse: async (id) => {
    try {
      console.log(`🛠 Getting cover letter AI response for ID: ${id}...`)
      const response = await axiosInstance.post(`/cover-letters-generate?id=${id}`);
      console.log("✅ getCoverLetterAIResponse successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ getCoverLetterAIResponse failed:", error);

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

  deleteCoverLetter: async (id) => {
    try {
      console.log(`🗑 Deleting cover letter ID: ${id}...`);
      const response = await axiosInstance.delete(`/cover-letters/${id}`);
      console.log("✅ deleteCoverLetter successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ deleteCoverLetter failed:", error);

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

};

