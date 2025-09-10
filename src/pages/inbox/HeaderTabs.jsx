import React, { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const HeaderTabs = ({ onTabChange, unreadCounts }) => {
  const [activeTab, setActiveTab] = useState('Inbox');
  
  const tabs = [
    { 
      name: 'Inbox', 
      icon: 'material-symbols:inbox', 
      count: unreadCounts?.inbox || 12,
      color: 'text-blue-600'
    },
    { 
      name: 'Sent', 
      icon: 'material-symbols:send', 
      count: unreadCounts?.sent || 0,
      color: 'text-green-600'
    },
    { 
      name: 'Drafts', 
      icon: 'material-symbols:draft', 
      count: unreadCounts?.drafts || 3,
      color: 'text-orange-600'
    },
    { 
      name: 'Starred', 
      icon: 'material-symbols:star', 
      count: unreadCounts?.starred || 7,
      color: 'text-yellow-600'
    },
    { 
      name: 'Archived', 
      icon: 'material-symbols:archive', 
      count: unreadCounts?.archived || 0,
      color: 'text-gray-600'
    },
    { 
      name: 'Spam', 
      icon: 'material-symbols:report', 
      count: unreadCounts?.spam || 2,
      color: 'text-red-600'
    }
  ];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    onTabChange?.(tabName);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon icon="material-symbols:mail" className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Professional Inbox</h1>
            <p className="text-sm text-gray-600">Manage your job-related communications</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon icon="material-symbols:refresh" className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon icon="material-symbols:settings" className="w-5 h-5" />
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors">
            <Icon icon="material-symbols:edit" className="w-4 h-4" />
            Compose
          </button>
        </div>
      </div>
      
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => handleTabClick(tab.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.name
                ? 'bg-blue-100 text-blue-700 shadow-sm border border-blue-200'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <Icon icon={tab.icon} className={`w-4 h-4 ${activeTab === tab.name ? tab.color : ''}`} />
            <span>{tab.name}</span>
            {tab.count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                activeTab === tab.name 
                  ? 'bg-blue-200 text-blue-800' 
                  : 'bg-gray-200 text-gray-700'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeaderTabs;
