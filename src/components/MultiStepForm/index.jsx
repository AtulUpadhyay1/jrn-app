import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StepNavigation from "./StepNavigation";
import BasicProfile from "./steps/BasicProfile";
import CareerPreferences from "./steps/CareerPreferences";
import PurposePathways from "./steps/PurposePathways";
import Resume from "./steps/Resume";
import Social from "./steps/Social";
import Subscriptions from "./steps/Subscriptions";
import Summary from "./steps/Summary";
import Card from "@/components/ui/Card";
import { onboardingService } from "@/services/onboardingService";
import Loading from "@/components/Loading";

const MultiStepForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    basicProfile: {},
    careerPreferences: {},
    purposePathways: {},
    resume: {},
    social: {},
    subscriptions: {},
  });

  const steps = [
    { id: 1, title: "Basic Profile", component: BasicProfile, url: "basic-profile" },
    { id: 2, title: "Career Preferences", component: CareerPreferences, url: "career-preferences" },
    { id: 3, title: "Purpose & Pathways", component: PurposePathways, url: "purpose-pathways" },
    { id: 4, title: "Resume", component: Resume, url: "resume" },
    { id: 5, title: "Social", component: Social, url: "social" },
    { id: 6, title: "Subscriptions", component: Subscriptions, url: "subscriptions" },
    { id: 7, title: "Summary", component: Summary, url: "summary" },
  ];

  // Get current step from URL
  const getCurrentStepFromUrl = () => {
    const pathname = location.pathname;
    if (pathname === "/profile-setup") {
      return 1; // Default to first step for legacy route
    }
    
    const urlParts = pathname.split('/');
    const stepUrl = urlParts[urlParts.length - 1];
    const step = steps.find(s => s.url === stepUrl);
    return step ? step.id : 1;
  };

  const [currentStep, setCurrentStep] = useState(getCurrentStepFromUrl());

  // Load onboarding data on component mount
  useEffect(() => {
    const loadOnboardingData = async () => {
      try {
        setLoading(true);
        const apiData = await onboardingService.getOnboardingData();
        const transformedData = onboardingService.transformApiDataToFormData(apiData);
        
        setFormData(transformedData);
        
        // Set current step from API if available
        if (transformedData.currentStep) {
          const step = steps.find(s => s.id === transformedData.currentStep);
          if (step && location.pathname === "/profile-setup") {
            navigate(`/onboarding/${step.url}`, { replace: true });
          }
        }
      } catch (error) {
        console.error("Failed to load onboarding data:", error);
        // Continue with empty form data if API fails
      } finally {
        setLoading(false);
      }
    };

    loadOnboardingData();
  }, []);

  // Update current step when URL changes
  useEffect(() => {
    const newStep = getCurrentStepFromUrl();
    setCurrentStep(newStep);
    
    // Redirect legacy route to new structure
    if (location.pathname === "/profile-setup" && !loading) {
      navigate("/onboarding/basic-profile", { replace: true });
    }
  }, [location.pathname, navigate, loading]);

  // Navigate to step URL
  const goToStep = (stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= steps.length) {
      const step = steps.find(s => s.id === stepNumber);
      if (step) {
        navigate(`/onboarding/${step.url}`);
      }
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStep = steps.find(s => s.id === currentStep + 1);
      if (nextStep) {
        navigate(`/onboarding/${nextStep.url}`);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = steps.find(s => s.id === currentStep - 1);
      if (prevStep) {
        navigate(`/onboarding/${prevStep.url}`);
      }
    }
  };

  const updateFormData = (stepKey, data) => {
    setFormData(prev => ({
      ...prev,
      [stepKey]: { ...prev[stepKey], ...data }
    }));
  };

  const handleStepSubmit = async (stepKey, data) => {
    try {
      setSubmitting(true);
      
      // Check if data is FormData (for file uploads)
      if (data instanceof FormData) {
        // For FormData, send directly to API without transformation
        await onboardingService.updateOnboardingDataWithFiles(data, currentStep);
      } else {
        // Update local form data for regular data
        updateFormData(stepKey, data);
        
        // Transform data for API
        const apiData = onboardingService.transformFormDataToApiData(data, stepKey);
        
        // Submit to API
        await onboardingService.updateOnboardingData(apiData, currentStep);
      }
      
      console.log("Step data submitted successfully");
      return true;
    } catch (error) {
      console.error("Failed to submit step data:", error);
      // You might want to show an error message to the user here
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = () => {
    console.log("Final form data:", formData);
    // Handle final form submission here
    // Redirect to dashboard after successful profile setup
    navigate("/dashboard");
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <StepNavigation 
        steps={steps} 
        currentStep={currentStep} 
        goToStep={goToStep}
      />
      
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
          <div className="p-6 md:p-8">
            <CurrentStepComponent
              data={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onSubmit={handleSubmit}
              onStepSubmit={handleStepSubmit}
              currentStep={currentStep}
              totalSteps={steps.length}
              submitting={submitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
