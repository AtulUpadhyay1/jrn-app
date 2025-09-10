import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ResumePreview from './ResumePreview'; 
import ResumePreviewTwo from './ResumePreviewTwo'; 
import SummaryView from './SummaryView';
import Personal from './steps/Personal';
import Education from './steps/Education';
import Skills from './steps/Skills';
import Communication from './steps/Communication';
import Curriculum from './steps/Curriculum';
import Projects from './steps/Projects';
import Experience from './steps/Experience';
import { resumeService } from '../../services/resumeService';

import { useEffect } from 'react';
import StepNavigation from '@/components/MultiStepForm/StepNavigation';
import { Button } from '@headlessui/react';
import ResumeScoreView from './ResumeScoreView';
import  useProfile  from '@/hooks/useProfile';
import { set } from 'date-fns';









const templates = ['Template 1', 'Template 2', 'Template 3'];

const ResumePage = () => {
  const [resumeData, setResumeData] = useState({
    
    education: [],
    skills: [],
    communication: [],
    curriculum: [],
    projects: [],
    experience: [],
  });
  const [resumeScore, setResumeScore] = useState(null);
  const [template, setTemplate] = useState(templates[0]);

  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useProfile();

  const [isScoreLoading, setIsScoreLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Setting Education data

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await resumeService.getEducation();
          setResumeData((prevData) => ({
            ...prevData,
            education: response.data || [],
          }));

        } catch (err) {
          console.error("Failed to fetch education data", err);
        }
      };
      fetchData();

    }, []);

    // setting skills
    useEffect(() => {
      const fetchSkills = async () => {
        try {
          const response = await resumeService.getSkills();
          setResumeData((prevData) => ({
            ...prevData,
            skills: response.data || [],
          }));
        } catch (err) {
          console.error("Failed to fetch skills data", err);
        }
      };
      fetchSkills();
    }, []);

    // setting communication
    useEffect(() => {
      const fetchCommunication = async () => {
        try {
          const response = await resumeService.getCommunication();
          setResumeData((prevData) => ({
            ...prevData,
            communication: response.data || [],
          }));
        } catch (err) {
          console.error("Failed to fetch communication data", err);
        }
      };
      fetchCommunication();
    }, []);

    // setting curriculum
    useEffect(() => {
      const fetchCurriculum = async () => {
        try {
          const response = await resumeService.getCurriculum();
          setResumeData((prevData) => ({
            ...prevData,
            curriculum: response.data || [],
          }));
        } catch (err) {
          console.error("Failed to fetch curriculum data", err);
        }
      };
      fetchCurriculum();
    }, []);

    // setting projects
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await resumeService.getProjects();
          setResumeData((prevData) => ({
            ...prevData,
            projects: response.data || [],
          }));
        } catch (err) {
          console.error("Failed to fetch projects data", err);
        }
      };
      fetchProjects();
    }, []);

    // setting experience
    useEffect(() => {
      const fetchExperience = async () => {
        try {
          const response = await resumeService.getExperience();
          setResumeData((prevData) => ({
            ...prevData,
            experience: response.data || [],
          }));
        } catch (err) {
          console.error("Failed to fetch experience data", err);
        }
      };
      fetchExperience();
    }, []);

    // get resume score api in useEffect
    useEffect(() => {
      const fetchResumeScore = async () => {
        try {
          setIsScoreLoading(true);
          const response = await resumeService.getResumeScore();
          setIsScoreLoading(false);
          setResumeScore(response);
        } catch (err) {
          console.error("Failed to fetch resume score", err);
        } finally {
          setIsScoreLoading(false);
        }
      };
      fetchResumeScore();
    }, []);

  
    const [activeTab, setActiveTab] = useState("resume");

  return (
    <>
      {/* Heading and button */}
      <div className="p-4 flex flex-row items-center">
        <h2 className="text-xl font-semibold">Resume Builder</h2>
        <Button 
        className="ml-auto bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => navigate("/resume-builder")}>
          Edit Resume
        </Button>
      </div>
      <div className="flex h-screen">
      {/* Left Side: Form */}
      <div className="w-1/2 p-6 overflow-y-auto bg-gray-100">
      {/* if resume score not null pass this data in <ResumeScoreView /> */}
      {isScoreLoading && <p>Loading...</p>}
      {resumeScore && <ResumeScoreView data={resumeScore} />}

      </div>

      {/* Right Side: Preview */}
      {/* <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="border px-2 py-1"
          >
            {templates.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select> */}
          {/* {template === 'Template 1' ? (
          <ResumePreviewTwo data={resumeData} />
        ) : (
          <ResumePreview resumeData={resumeData} />
        )} */}
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
        {activeTab === "resume" ? (
          !profileData ? (
            <p className="text-gray-500">Loading Resume...</p>
          ) : (
            <ResumePreviewTwo data={resumeData} profile={profileData} />
          )
        ) : (
          <SummaryView data={resumeData} profile={profileData} />
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default ResumePage;
