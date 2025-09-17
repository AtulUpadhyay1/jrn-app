import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumePreviewTwo from './ResumePreviewTwo'; 
import SummaryView from './SummaryView';
import { Button } from '@headlessui/react';
import ResumeScoreView from './ResumeScoreView';
import useProfile from '@/hooks/useProfile';
import { useResumeDataContext } from '@/contexts/ResumeDataContext';

const ResumePageWithContext = () => {
  const [activeTab, setActiveTab] = useState("resume");
  const navigate = useNavigate();

  // Use context for resume data
  const {
    data: resumeData,
    score: resumeScore,
    isLoading,
    error,
    lastFetchTime,
    actions: { fetchResumeData, clearError }
  } = useResumeDataContext();

  // Use profile hook
  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useProfile();

  // Auto-fetch on mount
  useEffect(() => {
    fetchResumeData();
  }, [fetchResumeData]);

  // Handle refresh with user feedback
  const handleRefresh = useCallback(() => {
    fetchResumeData(true); // Force refresh
  }, [fetchResumeData]);

  // Memoize loading state for better UX
  const isAnyDataLoading = isLoading || isProfileLoading;

  return (
    <>
      {/* Heading and button */}
      <div className="p-4 flex flex-row items-center">
        <h2 className="text-xl font-semibold">Resume Builder</h2>
        <div className="ml-auto flex gap-2">
          {/* Refresh button */}
          <Button 
            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
            onClick={handleRefresh}
            disabled={isAnyDataLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </Button>
          
          {/* Edit Resume button */}
          <Button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate("/resume-builder")}
          >
            Edit Resume
          </Button>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="mx-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4 flex justify-between items-center">
          <span>{error}</span>
          <button 
            onClick={clearError}
            className="text-red-700 hover:text-red-900 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Last update time */}
      {lastFetchTime && !isLoading && (
        <div className="mx-4 text-sm text-gray-500 mb-2">
          Last updated: {new Date(lastFetchTime).toLocaleString()}
        </div>
      )}

      <div className="flex h-screen">
        {/* Left Side: Resume Score */}
        <div className="w-1/2 p-6 overflow-y-auto bg-gray-100">
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3">Loading resume data...</span>
            </div>
          )}
          
          {!isLoading && resumeScore && (
            <ResumeScoreView data={resumeScore} />
          )}
          
          {!isLoading && !resumeScore && !error && (
            <div className="text-center py-8 text-gray-500">
              No resume score available
            </div>
          )}
        </div>

        {/* Right Side: Preview */}
        <div className="w-1/2 bg-white p-6 overflow-y-auto">
          {/* Tabs */}
          <div className="flex mb-4 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("resume")}
              className={`w-1/2 py-2 font-semibold ${
                activeTab === "resume"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Resume
            </button>
            <button
              onClick={() => setActiveTab("summary")}
              className={`w-1/2 py-2 font-semibold ${
                activeTab === "summary"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500"
              }`}
            >
              Summary
            </button>
          </div>

          {/* Content */}
          <div className="mt-4">
            {isAnyDataLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="ml-3">Loading {activeTab}...</span>
              </div>
            ) : profileError ? (
              <div className="text-center py-8 text-red-500">
                Failed to load profile data
              </div>
            ) : !profileData ? (
              <div className="text-center py-8 text-gray-500">
                No profile data available
              </div>
            ) : (
              <>
                {activeTab === "resume" ? (
                  <ResumePreviewTwo data={resumeData} profile={profileData} />
                ) : (
                  <SummaryView data={resumeData} profile={profileData} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumePageWithContext;
