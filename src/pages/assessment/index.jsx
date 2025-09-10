import React, { useState } from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const Assessment = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);

  const skillCategories = [
    {
      id: 'frontend',
      name: 'Frontend Development',
      icon: 'material-symbols:web',
      color: 'bg-blue-500',
      skills: [
        { 
          name: 'React', 
          level: 'Advanced', 
          score: 85, 
          lastTaken: '2 weeks ago',
          questions: 25,
          duration: '45 min',
          description: 'Test your React.js knowledge including hooks, context, and performance optimization'
        },
        { 
          name: 'JavaScript', 
          level: 'Expert', 
          score: 92, 
          lastTaken: '1 month ago',
          questions: 30,
          duration: '50 min',
          description: 'Comprehensive JavaScript assessment covering ES6+, async programming, and DOM manipulation'
        },
        { 
          name: 'CSS/SCSS', 
          level: 'Intermediate', 
          score: 78, 
          lastTaken: '3 weeks ago',
          questions: 20,
          duration: '35 min',
          description: 'CSS fundamentals, flexbox, grid, animations, and responsive design'
        },
        { 
          name: 'TypeScript', 
          level: 'Beginner', 
          score: 0, 
          lastTaken: 'Never',
          questions: 22,
          duration: '40 min',
          description: 'TypeScript fundamentals, types, interfaces, and advanced features'
        }
      ]
    },
    {
      id: 'backend',
      name: 'Backend Development',
      icon: 'material-symbols:storage',
      color: 'bg-green-500',
      skills: [
        { 
          name: 'Node.js', 
          level: 'Advanced', 
          score: 88, 
          lastTaken: '1 week ago',
          questions: 28,
          duration: '55 min',
          description: 'Node.js runtime, Express.js, middleware, and server-side development'
        },
        { 
          name: 'Python', 
          level: 'Intermediate', 
          score: 75, 
          lastTaken: '2 months ago',
          questions: 25,
          duration: '45 min',
          description: 'Python programming, data structures, OOP, and web frameworks'
        },
        { 
          name: 'Database Design', 
          level: 'Intermediate', 
          score: 82, 
          lastTaken: '3 weeks ago',
          questions: 24,
          duration: '50 min',
          description: 'SQL, NoSQL, database optimization, and data modeling'
        }
      ]
    },
    {
      id: 'devops',
      name: 'DevOps & Cloud',
      icon: 'material-symbols:cloud',
      color: 'bg-purple-500',
      skills: [
        { 
          name: 'AWS', 
          level: 'Beginner', 
          score: 0, 
          lastTaken: 'Never',
          questions: 30,
          duration: '60 min',
          description: 'AWS services, EC2, S3, Lambda, and cloud architecture'
        },
        { 
          name: 'Docker', 
          level: 'Intermediate', 
          score: 70, 
          lastTaken: '1 month ago',
          questions: 20,
          duration: '40 min',
          description: 'Container technology, Docker commands, and orchestration'
        }
      ]
    },
    {
      id: 'soft',
      name: 'Soft Skills',
      icon: 'material-symbols:people',
      color: 'bg-orange-500',
      skills: [
        { 
          name: 'Communication', 
          level: 'Advanced', 
          score: 89, 
          lastTaken: '2 weeks ago',
          questions: 15,
          duration: '25 min',
          description: 'Verbal and written communication, presentation skills'
        },
        { 
          name: 'Leadership', 
          level: 'Intermediate', 
          score: 76, 
          lastTaken: '1 month ago',
          questions: 18,
          duration: '30 min',
          description: 'Team leadership, project management, and decision making'
        },
        { 
          name: 'Problem Solving', 
          level: 'Advanced', 
          score: 84, 
          lastTaken: '3 weeks ago',
          questions: 20,
          duration: '35 min',
          description: 'Analytical thinking, creative solutions, and critical reasoning'
        }
      ]
    }
  ];

  const sampleQuestions = [
    {
      id: 1,
      question: "What is the correct way to handle side effects in React functional components?",
      options: [
        "Using componentDidMount lifecycle method",
        "Using useEffect hook",
        "Using useState hook",
        "Using render method"
      ],
      correct: 1,
      explanation: "useEffect hook is specifically designed to handle side effects in functional components."
    },
    {
      id: 2,
      question: "Which of the following is NOT a valid way to prevent re-renders in React?",
      options: [
        "React.memo()",
        "useMemo()",
        "useCallback()",
        "usePrevent()"
      ],
      correct: 3,
      explanation: "usePrevent() is not a real React hook. The others are valid optimization techniques."
    }
  ];

  const learningPaths = [
    {
      id: 1,
      title: "Frontend Mastery Path",
      description: "Complete frontend development journey from basics to advanced",
      duration: "3-6 months",
      skills: ["HTML/CSS", "JavaScript", "React", "TypeScript"],
      level: "Beginner to Advanced",
      modules: 12,
      progress: 65,
      icon: "material-symbols:web"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      description: "Become a complete full-stack developer with modern technologies",
      duration: "6-9 months",
      skills: ["Frontend", "Backend", "Database", "DevOps"],
      level: "Intermediate to Expert",
      modules: 18,
      progress: 23,
      icon: "material-symbols:developer-mode"
    },
    {
      id: 3,
      title: "Cloud Architecture",
      description: "Master cloud technologies and system design",
      duration: "4-6 months",
      skills: ["AWS", "Docker", "Kubernetes", "System Design"],
      level: "Advanced",
      modules: 15,
      progress: 0,
      icon: "material-symbols:cloud-circle"
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    if (score >= 60) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Expert': return 'bg-purple-100 text-purple-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-green-100 text-green-800';
      case 'Beginner': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const startAssessment = (skill) => {
    setSelectedSkill(skill);
    setAssessmentStarted(true);
    setCurrentQuestion(0);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'material-symbols:dashboard' },
    { id: 'skills', name: 'Skill Assessment', icon: 'material-symbols:quiz' },
    { id: 'learning', name: 'Learning Paths', icon: 'material-symbols:school' },
    { id: 'progress', name: 'Progress Tracking', icon: 'material-symbols:trending-up' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Skill Assessment Hub</h1>
            <p className="text-indigo-100 text-lg">Evaluate your skills and accelerate your career growth</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-indigo-100 text-sm">Assessments Completed</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600 bg-purple-50'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Icon icon={tab.icon} className="w-5 h-5" />
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Overall Score</p>
                  <p className="text-3xl font-bold text-gray-900">82.5</p>
                  <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                    <Icon icon="material-symbols:trending-up" className="w-4 h-4" />
                    +5.2 this month
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Icon icon="material-symbols:trophy" className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Skills Mastered</p>
                  <p className="text-3xl font-bold text-gray-900">8/15</p>
                  <p className="text-blue-600 text-sm flex items-center gap-1 mt-1">
                    <Icon icon="material-symbols:check-circle" className="w-4 h-4" />
                    53% completion
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon icon="material-symbols:psychology" className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Learning Streak</p>
                  <p className="text-3xl font-bold text-gray-900">15 days</p>
                  <p className="text-orange-600 text-sm flex items-center gap-1 mt-1">
                    <Icon icon="material-symbols:local-fire-department" className="w-4 h-4" />
                    Keep it up!
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Icon icon="material-symbols:calendar-today" className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Time Invested</p>
                  <p className="text-3xl font-bold text-gray-900">24h</p>
                  <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                    <Icon icon="material-symbols:schedule" className="w-4 h-4" />
                    This month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Icon icon="material-symbols:timer" className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors">
                <div className="flex items-center gap-3">
                  <Icon icon="material-symbols:play-circle" className="w-6 h-6" />
                  <div className="text-left">
                    <p className="font-medium">Start Assessment</p>
                    <p className="text-sm text-purple-100">Test your skills now</p>
                  </div>
                </div>
              </button>

              <button className="w-full bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Icon icon="material-symbols:school" className="w-6 h-6 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Continue Learning</p>
                    <p className="text-sm text-gray-600">Resume your path</p>
                  </div>
                </div>
              </button>

              <button className="w-full bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Icon icon="material-symbols:analytics" className="w-6 h-6 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">View Analytics</p>
                    <p className="text-sm text-gray-600">Track your progress</p>
                  </div>
                </div>
              </button>

              <button className="w-full bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <Icon icon="material-symbols:certificate" className="w-6 h-6 text-gray-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">View Certificates</p>
                    <p className="text-sm text-gray-600">Your achievements</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Skills Assessment Tab */}
      {activeTab === 'skills' && !assessmentStarted && (
        <div className="space-y-6">
          {skillCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${category.color} rounded-lg`}>
                    <Icon icon={category.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600">{category.skills.length} skills available</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.skills.map((skill, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>
                        {skill.score > 0 && (
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(skill.score)}`}>
                            {skill.score}%
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{skill.description}</p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{skill.questions} questions</span>
                        <span>{skill.duration}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Last taken: {skill.lastTaken}</span>
                        <button
                          onClick={() => startAssessment(skill)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            skill.score > 0
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {skill.score > 0 ? 'Retake' : 'Start Test'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Assessment Started */}
      {activeTab === 'skills' && assessmentStarted && selectedSkill && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedSkill.name} Assessment</h2>
              <p className="text-gray-600">Question {currentQuestion + 1} of {selectedSkill.questions}</p>
            </div>
            <button
              onClick={() => setAssessmentStarted(false)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <Icon icon="material-symbols:close" className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / selectedSkill.questions) * 100}%` }}
            ></div>
          </div>

          {/* Question */}
          {sampleQuestions[currentQuestion] && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {sampleQuestions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {sampleQuestions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    className="w-full text-left p-4 border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 border border-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6">
                <button
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentQuestion(prev => prev + 1)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  {currentQuestion + 1 === selectedSkill.questions ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Learning Paths Tab */}
      {activeTab === 'learning' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalized Learning Paths</h3>
            <p className="text-gray-600 mb-6">Structured learning journeys based on your goals and current skill level</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {learningPaths.map((path) => (
                <div key={path.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                      <Icon icon={path.icon} className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{path.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{path.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{path.duration}</span>
                        <span>{path.modules} modules</span>
                        <span>{path.level}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{path.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Skills covered:</p>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    path.progress > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}>
                    {path.progress > 0 ? 'Continue Learning' : 'Start Path'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Skills */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended for You</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {['GraphQL', 'Docker', 'System Design', 'Mobile Development'].map((skill, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Icon icon="material-symbols:auto-awesome" className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{skill}</h4>
                  <p className="text-xs text-gray-600 mb-3">High demand skill</p>
                  <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress Tracking Tab */}
      {activeTab === 'progress' && (
        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Learning Journey</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Skill Progress Chart */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Skill Progression</h4>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Icon icon="material-symbols:trending-up" className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Progress Chart</p>
                    <p className="text-xs text-gray-400">Skill scores over time</p>
                  </div>
                </div>
              </div>

              {/* Learning Activity */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Recent Activity</h4>
                <div className="space-y-3">
                  {[
                    { action: 'Completed React Assessment', score: 85, time: '2 hours ago' },
                    { action: 'Started Frontend Learning Path', score: null, time: '1 day ago' },
                    { action: 'Improved JavaScript Score', score: 92, time: '3 days ago' },
                    { action: 'Earned Communication Certificate', score: null, time: '1 week ago' }
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      {activity.score && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(activity.score)}`}>
                          {activity.score}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements & Certificates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'JavaScript Expert', date: '2024-01-15', score: 92 },
                { title: 'React Specialist', date: '2024-02-10', score: 85 },
                { title: 'Communication Pro', date: '2024-02-20', score: 89 }
              ].map((cert, idx) => (
                <div key={idx} className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Icon icon="material-symbols:workspace-premium" className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{cert.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">Earned on {cert.date}</p>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(cert.score)}`}>
                    {cert.score}% Score
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assessment;
