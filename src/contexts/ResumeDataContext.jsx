import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { resumeService } from '../services/resumeService';

// Action types
const RESUME_ACTIONS = {
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_ERROR: 'FETCH_ERROR',
  UPDATE_SECTION: 'UPDATE_SECTION',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_SCORE: 'SET_SCORE',
};

// Initial state
const initialState = {
  data: {
    education: [],
    skills: [],
    communication: [],
    curriculum: [],
    projects: [],
    experience: [],
  },
  score: null,
  isLoading: false,
  error: null,
  lastFetchTime: null,
  cache: {
    timestamp: null,
    data: null,
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  },
};

// Reducer function
const resumeReducer = (state, action) => {
  switch (action.type) {
    case RESUME_ACTIONS.FETCH_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case RESUME_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        score: action.payload.score,
        isLoading: false,
        error: null,
        lastFetchTime: Date.now(),
        cache: {
          ...state.cache,
          data: action.payload,
          timestamp: Date.now(),
        },
      };

    case RESUME_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case RESUME_ACTIONS.UPDATE_SECTION:
      const updatedData = {
        ...state.data,
        [action.payload.section]: action.payload.data,
      };
      return {
        ...state,
        data: updatedData,
        cache: {
          ...state.cache,
          data: {
            data: updatedData,
            score: state.score,
          },
          timestamp: Date.now(),
        },
      };

    case RESUME_ACTIONS.SET_SCORE:
      return {
        ...state,
        score: action.payload,
        cache: {
          ...state.cache,
          data: {
            data: state.data,
            score: action.payload,
          },
          timestamp: Date.now(),
        },
      };

    case RESUME_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Create context
const ResumeDataContext = createContext();

// Provider component
export const ResumeDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Check if cache is valid
  const isCacheValid = useCallback(() => {
    if (!state.cache.data || !state.cache.timestamp) return false;
    return Date.now() - state.cache.timestamp < state.cache.CACHE_DURATION;
  }, [state.cache]);

  // Fetch all resume data
  const fetchResumeData = useCallback(async (forceRefresh = false) => {
    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && isCacheValid()) {
      dispatch({
        type: RESUME_ACTIONS.FETCH_SUCCESS,
        payload: state.cache.data,
      });
      return;
    }

    dispatch({ type: RESUME_ACTIONS.FETCH_START });

    try {
      // Use Promise.allSettled to handle individual API failures gracefully
      const [
        educationResult,
        skillsResult,
        communicationResult,
        curriculumResult,
        projectsResult,
        experienceResult,
        scoreResult
      ] = await Promise.allSettled([
        resumeService.getEducation(),
        resumeService.getSkills(),
        resumeService.getCommunication(),
        resumeService.getCurriculum(),
        resumeService.getProjects(),
        resumeService.getExperience(),
        resumeService.getResumeScore(),
      ]);

      const data = {
        education: educationResult.status === 'fulfilled' ? educationResult.value?.data || [] : [],
        skills: skillsResult.status === 'fulfilled' ? skillsResult.value?.data || [] : [],
        communication: communicationResult.status === 'fulfilled' ? communicationResult.value?.data || [] : [],
        curriculum: curriculumResult.status === 'fulfilled' ? curriculumResult.value?.data || [] : [],
        projects: projectsResult.status === 'fulfilled' ? projectsResult.value?.data || [] : [],
        experience: experienceResult.status === 'fulfilled' ? experienceResult.value?.data || [] : [],
      };

      const score = scoreResult.status === 'fulfilled' ? scoreResult.value : null;

      dispatch({
        type: RESUME_ACTIONS.FETCH_SUCCESS,
        payload: { data, score },
      });

      // Log any failed requests
      const failedRequests = [
        { name: 'education', result: educationResult },
        { name: 'skills', result: skillsResult },
        { name: 'communication', result: communicationResult },
        { name: 'curriculum', result: curriculumResult },
        { name: 'projects', result: projectsResult },
        { name: 'experience', result: experienceResult },
        { name: 'resume score', result: scoreResult },
      ].filter(({ result }) => result.status === 'rejected');

      if (failedRequests.length > 0) {
        console.warn('Some API calls failed:', failedRequests);
        const errorMessages = failedRequests.map(({ name, result }) => 
          `${name}: ${result.reason?.message || 'Unknown error'}`
        );
        dispatch({
          type: RESUME_ACTIONS.FETCH_ERROR,
          payload: `Failed to load: ${errorMessages.join(', ')}`,
        });
      }

    } catch (err) {
      console.error('Failed to fetch resume data:', err);
      dispatch({
        type: RESUME_ACTIONS.FETCH_ERROR,
        payload: 'Failed to load resume data. Please try again.',
      });
    }
  }, [isCacheValid, state.cache.data]);

  // Update specific section
  const updateSection = useCallback((section, data) => {
    dispatch({
      type: RESUME_ACTIONS.UPDATE_SECTION,
      payload: { section, data },
    });
  }, []);

  // Update resume score
  const updateScore = useCallback((score) => {
    dispatch({
      type: RESUME_ACTIONS.SET_SCORE,
      payload: score,
    });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: RESUME_ACTIONS.CLEAR_ERROR });
  }, []);

  // Refresh specific section
  const refreshSection = useCallback(async (section) => {
    const serviceMethodName = `get${section.charAt(0).toUpperCase() + section.slice(1)}`;
    
    if (!resumeService[serviceMethodName]) {
      console.error(`No service method found for section: ${section}`);
      return;
    }

    try {
      const response = await resumeService[serviceMethodName]();
      updateSection(section, response?.data || []);
    } catch (err) {
      console.error(`Failed to refresh ${section}:`, err);
      dispatch({
        type: RESUME_ACTIONS.FETCH_ERROR,
        payload: `Failed to refresh ${section}. Please try again.`,
      });
    }
  }, [updateSection]);

  const contextValue = {
    ...state,
    actions: {
      fetchResumeData,
      updateSection,
      updateScore,
      clearError,
      refreshSection,
    },
  };

  return (
    <ResumeDataContext.Provider value={contextValue}>
      {children}
    </ResumeDataContext.Provider>
  );
};

// Custom hook to use resume data context
export const useResumeDataContext = () => {
  const context = useContext(ResumeDataContext);
  
  if (!context) {
    throw new Error('useResumeDataContext must be used within a ResumeDataProvider');
  }
  
  return context;
};
