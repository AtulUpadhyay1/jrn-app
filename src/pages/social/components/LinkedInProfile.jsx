import React, { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Image from '@/components/ui/Image';
import Button from '@/components/ui/Button';
import Loading from '@/components/Loading';
import linkedinService from '@/services/linkedinService';

const LinkedInProfile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLinkedInProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🚀 Fetching LinkedIn profile analysis...");
      
      const result = await linkedinService.getCompleteProfileAnalysis();
      
      if (result.success) {
        setData(result.data);
        console.log("✅ LinkedIn profile data loaded successfully");
      } else {
        setError(result.message || 'Failed to fetch LinkedIn profile data');
        console.error("❌ LinkedIn profile fetch failed:", result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error("❌ Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on component mount (optional)
  useEffect(() => {
    // Uncomment the line below if you want to auto-fetch on component mount
    fetchLinkedInProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading />
        <p className="ml-3 text-slate-600">Analyzing LinkedIn profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-red-500">Error: {error}</p>
        <Button 
          text="Retry Analysis" 
          className="btn-primary"
          onClick={fetchLinkedInProfile}
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-slate-500">No LinkedIn profile data available</p>
        <Button 
          text="Analyze LinkedIn Profile" 
          className="btn-primary"
          onClick={fetchLinkedInProfile}
        />
      </div>
    );
  }

  console.log("🔍 LinkedIn Profile Data:---", data.data);

  const profile = JSON.parse(data.data.profile)[0];
  const aiReport = JSON.parse(data.data.ai_report);

  return (
    <div className="space-y-4">
      {/* Header with Refresh Button */}
      <div className="flex justify-between items-center">
        <h6 className="text-2xl font-bold text-slate-800">LinkedIn Profile Analysis</h6>
        <Button 
          text={loading ? "Analyzing..." : "Refresh Analysis"}
          className="btn-outline-primary"
          onClick={fetchLinkedInProfile}
          disabled={loading}
        />
      </div>

      <div className="flex gap-6 h-full">
        {/* Left side - Profile (60%) */}
        <div className="w-[60%] overflow-y-auto">
          <Card title="LinkedIn Profile" className="h-full">
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="flex-shrink-0">
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">{profile.name}</h2>
                  <p className="text-lg text-slate-600 mb-2">{profile.position}</p>
                  <p className="text-sm text-slate-500 mb-3">{profile.city}, {profile.country_code}</p>
                  <div className="flex gap-4 text-sm text-slate-600">
                    <span>{profile.connections} connections</span>
                    <span>{profile.followers} followers</span>
                  </div>
                </div>
              </div>

            {/* About Section */}
            {profile.about && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">About</h3>
                <p className="text-slate-600 leading-relaxed">{profile.about}</p>
              </div>
            )}

            {/* Current Company */}
            {profile.current_company && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">Current Position</h3>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    {profile.current_company.company_logo_url && (
                      <Image
                        src={profile.current_company.company_logo_url}
                        alt={profile.current_company.name}
                        className="w-8 h-8 rounded"
                      />
                    )}
                    <div>
                      <h6 className="font-semibold text-slate-800">{profile.current_company.title}</h6>
                      <p className="text-slate-600">{profile.current_company.name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{profile.current_company.location}</p>
                </div>
              </div>
            )}

            {/* Experience */}
            {profile.experience && profile.experience.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">Experience</h3>
                <div className="space-y-4">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        {exp.company_logo_url && (
                          <Image
                            src={exp.company_logo_url}
                            alt={exp.company}
                            className="w-8 h-8 rounded mt-1"
                          />
                        )}
                        <div className="flex-1">
                          <h6 className="font-semibold text-slate-800">{exp.title}</h6>
                          <p className="text-slate-600 mb-1">{exp.company}</p>
                          <p className="text-sm text-slate-500 mb-2">
                            {exp.start_date} - {exp.end_date}
                          </p>
                          <p className="text-sm text-slate-500">{exp.location}</p>
                          {exp.description_html && (
                            <div 
                              className="text-sm text-slate-600 mt-2"
                              dangerouslySetInnerHTML={{ __html: exp.description_html }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {profile.education && profile.education.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">Education</h3>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        {edu.institute_logo_url && (
                          <Image
                            src={edu.institute_logo_url}
                            alt={edu.title}
                            className="w-8 h-8 rounded mt-1"
                          />
                        )}
                        <div className="flex-1">
                          <h6 className="font-semibold text-slate-800">{edu.title}</h6>
                          {edu.degree && <p className="text-slate-600">{edu.degree}</p>}
                          {edu.field && <p className="text-slate-600">{edu.field}</p>}
                          {edu.start_year && edu.end_year && (
                            <p className="text-sm text-slate-500">
                              {edu.start_year} - {edu.end_year}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {profile.certifications && profile.certifications.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">Certifications</h3>
                <div className="space-y-3">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="bg-slate-50 p-4 rounded-lg">
                      <h6 className="font-semibold text-slate-800">{cert.title}</h6>
                      <p className="text-slate-600">{cert.subtitle}</p>
                      <p className="text-sm text-slate-500">{cert.meta}</p>
                      {cert.credential_url && (
                        <a 
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View credential
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Right side - AI Analysis Report (40%) */}
      <div className="w-[40%] overflow-y-auto">
        <Card title="Profile Analysis Report" className="h-full">
          <div className="space-y-6">
            {/* Profile Summary */}
            {aiReport.profile_summary && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-800">Profile Summary</h3>
                    <Badge 
                      label={`Score: ${aiReport.profile_summary.summary_score}/10`}
                      className="bg-blue-100 text-blue-800"
                    />
                  </div>
                  
                  {aiReport.profile_summary.key_highlights && (
                    <div className="space-y-2">
                      <h6 className="font-medium text-slate-700">Key Highlights</h6>
                      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                        {aiReport.profile_summary.key_highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Strengths */}
            {aiReport.strengths && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">Strengths</h3>
                <div className="space-y-3">
                  {aiReport.strengths.map((strength, index) => (
                    <div key={index} className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="font-medium text-green-800">{strength.category}</h6>
                        <Badge 
                          label={`${strength.impact_score}/10`}
                          className="bg-green-100 text-green-800"
                        />
                      </div>
                      <p className="text-sm text-green-700">{strength.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Areas for Improvement */}
            {aiReport.areas_for_improvement && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">Areas for Improvement</h3>
                <div className="space-y-3">
                  {aiReport.areas_for_improvement.map((area, index) => (
                    <div key={index} className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                      <div className="flex items-center justify-between mb-2">
                        <h6 className="font-medium text-amber-800">{area.category}</h6>
                        <Badge 
                          label={area.priority}
                          className={`${
                            area.priority === 'high' ? 'bg-red-100 text-red-800' :
                            area.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}
                        />
                      </div>
                      <p className="text-sm text-amber-700 mb-2">{area.issue}</p>
                      <p className="text-xs text-amber-600 font-medium">
                        Suggested: {area.suggested_action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overall Score */}
            {aiReport.overall_score && (
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Overall Assessment</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Profile Completeness:</span>
                    <Badge label={`${aiReport.overall_score.profile_completeness}/10`} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Professional Appeal:</span>
                    <Badge label={`${aiReport.overall_score.professional_appeal}/10`} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Marketability:</span>
                    <Badge label={`${aiReport.overall_score.marketability}/10`} />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Overall Rating:</span>
                    <Badge 
                      label={`${aiReport.overall_score.overall_rating}/10`}
                      className="bg-blue-100 text-blue-800 font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Improvement Recommendations */}
            {aiReport.improvement_recommendations && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-800">Recommendations</h3>
                
                {aiReport.improvement_recommendations.immediate_actions && (
                  <div className="space-y-3">
                    <h6 className="font-medium text-slate-700">Immediate Actions</h6>
                    {aiReport.improvement_recommendations.immediate_actions.map((action, index) => (
                      <div key={index} className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 mb-1">{action.action}</p>
                        <p className="text-xs text-blue-600">Impact: {action.expected_impact}</p>
                        <p className="text-xs text-blue-600">Effort: {action.effort_required}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {aiReport.improvement_recommendations.long_term_goals && (
                  <div className="space-y-3">
                    <h6 className="font-medium text-slate-700">Long-term Goals</h6>
                    {aiReport.improvement_recommendations.long_term_goals.map((goal, index) => (
                      <div key={index} className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-purple-800 mb-1">{goal.goal}</p>
                        <p className="text-xs text-purple-600 mb-2">Timeline: {goal.timeline}</p>
                        {goal.steps && (
                          <ul className="list-disc list-inside text-xs text-purple-600">
                            {goal.steps.map((step, stepIndex) => (
                              <li key={stepIndex}>{step}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default LinkedInProfile;