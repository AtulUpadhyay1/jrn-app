import { useState, useEffect, useCallback } from 'react';
import { resumeService } from '../services/resumeService';

// Cache object to store API responses
const resumeDataCache = {
  data: null,
  timestamp: null,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};

export const useResumeData = () => {
  const [resumeData, setResumeData] = useState({
    education: [],
    skills: [],
    communication: [],
    curriculum: [],
    projects: [],
    experience: [],
  });
  
  const [resumeScore, setResumeScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  // Check if cache is valid
  const isCacheValid = useCallback(() => {
    if (!resumeDataCache.data || !resumeDataCache.timestamp) return false;
    return Date.now() - resumeDataCache.timestamp < resumeDataCache.CACHE_DURATION;
  }, []);

  // Fetch all resume data with optimized API calls
  const fetchResumeData = useCallback(async (forceRefresh = false) => {
    // Return cached data if valid and not forcing refresh
    if (!forceRefresh && isCacheValid()) {
      setResumeData(resumeDataCache.data.resumeData);
      setResumeScore(resumeDataCache.data.resumeScore);
      setLastFetchTime(resumeDataCache.timestamp);
      return;
    }

    setIsLoading(true);
    setError(null);

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

      const newResumeData = {
        education: educationResult.status === 'fulfilled' ? educationResult.value?.data || [] : [],
        skills: skillsResult.status === 'fulfilled' ? skillsResult.value?.data || [] : [],
        communication: communicationResult.status === 'fulfilled' ? communicationResult.value?.data || [] : [],
        curriculum: curriculumResult.status === 'fulfilled' ? curriculumResult.value?.data || [] : [],
        projects: projectsResult.status === 'fulfilled' ? projectsResult.value?.data || [] : [],
        experience: experienceResult.status === 'fulfilled' ? experienceResult.value?.data || [] : [],
      };

      const newResumeScore = scoreResult.status === 'fulfilled' ? scoreResult.value : null;

      // Update state
      setResumeData(newResumeData);
      setResumeScore(newResumeScore);

      // Update cache
      const timestamp = Date.now();
      resumeDataCache.data = {
        resumeData: newResumeData,
        resumeScore: newResumeScore,
      };
      resumeDataCache.timestamp = timestamp;
      setLastFetchTime(timestamp);

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
        setError(`Failed to load: ${errorMessages.join(', ')}`);
      }

    } catch (err) {
      console.error('Failed to fetch resume data:', err);
      setError('Failed to load resume data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isCacheValid]);

  // Refresh specific section of resume data
  const refreshSection = useCallback(async (section) => {
    if (!resumeService[`get${section.charAt(0).toUpperCase() + section.slice(1)}`]) {
      console.error(`No service method found for section: ${section}`);
      return;
    }

    try {
      const response = await resumeService[`get${section.charAt(0).toUpperCase() + section.slice(1)}`]();
      
      setResumeData(prev => ({
        ...prev,
        [section]: response?.data || [],
      }));

      // Update cache if it exists
      if (resumeDataCache.data) {
        resumeDataCache.data.resumeData[section] = response?.data || [];
        resumeDataCache.timestamp = Date.now();
      }

    } catch (err) {
      console.error(`Failed to refresh ${section}:`, err);
      setError(`Failed to refresh ${section}. Please try again.`);
    }
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    fetchResumeData();
  }, [fetchResumeData]);

  // Update resume data section
  const updateResumeData = useCallback((section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data,
    }));

    // Update cache
    if (resumeDataCache.data) {
      resumeDataCache.data.resumeData[section] = data;
    }
  }, []);

  return {
    resumeData,
    resumeScore,
    isLoading,
    error,
    lastFetchTime,
    fetchResumeData,
    refreshSection,
    updateResumeData,
    clearError: () => setError(null),
  };
};
