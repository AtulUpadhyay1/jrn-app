import React from "react";
import Icon from "@/components/ui/Icon";

const StepNavigation = ({ steps, currentStep, goToStep }) => {
  return (
    <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-3 px-4 sticky top-0 z-10 shadow-sm">
      <div className="max-w-5xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 mb-1">
            <span>Step {currentStep} of {steps.length}</span>
            <span>{Math.round((currentStep / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-1 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Navigation */}
        <div className="relative">
          {/* Mobile: Current Step Only */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {currentStep}
                </div>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {steps[currentStep - 1]?.title}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop: Full Navigation */}
          <div className="hidden sm:flex items-center justify-between relative">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div 
                  className={`step-nav-item cursor-pointer flex flex-col items-center group transition-all duration-300 relative ${
                    currentStep === step.id ? 'step-active' : 
                    currentStep > step.id ? 'step-completed' : 'step-inactive'
                  } ${currentStep < step.id ? 'pointer-events-none' : ''}`}
                  onClick={() => goToStep(step.id)}
                >
                  {/* Step Circle */}
                  <div className="relative mb-1.5 z-20">
                    <div className={`step-indicator relative z-30 flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full text-xs font-semibold transition-all duration-300 transform group-hover:scale-105 ${
                      currentStep === step.id 
                        ? 'bg-primary-500 text-white shadow-sm ring-1 ring-primary-200 dark:ring-primary-800' 
                        : currentStep > step.id 
                          ? 'bg-success-500 text-white shadow-sm' 
                          : 'bg-gray-200 text-gray-600 dark:bg-slate-600 dark:text-slate-300 group-hover:bg-gray-300 dark:group-hover:bg-slate-500'
                    }`}>
                      {currentStep > step.id ? (
                        <Icon icon="heroicons:check" className="w-3.5 h-3.5" />
                      ) : (
                        <span className="font-bold text-xs">{step.id}</span>
                      )}
                    </div>
                    
                    {/* Lock icon for future steps */}
                    {currentStep < step.id && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gray-400 dark:bg-slate-500 rounded-full flex items-center justify-center z-40">
                        <Icon icon="heroicons:lock-closed" className="w-1.5 h-1.5 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Step Title */}
                  <div className="text-center max-w-14 md:max-w-16">
                    <span className={`step-nav-text text-xs font-medium leading-tight transition-all duration-300 block ${
                      currentStep === step.id 
                        ? 'text-primary-600 dark:text-primary-400' 
                        : currentStep > step.id 
                          ? 'text-success-600 dark:text-success-400' 
                          : 'text-gray-500 dark:text-slate-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                </div>
                
                {/* Connection Line between steps */}
                {index < steps.length - 1 && (
                  <div className="flex-1 flex items-center px-2 z-10" style={{ marginTop: '-10px' }}>
                    <div className={`w-full h-0.5 rounded-full transition-all duration-500 ${
                      currentStep > step.id + 1
                        ? 'bg-success-500' 
                        : currentStep === step.id + 1 
                          ? 'bg-gradient-to-r from-success-500 to-gray-300 dark:to-slate-600' 
                          : 'bg-gray-300 dark:bg-slate-600'
                    }`} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepNavigation;
