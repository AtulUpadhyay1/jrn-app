import React, { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const ComparativeAnalysis = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [comparisonView, setComparisonView] = useState('table'); // table, cards, radar
  const [filterCriteria, setFilterCriteria] = useState('all');

  const availableJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      remote: true,
      salary: { min: 120000, max: 160000 },
      experience: "5+ years",
      skills: ["React", "TypeScript", "Next.js", "GraphQL"],
      benefits: ["Health Insurance", "401k", "Stock Options", "Flexible Hours"],
      companySize: "500-1000",
      industry: "Technology",
      rating: 4.5,
      workLifeBalance: 4.2,
      careerGrowth: 4.0,
      compensation: 4.6,
      culture: 4.3,
      logo: "https://via.placeholder.com/60x60/667eea/ffffff?text=TC",
      description: "Join our dynamic team building next-generation web applications...",
      pros: ["Great compensation", "Modern tech stack", "Remote flexibility"],
      cons: ["High pressure environment", "Long hours during releases"]
    },
    {
      id: 2,
      title: "React Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      type: "Full-time",
      remote: false,
      salary: { min: 90000, max: 130000 },
      experience: "3+ years",
      skills: ["React", "JavaScript", "Redux", "Node.js"],
      benefits: ["Health Insurance", "Unlimited PTO", "Learning Budget"],
      companySize: "50-100",
      industry: "Fintech",
      rating: 4.2,
      workLifeBalance: 4.5,
      careerGrowth: 4.4,
      compensation: 3.8,
      culture: 4.6,
      logo: "https://via.placeholder.com/60x60/4ecdc4/ffffff?text=SX",
      description: "Be part of a growing fintech startup revolutionizing payments...",
      pros: ["Great culture", "Learning opportunities", "Equity potential"],
      cons: ["Lower base salary", "Startup uncertainty", "No remote work"]
    },
    {
      id: 3,
      title: "Full Stack Engineer",
      company: "InnovateLabs",
      location: "Austin, TX",
      type: "Full-time",
      remote: true,
      salary: { min: 100000, max: 140000 },
      experience: "4+ years",
      skills: ["React", "Node.js", "Python", "AWS"],
      benefits: ["Health Insurance", "401k Match", "Conference Budget", "Remote First"],
      companySize: "200-500",
      industry: "Healthcare",
      rating: 4.3,
      workLifeBalance: 4.0,
      careerGrowth: 4.2,
      compensation: 4.1,
      culture: 4.0,
      logo: "https://via.placeholder.com/60x60/ff6b6b/ffffff?text=IL",
      description: "Build healthcare solutions that impact millions of lives...",
      pros: ["Meaningful work", "Good work-life balance", "Remote flexibility"],
      cons: ["Slower decision making", "Complex compliance requirements"]
    }
  ];

  const handleJobToggle = (job) => {
    setSelectedJobs(prev => {
      const isSelected = prev.find(j => j.id === job.id);
      if (isSelected) {
        return prev.filter(j => j.id !== job.id);
      } else if (prev.length < 4) { // Limit to 4 jobs for comparison
        return [...prev, job];
      }
      return prev;
    });
  };

  const getComparisonScore = (job, criteria) => {
    switch(criteria) {
      case 'salary': return ((job.salary.min + job.salary.max) / 2) / 1000;
      case 'rating': return job.rating;
      case 'workLifeBalance': return job.workLifeBalance;
      case 'careerGrowth': return job.careerGrowth;
      case 'culture': return job.culture;
      default: return job.rating;
    }
  };

  const formatSalary = (salary) => {
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
  };

  const getScoreColor = (score, maxScore = 5) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-blue-600 bg-blue-100';
    if (percentage >= 40) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Job Comparative Analysis</h1>
            <p className="text-blue-100 text-lg">Compare multiple job opportunities side by side</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{selectedJobs.length}/4</div>
            <div className="text-blue-100 text-sm">Jobs Selected</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">View Options</h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {[
                { id: 'table', icon: 'material-symbols:table', label: 'Table' },
                { id: 'cards', icon: 'material-symbols:view-module', label: 'Cards' },
                { id: 'radar', icon: 'material-symbols:radar', label: 'Radar' }
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => setComparisonView(view.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    comparisonView === view.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon icon={view.icon} className="w-4 h-4" />
                  {view.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Criteria</option>
              <option value="salary">Salary Focus</option>
              <option value="workLifeBalance">Work-Life Balance</option>
              <option value="careerGrowth">Career Growth</option>
              <option value="culture">Company Culture</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
              <Icon icon="material-symbols:download" className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Job Selection */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Jobs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableJobs.map((job) => {
              const isSelected = selectedJobs.find(j => j.id === job.id);
              return (
                <div
                  key={job.id}
                  onClick={() => handleJobToggle(job)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{job.title}</h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                      <p className="text-sm text-gray-500">{formatSalary(job.salary)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Icon icon="material-symbols:star" className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs text-gray-600">{job.rating}</span>
                        </div>
                        {job.remote && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                            Remote
                          </span>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <Icon icon="material-symbols:check-circle" className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comparison Results */}
      {selectedJobs.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Comparison Results</h3>
          </div>

          {comparisonView === 'table' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Criteria</th>
                    {selectedJobs.map((job) => (
                      <th key={job.id} className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                        <div className="flex flex-col items-center">
                          <img src={job.logo} alt={job.company} className="w-8 h-8 rounded mb-2" />
                          <span className="truncate max-w-32">{job.title}</span>
                          <span className="text-xs text-gray-500">{job.company}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { key: 'salary', label: 'Salary Range', format: (job) => formatSalary(job.salary) },
                    { key: 'location', label: 'Location', format: (job) => job.location },
                    { key: 'remote', label: 'Remote Work', format: (job) => job.remote ? 'Yes' : 'No' },
                    { key: 'experience', label: 'Experience', format: (job) => job.experience },
                    { key: 'companySize', label: 'Company Size', format: (job) => job.companySize },
                    { key: 'rating', label: 'Overall Rating', format: (job) => `${job.rating}/5` },
                    { key: 'workLifeBalance', label: 'Work-Life Balance', format: (job) => `${job.workLifeBalance}/5` },
                    { key: 'careerGrowth', label: 'Career Growth', format: (job) => `${job.careerGrowth}/5` },
                    { key: 'compensation', label: 'Compensation', format: (job) => `${job.compensation}/5` },
                    { key: 'culture', label: 'Culture', format: (job) => `${job.culture}/5` }
                  ].map((criteria) => (
                    <tr key={criteria.key}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{criteria.label}</td>
                      {selectedJobs.map((job) => (
                        <td key={job.id} className="px-6 py-4 text-center text-sm text-gray-700">
                          {criteria.format(job)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {comparisonView === 'cards' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {selectedJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Salary</p>
                        <p className="text-sm font-medium text-gray-900">{formatSalary(job.salary)}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                        <p className="text-sm font-medium text-gray-900">{job.location}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Ratings</p>
                        <div className="space-y-1">
                          {[
                            { label: 'Overall', value: job.rating },
                            { label: 'Work-Life', value: job.workLifeBalance },
                            { label: 'Growth', value: job.careerGrowth },
                            { label: 'Culture', value: job.culture }
                          ].map((rating) => (
                            <div key={rating.label} className="flex items-center justify-between">
                              <span className="text-xs text-gray-600">{rating.label}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getScoreColor(rating.value)}`}>
                                {rating.value}/5
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Pros</p>
                        <ul className="text-xs text-gray-700 space-y-1">
                          {job.pros.slice(0, 2).map((pro, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <Icon icon="material-symbols:check" className="w-3 h-3 text-green-600" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Cons</p>
                        <ul className="text-xs text-gray-700 space-y-1">
                          {job.cons.slice(0, 2).map((con, idx) => (
                            <li key={idx} className="flex items-center gap-1">
                              <Icon icon="material-symbols:close" className="w-3 h-3 text-red-600" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {comparisonView === 'radar' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {selectedJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        <p className="text-sm text-gray-600">{job.company}</p>
                      </div>
                    </div>

                    {/* Radar Chart Placeholder */}
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Icon icon="material-symbols:radar" className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Radar Chart</p>
                        <p className="text-xs text-gray-400">Rating visualization</p>
                      </div>
                    </div>

                    {/* Rating Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: 'Overall', value: job.rating, color: 'blue' },
                        { label: 'Work-Life', value: job.workLifeBalance, color: 'green' },
                        { label: 'Growth', value: job.careerGrowth, color: 'purple' },
                        { label: 'Culture', value: job.culture, color: 'pink' }
                      ].map((metric) => (
                        <div key={metric.label} className="text-center">
                          <div className={`text-2xl font-bold text-${metric.color}-600`}>
                            {metric.value}
                          </div>
                          <div className="text-xs text-gray-500">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Summary Insights */}
      {selectedJobs.length > 1 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="material-symbols:trending-up" className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Highest Rated</h4>
              </div>
              <p className="text-sm text-blue-800">
                {selectedJobs.reduce((prev, current) => (prev.rating > current.rating) ? prev : current).company}
                <span className="block text-xs text-blue-600">
                  Overall rating: {selectedJobs.reduce((prev, current) => (prev.rating > current.rating) ? prev : current).rating}/5
                </span>
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="material-symbols:payments" className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Best Compensation</h4>
              </div>
              <p className="text-sm text-green-800">
                {selectedJobs.reduce((prev, current) => 
                  ((prev.salary.min + prev.salary.max) > (current.salary.min + current.salary.max)) ? prev : current
                ).company}
                <span className="block text-xs text-green-600">
                  {formatSalary(selectedJobs.reduce((prev, current) => 
                    ((prev.salary.min + prev.salary.max) > (current.salary.min + current.salary.max)) ? prev : current
                  ).salary)}
                </span>
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="material-symbols:work-history" className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-purple-900">Best Work-Life Balance</h4>
              </div>
              <p className="text-sm text-purple-800">
                {selectedJobs.reduce((prev, current) => (prev.workLifeBalance > current.workLifeBalance) ? prev : current).company}
                <span className="block text-xs text-purple-600">
                  Rating: {selectedJobs.reduce((prev, current) => (prev.workLifeBalance > current.workLifeBalance) ? prev : current).workLifeBalance}/5
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparativeAnalysis;
