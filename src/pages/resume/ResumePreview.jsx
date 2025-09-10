export default function ResumePreview({ resumeData }) {
  return (
    <div
      className="border border-gray-600 p-6 rounded shadow bg-white text-sm leading-relaxed"
      style={{ minHeight: '700px', width: '210mm', minWidth: '210mm', height: '297mm' }} // A4 size
    >
      {/* Personal Info */}
      <div className="text-center border-b pb-4">
        <h1 className="text-2xl font-bold">{resumeData.fullName || 'Your Name'}</h1>
        <p>{resumeData.address}</p>
        <p>Email: {resumeData.email} | Phone: {resumeData.phone}</p>
        <p>
          <a href={resumeData.linkedin} className="text-blue-600" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>{' '}
          |{' '}
          <a href={resumeData.github} className="text-blue-600" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </div>

      {/* Education */}
      <section className="mt-4">
        <h2 className="text-lg font-semibold border-b">Education</h2>
        {/* iterate resume.education */}
        {resumeData.education && resumeData.education.map((edu, index) => (
          <div key={index} className="mt-2">
            <p className="font-medium">{edu.degree} — {edu.institution}</p>
            <p>Graduation Year: {edu.start_date} | GPA: {edu.grade}</p>
            <p>{edu.specialization}</p>
            <p>{edu.location}</p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="mt-4">
        <h2 className="text-lg font-semibold border-b">Skills</h2>
        <p>{resumeData.skills}</p>
      </section>

      {/* Communication */}
      <section className="mt-4">
        <h2 className="text-lg font-semibold border-b">Communication & Languages</h2>
        <p>{resumeData.communication}</p>
        <p>Languages: {resumeData.languages}</p>
      </section>

      {/* Curriculum */}
      <section className="mt-4">
        <h2 className="text-lg font-semibold border-b">Curriculum & Certifications</h2>
        <p>{resumeData.curriculum}</p>
        <p>Certifications: {resumeData.certifications}</p>
      </section>

      {/* Projects */}
      <section className="mt-4">
        <h2 className="text-lg font-semibold border-b">Projects</h2>
        <p>{resumeData.projects}</p>
        {resumeData.projectLinks && (
          <p>
            Links:{' '}
            {resumeData.projectLinks
              .split(',')
              .map((link, i) => (
                <a
                  key={i}
                  href={link.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mr-2"
                >
                  Project {i + 1}
                </a>
              ))}
          </p>
        )}
      </section>

      {/* Experience */}
      <section className="mt-4">
        <h2 className="text-lg font-semibold border-b">Experience</h2>
        <p>{resumeData.experience}</p>
        {resumeData.achievements && <p>Achievements: {resumeData.achievements}</p>}
        {resumeData.references && <p>References: {resumeData.references}</p>}
      </section>


    </div>
  );
}
