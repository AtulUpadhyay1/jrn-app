import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textarea from "@/components/ui/Textarea";
import Radio from "@/components/ui/Radio";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";

const schema = yup.object().shape({
  careerGoals: yup.string().required("Career goals are required"),
  motivatesProfessionally: yup.string().required("Professional motivation is required"),
});

const PurposePathways = ({ data, updateFormData, onNext, onPrevious, onStepSubmit, currentStep, totalSteps, submitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data.purposePathways || {},
  });

  // Update form when data changes (e.g., when API data is loaded)
  useEffect(() => {
    if (data.purposePathways) {
      reset(data.purposePathways);
    }
  }, [data.purposePathways, reset]);

  const onSubmit = async (formData) => {
    try {
      // Submit data to API through parent component
      await onStepSubmit('purposePathways', formData);
      
      // If successful, proceed to next step
      onNext();
    } catch (error) {
      console.error("Failed to submit purpose pathways:", error);
      // You can add error handling UI here
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Purpose & Career Pathways
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Help us understand your career motivations and goals
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div>
            <label className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4 block">
              What is your primary purpose for career development?
            </label>
            <div className="space-y-3">
              <Radio
                label="Career advancement and higher positions"
                name="primaryPurposeCareerDevelopment"
                value="advancement"
                checked={watch("primaryPurposeCareerDevelopment") === "advancement"}
                onChange={(e) => setValue("primaryPurposeCareerDevelopment", e.target.value)}
              />
              <Radio
                label="Skill development and learning new technologies"
                name="primaryPurposeCareerDevelopment"
                value="skills"
                checked={watch("primaryPurposeCareerDevelopment") === "skills"}
                onChange={(e) => setValue("primaryPurposeCareerDevelopment", e.target.value)}
              />
              <Radio
                label="Better work-life balance"
                name="primaryPurposeCareerDevelopment"
                value="balance"
                checked={watch("primaryPurposeCareerDevelopment") === "balance"}
                onChange={(e) => setValue("primaryPurposeCareerDevelopment", e.target.value)}
              />
              <Radio
                label="Higher compensation and benefits"
                name="primaryPurposeCareerDevelopment"
                value="compensation"
                checked={watch("primaryPurposeCareerDevelopment") === "compensation"}
                onChange={(e) => setValue("primaryPurposeCareerDevelopment", e.target.value)}
              />
              <Radio
                label="Making a meaningful impact"
                name="primaryPurposeCareerDevelopment"
                value="impact"
                checked={watch("primaryPurposeCareerDevelopment") === "impact"}
                onChange={(e) => setValue("primaryPurposeCareerDevelopment", e.target.value)}
              />
              <Radio
                label="Entrepreneurship and starting my own business"
                name="primaryPurposeCareerDevelopment"
                value="entrepreneurship"
                checked={watch("primaryPurposeCareerDevelopment") === "entrepreneurship"}
                onChange={(e) => setValue("primaryPurposeCareerDevelopment", e.target.value)}
              />
            </div>
            {errors.primaryPurposeCareerDevelopment && (
              <p className="text-red-500 text-sm mt-1">{errors.primaryPurposeCareerDevelopment.message}</p>
            )}
          </div>

          <div>
            <Textarea
              label="Career Goals (5-year vision)"
              placeholder="Describe where you see yourself in 5 years and what you want to achieve..."
              name="careerGoals"
              register={register}
              error={errors.careerGoals}
              rows={4}
            />
          </div>

          <div>
            <Textarea
              label="What motivates you professionally?"
              placeholder="Tell us what drives your professional growth and career decisions..."
              name="motivatesProfessionally"
              register={register}
              error={errors.motivatesProfessionally}
              rows={4}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
              Areas of Interest (Select all that apply)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Checkbox
                label="Leadership and Management"
                name="areasOfInterest.leadership"
                value={watch("areasOfInterest.leadership") || false}
                onChange={(e) => setValue("areasOfInterest.leadership", e.target.checked)}
              />
              <Checkbox
                label="Technical Innovation"
                name="areasOfInterest.technical"
                value={watch("areasOfInterest.technical") || false}
                onChange={(e) => setValue("areasOfInterest.technical", e.target.checked)}
              />
              <Checkbox
                label="Creative Problem Solving"
                name="areasOfInterest.creative"
                value={watch("areasOfInterest.creative") || false}
                onChange={(e) => setValue("areasOfInterest.creative", e.target.checked)}
              />
              <Checkbox
                label="Team Collaboration"
                name="areasOfInterest.collaboration"
                value={watch("areasOfInterest.collaboration") || false}
                onChange={(e) => setValue("areasOfInterest.collaboration", e.target.checked)}
              />
              <Checkbox
                label="Strategic Planning"
                name="areasOfInterest.strategy"
                value={watch("areasOfInterest.strategy") || false}
                onChange={(e) => setValue("areasOfInterest.strategy", e.target.checked)}
              />
              <Checkbox
                label="Mentoring Others"
                name="areasOfInterest.mentoring"
                value={watch("areasOfInterest.mentoring") || false}
                onChange={(e) => setValue("areasOfInterest.mentoring", e.target.checked)}
              />
              <Checkbox
                label="Data Analysis"
                name="areasOfInterest.dataAnalysis"
                value={watch("areasOfInterest.dataAnalysis") || false}
                onChange={(e) => setValue("areasOfInterest.dataAnalysis", e.target.checked)}
              />
              <Checkbox
                label="Customer Relations"
                name="areasOfInterest.customerRelations"
                value={watch("areasOfInterest.customerRelations") || false}
                onChange={(e) => setValue("areasOfInterest.customerRelations", e.target.checked)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
              Preferred Learning Methods
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Checkbox
                label="Online Courses"
                name="preferredLearningMethods.online"
                value={watch("preferredLearningMethods.online") || false}
                onChange={(e) => setValue("preferredLearningMethods.online", e.target.checked)}
              />
              <Checkbox
                label="Workshops & Seminars"
                name="preferredLearningMethods.workshops"
                value={watch("preferredLearningMethods.workshops") || false}
                onChange={(e) => setValue("preferredLearningMethods.workshops", e.target.checked)}
              />
              <Checkbox
                label="On-the-job Training"
                name="preferredLearningMethods.onTheJob"
                value={watch("preferredLearningMethods.onTheJob") || false}
                onChange={(e) => setValue("preferredLearningMethods.onTheJob", e.target.checked)}
              />
              <Checkbox
                label="Certification Programs"
                name="preferredLearningMethods.certifications"
                value={watch("preferredLearningMethods.certifications") || false}
                onChange={(e) => setValue("preferredLearningMethods.certifications", e.target.checked)}
              />
              <Checkbox
                label="Networking Events"
                name="preferredLearningMethods.networking"
                value={watch("preferredLearningMethods.networking") || false}
                onChange={(e) => setValue("preferredLearningMethods.networking", e.target.checked)}
              />
              <Checkbox
                label="Self-directed Learning"
                name="preferredLearningMethods.selfDirected"
                value={watch("preferredLearningMethods.selfDirected") || false}
                onChange={(e) => setValue("preferredLearningMethods.selfDirected", e.target.checked)}
              />
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
          <Button
            type="submit"
            text={submitting ? "Saving..." : "Next: Resume"}
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

export default PurposePathways;


