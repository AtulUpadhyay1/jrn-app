import React from 'react';
import { Icon } from '@iconify/react';

const ResumePreviewTwo = ({ data,profile }) => {
  const sectionStyle = "mb-6 border-b pb-4";
  const titleStyle = "text-l font-semibold text-gray-800 mb-2";
  const itemStyle = "text-sm text-gray-700";


  const handleDownloadPDF = () => {
    // Option 1: Using browser's print to PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Resume - ${profile?.user?.firstName || 'User'} ${profile?.user?.lastName || ''}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.4;
              color: #333;
              background: white;
            }
            .resume-container {
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              background: white;
              display: flex;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            
            /* Left Sidebar */
            .sidebar {
              width: 35%;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px 25px;
            }
            .profile-section {
              text-align: center;
              margin-bottom: 30px;
            }
            .profile-img {
              width: 100px;
              height: 100px;
              border-radius: 50%;
              background: rgba(255,255,255,0.2);
              margin: 0 auto 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 40px;
              border: 3px solid rgba(255,255,255,0.3);
            }
            .name {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
              text-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }
            .title {
              font-size: 14px;
              opacity: 0.9;
              font-weight: 300;
            }
            
            .sidebar-section {
              margin-bottom: 25px;
            }
            .sidebar-heading {
              font-size: 16px;
              font-weight: bold;
              margin-bottom: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
              border-bottom: 2px solid rgba(255,255,255,0.3);
              padding-bottom: 5px;
            }
            .contact-item {
              display: flex;
              align-items: center;
              margin-bottom: 8px;
              font-size: 12px;
            }
            .contact-icon {
              width: 16px;
              margin-right: 10px;
              opacity: 0.9;
            }
            .skill-item {
              margin-bottom: 8px;
            }
            .skill-name {
              font-size: 12px;
              margin-bottom: 3px;
            }
            .skill-bar {
              height: 6px;
              background: rgba(255,255,255,0.2);
              border-radius: 3px;
              overflow: hidden;
            }
            .skill-progress {
              height: 100%;
              background: rgba(255,255,255,0.8);
              border-radius: 3px;
            }
            .language-item {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 8px;
              font-size: 12px;
            }
            .language-level {
              background: rgba(255,255,255,0.2);
              padding: 2px 8px;
              border-radius: 10px;
              font-size: 10px;
            }
            
            /* Main Content */
            .main-content {
              width: 65%;
              padding: 30px 35px;
              background: white;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-heading {
              font-size: 18px;
              font-weight: bold;
              color: #2c3e50;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 1px;
              border-bottom: 3px solid #667eea;
              padding-bottom: 5px;
            }
            .summary-text {
              font-size: 13px;
              line-height: 1.6;
              color: #555;
              text-align: justify;
            }
            
            .experience-item, .education-item, .project-item {
              margin-bottom: 20px;
              padding-left: 20px;
              border-left: 3px solid #e9ecef;
              position: relative;
            }
            .experience-item::before, .education-item::before, .project-item::before {
              content: '';
              position: absolute;
              left: -6px;
              top: 5px;
              width: 9px;
              height: 9px;
              background: #667eea;
              border-radius: 50%;
            }
            .item-title {
              font-size: 14px;
              font-weight: bold;
              color: #2c3e50;
              margin-bottom: 3px;
            }
            .item-company {
              font-size: 13px;
              color: #667eea;
              font-weight: 600;
              margin-bottom: 2px;
            }
            .item-date {
              font-size: 11px;
              color: #7f8c8d;
              margin-bottom: 5px;
              font-style: italic;
            }
            .item-description {
              font-size: 12px;
              color: #555;
              line-height: 1.5;
            }
            .item-tech {
              font-size: 11px;
              color: #95a5a6;
              margin-top: 3px;
            }
            
            @page {
              size: A4;
              margin: 0;
            }
            @media print {
              body { margin: 0; }
              .resume-container { 
                box-shadow: none; 
                margin: 0;
                width: 100%;
                min-height: 100vh;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
            <!-- Left Sidebar -->
            <div class="sidebar">
              <!-- Profile Section -->
              <div class="profile-section">
                <div class="profile-img">
                  ${(profile?.user?.firstName?.charAt(0) || 'U')}${(profile?.user?.lastName?.charAt(0) || 'N')}
                </div>
                <div class="name">${profile?.user?.firstName || 'First'} ${profile?.user?.lastName || 'Last'}</div>
                <div class="title">Professional</div>
              </div>
              
              <!-- Contact Info -->
              <div class="sidebar-section">
                <div class="sidebar-heading">Contact</div>
                <div class="contact-item">
                  <span class="contact-icon">📧</span>
                  <span>${profile?.user?.email || 'email@example.com'}</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">📱</span>
                  <span>${profile?.user?.phone || '+1 234 567 8900'}</span>
                </div>
                <div class="contact-item">
                  <span class="contact-icon">📍</span>
                  <span>${profile?.user_detail?.address || 'City, Country'}</span>
                </div>
                ${profile?.user_detail?.dob ? `
                <div class="contact-item">
                  <span class="contact-icon">🎂</span>
                  <span>${profile.user_detail.dob}</span>
                </div>
                ` : ''}
              </div>
              
              <!-- Skills -->
              ${data?.skills && data.skills.length > 0 ? `
              <div class="sidebar-section">
                <div class="sidebar-heading">Skills</div>
                ${data.skills.slice(0, 6).map(skill => {
                  const level = skill.level?.toLowerCase();
                  const width = level === 'expert' ? '90%' : 
                              level === 'advanced' ? '75%' : 
                              level === 'intermediate' ? '60%' : '45%';
                  return `
                  <div class="skill-item">
                    <div class="skill-name">${skill.skill || 'Skill'}</div>
                    <div class="skill-bar">
                      <div class="skill-progress" style="width: ${width}"></div>
                    </div>
                  </div>
                  `;
                }).join('')}
              </div>
              ` : ''}
              
              <!-- Languages -->
              ${data?.communication && data.communication.length > 0 ? `
              <div class="sidebar-section">
                <div class="sidebar-heading">Languages</div>
                ${data.communication.slice(0, 4).map(lang => `
                  <div class="language-item">
                    <span>${lang.language || 'Language'}</span>
                    <span class="language-level">${lang.proficiency || 'Basic'}</span>
                  </div>
                `).join('')}
              </div>
              ` : ''}
            </div>
            
            <!-- Main Content -->
            <div class="main-content">
              <!-- Professional Summary -->
              <div class="section">
                <div class="section-heading">Professional Summary</div>
                <div class="summary-text">
                  ${profile?.summary || 'Experienced professional with expertise in various technologies and a proven track record of delivering high-quality solutions. Strong problem-solving skills and passion for continuous learning and innovation.'}
                </div>
              </div>
              
              <!-- Experience -->
              ${data?.experience && data.experience.length > 0 ? `
              <div class="section">
                <div class="section-heading">Experience</div>
                ${data.experience.slice(0, 3).map(exp => `
                  <div class="experience-item">
                    <div class="item-title">${exp.job_title || 'Job Title'}</div>
                    <div class="item-company">${exp.company || 'Company Name'}</div>
                    <div class="item-date">${exp.start_date || ''} - ${exp.end_date || 'Present'}</div>
                    <div class="item-description">${(exp.responsibilities || 'Key responsibilities and achievements').substring(0, 120)}...</div>
                    ${exp.technologies ? `<div class="item-tech">Technologies: ${exp.technologies}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
              
              <!-- Education -->
              ${data?.education && data.education.length > 0 ? `
              <div class="section">
                <div class="section-heading">Education</div>
                ${data.education.slice(0, 2).map(edu => `
                  <div class="education-item">
                    <div class="item-title">${edu.degree || 'Degree'}</div>
                    <div class="item-company">${edu.institution || 'Institution'}</div>
                    <div class="item-date">${edu.start_date || ''} - ${edu.end_date || ''}</div>
                    ${edu.gpa ? `<div class="item-description">GPA: ${edu.gpa}</div>` : ''}
                    ${edu.specialization ? `<div class="item-tech">Specialization: ${edu.specialization}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
              
              <!-- Projects -->
              ${data?.projects && data.projects.length > 0 ? `
              <div class="section">
                <div class="section-heading">Key Projects</div>
                ${data.projects.slice(0, 2).map(proj => `
                  <div class="project-item">
                    <div class="item-title">${proj.title || 'Project Title'}</div>
                    <div class="item-description">${(proj.description || 'Project description').substring(0, 100)}...</div>
                    ${proj.technologies ? `<div class="item-tech">Tech Stack: ${proj.technologies}</div>` : ''}
                  </div>
                `).join('')}
              </div>
              ` : ''}
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


    // Open new window with the blob URL
    const windowFeatures = [
      'width=900',
      'height=700',
      'left=' + (screen.width / 2 - 450),
      'top=' + (screen.height / 2 - 350),
      'resizable=yes',
      'scrollbars=yes',
      'status=yes',
      'menubar=yes',
      'toolbar=yes'
    ].join(',');

    const printWindow = window.open(url, '_blank', windowFeatures);
    
    if (!printWindow) {
      alert('Please allow popups for this site to download PDF');
      return;
    }

    // Clean up the object URL after a delay
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 10000);
    
    // Option 2: If you want to implement proper PDF generation, you can use libraries like:
    // - jsPDF with html2canvas
    // - react-pdf
    // - puppeteer (server-side)
    
    // Example with jsPDF (you'd need to install: npm install jspdf html2canvas)
    /*
    import html2canvas from 'html2canvas';
    import jsPDF from 'jspdf';
    
    const element = document.getElementById('resume-content');
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${profile.user.firstName}_${profile.user.lastName}_Resume.pdf`);
    });
    */
  };

  return (
    <div className="max-w-4xl mx-auto p-4">

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8 text-gray-900 font-sans border border-gray-300">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{profile.user.firstName} {profile.user.lastName}</h1>
        <p className="text-sm text-gray-600">{profile.user.email} | {profile.user.phone || ''}</p>
      </div>

      {/* Personal Info */}
      <div className={sectionStyle}>
        <h6 className={titleStyle}>Personal Details</h6>
        <p className={itemStyle}><strong>Gender:</strong> {profile.user_detail.gender}</p>
        <p className={itemStyle}><strong>DOB:</strong> {profile.user_detail.dob}</p>
        <p className={itemStyle}><strong>Address:</strong> {profile.user_detail.address}</p>
      </div>

      {/* Education */}
      <div className={sectionStyle}>
        <h6 className={titleStyle}>Education</h6>
        {data.education?.map((edu, idx) => (
          <div key={idx} className="mb-2">
            <p className={itemStyle}><strong>{edu.degree}</strong> at {edu.institution}</p>
            <p className="text-xs text-gray-500">{edu.start_date} - {edu.end_date}</p>
            <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>
            <p className="text-xs text-gray-500">Specialization: {edu.specialization}</p>
            <p className="text-xs text-gray-500">Location: {edu.location}</p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className={sectionStyle}>
        <h6 className={titleStyle}>Skills</h6>
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill, idx) => (
            // show skill name, category, level
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{skill.skill} ({skill.category}) - {skill.level}</span>

          ))}
        </div>
      </div>

      {/* Projects */}
      <div className={sectionStyle}>
        <h6 className={titleStyle}>Projects</h6>
        {data.projects?.map((proj, idx) => (
          <div key={idx} className="mb-2">
          
            <p className={itemStyle}><strong>{proj.title}</strong></p>
            <p className="text-sm text-gray-600">{proj.description}</p>
            <p className="text-xs text-gray-500">Role: {proj.role}</p>
            <p className="text-xs text-gray-500">Technologies: {proj.technologies}</p>
            <p className="text-xs text-gray-500">Link: <a href={proj.link} className="text-blue-600">{proj.link}</a></p>
            <p className="text-xs text-gray-500">Duration: {proj.duration} months</p>
            <p className="text-xs text-gray-500">Team Size: {proj.team_size}</p>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div className={sectionStyle}>
        <h6 className={titleStyle}>Experience</h6>
        {data.experience?.map((exp, idx) => (
          <div key={idx} className="mb-2">
            
            <p className={itemStyle}><strong>{exp.job_title}</strong> at {exp.company} ({exp.employment_type})</p>
            <p className="text-sm text-gray-600">{exp.start_date} - {exp.end_date}</p>
            <p className="text-xs text-gray-500">Responsibilities: {exp.responsibilities}</p>
            <p className="text-xs text-gray-500">Technologies: {exp.technologies}</p>
            <p className="text-xs text-gray-500">Location: {exp.location}</p>
          </div>
        ))}
      </div>

      {/* Communication */}
      <div className={sectionStyle}>
        <h6 className={titleStyle}>Languages</h6>
        <div className="flex flex-wrap gap-2">
          {data.communication?.map((lang, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{lang.language} - {lang.proficiency}</span>
          ))}
        </div>
      </div>

      {/* Curriculum */}
      <div className={sectionStyle}>
        <h6 className={titleStyle}>Curriculum</h6>
        {data.curriculum?.map((item, idx) => (
          <div key={idx} className="mb-2">
            <p className={itemStyle}><strong>{item.title}</strong></p>
            <p className="text-xs text-gray-500">Description: {item.description}</p>
          </div>
        ))}
      </div>

      {/* Fallback content if no data */}
        {(!data || Object.keys(data).length === 0) && (
          <div className="text-center py-8">
            <p className="text-gray-500">No resume data available to display.</p>
          </div>
        )}

    </div>

    <div className="flex justify-center mt-4">
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md"
        >
          <Icon icon="material-symbols:download" className="w-5 h-5" />
          Download as PDF
        </button>
      </div>

    

    </div>
  );
};

export default ResumePreviewTwo;


