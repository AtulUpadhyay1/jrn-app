import React from 'react';

const StepProgress = ({ steps, currentStep }) => {
  return (
    <div className="w-full flex justify-between items-center relative px-4">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        const circleColor = isCompleted
          ? 'bg-green-500'
          : isActive
          ? 'bg-blue-500'
          : 'bg-gray-300';

        const textColor = isCompleted
          ? 'text-green-600'
          : isActive
          ? 'text-blue-600'
          : 'text-gray-500';

        return (
          <div key={index} className="relative flex-1 flex flex-col items-center">
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-1 -z-10">
                <div className="w-full h-full bg-gray-300">
                  <div
                    className={`h-full transition-all duration-300 ${
                      index < currentStep - 1 ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Circle */}
            <div
              className={`w-8 h-8 rounded-full ${circleColor} flex items-center justify-center text-white font-semibold z-10`}
            >
              {index + 1}
            </div>

            {/* Label */}
            <span className={`mt-2 text-xs text-center ${textColor}`}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
