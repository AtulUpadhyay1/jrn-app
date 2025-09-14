import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAdminUser, setAdminLoading, setAdminError, clearAdminError } from "@/store/api/auth/adminAuthSlice";
import { toast } from "react-toastify";
import adminAuthService from "@/services/adminAuthService";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

const AdminLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { error: adminError } = useSelector((state) => state.adminAuth);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  
  const navigate = useNavigate();
  
  // Clear error when user starts typing
  const handleInputChange = () => {
    if (adminError) {
      dispatch(clearAdminError());
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    dispatch(setAdminLoading(true));
    dispatch(setAdminError(null)); // Clear previous errors
    
    try {
      const response = await adminAuthService.login(data.email, data.password);
      
      // Check if login was successful and response has the expected structure
      if (response && response.success && response.type === "admin") {
        // Store admin user data
        const adminUserData = {
          email: data.email,
          type: response.type,
          access_token: response.access_token,
          isAuthenticated: true,
          loginTime: new Date().toISOString()
        };
        
        dispatch(setAdminUser(adminUserData));
        
        // Redirect to admin dashboard
        navigate("/admin/dashboard");
        toast.success(response.message || "Admin login successful");
      } else {
        throw new Error("Invalid admin credentials or unauthorized access");
      }
    } catch (error) {
      console.error("Admin login error:", error);
      
      // Handle different error scenarios
      let errorMessage = "Admin login failed";
      
      if (error.response) {
        // Server responded with an error status
        const { status, data } = error.response;
        
        if (status === 403) {
          errorMessage = data?.message || "Access denied. Admin access required.";
        } else if (status === 401) {
          errorMessage = data?.message || "Invalid admin credentials";
        } else if (status === 404) {
          errorMessage = "Admin login endpoint not found";
        } else if (status >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else {
          errorMessage = data?.message || `Error ${status}: ${data?.error || 'Unknown error'}`;
        }
      } else if (error.request) {
        // Network error
        errorMessage = "Network error. Please check your connection.";
      } else {
        // Other errors
        errorMessage = error.message || "An unexpected error occurred";
      }
      
      dispatch(setAdminError(errorMessage));
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      dispatch(setAdminLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {adminError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800 dark:text-red-200">
                {adminError}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <Textinput
        name="email"
        label="Email"
        type="email"
        register={register}
        error={errors.email}
        className="h-[48px]"
        placeholder="Enter admin email"
        onChange={handleInputChange}
      />
      
      <div className="relative">
        <Textinput
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          register={register}
          error={errors.password}
          className="h-[48px] pr-12"
          placeholder="Enter admin password"
          onChange={handleInputChange}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none z-10"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
          style={{ top: 'calc(50% + 12px)' }}
        >
          {showPassword ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M14.12 14.12l1.414 1.414M14.12 14.12L9.878 9.878m4.242 4.242L9.878 9.878" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>

      <Button
        type="submit"
        text="Sign in as Admin"
        className="btn btn-dark block w-full text-center"
        isLoading={isLoading}
      />
    </form>
  );
};

export default AdminLoginForm;