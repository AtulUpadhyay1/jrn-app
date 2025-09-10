// Personal.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Textinput from "@/components/ui/Textinput";
import  useProfile from "@/hooks/useProfile";

const Personal = ({ data, onNext, onPrevious, onStepSubmit, submitting }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: data?.personal || {},
  });

  const submitHandler = async (formData) => {
    const success = await onStepSubmit("personal", formData);
    if (success) onNext();
  };

  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useProfile();

  // Populate form with profile data when it's available
  useEffect(() => {
    if (profileData?.user && profileData?.user_detail) {
      const { user, user_detail } = profileData;
      
      // Set form values from API response
      setValue("fullName", `${user.first_name} ${user.last_name}`);
      setValue("profileTitle", user_detail.current_position || "");
      setValue("dob", user_detail.dob || "");
      setValue("gender", user_detail.gender || "");
      setValue("email", user.email || "");
      setValue("address", user_detail.address || "");
      setValue("linkedin", user_detail.linkedin || "");
      setValue("github", user_detail.github || "");
      setValue("portfolio", user_detail.personal_website || "");
    }
  }, [profileData, setValue]);

  if (isProfileLoading) return <div>Loading...</div>;
  if (profileError) return <div>Error loading profile</div>;

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <Textinput
        name="fullName"
        label="Full Name"
        placeholder="Your Full Name"
        className="input"
        register={register}
      />
      <Textinput
        name="profileTitle"
        label="Profile Title / Desired Role"
        placeholder="Your Desired Role"
        className="input"
        register={register}
      />
      <Textinput
        name="dob"
        label="Date of Birth"
        placeholder="Your Date of Birth"
        className="input"
        register={register}
      />
      <Textinput
        name="gender"
        label="Gender"
        placeholder="Your Gender"
        className="input"
        register={register}
      />
      <Textinput
        name="nationality"
        label="Nationality"
        placeholder="Your Nationality"
        className="input"
        register={register}
      />
      <Textinput
        name="email"
        label="Email"
        placeholder="Your Email"
        className="input"
        register={register}
      />
      <Textinput
        name="phone"
        label="Phone"
        placeholder="Your Phone Number"
        className="input"
        register={register}
      />
      <Textinput
        name="address"
        label="Address"
        placeholder="Your Address"
        className="input"
        register={register}
      />
      <Textinput
        name="linkedin"
        label="LinkedIn"
        placeholder="LinkedIn Profile URL"
        className="input"
        register={register}
      />
      <Textinput
        name="github"
        label="GitHub"
        placeholder="GitHub Profile URL"
        className="input"
        register={register}
      />
      <Textinput
        name="portfolio"
        label="Portfolio"
        placeholder="Portfolio URL"
        className="input"
        register={register}
      />

      <div className="flex justify-between pt-4">
        {onPrevious && (
          <button
            type="button"
            onClick={onPrevious}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {submitting ? "Saving..." : "Next"}
        </button>
      </div>
    </form>
  );
};

export default Personal;
