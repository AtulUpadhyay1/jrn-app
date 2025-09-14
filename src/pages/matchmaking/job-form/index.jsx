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
      keyword: '',
      location: '',
      country: '',
      time_range: '',
      job_type: '',
      experience_level: '',
      remote: '',
      company: '',
      location_radius: ''
    }
  });

  // Watch form values for controlled components
  const formData = watch();

  // Time Range options
  const timeRangeOptions = [
    { value: 'Past 24 hours', label: 'Past 24 hours' },
    { value: 'Past 2 Days', label: 'Past 2 Days' },
    { value: 'Past Week', label: 'Past Week' },
  ];

  // Job Type options
  const jobTypeOptions = [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Temporary', label: 'Temporary' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Volunteer', label: 'Volunteer' }
  ];

  // Experience Level options
  const experienceLevelOptions = [
    { value: 'Internship', label: 'Internship' },
    { value: 'Entry level', label: 'Entry level' },
    { value: 'Associate', label: 'Associate' },
    { value: 'Mid-Senior level', label: 'Mid-Senior level' },
    { value: 'Director', label: 'Director' }
  ];

  // Remote Work options
  const remoteOptions = [
    { value: 'On-site', label: 'On-site' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Hybrid', label: 'Hybrid' }
  ];


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
            Create Job Search Engine
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Configure your automated job search criteria and preferences
          </p>
        </div>
      </div>

      {/* Search Form */}
      <Card>
        <div className="p-6">
          <form onSubmit={handleFormSubmit(handleSubmit)} className="space-y-6">
            {/* Keyword and Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Textinput
                  name="keyword"
                  label="Keyword"
                  type="text"
                  placeholder="e.g., python developer, AI, product manager"
                  register={register}
                  error={errors.keyword}
                />
              </div>
              <div>
                <Textinput
                  name="location"
                  label="Location"
                  type="text"
                  placeholder="e.g., Paris, New York, India"
                  register={register}
                  error={errors.location}
                />
              </div>
            </div>

            {/* Country and Company Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Textinput
                  name="country"
                  label="Country"
                  type="text"
                  placeholder="e.g., India, United States"
                  register={register}
                  error={errors.country}
                />
              </div>
              <div>
                <Textinput
                  name="company"
                  label="Company"
                  type="text"
                  placeholder="e.g., Google, Microsoft (optional)"
                  register={register}
                  error={errors.company}
                />
              </div>
            </div>

            {/* Time Range and Job Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select
                  name="time_range"
                  label="Time Range"
                  placeholder="Select Time Range"
                  options={timeRangeOptions}
                  register={register}
                  error={errors.time_range}
                />
              </div>
              <div>
                <Select
                  name="job_type"
                  label="Job Type"
                  placeholder="Select Job Type"
                  options={jobTypeOptions}
                  register={register}
                  error={errors.job_type}
                />
              </div>
            </div>

            {/* Experience Level and Remote Work Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Select
                  name="experience_level"
                  label="Experience Level"
                  placeholder="Select Experience Level"
                  options={experienceLevelOptions}
                  register={register}
                  error={errors.experience_level}
                />
              </div>
              <div>
                <Select
                  name="remote"
                  label="Remote Work"
                  placeholder="Select Work Type"
                  options={remoteOptions}
                  register={register}
                  error={errors.remote}
                />
              </div>
            </div>

            {/* Location Radius */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Textinput
                  name="location_radius"
                  label="Location Radius (km)"
                  type="number"
                  placeholder="e.g., 25 (optional)"
                  register={register}
                  error={errors.location_radius}
                />
              </div>
              <div>
                {/* Empty div for grid alignment */}
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
                  icon="heroicons-outline:cog-6-tooth"
                  className="w-4 h-4 mr-2"
                />
                Create Engine
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
            Engine Creation Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="space-y-2">
              <div className="flex items-start">
                <Icon icon="heroicons-outline:light-bulb" className="w-4 h-4 mr-2 mt-0.5 text-yellow-500" />
                <span>Use specific keywords like "python developer" or "AI"</span>
              </div>
              <div className="flex items-start">
                <Icon icon="heroicons-outline:light-bulb" className="w-4 h-4 mr-2 mt-0.5 text-yellow-500" />
                <span>Location can be city names, countries, or regions</span>
              </div>
              <div className="flex items-start">
                <Icon icon="heroicons-outline:light-bulb" className="w-4 h-4 mr-2 mt-0.5 text-yellow-500" />
                <span>Country codes like "FR", "US", "AU" work best</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start">
                <Icon icon="heroicons-outline:light-bulb" className="w-4 h-4 mr-2 mt-0.5 text-yellow-500" />
                <span>Time range filters help find fresh opportunities</span>
              </div>
              <div className="flex items-start">
                <Icon icon="heroicons-outline:light-bulb" className="w-4 h-4 mr-2 mt-0.5 text-yellow-500" />
                <span>Leave optional fields empty for broader searches</span>
              </div>
              <div className="flex items-start">
                <Icon icon="heroicons-outline:light-bulb" className="w-4 h-4 mr-2 mt-0.5 text-yellow-500" />
                <span>Location radius helps narrow down local jobs</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobSearchForm;
