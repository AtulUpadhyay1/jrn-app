import React from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Badge from "@/components/ui/Badge";

const Summary = ({ data, onPrevious, onSubmit, onStepSubmit, currentStep, totalSteps, submitting }) => {
  const { basicProfile, careerPreferences, purposePathways, resume, video, social, subscriptions } = data;

  const getSectionStatus = (sectionData) => {
    if (!sectionData || Object.keys(sectionData).length === 0) {
      return { status: "incomplete", color: "gray", icon: "heroicons:minus" };
    }
    if (sectionData.skipped) {
      return { status: "skipped", color: "yellow", icon: "heroicons:forward" };
    }
    return { status: "complete", color: "green", icon: "heroicons:check" };
  };

  const sections = [
    {
      title: "Basic Profile",
      data: basicProfile,
      items: basicProfile ? [
        `${basicProfile.firstName} ${basicProfile.lastName}`,
        basicProfile.email,
        basicProfile.location,
        basicProfile.phone,
      ].filter(Boolean) : [],
    },
    {
      title: "Career Preferences",
      data: careerPreferences,
      items: careerPreferences ? [
        careerPreferences.currentPosition,
        careerPreferences.desiredPosition,
        careerPreferences.industry,
        careerPreferences.experienceLevel,
      ].filter(Boolean) : [],
    },
    {
      title: "Purpose & Pathways",
      data: purposePathways,
      items: purposePathways ? [
        purposePathways.primaryPurposeCareerDevelopment && `Primary Purpose: ${purposePathways.primaryPurposeCareerDevelopment}`,
        purposePathways.careerGoals && "Career goals defined",
        purposePathways.motivatesProfessionally && "Professional motivation described",
      ].filter(Boolean) : [],
    },
    {
      title: "Resume & Portfolio",
      data: resume,
      items: resume ? [
        resume.resume && "Resume uploaded",
        resume.linkedinUrl && "LinkedIn profile added",
        resume.portfolioUrl && "Portfolio URL added",
        resume.additionalNotes && "Additional notes provided",
      ].filter(Boolean) : [],
    },
    {
      title: "Video Introduction",
      data: video,
      items: video ? [
        video.videoIntroduction && !video.skipped && "Video introduction added",
        video.skipped && "Video step skipped",
      ].filter(Boolean) : [],
    },
    {
      title: "Social Media Links",
      data: social,
      items: social ? Object.entries(social)
        .filter(([key, value]) => key !== 'skipped' && value)
        .map(([platform, url]) => {
          const platformName = platform === 'personalWebsite' ? 'Website' : 
                              platform.charAt(0).toUpperCase() + platform.slice(1);
          return `${platformName} profile`;
        })
        .concat(social.skipped ? ["Social links skipped"] : []) : [],
    },
    {
      title: "Subscription Plan",
      data: subscriptions,
      items: subscriptions ? [
        subscriptions.selectedPlan && `${subscriptions.selectedPlan.charAt(0).toUpperCase() + subscriptions.selectedPlan.slice(1)} plan selected`,
        subscriptions.billingCycle && `${subscriptions.billingCycle.charAt(0).toUpperCase() + subscriptions.billingCycle.slice(1)} billing`,
      ].filter(Boolean) : [],
    },
  ];

  const completedSections = sections.filter(section => 
    getSectionStatus(section.data).status === "complete"
  ).length;

  const completionPercentage = Math.round((completedSections / sections.length) * 100);

  const handleCompleteProfile = async () => {
    try {
      // Mark profile as completed with final step
      const summaryData = {
        completed: true,
        completionDate: new Date().toISOString(),
        completionPercentage,
        sectionsCompleted: completedSections,
        totalSections: sections.length,
      };
      
      // Submit final completion data to API through parent component
      await onStepSubmit('summary', summaryData);
      
      // Call the final onSubmit handler
      onSubmit();
    } catch (error) {
      console.error("Failed to complete profile setup:", error);
      // You can add error handling UI here
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Profile Setup Summary
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Review your information before completing your profile
        </p>
        
        {/* Progress Overview */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg p-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {completionPercentage}%
              </div>
              <div className="text-sm text-primary-700 dark:text-primary-300">
                Complete
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-700 dark:text-slate-300">
                {completedSections}/{sections.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Sections
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white dark:bg-slate-700 rounded-full h-3">
            <div 
              className="bg-primary-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sections Summary */}
      <div className="space-y-6">
        {sections.map((section, index) => {
          const sectionStatus = getSectionStatus(section.data);
          
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${sectionStatus.color}-100 dark:bg-${sectionStatus.color}-900/20`}>
                    <Icon 
                      icon={sectionStatus.icon} 
                      className={`w-4 h-4 text-${sectionStatus.color}-600 dark:text-${sectionStatus.color}-400`} 
                    />
                  </div>
                  <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
                    {section.title}
                  </h3>
                </div>
                
                <Badge 
                  text={sectionStatus.status} 
                  className={`bg-${sectionStatus.color}-100 text-${sectionStatus.color}-800 dark:bg-${sectionStatus.color}-900/20 dark:text-${sectionStatus.color}-300`}
                />
              </div>

              {section.items.length > 0 ? (
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                      <Icon icon="heroicons:check-circle" className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-500 italic">
                  No information provided for this section
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h4 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-3">
          What happens next?
        </h4>
        <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <li className="flex items-start">
            <Icon icon="heroicons:1" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
            Your profile will be created and made available to employers
          </li>
          <li className="flex items-start">
            <Icon icon="heroicons:2" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
            You'll receive an email confirmation with your profile details
          </li>
          <li className="flex items-start">
            <Icon icon="heroicons:3" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
            Start exploring job opportunities that match your preferences
          </li>
          <li className="flex items-start">
            <Icon icon="heroicons:4" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
            You can update your profile anytime from your dashboard
          </li>
        </ul>
      </div>

      {/* Terms and Conditions */}
      <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="terms"
            className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="text-sm text-slate-600 dark:text-slate-400">
            I agree to the{" "}
            <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
              Privacy Policy
            </a>
            . I understand that my profile information will be used to match me with relevant job opportunities.
          </label>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          text="Previous"
          className="btn-outline-dark"
          onClick={onPrevious}
          disabled={submitting}
        />
        <Button
          type="button"
          text={submitting ? "Completing..." : "Complete Profile Setup"}
          className="btn-primary btn-lg"
          onClick={handleCompleteProfile}
          icon="heroicons:check"
          disabled={submitting}
        />
      </div>

      <div className="text-center text-sm text-slate-500 dark:text-slate-400">
        Step {currentStep} of {totalSteps} - Final Step
      </div>
    </div>
  );
};

export default Summary;
