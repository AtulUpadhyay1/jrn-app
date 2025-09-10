import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";

const schema = yup.object().shape({
  currentPosition: yup.string().required("Current position is required"),
  experienceLevel: yup.string().required("Experience level is required"),
  industry: yup.string().required("Industry is required"),
  desiredPosition: yup.string().required("Desired position is required"),
  workLocationPreference: yup.string().required("Work location preference is required"),
  expectedSalaryRange: yup.string().required("Salary range is required"),
});

const experienceLevels = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior Level (6-10 years)" },
  { value: "lead", label: "Lead/Principal (10+ years)" },
  { value: "executive", label: "Executive/C-Level" },
];

const industries = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance & Banking" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "consulting", label: "Consulting" },
  { value: "marketing", label: "Marketing & Advertising" },
  { value: "other", label: "Other" },
];

const workLocationOptions = [
  { value: "remote", label: "Remote" },
  { value: "onsite", label: "On-site" },
  { value: "hybrid", label: "Hybrid" },
  { value: "flexible", label: "Flexible" },
];

const salaryRanges = [
  { value: "0-30k", label: "$0 - $30,000" },
  { value: "30k-50k", label: "$30,000 - $50,000" },
  { value: "50k-75k", label: "$50,000 - $75,000" },
  { value: "75k-100k", label: "$75,000 - $100,000" },
  { value: "100k-150k", label: "$100,000 - $150,000" },
  { value: "150k+", label: "$150,000+" },
];

const CareerPreferences = ({ data, updateFormData, onNext, onPrevious, onStepSubmit, currentStep, totalSteps, submitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data.careerPreferences || {},
  });

  // Update form when data changes (e.g., when API data is loaded)
  useEffect(() => {
    if (data.careerPreferences) {
      reset(data.careerPreferences);
    }
  }, [data.careerPreferences, reset]);

  const onSubmit = async (formData) => {
    try {
      // Submit data to API through parent component
      await onStepSubmit('careerPreferences', formData);
      
      // If successful, proceed to next step
      onNext();
    } catch (error) {
      console.error("Failed to submit career preferences:", error);
      // You can add error handling UI here
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Career Preferences
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Tell us about your career goals and preferences
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Textinput
            label="Current Role/Position"
            type="text"
            placeholder="e.g., Software Developer, Marketing Manager"
            name="currentPosition"
            register={register}
            error={errors.currentPosition}
          />

          <Select
            label="Experience Level"
            name="experienceLevel"
            register={register}
            error={errors.experienceLevel}
            options={experienceLevels}
          />

          <Select
            label="Industry"
            name="industry"
            register={register}
            error={errors.industry}
            options={industries}
          />

          <Textinput
            label="Desired Role/Position"
            type="text"
            placeholder="What role are you looking for?"
            name="desiredPosition"
            register={register}
            error={errors.desiredPosition}
          />

          <Select
            label="Work Location Preference"
            name="workLocationPreference"
            register={register}
            error={errors.workLocationPreference}
            options={workLocationOptions}
          />

          <Select
            label="Expected Salary Range"
            name="expectedSalaryRange"
            register={register}
            error={errors.expectedSalaryRange}
            options={salaryRanges}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
            Job Type Preferences (Select all that apply)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Checkbox
              label="Full-time"
              name="jobTypePreferences.fullTime"
              value={watch("jobTypePreferences.fullTime") || false}
              onChange={(e) => setValue("jobTypePreferences.fullTime", e.target.checked)}
            />
            <Checkbox
              label="Part-time"
              name="jobTypePreferences.partTime"
              value={watch("jobTypePreferences.partTime") || false}
              onChange={(e) => setValue("jobTypePreferences.partTime", e.target.checked)}
            />
            <Checkbox
              label="Contract"
              name="jobTypePreferences.contract"
              value={watch("jobTypePreferences.contract") || false}
              onChange={(e) => setValue("jobTypePreferences.contract", e.target.checked)}
            />
            <Checkbox
              label="Freelance"
              name="jobTypePreferences.freelance"
              value={watch("jobTypePreferences.freelance") || false}
              onChange={(e) => setValue("jobTypePreferences.freelance", e.target.checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
            Skills & Technologies
          </h3>
          <Textinput
            label="Key Skills"
            type="text"
            placeholder="e.g., JavaScript, React, Project Management (comma separated)"
            name="skillsTechnologies"
            register={register}
          />
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
            type="submit"
            text={submitting ? "Saving..." : "Next: Purpose & Pathways"}
            className="btn-primary"
            disabled={submitting}
          />
        </div>

        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          Step {currentStep} of {totalSteps}
        </div>
      </form>
    </div>
  );
};

export default CareerPreferences;
