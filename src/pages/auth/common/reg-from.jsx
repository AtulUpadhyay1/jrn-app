import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUserMutation } from "@/store/api/auth/authApiSlice";
import { setUser } from "@/store/api/auth/authSlice";

const schema = yup
  .object({
    first_name: yup.string().required("First Name is Required"),
    last_name: yup.string().required("Last Name is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password shouldn't be more than 20 characters")
      .required("Please enter password"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  })
  .required();

const RegForm = () => {
  const [registerUser, { isLoading, isError, error, isSuccess }] =
    useRegisterUserMutation();

  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      // Handle successful registration
      if (response.data && response.data.success) {
        // Store the access token in localStorage
        localStorage.setItem("access_token", response.data.access_token);
        
        // Store user data with user_detail information
        const userData = {
          ...response.data.user,
          user_detail: response.data.user_detail,
          isAuthenticated: true
        };
        
        dispatch(setUser(userData));
        
        // Check onboarding status and redirect accordingly
        const { step, status } = response.data.user_detail || {};
        
        // Define the 8 onboarding steps
        const onboardingSteps = [
          'basic-profile',      // Step 1
          'career-preferences', // Step 2
          'purpose-pathways',   // Step 3
          'resume',            // Step 4
          'video',             // Step 5
          'social',            // Step 6
          'subscriptions',     // Step 7
          'summary'            // Step 8
        ];

        if (status === 'pending' || status === 'in_progress' && step >= 1 && step <= 8) {
          // User needs to complete onboarding - redirect to specific step
          const stepPath = onboardingSteps[step - 1]; // Array is 0-indexed
          navigate(`/onboarding/${stepPath}`);
          toast.success("Registration successful. Please complete your profile setup.");
        } else if (status === 'completed' || status === 'uploaded' || step > 8) {
          // User has completed onboarding
          navigate("/dashboard");
          toast.success("Registration successful");
        } else {
          // Default case - redirect to first onboarding step
          navigate("/onboarding/basic-profile");
          toast.success("Registration successful. Please complete your profile setup.");
        }
        
        reset();
      }
    } catch (error) {
      console.log(error.response); // Log the error response to the console for debugging

      const errorMessage =
        error.response?.data?.message ||
        "An error occurred. Please try again later.";

      if (errorMessage === "Email is already registered") {
        toast.error(errorMessage);
      } else {
        toast.warning(errorMessage);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
      <Textinput
        name="first_name"
        label="First Name"
        type="text"
        placeholder="Enter your first name"
        register={register}
        error={errors.first_name}
        className="h-[48px]"
      />
      <Textinput
        name="last_name"
        label="Last Name"
        type="text"
        placeholder="Enter your last name"
        register={register}
        error={errors.last_name}
        className="h-[48px]"
      />
      <Textinput
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        register={register}
        error={errors.email}
        className="h-[48px]"
      />
      <Textinput
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />
      <Textinput
        name="password_confirmation"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        register={register}
        error={errors.password_confirmation}
        className="h-[48px]"
      />
      <Checkbox
        label="You accept our Terms and Conditions and Privacy Policy"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <Button
        type="submit"
        text="Create an account"
        className="btn btn-dark block w-full text-center"
        isLoading={isLoading}
      />
    </form>
  );
};

export default RegForm;
