import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Textinput from '@/components/ui/Textinput';
import Select from '@/components/ui/Select';
import { Icon } from '@iconify/react';
import { jobService } from '../../../services/jobEngine';
import { toast } from 'react-toastify';

const JobSearchForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit: handleFormSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      location: '',
      contractType: '',
      experienceLevel: '',
      workType: '',
      publishedAt: ''
    }
  });

  // Watch form values for controlled components
  const formData = watch();

  // Contract Type options
  const contractTypeOptions = [
    { value: 'F', label: 'Full-Time' },
    { value: 'P', label: 'Part-Time' },
    { value: 'C', label: 'Contract' },
    { value: 'T', label: 'Temporary' },
    { value: 'I', label: 'Internship' },
    { value: 'V', label: 'Volunteer' }
  ];

  // Experience Level options
  const experienceLevelOptions = [
    { value: '1', label: 'Internship' },
    { value: '2', label: 'Entry Level' },
    { value: '3', label: 'Associate' },
    { value: '4', label: 'Mid Senior Level' },
    { value: '5', label: 'Director' }
  ];

  // Work Type options
  const workTypeOptions = [
    { value: '1', label: 'On Site' },
    { value: '2', label: 'Remote' },
    { value: '3', label: 'Hybrid' }
  ];

  // Published At options
  const publishedAtOptions = [
    { value: 'r86400', label: 'Past 24 Hours' },
    { value: 'r604800', label: 'Past Week' },
    { value: 'r2592000', label: 'Past Month' }
  ];

  const handleInputChange = (name, value) => {
    // This function is no longer needed with react-hook-form
    // Values are automatically handled by the register function
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    
    try {
      // Here you would typically make an API call to search for jobs
      console.log('Job search form data:', data);
      
      // Simulate API call
      const result = await jobService.createEngine(data);
            if (result.success) {
              toast.success("Job search engine created successfully!");
                // Optionally reset the form or navigate to results page
                reset();
            } else {
              console.error("Failed to fetch engine:", result.message);
      }
      
      // Handle successful search (redirect to results, update state, etc.)
      console.log('Job search completed successfully');
      
    } catch (error) {
      console.error('Job search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Job Search Engine
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Find your perfect job opportunity
          </p>
        </div>
      </div>

      {/* Search Form */}
      <Card>
        <div className="p-6">
          <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-6">
            {/* Job Title and Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Textinput
                  name="title"
                  label="Job Title"
                  type="text"
                  placeholder="e.g., Developer, Designer, Manager"
                  register={register}
                  error={errors.title}
                />
              </div>
              <div>
                <Textinput
                  name="location"
                  label="Location"
                  type="text"
                  placeholder="e.g., Delhi, Mumbai, Remote"
                  register={register}
                  error={errors.location}
                />
              </div>
            </div>

            {/* Contract Type and Experience Level Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select
                  name="contractType"
                  label="Contract Type"
                  //placeholder="Select Contract Type"
                  options={contractTypeOptions}
                  register={register}
                  error={errors.contractType}
                />
              </div>
              <div>
                <Select
                  name="experienceLevel"
                  label="Experience Level"
                  //placeholder="Select Experience Level"
                  options={experienceLevelOptions}
                  register={register}
                  error={errors.experienceLevel}
                />
              </div>
            </div>

            {/* Work Type and Published Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select
                  name="workType"
                  label="Work Type"
                  //placeholder="Select Work Type"
                  options={workTypeOptions}
                  register={register}
                  error={errors.workType}
                />
              </div>
              <div>
                <Select
                  name="publishedAt"
                  label="Date Posted"
                  //placeholder="Select Date Range"
                  options={publishedAtOptions}
                  register={register}
                  error={errors.publishedAt}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <Button
                type="submit"
                className="flex-1 sm:flex-none"
                isLoading={loading}
                disabled={loading}
              >
                <Icon
                  icon="heroicons-outline:search"
                  className="w-4 h-4 mr-2"
                />
                Search Jobs
              </Button>
              
              <Button
                type="button"
                onClick={handleReset}
                disabled={loading}
              >
                <Icon
                  icon="heroicons-outline:refresh"
                  className="w-4 h-4 mr-2"
                />
                Reset
              </Button>
            </div>
          </form>
        </div>
      </Card>

      {/* Search Tips */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Search Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="space-y-2">
              <div className="flex items-start">
                <Icon icon="heroicons-outline:light-bulb" className="w-4 h-4 mr-2 mt-0.5 text-yellow-500" />
                <span>Use specific job titles for better results</span>
              </div>
              <div className="flex items-start">
                <Icon icon="heroicons-outline:light-bulb" className="w-4 h-4 mr-2 mt-0.5 text-yellow-500" />
                <span>Try different location formats (city, state, remote)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <Icon icon="heroicons-outline:light-bulb" className="w-4 h-4 mr-2 mt-0.5 text-yellow-500" />
                <span>Filter by contract type to match your preferences</span>
              </div>
              <div className="flex items-start">
                <Icon icon="heroicons-outline:light-bulb" className="w-4 h-4 mr-2 mt-0.5 text-yellow-500" />
                <span>Use recent date filters for the latest opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobSearchForm;
