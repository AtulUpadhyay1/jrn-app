import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import LinkedInProfile from './components/LinkedInProfile';
import InstagramProfile from './components/InstagramProfile';
import GitHubProfile from './components/GitHubProfile';

const Social = () => {
  const [activeTab, setActiveTab] = useState("linkedin");
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    avatar: "https://via.placeholder.com/150/667eea/ffffff?text=JD",
    bio: "Passionate full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Love building scalable web applications.",
    overallScore: 85
  });

  const [aiSuggestions, setAiSuggestions] = useState([
    {
      id: 1,
      type: "content",
      title: "Post about your recent project",
      description: "Share insights about your latest React application development",
      priority: "high"
    },
    {
      id: 2,
      type: "networking",
      title: "Connect with industry leaders",
      description: "Reach out to 5 professionals in your field this week",
      priority: "medium"
    },
    {
      id: 3,
      type: "skills",
      title: "Update your skills section",
      description: "Add TypeScript and AWS certifications to your profile",
      priority: "low"
    }
  ]);

  const [prosAndCons, setProsAndCons] = useState({
    pros: [
      "Strong technical content sharing",
      "Consistent posting schedule",
      "Good engagement with followers",
      "Professional profile setup"
    ],
    cons: [
      "Limited industry networking",
      "Could improve visual content",
      "Missing portfolio links",
      "Infrequent thought leadership posts"
    ]
  });

  const tabs = [
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "mdi:linkedin",
      color: "text-blue-600 border-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: "instagram",
      name: "Instagram", 
      icon: "mdi:instagram",
      color: "text-pink-600 border-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      id: "github",
      name: "GitHub",
      icon: "mdi:github",
      color: "text-gray-800 border-gray-800",
      bgColor: "bg-gray-50"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'linkedin':
        return <LinkedInProfile />;
      case 'instagram':
        return <InstagramProfile />;
      case 'github':
        return <GitHubProfile />;
      default:
        return <LinkedInProfile />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Social Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage and analyze your social media presence
          </p>
        </div>
        <Button className="btn-primary">
          <Icon icon="heroicons:plus" className="w-4 h-4 mr-2" />
          Connect Platform
        </Button>
      </div>

    

      {/* Social Platform Tabs */}
      <Card>
        <div className="border-b border-slate-200 dark:border-slate-700">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? `${tab.color} border-current`
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
                }`}
              >
                <Icon icon={tab.icon} className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {renderActiveTab()}
        </div>
      </Card>
    </div>
  );
};

export default Social;
