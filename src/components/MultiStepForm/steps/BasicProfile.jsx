import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  location: yup.string().required("Location is required"),
  bio: yup.string().max(500, "Bio must be less than 500 characters"),
});

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

const BasicProfile = ({ data, updateFormData, onNext, onStepSubmit, currentStep, totalSteps, submitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data.basicProfile || {},
  });

  // Update form when data changes (e.g., when API data is loaded)
  useEffect(() => {
    if (data.basicProfile) {
      reset(data.basicProfile);
    }
  }, [data.basicProfile, reset]);

  const onSubmit = async (formData) => {
    try {
      // Submit data to API through parent component
      await onStepSubmit('basicProfile', formData);
      
      // If successful, proceed to next step
      onNext();
    } catch (error) {
      console.error("Failed to submit basic profile:", error);
      // You can add error handling UI here
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Basic Profile Information
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Let's start with your basic information to create your profile
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Textinput
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            register={register}
            error={errors.firstName}
          />

          <Textinput
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            register={register}
            error={errors.lastName}
          />

          <Textinput
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            name="email"
            register={register}
            error={errors.email}
          />

          <Textinput
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            name="phone"
            register={register}
            error={errors.phone}
          />

          <Textinput
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            register={register}
            error={errors.dateOfBirth}
          />

          <Select
            label="Gender"
            name="gender"
            register={register}
            error={errors.gender}
            options={genderOptions}
          />

          <div className="md:col-span-2">
            <Textinput
              label="Location"
              type="text"
              placeholder="City, State, Country"
              name="location"
              register={register}
              error={errors.location}
            />
          </div>

          <div className="md:col-span-2">
            <Textarea
              label="Bio (Optional)"
              placeholder="Tell us a little about yourself..."
              name="bio"
              register={register}
              error={errors.bio}
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <div></div>
          <Button
            type="submit"
            text={submitting ? "Saving..." : "Next: Career Preferences"}
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

export default BasicProfile;
