import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ResumePreview from './ResumePreview'; 
import ResumePreviewTwo from './ResumePreviewTwo'; 
import Personal from './steps/Personal';
import Education from './steps/Education';
import Skills from './steps/Skills';
import Communication from './steps/Communication';
import Curriculum from './steps/Curriculum';
import Projects from './steps/Projects';
import Experience from './steps/Experience';

import { useEffect } from 'react';
import StepNavigation from '@/components/MultiStepForm/StepNavigation';






const steps = [
  { id: 1, title: "Personal", component: Personal, url: "personal" },
  { id: 2, title: "Education", component: Education, url: "education" },
  { id: 3, title: "Skills", component: Skills, url: "skills" },
  { id: 4, title: "Communication", component: Communication, url: "communication" },
  { id: 5, title: "Curriculum", component: Curriculum, url: "curriculum" },
  { id: 6, title: "Projects", component: Projects, url: "projects" },
  { id: 7, title: "Experience", component: Experience, url: "experience" },
];

const templates = ['Template 1', 'Template 2', 'Template 3'];

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    
    education: [],
    skills: [],
    communication: [],
    curriculum: [],
    projects: [],
    experience: [],
  });
  const [template, setTemplate] = useState(templates[0]);

  const [submitting, setSubmitting] = useState(false);
    
  

  const navigate = useNavigate();
  const location = useLocation();

  // Get step from URL
  const getCurrentStepFromUrl = () => {
    const stepUrl = location.pathname.split("/").pop();
    const step = steps.find((s) => s.url === stepUrl);
    return step ? step.id : 1;
  };

  const [currentStep, setCurrentStep] = useState(getCurrentStepFromUrl());

  // Sync step when URL changes
  useEffect(() => {
    setCurrentStep(getCurrentStepFromUrl());
  }, [location.pathname]);

  const goToStep = (stepNumber) => {
    const step = steps.find((s) => s.id === stepNumber);
    if (step) navigate(`/resume-builder/${step.url}`);
  };

  const handleNext = () => goToStep(currentStep + 1);
  const handlePrevious = () => goToStep(currentStep - 1);

  const CurrentStepComponent = steps[currentStep - 1].component;

  const handleStepSubmit = (data) => {
    setResumeData((prevData) => ({
      ...prevData,
      [steps[currentStep - 1].url]: data,
    }));
    handleNext();
  };

  const updateFormData = (newData) => {
    setResumeData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const handleSubmit = async (data) => {
      setSubmitting(true);
      try {
          //await saveResumeData(data);
          alert("Resume saved successfully!");
      } catch (error) {
          console.error("Error saving resume:", error);
          alert("Failed to save resume.");
      } finally {
          setSubmitting(false);
      }
  };


  return (
    <>
      <StepNavigation
        steps={steps}
        currentStep={currentStep}
        goToStep={goToStep}
      />
        <div className="flex justify-between items-center mb-4"/>
      <div className="flex h-screen">
      {/* Left Side: Form */}
      <div className="w-full p-6 overflow-y-auto bg-gray-100">
        <h2 className="text-xl font-semibold mb-4"></h2>
        
        <CurrentStepComponent
          data={resumeData}
          updateFormData={updateFormData}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
          onStepSubmit={handleStepSubmit} // ✅ you pass this
          currentStep={currentStep}
          totalSteps={steps.length}
          submitting={submitting}
      />
        
      </div>

      {/* Right Side: Preview */}
      
      <div className=" bg-white">
        <div className=" flex justify-between items-center mb-4">
          {/* <h6 className="text-lg font-bold">Resume Preview</h6> */}
          {/* <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="border px-2 py-1"
          >
            {templates.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select> */}
        </div>

        {/* {template === 'Template 1' ? (
          <ResumePreviewTwo data={resumeData} />
        ) : (
          <ResumePreview resumeData={resumeData} />
        )} */}
        

      </div>
    </div>
    </>
  );
};

export default Resume;
