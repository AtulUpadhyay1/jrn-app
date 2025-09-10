import React from "react";
import { Link } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const MultiStepFormDemo = () => {
  return (
    <div className="space-y-6">
      <Card title="Multi-Step Profile Setup Form">
        <div className="space-y-6">
          <div className="text-center">
            <Icon icon="heroicons:user-plus" className="w-16 h-16 text-primary-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
              Complete Your Profile Setup
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              This multi-step form guides users through a comprehensive profile setup process 
              with 8 distinct steps, form validation, file uploads, and social media integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                step: 1, 
                title: "Basic Profile", 
                description: "Personal information and contact details",
                icon: "heroicons:user"
              },
              { 
                step: 2, 
                title: "Career Preferences", 
                description: "Job preferences and experience level",
                icon: "heroicons:briefcase"
              },
              { 
                step: 3, 
                title: "Purpose & Pathways", 
                description: "Career goals and motivations",
                icon: "heroicons:target"
              },
              { 
                step: 4, 
                title: "Resume", 
                description: "Upload resume and portfolio links",
                icon: "heroicons:document-text"
              },
              { 
                step: 5, 
                title: "Video", 
                description: "Record video introduction",
                icon: "heroicons:video-camera"
              },
              { 
                step: 6, 
                title: "Social", 
                description: "Social media profiles",
                icon: "heroicons:share"
              },
              { 
                step: 7, 
                title: "Subscriptions", 
                description: "Choose subscription plan",
                icon: "heroicons:credit-card"
              },
              { 
                step: 8, 
                title: "Summary", 
                description: "Review and complete setup",
                icon: "heroicons:check-circle"
              },
            ].map((item) => (
              <div key={item.step} className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full mx-auto mb-3">
                  <Icon icon={item.icon} className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  {item.step}. {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
              Features Included:
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-center">
                <Icon icon="heroicons:check" className="w-4 h-4 mr-2" />
                Form validation with react-hook-form
              </li>
              <li className="flex items-center">
                <Icon icon="heroicons:check" className="w-4 h-4 mr-2" />
                File upload with drag & drop
              </li>
              <li className="flex items-center">
                <Icon icon="heroicons:check" className="w-4 h-4 mr-2" />
                Video recording capability
              </li>
              <li className="flex items-center">
                <Icon icon="heroicons:check" className="w-4 h-4 mr-2" />
                Responsive navigation bar
              </li>
              <li className="flex items-center">
                <Icon icon="heroicons:check" className="w-4 h-4 mr-2" />
                Dark mode support
              </li>
              <li className="flex items-center">
                <Icon icon="heroicons:check" className="w-4 h-4 mr-2" />
                Progress tracking
              </li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <Link to="/profile-setup">
              <Button 
                text="Try the Multi-Step Form" 
                className="btn-primary btn-lg"
                icon="heroicons:arrow-right"
              />
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Click to experience the complete profile setup flow
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MultiStepFormDemo;
