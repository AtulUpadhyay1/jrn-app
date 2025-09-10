import React, { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "@/components/Loading";

const OnboardingLayout = () => {
  const navigate = useNavigate();
  const { isAuth, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth || !user) {
      navigate("/");
    }
  }, [isAuth, navigate, user]);

  // Show loading while checking authentication
  if (!isAuth || !user) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
};

export default OnboardingLayout;
