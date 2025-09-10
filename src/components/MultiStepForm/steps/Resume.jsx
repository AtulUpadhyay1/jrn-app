import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Fileinput from "@/components/ui/Fileinput";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const schema = yup.object().shape({
  linkedinUrl: yup.string().url("Please enter a valid LinkedIn URL"),
  portfolioUrl: yup.string().url("Please enter a valid portfolio URL"),
  additionalNotes: yup.string().max(1000, "Additional notes must be less than 1000 characters"),
});

const Resume = ({ data, updateFormData, onNext, onPrevious, onStepSubmit, currentStep, totalSteps, submitting }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [existingResume, setExistingResume] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data.resume || {},
  });

  // Update form when data changes (e.g., when API data is loaded)
  useEffect(() => {
    if (data.resume) {
      reset(data.resume);
      // If there's a resume file path from API, set it as existing resume
      if (data.resume.resume) {
        setExistingResume(data.resume.resume);
      }
    }
  }, [data.resume, reset]);

  const handleFileUpload = (files) => {
    if (files && files[0]) {
      const file = files[0];
      setUploadedFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const onSubmit = async (formData) => {
    try {
      // Check if user has uploaded a new file or has existing resume
      const hasNewFile = uploadedFile;
      const hasExistingResume = data.resume?.resume;
      
      if (!hasNewFile && !hasExistingResume) {
        alert("Please upload a resume file before proceeding.");
        return;
      }
      
      // Create FormData object to handle file upload
      const formDataToSend = new FormData();
      
      // Add the resume file if a new one is uploaded
      if (uploadedFile) {
        formDataToSend.append('resume', uploadedFile);
      }
      
      // Add other form fields with correct API field names
      if (formData.linkedinUrl) {
        formDataToSend.append('linkedin', formData.linkedinUrl);
      }
      if (formData.portfolioUrl) {
        formDataToSend.append('personal_website', formData.portfolioUrl);
      }
      if (formData.additionalNotes) {
        formDataToSend.append('additional_notes', formData.additionalNotes);
      }
      
      // If no new file is uploaded but form data exists, handle differently
      if (!uploadedFile && hasExistingResume) {
        // Submit regular form data for text fields only with correct API field names
        const resumeData = {
          linkedin: formData.linkedinUrl,
          personal_website: formData.portfolioUrl,
          additional_notes: formData.additionalNotes,
        };
        await onStepSubmit('resume', resumeData);
      } else {
        // Submit FormData with file to API through parent component
        await onStepSubmit('resume', formDataToSend);
      }
      
      // If successful, proceed to next step
      onNext();
    } catch (error) {
      console.error("Failed to submit resume data:", error);
      // You can add error handling UI here
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Resume & Portfolio
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Upload your resume and share your professional links
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {/* File Upload Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
              Upload Resume
            </h3>
            
            {/* Show existing resume if available */}
            {existingResume && !uploadedFile && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Icon icon="heroicons:check-circle" className="w-5 h-5 text-green-500" />
                  <span className="text-green-800 dark:text-green-200 font-medium">
                    Resume already uploaded
                  </span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                  You can upload a new resume below to replace the existing one, or proceed to the next step.
                </p>
              </div>
            )}
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-300 dark:border-slate-600 hover:border-primary-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Icon icon="heroicons:document-text" className="w-8 h-8 text-primary-500" />
                    <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
                      {uploadedFile.name}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500">
                    File size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      type="button"
                      text="Remove File"
                      className="btn-outline-danger btn-sm"
                      onClick={removeFile}
                    />
                    <Fileinput
                      name="resume"
                      selectedFile={uploadedFile}
                      onChange={handleFileUpload}
                      className="btn-primary btn-sm"
                      accept=".pdf,.doc,.docx"
                    >
                      Choose Different File
                    </Fileinput>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Icon icon="heroicons:cloud-arrow-up" className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg text-slate-700 dark:text-slate-300 mb-2">
                      Drag and drop your resume here, or click to select
                    </p>
                    <p className="text-sm text-slate-500">
                      Supported formats: PDF, DOC, DOCX (Max size: 10MB)
                    </p>
                  </div>
                  <Fileinput
                    name="resume"
                    selectedFile={uploadedFile}
                    onChange={handleFileUpload}
                    className="btn-primary"
                    accept=".pdf,.doc,.docx"
                  >
                    Choose File
                  </Fileinput>
                </div>
              )}
            </div>
          </div>

          {/* Professional Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
              Professional Links
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Textinput
                label="LinkedIn Profile URL"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                name="linkedinUrl"
                register={register}
                error={errors.linkedinUrl}
              />

              <Textinput
                label="Portfolio/Website URL"
                type="url"
                placeholder="https://yourportfolio.com"
                name="portfolioUrl"
                register={register}
                error={errors.portfolioUrl}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
              Additional Information
            </h3>
            
            <Textarea
              label="Cover Letter or Additional Notes (Optional)"
              placeholder="Share any additional information about your background, achievements, or career highlights..."
              name="additionalNotes"
              register={register}
              error={errors.additionalNotes}
              rows={6}
            />
          </div>

          {/* Resume Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h4 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-3">
              Resume Tips
            </h4>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-start">
                <Icon icon="heroicons:check-circle" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Keep your resume updated with recent experience and skills
              </li>
              <li className="flex items-start">
                <Icon icon="heroicons:check-circle" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Use action verbs and quantify your achievements
              </li>
              <li className="flex items-start">
                <Icon icon="heroicons:check-circle" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Tailor your resume for the roles you're interested in
              </li>
              <li className="flex items-start">
                <Icon icon="heroicons:check-circle" className="w-4 h-4 mt-0.5 mr-2 text-blue-500" />
                Ensure your contact information is current and professional
              </li>
            </ul>
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
            text={submitting ? "Saving..." : "Next: Video Introduction"}
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

export default Resume;
