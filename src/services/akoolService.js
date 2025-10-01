/**
 * Akool AI Service for interview avatars
 * Handles avatar creation and session management
 * Uses backend API endpoints - backend manages tokens
 */

import { axiosInstance } from "@/store/api/apiSlice";

class AkoolService {
  constructor() {
    this.currentSession = null;
    this.avatarCache = new Map();
    this.sessionCache = new Map();
  }

  /**
   * Initialize the service - no token management needed
   */
  initialize() {
    // Backend handles token management, nothing to initialize here
    console.log("🚀 Akool service initialized - backend handles authentication");
    this.createToken();
  }

  /**
   * Get available talking avatars from backend API
   * Backend handles authentication
   * @returns {Promise<Array>} List of available avatars
   */

  //call api to create token on server
  async createToken() {
    try {
      const response = await axiosInstance.post("/akool/generate-token");
      console.log("🎟️ Token created successfully:", response.data);
      return response.data.token;
    } catch (error) {
      console.error("❌ createToken failed:", error);
      throw new Error("Failed to create token");
    }
  }

  async getTalkingAvatars() {
    // Return cached avatars if available
    if (this.avatarCache.has('avatars')) {
      const cachedData = this.avatarCache.get('avatars');
      if (Date.now() - cachedData.timestamp < 5 * 60 * 1000) { // 5 minutes cache
        return cachedData.data;
      }
    }

    try {
      console.log("🚀 Starting getTalkingAvatars request...");
      console.log("API URL:", axiosInstance.defaults.baseURL + "akool/talking-avatars");

      const startTime = Date.now();
      const response = await axiosInstance.get("/akool/talking-avatars");
      const endTime = Date.now();

      console.log(`✅ getTalkingAvatars successful in ${endTime - startTime}ms:`, response.data);

      if (response.data) {
        let avatars;
        
        // Handle different response structures
        if (Array.isArray(response.data)) {
          // Direct array response
          avatars = response.data;
        } else if (response.data.data && response.data.data.result && Array.isArray(response.data.data.result)) {
          // Nested structure: { data: { result: [...], count: X } }
          avatars = response.data.data.result;
          console.log(`📊 Found ${response.data.data.count} total avatars, returning ${avatars.length} items`);
        } else if (response.data.result && Array.isArray(response.data.result)) {
          // Structure: { result: [...], count: X }
          avatars = response.data.result;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          // Structure: { data: [...] }
          avatars = response.data.data;
        } else {
          console.error('Unexpected response structure:', response.data);
          throw new Error('Could not find avatar array in response');
        }
        
        console.log(`🎭 Processed ${avatars.length} avatars from API response`);
        
        // Cache the result
        this.avatarCache.set('avatars', {
          data: avatars,
          timestamp: Date.now(),
        });
        return avatars;
      } else {
        throw new Error('Invalid response format from backend');
      }
    } catch (error) {
      console.error("❌ getTalkingAvatars failed:", error);
      
      let message = "Failed to fetch avatars";
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        message = error.response.data?.message || `Error ${error.response.status}`;
      } else if (error.request) {
        message = "No response from server";
      } else {
        message = error.message;
      }
      
      throw new Error(message);
    }
  }

  /**
   * Create a new avatar session using backend API
   * Backend handles authentication
   * @param {string} avatarId - The ID of the avatar to use
   * @returns {Promise<Object>} Session details
   */
  async createSession(avatarId) {
    // Check if we already have an active session for this avatar
    const cacheKey = `session_${avatarId}`;
    if (this.sessionCache.has(cacheKey)) {
      const cachedSession = this.sessionCache.get(cacheKey);
      if (Date.now() - cachedSession.timestamp < 30 * 60 * 1000) { // 30 minutes cache
        return cachedSession.data;
      }
    }

    try {
      console.log("🚀 Starting createSession request...");
      console.log("API URL:", axiosInstance.defaults.baseURL + "akool/create-session");
      console.log("Payload:", { avatar_id: avatarId });

      const startTime = Date.now();
      const response = await axiosInstance.post("/akool/create-session", {
        avatar_id: avatarId,
      });
      const endTime = Date.now();

      console.log(`✅ createSession successful in ${endTime - startTime}ms:`, response.data);

      if (response.data) {
        const sessionData = response.data.session || response.data;
        this.currentSession = sessionData;
        
        // Cache the session
        this.sessionCache.set(cacheKey, {
          data: sessionData,
          timestamp: Date.now(),
        });
        
        return sessionData;
      } else {
        throw new Error('Invalid response format from backend');
      }
    } catch (error) {
      console.error("❌ createSession failed:", error);
      
      let message = "Failed to create session";
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        message = error.response.data?.message || `Error ${error.response.status}`;
      } else if (error.request) {
        message = "No response from server";
      } else {
        message = error.message;
      }
      
      throw new Error(message);
    }
  }

  /**
   * Close an avatar session using backend API
   * Backend handles authentication
   * @param {string} sessionId - The ID of the session to close
   * @returns {Promise<boolean>} Success status
   */
  async closeSession(sessionId) {
    try {
      console.log("🚀 Starting closeSession request...");
      console.log("API URL:", axiosInstance.defaults.baseURL + "akool/close-session");
      console.log("Payload:", { id: sessionId });

      const startTime = Date.now();
      const response = await axiosInstance.post("/akool/close-session", {
        id: sessionId,
      });
      const endTime = Date.now();

      console.log(`✅ closeSession successful in ${endTime - startTime}ms:`, response.data);

      // Remove from cache
      const cacheKeys = Array.from(this.sessionCache.keys());
      for (const key of cacheKeys) {
        const session = this.sessionCache.get(key);
        if (session.data.id === sessionId) {
          this.sessionCache.delete(key);
          break;
        }
      }
      
      if (this.currentSession && this.currentSession.id === sessionId) {
        this.currentSession = null;
      }
      
      return true;
    } catch (error) {
      console.error("❌ closeSession failed:", error);
      
      let message = "Failed to close session";
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        message = error.response.data?.message || `Error ${error.response.status}`;
      } else if (error.request) {
        message = "No response from server";
      } else {
        message = error.message;
      }
      
      throw new Error(message);
    }
  }

  
  
  cleanup() {
    this.avatarCache.clear();
    this.sessionCache.clear();
    this.currentSession = null;
    console.log("🧹 Akool service cleaned up - caches cleared");
  }


  /**
   * Get cached data info for debugging
   * @returns {Object} Cache information
   */
  getCacheInfo() {
    return {
      avatarCacheSize: this.avatarCache.size,
      sessionCacheSize: this.sessionCache.size,
      currentSession: this.currentSession,
    };
  }
}

// Export singleton instance
export const akoolService = new AkoolService();
export default akoolService;
