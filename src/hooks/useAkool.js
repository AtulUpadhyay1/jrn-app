import { useState, useEffect, useCallback, useRef } from 'react';
import { akoolService } from '../services/akoolService';

/**
 * Custom hook for managing Akool AI avatar integration
 * Provides optimized state management and caching
 * Now works with backend API endpoints
 */
export const useAkool = () => {
  // Generate unique ID for this hook instance
  const hookId = useRef(Math.random().toString(36).substr(2, 9));
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [availableAvatars, setAvailableAvatars] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [generationProgress, setGenerationProgress] = useState(null);
  const [error, setError] = useState(null);

  // Refs for cleanup
  const mountedRef = useRef(true);
  const generationAbortRef = useRef(null);

  console.log(`🆔 useAkool [${hookId.current}]: Hook instance created/rendered`);

  // Initialize service on mount
  useEffect(() => {
    console.log(`🆔 useAkool [${hookId.current}]: Mount effect running`);
    console.log(`🆔 useAkool [${hookId.current}]: mountedRef.current at mount:`, mountedRef.current);
    
    // Ensure mounted ref is true on mount
    mountedRef.current = true;
    
    // Initialize with a slight delay to avoid StrictMode double mounting issues
    const timeoutId = setTimeout(() => {
      if (mountedRef.current) {
        console.log(`🆔 useAkool [${hookId.current}]: Delayed initialization starting...`);
        initializeService();
      }
    }, 50);

    return () => {
      console.log(`🆔 useAkool [${hookId.current}]: Cleanup function called, setting mounted to false`);
      clearTimeout(timeoutId);
      mountedRef.current = false;
    };
  }, []); // Empty dependency array to run only once

  // Debug: Track availableAvatars state changes
  useEffect(() => {
    console.log(`🔍 useAkool [${hookId.current}]: availableAvatars state changed:`, availableAvatars);
    console.log(`🔍 useAkool [${hookId.current}]: availableAvatars length:`, availableAvatars.length);
  }, [availableAvatars]);

  // Load available avatars
  const loadAvatars = useCallback(async () => {
    try {
      console.log(`🚀 useAkool [${hookId.current}]: Loading avatars from service...`);
      console.log(`🚀 useAkool [${hookId.current}]: mountedRef.current:`, mountedRef.current);
      
      const avatars = await akoolService.getTalkingAvatars();
      console.log(`🚀 useAkool [${hookId.current}]: Received avatars:`, avatars);
      console.log(`🚀 useAkool [${hookId.current}]: Avatars type:`, typeof avatars);
      console.log(`🚀 useAkool [${hookId.current}]: Avatars is array:`, Array.isArray(avatars));
      console.log(`🚀 useAkool [${hookId.current}]: Avatars length:`, avatars?.length || 0);
      
      // Safe slice operation
      if (Array.isArray(avatars) && avatars.length > 0) {
        console.log(`🚀 useAkool [${hookId.current}]: First few avatars:`, avatars.slice(0, 3));
      } else {
        console.log(`🚀 useAkool [${hookId.current}]: No avatars to display preview`);
      }
      
      console.log(`🚀 useAkool [${hookId.current}]: mountedRef.current before setState:`, mountedRef.current);
      
      if (mountedRef.current) {
        console.log(`🚀 useAkool [${hookId.current}]: About to call setAvailableAvatars...`);
        
        // Ensure we have a valid array
        const validAvatars = Array.isArray(avatars) ? avatars : [];
        console.log(`🚀 useAkool [${hookId.current}]: Setting valid avatars:`, validAvatars.length);
        
        setAvailableAvatars(validAvatars);
        console.log(`🚀 useAkool [${hookId.current}]: setAvailableAvatars called with:`, validAvatars.length, 'avatars');
        
        // Add a small delay and check if state was actually updated
        setTimeout(() => {
          console.log('🚀 useAkool: Checking state after delay...');
        }, 100);
      } else {
        console.warn(`🚨 useAkool [${hookId.current}]: Component unmounted, skipping setState`);
      }
    } catch (err) {
      console.warn(`🚨 useAkool [${hookId.current}]: Failed to load avatars from API:`, err);
      // Set some default avatars if API fails
      const fallbackAvatars = [
        { id: 'avatar_1001', name: 'Professional Avatar', preview_url: null },
        { id: 'avatar_1002', name: 'Friendly Avatar', preview_url: null },
      ];
      
      if (mountedRef.current) {
        setAvailableAvatars(fallbackAvatars);
        console.log('🚀 useAkool: Using fallback avatars:', fallbackAvatars);
      }
    }
  }, []);

  // Initialize the Akool service
  const initializeService = useCallback(async () => {
    try {
      console.log(`🚀 useAkool [${hookId.current}]: Starting service initialization...`);
      console.log(`🚀 useAkool [${hookId.current}]: mountedRef.current at start:`, mountedRef.current);
      
      // Ensure we're mounted
      if (!mountedRef.current) {
        console.log(`🚨 useAkool [${hookId.current}]: Component not mounted, skipping initialization`);
        return;
      }
      
      setError(null);
      
      akoolService.initialize();
      console.log(`🚀 useAkool [${hookId.current}]: Service initialized, loading avatars...`);
      
      if (mountedRef.current) {
        setIsInitialized(true);
        console.log(`🚀 useAkool [${hookId.current}]: State updated to initialized`);
        
        // Load available avatars
        await loadAvatars();
        console.log(`🚀 useAkool [${hookId.current}]: Avatar loading completed`);
      }
    } catch (err) {
      console.error(`🚨 useAkool [${hookId.current}]: Initialization failed:`, err);
      if (mountedRef.current) {
        setError(`Failed to initialize Akool service: ${err.message}`);
      }
    }
  }, [loadAvatars]);

  // Create or get session for avatar
  const createSession = useCallback(async (avatarId) => {
    try {
      setError(null);
      const session = await akoolService.createSession(avatarId);
      if (mountedRef.current) {
        setCurrentSession(session);
      }
      return session;
    } catch (err) {
      if (mountedRef.current) {
        setError(`Failed to create session: ${err.message}`);
      }
      throw err;
    }
  }, []);

  

  // Cancel current generation
  const cancelGeneration = useCallback(() => {
    if (generationAbortRef.current) {
      generationAbortRef.current.abort();
    }
    setIsGenerating(false);
    setGenerationProgress(null);
  }, []);

  // Clear current video
  const clearVideo = useCallback(() => {
    setCurrentVideoUrl('');
    setGenerationProgress(null);
  }, []);

  // Close current session
  const closeSession = useCallback(async () => {
    if (currentSession) {
      try {
        await akoolService.closeSession(currentSession.id);
        if (mountedRef.current) {
          setCurrentSession(null);
        }
      } catch (err) {
        console.warn('Failed to close session:', err);
      }
    }
  }, [currentSession]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (generationAbortRef.current) {
        generationAbortRef.current.abort();
      }
      akoolService.cleanup();
    };
  }, []);

  // Get service status for debugging
  const getServiceStatus = useCallback(() => {
    return {
      isInitialized,
      cacheInfo: akoolService.getCacheInfo(),
    };
  }, [isInitialized]);

  return {
    // State
    isInitialized,
    availableAvatars,
    currentSession,
    isGenerating,
    currentVideoUrl,
    generationProgress,
    error,

    // Actions
    initializeService,
    createSession,
    cancelGeneration,
    clearVideo,
    closeSession,
    loadAvatars,

    // Utils
    getServiceStatus,
  };
};
