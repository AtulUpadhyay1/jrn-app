import React from "react";
import { Link } from "react-router-dom";
import AdminLoginForm from "./common/admin-login-form";
import useDarkMode from "@/hooks/useDarkMode";
// image import
import LogoWhite from "@/assets/images/logo/logo.png";
import Logo from "@/assets/images/logo/logo.svg";

const AdminLogin = () => {
  const [isDark] = useDarkMode();
  
  return (
    <div className="loginwrapper bg-cover bg-no-repeat bg-center">
      <div className="lg-inner-column">
        <div className="left-columns lg:w-1/2 lg:block hidden">
          <div className="logo-box-3">
            <Link to="/" className="">
              <img src={LogoWhite} alt="" className="w-75" />
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex flex-col items-center justify-center">
          <div className="auth-box-3">
            <div className="mobile-logo text-center mb-6 lg:hidden block">
              <Link to="/">
                <img
                  src={isDark ? LogoWhite : Logo}
                  alt=""
                  className="mx-auto"
                />
              </Link>
            </div>
            <div className="text-center 2xl:mb-10 mb-5">
              <h4 className="font-medium text-2xl">Admin Sign In</h4>
              <div className="text-slate-500 dark:text-slate-400 text-base">
                Please sign in with your admin credentials
              </div>
            </div>
            <AdminLoginForm />
            <div className="mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 text-sm text-center">
              <Link
                to="/"
                className="text-slate-900 dark:text-white font-medium hover:underline"
              >
                ← Back to User Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;