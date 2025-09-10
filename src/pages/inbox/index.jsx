import React, { useState } from 'react';
import HeaderTabs from './HeaderTabs';
import SidebarLeft from './SidebarLeft';
import ComposeAreaRight from './ComposeAreaRight';

const Inbox = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [activeTab, setActiveTab] = useState('Inbox');
  
  const unreadCounts = {
    inbox: 12,
    sent: 0,
    drafts: 3,
    starred: 7,
    archived: 0,
    spam: 2
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedEmail(null);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <HeaderTabs onTabChange={handleTabChange} unreadCounts={unreadCounts} />
      <div className="flex flex-grow overflow-hidden">
        <SidebarLeft onEmailSelect={handleEmailSelect} selectedEmail={selectedEmail} />
        <ComposeAreaRight selectedEmail={selectedEmail} />
      </div>
    </div>
  );
};

export default Inbox;
