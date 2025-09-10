import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const schema = yup.object().shape({
  linkedin: yup.string().url("Please enter a valid LinkedIn URL"),
  twitter: yup.string().url("Please enter a valid Twitter URL"),
  github: yup.string().url("Please enter a valid GitHub URL"),
  personalWebsite: yup.string().url("Please enter a valid website URL"),
  instagram: yup.string().url("Please enter a valid Instagram URL"),
  youtube: yup.string().url("Please enter a valid YouTube URL"),
  behance: yup.string().url("Please enter a valid Behance URL"),
  dribbble: yup.string().url("Please enter a valid Dribbble URL"),
});

const socialPlatforms = [
  {
    name: "linkedin",
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/yourprofile",
    icon: "heroicons:user-group",
    color: "text-blue-600",
    description: "Professional networking"
  },
  {
    name: "twitter",
    label: "Twitter/X",
    placeholder: "https://twitter.com/yourusername",
    icon: "heroicons:at-symbol",
    color: "text-sky-500",
    description: "Professional updates and thoughts"
  },
  {
    name: "github",
    label: "GitHub",
    placeholder: "https://github.com/yourusername",
    icon: "heroicons:code-bracket",
    color: "text-gray-800 dark:text-gray-200",
    description: "Code repositories and projects"
  },
  {
    name: "personalWebsite",
    label: "Personal Website",
    placeholder: "https://yourwebsite.com",
    icon: "heroicons:globe-alt",
    color: "text-green-600",
    description: "Portfolio or personal blog"
  },
  {
    name: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/yourusername",
    icon: "heroicons:camera",
    color: "text-pink-600",
    description: "Visual content and lifestyle"
  },
  {
    name: "youtube",
    label: "YouTube",
    placeholder: "https://youtube.com/@yourchannel",
    icon: "heroicons:play",
    color: "text-red-600",
    description: "Video content and tutorials"
  },
  {
    name: "behance",
    label: "Behance",
    placeholder: "https://behance.net/yourprofile",
    icon: "heroicons:photo",
    color: "text-blue-500",
    description: "Creative portfolio"
  },
  {
    name: "dribbble",
    label: "Dribbble",
    placeholder: "https://dribbble.com/yourusername",
    icon: "heroicons:paint-brush",
    color: "text-pink-500",
    description: "Design showcase"
  },
];

const Social = ({ data, updateFormData, onNext, onPrevious, onStepSubmit, currentStep, totalSteps, submitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data.social || {},
  });

  // Update form when data changes (e.g., when API data is loaded)
  useEffect(() => {
    if (data.social) {
      reset(data.social);
    }
  }, [data.social, reset]);

  const watchedValues = watch();

  const onSubmit = async (formData) => {
    try {
      // Filter out empty URLs
      const filteredData = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value && value.trim() !== "") {
          acc[key] = value.trim();
        }
        return acc;
      }, {});

      // Submit data to API through parent component
      await onStepSubmit('social', filteredData);
      
      // If successful, proceed to next step
      onNext();
    } catch (error) {
      console.error("Failed to submit social links:", error);
      // You can add error handling UI here
    }
  };

  const skipSocial = async () => {
    try {
      const socialData = { skipped: true };
      
      // Submit skip data to API through parent component
      await onStepSubmit('social', socialData);
      
      // If successful, proceed to next step
      onNext();
    } catch (error) {
      console.error("Failed to skip social step:", error);
      // You can add error handling UI here
    }
  };

  const filledPlatforms = Object.entries(watchedValues).filter(([key, value]) => value && value.trim() !== "").length;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Social Media & Professional Links
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Connect your social media profiles to showcase your professional presence
        </p>
        {filledPlatforms > 0 && (
          <p className="text-sm text-primary-600 dark:text-primary-400 mt-2">
            {filledPlatforms} platform{filledPlatforms !== 1 ? 's' : ''} added
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {/* Social Media Platforms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialPlatforms.map((platform) => (
              <div key={platform.name} className="space-y-2">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon 
                    icon={platform.icon} 
                    className={`w-5 h-5 ${platform.color}`} 
                  />
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {platform.label}
                  </label>
                </div>
                <Textinput
                  type="url"
                  placeholder={platform.placeholder}
                  name={platform.name}
                  register={register}
                  error={errors[platform.name]}
                />
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {platform.description}
                </p>
              </div>
            ))}
          </div>

          {/* Privacy Notice */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Icon icon="heroicons:shield-check" className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h4 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  Privacy & Visibility
                </h4>
                <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                  <li>• Your social links will be visible on your public profile</li>
                  <li>• You can update or remove these links anytime from your settings</li>
                  <li>• Only add links to profiles you're comfortable sharing professionally</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Media Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h4 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-3">
              Social Media Best Practices
            </h4>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-start">
                <Icon icon="heroicons:check-circle" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Keep your professional profiles updated and active
              </li>
              <li className="flex items-start">
                <Icon icon="heroicons:check-circle" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Use professional profile photos and consistent branding
              </li>
              <li className="flex items-start">
                <Icon icon="heroicons:check-circle" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Share valuable content related to your industry
              </li>
              <li className="flex items-start">
                <Icon icon="heroicons:check-circle" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Engage meaningfully with your professional network
              </li>
            </ul>
          </div>

          {/* Platform Recommendations */}
          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6">
            <h4 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
              Recommended for Your Industry
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg">
                <Icon icon="heroicons:user-group" className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h5 className="font-medium text-slate-700 dark:text-slate-300">LinkedIn</h5>
                <p className="text-xs text-slate-500 mt-1">Essential for all professionals</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg">
                <Icon icon="heroicons:code-bracket" className="w-8 h-8 text-gray-700 dark:text-gray-300 mx-auto mb-2" />
                <h5 className="font-medium text-slate-700 dark:text-slate-300">GitHub</h5>
                <p className="text-xs text-slate-500 mt-1">Perfect for developers</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-700 rounded-lg">
                <Icon icon="heroicons:globe-alt" className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h5 className="font-medium text-slate-700 dark:text-slate-300">Website</h5>
                <p className="text-xs text-slate-500 mt-1">Showcase your portfolio</p>
              </div>
            </div>
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
          <div className="flex space-x-4">
            <Button
              type="button"
              text={submitting ? "Saving..." : "Skip Social Links"}
              className="btn-outline-secondary"
              onClick={skipSocial}
              disabled={submitting}
            />
            <Button
              type="submit"
              text={submitting ? "Saving..." : "Next: Subscriptions"}
              className="btn-primary"
              disabled={submitting}
            />
          </div>
        </div>

        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          Step {currentStep} of {totalSteps}
        </div>
      </form>
    </div>
  );
};

export default Social;
