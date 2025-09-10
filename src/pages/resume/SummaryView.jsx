import React from "react";
import { Icon } from "@iconify/react";

const SummaryView = ({ data, profile }) => {
  const handleDownloadPDF = () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Professional Summary - ${profile?.user?.firstName || 'User'} ${profile?.user?.lastName || ''}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              padding: 40px 20px;
              color: #333;
            }
            
            .resume-card {
              max-width: 700px;
              margin: 0 auto;
              background: white;
              border-radius: 24px;
              overflow: hidden;
              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
              position: relative;
            }
            
            /* Top decorative element */
            .top-decoration {
              height: 8px;
              background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
            }
            
            /* Header section */
            .header {
              background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
              color: white;
              padding: 40px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .header::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
              animation: float 6s ease-in-out infinite;
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
            }
            
            .profile-circle {
              width: 100px;
              height: 100px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 50%;
              margin: 0 auto 20px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 36px;
              font-weight: bold;
              color: white;
              border: 5px solid rgba(255, 255, 255, 0.2);
              position: relative;
              z-index: 2;
            }
            
            .name {
              font-size: 32px;
              font-weight: 700;
              margin-bottom: 8px;
              position: relative;
              z-index: 2;
            }
            .contact {
              font-size: 16px;
              opacity: 0.9;
              position: relative;
              z-index: 2;
            }
            
            /* Content section */
            .content {
              padding: 40px;
            }
            
            /* Section styling */
            .section {
              margin-bottom: 35px;
              position: relative;
            }
            .section::before {
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              width: 4px;
              height: 100%;
              background: linear-gradient(180deg, #667eea, #764ba2);
              border-radius: 2px;
            }
            
            .section-header {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
              padding-left: 20px;
            }
            .section-icon {
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 15px;
              color: white;
              font-size: 18px;
            }
            .section-title {
              font-size: 20px;
              font-weight: 700;
              color: #2c3e50;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            
            /* Summary text */
            .summary-text {
              background: linear-gradient(135deg, #f8f9ff, #e6f3ff);
              padding: 25px;
              border-radius: 16px;
              font-size: 15px;
              line-height: 1.8;
              color: #4a5568;
              border-left: 4px solid #667eea;
              margin-left: 20px;
              position: relative;
            }
            .summary-text::before {
              content: '"';
              font-size: 60px;
              color: #667eea;
              position: absolute;
              top: -10px;
              left: 15px;
              opacity: 0.3;
            }
            
            /* Skills grid */
            .skills-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
              gap: 12px;
              margin-left: 20px;
            }
            .skill-item {
              background: linear-gradient(135deg, #667eea, #764ba2);
              color: white;
              padding: 12px 16px;
              border-radius: 25px;
              text-align: center;
              font-size: 13px;
              font-weight: 600;
              position: relative;
              overflow: hidden;
              transition: transform 0.3s ease;
            }
            .skill-item::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
              transform: rotate(45deg);
              transition: all 0.6s;
            }
            .skill-item:hover::before {
              animation: shine 0.6s ease-in-out;
            }
            @keyframes shine {
              0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
              100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
            }
            
            /* Info cards */
            .info-card {
              background: white;
              border: 2px solid #e2e8f0;
              border-radius: 16px;
              padding: 20px;
              margin-left: 20px;
              position: relative;
              transition: all 0.3s ease;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            }
            .info-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4px;
              background: linear-gradient(90deg, #667eea, #764ba2);
              border-radius: 16px 16px 0 0;
            }
            .info-card:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            }
            
            .card-title {
              font-size: 16px;
              font-weight: 700;
              color: #2c3e50;
              margin-bottom: 8px;
            }
            .card-subtitle {
              font-size: 14px;
              color: #667eea;
              font-weight: 600;
              margin-bottom: 6px;
            }
            .card-meta {
              font-size: 12px;
              color: #a0aec0;
              margin-bottom: 8px;
            }
            .card-description {
              font-size: 13px;
              color: #4a5568;
              line-height: 1.6;
            }
            
            /* Stats section */
            .stats-container {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
              margin: 30px 20px 0;
            }
            .stat-item {
              text-align: center;
              padding: 20px;
              background: linear-gradient(135deg, #f7fafc, #edf2f7);
              border-radius: 16px;
              border: 2px solid #e2e8f0;
            }
            .stat-number {
              font-size: 28px;
              font-weight: 800;
              color: #667eea;
              margin-bottom: 5px;
            }
            .stat-label {
              font-size: 12px;
              color: #718096;
              text-transform: uppercase;
              letter-spacing: 1px;
              font-weight: 600;
            }
            
            /* Footer */
            .footer {
              background: #f8f9fa;
              padding: 25px 40px;
              text-align: center;
              border-top: 1px solid #e9ecef;
            }
            .footer-text {
              font-size: 12px;
              color: #6c757d;
              font-style: italic;
            }
            
            @page {
              size: A4;
              margin: 0;
            }
            @media print {
              body { 
                background: white !important;
                padding: 20px !important;
              }
              .resume-card { 
                box-shadow: none !important; 
                border: 1px solid #ddd !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-card">
            <div class="top-decoration"></div>
            
            <!-- Header -->
            <div class="header">
              <div class="profile-circle">
                ${(profile?.user?.firstName?.charAt(0) || 'U')}${(profile?.user?.lastName?.charAt(0) || 'N')}
              </div>
              <div class="name">${profile?.user?.firstName || 'First'} ${profile?.user?.lastName || 'Last'}</div>
              <div class="contact">
                ${profile?.user?.email || 'email@example.com'} • ${profile?.user?.phone || '+1 234 567 8900'}
              </div>
            </div>
            
            <div class="content">
              <!-- Professional Summary -->
              <div class="section">
                <div class="section-header">
                  <div class="section-icon">💼</div>
                  <div class="section-title">Professional Overview</div>
                </div>
                <div class="summary-text">
                  ${profile?.user_detail?.about || 'Dynamic and results-driven professional with a passion for innovation and excellence. Committed to delivering high-quality solutions and driving organizational success through strategic thinking and collaborative leadership.'}
                </div>
              </div>
              
              <!-- Core Competencies -->
              ${data?.skills && data.skills.length > 0 ? `
              <div class="section">
                <div class="section-header">
                  <div class="section-icon">🚀</div>
                  <div class="section-title">Core Competencies</div>
                </div>
                <div class="skills-grid">
                  ${data.skills.slice(0, 8).map(skill => `
                    <div class="skill-item">${skill.skill || 'Skill'}</div>
                  `).join('')}
                </div>
              </div>
              ` : ''}
              
              <!-- Academic Background -->
              ${data?.education && data.education.length > 0 ? `
              <div class="section">
                <div class="section-header">
                  <div class="section-icon">🎓</div>
                  <div class="section-title">Academic Excellence</div>
                </div>
                <div class="info-card">
                  <div class="card-title">${data.education[0].degree || 'Degree Program'}</div>
                  <div class="card-subtitle">${data.education[0].institution || 'Academic Institution'}</div>
                  <div class="card-meta">${data.education[0].start_date || ''} - ${data.education[0].end_date || ''}</div>
                  ${data.education[0].specialization ? `<div class="card-description">Specialized in ${data.education[0].specialization}</div>` : ''}
                  ${data.education[0].gpa ? `<div class="card-description">Academic Achievement: ${data.education[0].gpa} GPA</div>` : ''}
                </div>
              </div>
              ` : ''}
              
              <!-- Professional Experience -->
              ${data?.experience && data.experience.length > 0 ? `
              <div class="section">
                <div class="section-header">
                  <div class="section-icon">💡</div>
                  <div class="section-title">Professional Journey</div>
                </div>
                <div class="info-card">
                  <div class="card-title">${data.experience[0].job_title || 'Professional Role'}</div>
                  <div class="card-subtitle">${data.experience[0].company || 'Organization'}</div>
                  <div class="card-meta">${data.experience[0].start_date || ''} - ${data.experience[0].end_date || 'Present'}</div>
                  <div class="card-description">
                    ${(data.experience[0].responsibilities || 'Demonstrated expertise in strategic planning, team leadership, and project execution while delivering exceptional results and driving continuous improvement initiatives.').substring(0, 200)}...
                  </div>
                </div>
              </div>
              ` : ''}
              
              <!-- Featured Project -->
              ${data?.projects && data.projects.length > 0 ? `
              <div class="section">
                <div class="section-header">
                  <div class="section-icon">⭐</div>
                  <div class="section-title">Signature Project</div>
                </div>
                <div class="info-card">
                  <div class="card-title">${data.projects[0].title || 'Innovation Project'}</div>
                  <div class="card-description">
                    ${(data.projects[0].description || 'Spearheaded a transformative initiative that showcased technical expertise, creative problem-solving, and strategic implementation resulting in measurable business impact.').substring(0, 180)}...
                  </div>
                  ${data.projects[0].technologies ? `<div class="card-meta">Technologies: ${data.projects[0].technologies}</div>` : ''}
                </div>
              </div>
              ` : ''}
              
              <!-- Professional Metrics -->
              <div class="stats-container">
                <div class="stat-item">
                  <div class="stat-number">${data?.experience?.length || '2'}+</div>
                  <div class="stat-label">Years Experience</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">${data?.projects?.length || '5'}+</div>
                  <div class="stat-label">Projects Completed</div>
                </div>
                <div class="stat-item">
                  <div class="stat-number">${data?.skills?.length || '10'}+</div>
                  <div class="stat-label">Technical Skills</div>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <div class="footer-text">
                Professional Summary • Generated ${new Date().toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const windowFeatures = [
      'width=800',
      'height=600',
      'left=' + (screen.width / 2 - 400),
      'top=' + (screen.height / 2 - 300),
      'resizable=yes',
      'scrollbars=yes'
    ].join(',');

    const printWindow = window.open(url, '_blank', windowFeatures);
    
    if (!printWindow) {
      alert('Please allow popups for this site to download PDF');
      return;
    }

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 10000);
  };

  
  return (
    <div className="max-w-2xl mx-auto">

      <div 
      id="summary-content"
      className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6 text-gray-900 font-sans border border-gray-200">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">
          {profile?.user?.firstName} {profile?.user?.lastName}
        </h1>
        <p className="text-sm text-gray-600">
          {profile?.user?.email} | {profile?.user?.phone || ""}
        </p>
      </div>

      {/* Quick Summary */}
      <div className="mb-4">
        <h6 className="text-md font-semibold text-gray-800 mb-2">Summary</h6>
        <p className="text-sm text-gray-700">
          {profile?.user_detail?.about ||
            "Motivated professional with experience in development, skilled in modern technologies and problem-solving."}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h6 className="text-md font-semibold text-gray-800 mb-2">Top Skills</h6>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, idx) => (
            console.log(skill),
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
            >
              {skill.skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education (latest only) */}
      {data.education?.length > 0 && (
        <div className="mb-4">
          <h6 className="text-md font-semibold text-gray-800 mb-2">
            Education
          </h6>
          <p className="text-sm text-gray-700">
            <strong>{data.education[0].degree}</strong> –{" "}
            {data.education[0].institution}
          </p>
          <p className="text-xs text-gray-500">
            {data.education[0].start_date} - {data.education[0].end_date}
          </p>
        </div>
      )}

      {/* Recent Project (latest only) */}
      {data.projects?.length > 0 && (
        <div className="mb-4">
          <h6 className="text-md font-semibold text-gray-800 mb-2">Project</h6>
          <p className="text-sm text-gray-700">
            <strong>{data.projects[0].title}</strong> –{" "}
            {data.projects[0].description}
          </p>
        </div>
      )}

      {/* Recent Experience (latest only) */}
      {data.experience?.length > 0 && (
        <div className="mb-4">
          <h6 className="text-md font-semibold text-gray-800 mb-2">
            Experience
          </h6>
          <p className="text-sm text-gray-700">
            <strong>{data.experience[0].job_title}</strong> at{" "}
            {data.experience[0].company}
          </p>
          <p className="text-xs text-gray-500">
            {data.experience[0].start_date} - {data.experience[0].end_date}
          </p>
        </div>
      )}
    </div>

    <div className="flex justify-center gap-3 mt-6">
        
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 shadow-md font-medium"
        >
          <Icon icon="material-symbols:download" className="w-5 h-5" />
          Download PDF
        </button>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .flex.justify-center.gap-3.mt-6 {
            display: none !important;
          }
          #summary-content {
            box-shadow: none !important;
            border: 1px solid #ccc !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 30px !important;
            max-width: none !important;
          }
        }
      `}</style>

    </div>
  );
};

export default SummaryView;
