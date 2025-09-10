import React, { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const ComposeAreaRight = ({ selectedEmail }) => {
  const [isComposing, setIsComposing] = useState(false);
  const [composeData, setComposeData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: ''
  });
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const handleCompose = () => {
    setIsComposing(true);
    setComposeData({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: ''
    });
  };

  const handleReply = () => {
    if (selectedEmail) {
      setIsComposing(true);
      setComposeData({
        to: selectedEmail.fromEmail,
        cc: '',
        bcc: '',
        subject: `Re: ${selectedEmail.subject}`,
        body: `\n\n--- Original Message ---\nFrom: ${selectedEmail.from} <${selectedEmail.fromEmail}>\nSubject: ${selectedEmail.subject}\n\n${selectedEmail.preview}`
      });
    }
  };

  const handleSend = () => {
    // Send email logic here
    console.log('Sending email:', composeData);
    setIsComposing(false);
    // Show success message
  };

  const handleSaveDraft = () => {
    // Save draft logic here
    console.log('Saving draft:', composeData);
  };

  if (isComposing) {
    return (
      <div className="flex-1 bg-white flex flex-col">
        {/* Compose Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Icon icon="material-symbols:edit" className="w-5 h-5 text-blue-600" />
            Compose Email
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              Save Draft
            </button>
            <button
              onClick={() => setIsComposing(false)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Icon icon="material-symbols:close" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Compose Form */}
        <div className="flex-1 flex flex-col">
          <div className="p-6 space-y-4 border-b border-gray-200">
            {/* To Field */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 w-12">To:</label>
              <input
                type="email"
                value={composeData.to}
                onChange={(e) => setComposeData({...composeData, to: e.target.value})}
                placeholder="Enter recipient email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCc(!showCc)}
                  className={`text-xs font-medium px-2 py-1 rounded ${showCc ? 'text-blue-600 bg-blue-100' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Cc
                </button>
                <button
                  onClick={() => setShowBcc(!showBcc)}
                  className={`text-xs font-medium px-2 py-1 rounded ${showBcc ? 'text-blue-600 bg-blue-100' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Bcc
                </button>
              </div>
            </div>

            {/* CC Field */}
            {showCc && (
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 w-12">Cc:</label>
                <input
                  type="email"
                  value={composeData.cc}
                  onChange={(e) => setComposeData({...composeData, cc: e.target.value})}
                  placeholder="Enter CC recipients"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {/* BCC Field */}
            {showBcc && (
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700 w-12">Bcc:</label>
                <input
                  type="email"
                  value={composeData.bcc}
                  onChange={(e) => setComposeData({...composeData, bcc: e.target.value})}
                  placeholder="Enter BCC recipients"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {/* Subject Field */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-700 w-12">Subject:</label>
              <input
                type="text"
                value={composeData.subject}
                onChange={(e) => setComposeData({...composeData, subject: e.target.value})}
                placeholder="Enter email subject"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email Body */}
          <div className="flex-1 p-6">
            <textarea
              value={composeData.body}
              onChange={(e) => setComposeData({...composeData, body: e.target.value})}
              placeholder="Write your message here..."
              className="w-full h-full resize-none border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Compose Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Icon icon="material-symbols:attach-file" className="w-5 h-5" />
                Attach
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Icon icon="material-symbols:image" className="w-5 h-5" />
                Insert Image
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Icon icon="material-symbols:link" className="w-5 h-5" />
                Insert Link
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsComposing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <Icon icon="material-symbols:send" className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedEmail) {
    return (
      <div className="flex-1 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon icon="material-symbols:mail" className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an email to read</h3>
          <p className="text-gray-600 mb-6">Choose an email from your inbox to view its contents</p>
          <button
            onClick={handleCompose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto transition-colors"
          >
            <Icon icon="material-symbols:edit" className="w-5 h-5" />
            Compose New Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Email Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={selectedEmail.avatar}
              alt={selectedEmail.from}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{selectedEmail.from}</h2>
              <p className="text-sm text-gray-600">{selectedEmail.fromEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon icon="material-symbols:archive" className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon icon="material-symbols:delete" className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon icon="material-symbols:star-border" className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon icon="material-symbols:more-vert" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">{selectedEmail.subject}</h1>
          <span className="text-sm text-gray-500">{selectedEmail.time}</span>
        </div>

        {/* Labels */}
        {selectedEmail.labels && selectedEmail.labels.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedEmail.labels.map((label, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Email Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="prose max-w-none">
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            Dear Professional,

            {selectedEmail.preview}

            We are impressed by your background and experience, and we believe you would be a great fit for our team. 

            Here are the next steps:
            1. Review the attached job description
            2. Prepare for a technical interview
            3. Schedule a meeting with our team lead

            We look forward to hearing from you soon.

            Best regards,
            {selectedEmail.from}
            
            ---
            This email was sent regarding your job application. Please do not reply to this automated message.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center gap-3">
        <button
          onClick={handleReply}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Icon icon="material-symbols:reply" className="w-4 h-4" />
          Reply
        </button>
        <button
          onClick={handleReply}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Icon icon="material-symbols:reply-all" className="w-4 h-4" />
          Reply All
        </button>
        <button
          onClick={handleReply}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Icon icon="material-symbols:forward" className="w-4 h-4" />
          Forward
        </button>
      </div>
    </div>
  );
};

export default ComposeAreaRight;