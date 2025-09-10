import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/api/auth/authSlice";
import { toast } from "react-toastify";
import authService from "@/services/authService";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data.email, data.password);
      
      // Check if login was successful and response has the expected structure
      if (response && response.success) {
        // Store user data with user_detail information
        const userData = {
          ...response.user,
          user_detail: response.user_detail,
          isAuthenticated: true
        };
        
        dispatch(setUser(userData));
        
        // Check onboarding status and redirect accordingly
        const { step, status } = response.user_detail || {};
        
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
          toast.success("Login successful. Please complete your profile setup.");
        } else if (status === 'completed' || status === 'uploaded' || step > 8) {
          // User has completed onboarding
          navigate("/dashboard");
          toast.success("Login successful");
        } else {
          // Default case - redirect to first onboarding step
          navigate("/onboarding/basic-profile");
          toast.success("Login successful. Please complete your profile setup.");
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="Email"
        type="email"
        register={register}
        error={errors.email}
        className="h-[48px]"
        placeholder="Enter your email"
      />
      <Textinput
        name="password"
        label="Password"
        type="password"
        register={register}
        error={errors.password}
        className="h-[48px]"
        placeholder="Enter your password"
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <Button
        type="submit"
        text="Sign in"
        className="btn btn-dark block w-full text-center "
        isLoading={isLoading}
      />
    </form>
  );
};

export default LoginForm;
