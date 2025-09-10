import React, { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const sampleEmails = [
  {
    id: 1,
    from: "TechCorp HR",
    fromEmail: "hr@techcorp.com",
    subject: "Interview Invitation - Senior Developer Position",
    preview: "We're excited to invite you for an interview for the Senior Developer position...",
    time: "10:30 AM",
    isRead: false,
    isStarred: true,
    isImportant: true,
    labels: ["Interview", "Job Opportunity"],
    avatar: "https://via.placeholder.com/40x40/667eea/ffffff?text=TC"
  },
  {
    id: 2,
    from: "LinkedIn Jobs",
    fromEmail: "jobs@linkedin.com",
    subject: "5 New Job Matches for Frontend Developer",
    preview: "Based on your profile, we found 5 new job opportunities that might interest you...",
    time: "9:15 AM",
    isRead: true,
    isStarred: false,
    isImportant: false,
    labels: ["Job Alert"],
    avatar: "https://via.placeholder.com/40x40/0077b5/ffffff?text=LI"
  },
  {
    id: 3,
    from: "StartupXYZ",
    fromEmail: "recruiter@startupxyz.com",
    subject: "Thank you for your application",
    preview: "We have received your application for the React Developer position and wanted to...",
    time: "Yesterday",
    isRead: true,
    isStarred: false,
    isImportant: false,
    labels: ["Application"],
    avatar: "https://via.placeholder.com/40x40/4ecdc4/ffffff?text=SX"
  },
  {
    id: 4,
    from: "InnovateLabs Recruiter",
    fromEmail: "sarah@innovatelabs.com",
    subject: "Re: Technical Interview Feedback",
    preview: "Thank you for taking the time to interview with us. We were impressed by your...",
    time: "2 days ago",
    isRead: false,
    isStarred: true,
    isImportant: true,
    labels: ["Interview", "Feedback"],
    avatar: "https://via.placeholder.com/40x40/ff6b6b/ffffff?text=IL"
  },
  {
    id: 5,
    from: "Indeed Career Guide",
    fromEmail: "noreply@indeed.com",
    subject: "Weekly Career Tips: How to Ace Your Next Interview",
    preview: "This week's tips focus on interview preparation and common questions...",
    time: "3 days ago",
    isRead: true,
    isStarred: false,
    isImportant: false,
    labels: ["Career Tips"],
    avatar: "https://via.placeholder.com/40x40/45b7d1/ffffff?text=IN"
  }
];

const SidebarLeft = ({ onEmailSelect, selectedEmail }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmails, setSelectedEmails] = useState([]);
  
  const filteredEmails = sampleEmails.filter(email =>
    email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEmailSelect = (email) => {
    onEmailSelect?.(email);
  };

  const handleStarToggle = (emailId, e) => {
    e.stopPropagation();
    // Toggle star logic here
  };

  const handleEmailCheck = (emailId, e) => {
    e.stopPropagation();
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const getLabelColor = (label) => {
    const colors = {
      'Interview': 'bg-blue-100 text-blue-800',
      'Job Opportunity': 'bg-green-100 text-green-800',
      'Job Alert': 'bg-purple-100 text-purple-800',
      'Application': 'bg-orange-100 text-orange-800',
      'Feedback': 'bg-yellow-100 text-yellow-800',
      'Career Tips': 'bg-gray-100 text-gray-800'
    };
    return colors[label] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Icon icon="material-symbols:search" className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search emails..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Email Toolbar */}
      <div className="px-4 py-2 border-b border-gray-200 flex items-center gap-2">
        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
          <Icon icon="material-symbols:select-all" className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
          <Icon icon="material-symbols:archive" className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
          <Icon icon="material-symbols:delete" className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors">
          <Icon icon="material-symbols:mark-email-read" className="w-4 h-4" />
        </button>
        <div className="ml-auto text-xs text-gray-500">
          {filteredEmails.length} emails
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            onClick={() => handleEmailSelect(email)}
            className={`p-4 border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${
              selectedEmail?.id === email.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
            } ${!email.isRead ? 'bg-blue-25' : ''}`}
          >
            <div className="flex items-start gap-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                checked={selectedEmails.includes(email.id)}
                onChange={(e) => handleEmailCheck(email.id, e)}
                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              {/* Avatar */}
              <img
                src={email.avatar}
                alt={email.from}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />

              {/* Email Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium text-sm truncate ${!email.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {email.from}
                    </span>
                    {email.isImportant && (
                      <Icon icon="material-symbols:priority-high" className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">{email.time}</span>
                    <button
                      onClick={(e) => handleStarToggle(email.id, e)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Icon 
                        icon={email.isStarred ? "material-symbols:star" : "material-symbols:star-border"} 
                        className={`w-4 h-4 ${email.isStarred ? 'text-yellow-500' : 'text-gray-400'}`} 
                      />
                    </button>
                  </div>
                </div>

                <h3 className={`text-sm mb-1 truncate ${!email.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-800'}`}>
                  {email.subject}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                  {email.preview}
                </p>

                {/* Labels */}
                {email.labels && email.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {email.labels.map((label, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLabelColor(label)}`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarLeft;