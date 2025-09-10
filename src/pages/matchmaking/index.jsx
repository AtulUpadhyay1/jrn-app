import React, { useState } from "react";
import { Button } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";

const Matchmaking = () => {
  const navigate = useNavigate();
  
  // Mock data for engines and jobs
  const [engines, setEngines] = useState([
    {
      id: 1,
      name: "Frontend Developer",
      location: "Remote",
      skills: ["React", "JavaScript", "CSS"],
      salary: "$80k - $120k",
      created: "2024-08-20",
      isActive: true,
      matchCount: 15
    },
    {
      id: 2,
      name: "Full Stack Engineer",
      location: "San Francisco",
      skills: ["React", "Node.js", "MongoDB"],
      salary: "$100k - $150k",
      created: "2024-08-18",
      isActive: false,
      matchCount: 8
    }
  ]);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "Remote",
      salary: "$90,000 - $130,000",
      type: "Full-time",
      posted: "2 days ago",
      logo: "https://via.placeholder.com/60x60/667eea/ffffff?text=TC",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
      description: "Join our dynamic team to build cutting-edge web applications...",
      matchPercentage: 95,
      applied: false,
      notInterested: false
    },
    {
      id: 2,
      title: "React Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      salary: "$75,000 - $110,000",
      type: "Full-time",
      posted: "1 week ago",
      logo: "https://via.placeholder.com/60x60/4ecdc4/ffffff?text=SX",
      skills: ["React", "JavaScript", "Redux", "GraphQL"],
      description: "We're looking for a passionate React developer to help us scale...",
      matchPercentage: 88,
      applied: false,
      notInterested: false
    },
    {
      id: 3,
      title: "Frontend Engineer",
      company: "InnovateLabs",
      location: "San Francisco, CA",
      salary: "$85,000 - $125,000",
      type: "Full-time",
      posted: "3 days ago",
      logo: "https://via.placeholder.com/60x60/ff6b6b/ffffff?text=IL",
      skills: ["React", "Vue.js", "CSS3", "Webpack"],
      description: "Build amazing user experiences with our innovative team...",
      matchPercentage: 82,
      applied: true,
      notInterested: false
    },
    {
      id: 4,
      title: "UI/UX Developer",
      company: "DesignStudio",
      location: "Remote",
      salary: "$70,000 - $100,000",
      type: "Contract",
      posted: "5 days ago",
      logo: "https://via.placeholder.com/60x60/45b7d1/ffffff?text=DS",
      skills: ["React", "Figma", "CSS", "JavaScript"],
      description: "Create beautiful and functional user interfaces...",
      matchPercentage: 75,
      applied: false,
      notInterested: false
    }
  ]);

  const [selectedEngine, setSelectedEngine] = useState(engines[0]);
  const [filter, setFilter] = useState("all"); // all, applied, notInterested

  const handleEngineToggle = (engineId) => {
    setEngines(engines.map(engine => 
      engine.id === engineId 
        ? { ...engine, isActive: !engine.isActive }
        : engine
    ));
  };

  const handleJobAction = (jobId, action) => {
    setJobs(jobs.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            applied: action === 'apply' ? true : job.applied,
            notInterested: action === 'notInterested' ? true : job.notInterested
          }
        : job
    ));
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === "applied") return job.applied;
    if (filter === "notInterested") return job.notInterested;
    return !job.applied && !job.notInterested;
  });

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return "text-green-600 bg-green-100";
    if (percentage >= 80) return "text-blue-600 bg-blue-100";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Matching Dashboard</h1>
          <p className="text-gray-600 mt-1">Find jobs that match your preferences and skills</p>
        </div>
        <Button
          onClick={() => navigate("/job-copilot-config")}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Icon icon="material-symbols:add-circle" className="w-5 h-5" />
          Create New Engine
        </Button>
      </div>

      {/* Engines Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Icon icon="material-symbols:settings" className="w-6 h-6 text-indigo-600" />
            Your Job Engines
          </h2>
          <span className="text-sm text-gray-500">{engines.length} engines created</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {engines.map((engine) => (
            <div 
              key={engine.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedEngine.id === engine.id 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedEngine(engine)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-800">{engine.name}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    engine.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {engine.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEngineToggle(engine.id);
                    }}
                    className={`p-1 rounded-full transition-colors ${
                      engine.isActive 
                        ? 'text-green-600 hover:bg-green-100' 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <Icon icon={engine.isActive ? "material-symbols:toggle-on" : "material-symbols:toggle-off"} className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols:location-on" className="w-4 h-4" />
                  {engine.location}
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols:payments" className="w-4 h-4" />
                  {engine.salary}
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon="material-symbols:work" className="w-4 h-4" />
                  {engine.matchCount} matches found
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {engine.skills.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
                {engine.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                    +{engine.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Icon icon="material-symbols:work" className="w-6 h-6 text-indigo-600" />
              Matched Jobs for "{selectedEngine.name}"
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{filteredJobs.length} jobs found</span>
            </div>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2">
            {[
              { key: "all", label: "Available", count: jobs.filter(j => !j.applied && !j.notInterested).length },
              { key: "applied", label: "Applied", count: jobs.filter(j => j.applied).length },
              { key: "notInterested", label: "Not Interested", count: jobs.filter(j => j.notInterested).length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Icon icon="material-symbols:work-off" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-500">
                {filter === "all" ? "Try adjusting your engine settings or create a new engine." : 
                 filter === "applied" ? "You haven't applied to any jobs yet." :
                 "No jobs marked as not interested."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <img 
                        src={job.logo} 
                        alt={job.company}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 hover:text-indigo-600 cursor-pointer">
                              {job.title}
                            </h3>
                            <p className="text-gray-600 font-medium">{job.company}</p>
                          </div>
                          
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.matchPercentage)}`}>
                            {job.matchPercentage}% match
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Icon icon="material-symbols:location-on" className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon icon="material-symbols:payments" className="w-4 h-4" />
                            {job.salary}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon icon="material-symbols:schedule" className="w-4 h-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon icon="material-symbols:access-time" className="w-4 h-4" />
                            {job.posted}
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {!job.applied && !job.notInterested ? (
                            <>
                              <Button
                                onClick={() => handleJobAction(job.id, 'apply')}
                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <Icon icon="material-symbols:send" className="w-4 h-4" />
                                Apply Now
                              </Button>
                              <Button
                                onClick={() => navigate(`/jobs/${job.id}`)}
                                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <Icon icon="material-symbols:visibility" className="w-4 h-4" />
                                View Details
                              </Button>
                              <Button
                                onClick={() => handleJobAction(job.id, 'notInterested')}
                                className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                <Icon icon="material-symbols:thumb-down" className="w-4 h-4" />
                                Not Interested
                              </Button>
                            </>
                          ) : job.applied ? (
                            <div className="flex items-center gap-2 text-green-600">
                              <Icon icon="material-symbols:check-circle" className="w-5 h-5" />
                              <span className="font-medium">Application Submitted</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-gray-500">
                              <Icon icon="material-symbols:block" className="w-5 h-5" />
                              <span className="font-medium">Marked as Not Interested</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Matchmaking;
