import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/dashboard"));
const Ecommerce = lazy(() => import("./pages/dashboard/ecommerce"));
const CrmPage = lazy(() => import("./pages/dashboard/crm"));
const ProjectPage = lazy(() => import("./pages/dashboard/project"));
const BankingPage = lazy(() => import("./pages/dashboard/banking"));

const Login = lazy(() => import("./pages/auth/login"));
const Register = lazy(() => import("./pages/auth/register"));
const ForgotPass = lazy(() => import("./pages/auth/forgot-password"));
const Error = lazy(() => import("./pages/404"));

import Layout from "./layout/Layout";
import AuthLayout from "./layout/AuthLayout";
import OnboardingLayout from "./layout/OnboardingLayout";

// app page

// JRN Pages
const RoleplayPage = lazy(() => import("./pages/roleplay"));
const PracticePage = lazy(() => import("./pages/practice"));
const SocialPage = lazy(() => import("./pages/social"));
const InboxPage = lazy(() => import("./pages/inbox"));  
const Matchmaking = lazy(() => import("./pages/matchmaking"));
const Wallet = lazy(() => import("./pages/wallet"));
const Resume = lazy(() => import("./pages/resume"));
const CoverLetter = lazy(() => import("./pages/resume/CoverLetter"));
const MyCoverLetter = lazy(() => import("./pages/resume/MyCoverLetter"));
const ComparativeAnalysis = lazy(() => import("./pages/comprative"));
const Assessment = lazy(() => import("./pages/assessment"));
const ResumePage = lazy(() => import("./pages/resume/ResumePage"));
const JobCopilotConfig = lazy(() => import("./pages/matchmaking/engine"));

import Loading from "@/components/Loading";


const ProfileSetup = lazy(() => import("./pages/profile-setup"));
const MultiStepFormDemo = lazy(() => import("./pages/multistep-form-demo"));

function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
        </Route>
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ecommerce" element={<Ecommerce />} />
          <Route path="crm" element={<CrmPage />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="banking" element={<BankingPage />} />

          {/* Other Pages */}
          
          <Route path="profile-setup" element={<ProfileSetup />} />
          <Route path="multistep-form-demo" element={<MultiStepFormDemo />} />

          {/* // JRN Pages */}
          <Route path="roleplay" element={<RoleplayPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="social" element={<SocialPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="matchmaking" element={<Matchmaking />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="cover-letter" element={<CoverLetter />} />
          <Route path="my-cover-letter" element={<MyCoverLetter />} />
          {/* <Route path="resume-builder" element={<Resume />} /> */}
          <Route path="comparative-analysis" element={<ComparativeAnalysis />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="resume-page" element={<ResumePage />} />
          <Route path="job-copilot-config" element={<JobCopilotConfig />} />

          <Route path="resume-builder/*" element={<Resume />}>
          <Route path="" element={<Navigate to="/resume-builder/personal" />} />
          <Route path="personal" element={<ProfileSetup />} />
          <Route path="education" element={<ProfileSetup />} />
          <Route path="skills" element={<ProfileSetup />} />
          <Route path="communication" element={<ProfileSetup />} />
          <Route path="curriculum" element={<ProfileSetup />} />
          <Route path="projects" element={<ProfileSetup />} />
          <Route path="experience" element={<ProfileSetup />} />
          </Route>

          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
        
        {/* Onboarding Routes - Separate layout without sidebar and navbar */}
        <Route path="/onboarding/*" element={<OnboardingLayout />}>
          <Route path="" element={<Navigate to="/onboarding/basic-profile" />} />
          <Route path="basic-profile" element={<ProfileSetup />} />
          <Route path="career-preferences" element={<ProfileSetup />} />
          <Route path="purpose-pathways" element={<ProfileSetup />} />
          <Route path="resume" element={<ProfileSetup />} />
          <Route path="video" element={<ProfileSetup />} />
          <Route path="social" element={<ProfileSetup />} />
          <Route path="subscriptions" element={<ProfileSetup />} />
          <Route path="summary" element={<ProfileSetup />} />
        </Route>
        <Route
          path="/404"
          element={
            <Suspense fallback={<Loading />}>
              <Error />
            </Suspense>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
