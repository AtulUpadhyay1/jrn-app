import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState,useEffect } from 'react';
import userSkillService from "@/services/userSkillService";


const categories = [
    {
        title: 'Python Basics',
        subtitle: 'Programming Fundamentals',
        description: 'Master Python syntax, data types, and control structures through interactive coding exercises.',
        time: '30 min',
        level: 'Medium',
        color: 'border-yellow-500',
        bgColor: 'bg-blue-100',
        icon: '🐍'
    },
    {
        title: 'React Hooks',
        subtitle: 'Frontend Development',
        description: 'Learn useState, useEffect, and custom hooks with practical examples.',
        time: '25 min',
        level: 'Easy',
        color: 'border-green-500',
        bgColor: 'bg-cyan-100',
        icon: '⚛️'
    },
    {
        title: 'System Design',
        subtitle: 'Architecture Concepts',
        description: 'Design scalable systems with load balancing, caching, and microservices.',
        time: '45 min',
        level: 'Hard',
        color: 'border-red-400',
        bgColor: 'bg-red-100',
        icon: '🏗️'
    },
    {
        title: 'Data Analysis with Pandas',
        subtitle: 'Data Processing',
        description: 'Master data manipulation and analysis using Python Pandas library.',
        time: '35 min',
        level: 'Medium',
        color: 'border-green-400',
        bgColor: 'bg-green-100',
        icon: '📊'
    },
    {
        title: 'SQL Fundamentals',
        subtitle: 'Database Queries',
        description: 'Learn to write efficient SQL queries for data retrieval and manipulation.',
        time: '20 min',
        level: 'Easy',
        color: 'border-purple-400',
        bgColor: 'bg-purple-100',
        icon: '🧮'
    },
    {
        title: 'UI Design Principles',
        subtitle: 'User Interface',
        description: 'Master the fundamentals of user interface design and visual hierarchy.',
        time: '15 min',
        level: 'Easy',
        color: 'border-pink-400',
        bgColor: 'bg-pink-100',
        icon: '🎨'
    }
];

const tabs = ['All Categories', 'Technology', 'Data Science', 'Design', 'Business', 'Communication', 'Leadership'];

const sessions = [
    {
        title: 'Data Analysis with Pandas',
        category: 'Data Science',
        attempts: 2,
        date: 'Jan 13',
        score: 8.7,
        status: 'success',
    },
    {
        title: 'Project Management',
        category: 'Business',
        attempts: 2,
        date: 'Jan 12',
        score: 6.8,
        status: 'warning',
    },
    {
        title: 'Team Leadership',
        category: 'Leadership',
        attempts: 2,
        date: 'Jan 11',
        score: 8.9,
        status: 'success',
    },
];

const recommendations = [
    { level: 'PRIORITY', message: 'Complete React Hooks' },
    { level: 'STRENGTH', message: 'Try Advanced Python' },
    { level: 'IMPROVE', message: 'Retry Project Management' },
];


const Practice = () => {
    const [activeTab, setActiveTab] = useState('All Categories');
    const [isGrid, setIsGrid] = useState(true);

    const [categories, setCategories] = useState([]);
    const [useCases, setUseCases] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const categories = await userSkillService.getRolePlayCategories();
            const useCases = await userSkillService.getRolePlayUseCases();
            const categoriesData = categories["data"] || [];
            setCategories(categoriesData);
            setUseCases(useCases["data"] || []);
            
            // Set first category as selected by default
            if (categoriesData.length > 0) {
                setSelectedCategoryId(categoriesData[0].id);
            }
        };
        fetchData();
    }, []);

    // Filter use cases based on selected category
    const filteredUseCases = useCases.filter(useCase => useCase.category_id === selectedCategoryId);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategoryId(categoryId);
    };


    return (
        <>
            <section className="p-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Topics Completed */}
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">24</span>
                            </div>
                            <h6 className="font-semibold text-gray-800">Topics Completed</h6>
                            <p className="text-sm text-gray-600">Across all categories</p>
                        </div>

                        {/* Total Practice Time */}
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-clock text-2xl text-blue-600"></i>
                            </div>
                            <h6 className="font-semibold text-gray-800">Practice Time</h6>
                            <p className="text-sm text-gray-600">12h 30m total</p>
                        </div>

                        {/* Average Score */}
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-purple-600">8.6</span>
                            </div>
                            <h6 className="font-semibold text-gray-800">Average Score</h6>
                            <p className="text-sm text-gray-600">Out of 10</p>
                        </div>

                        {/* Skills Improved */}
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
                                <i className="fas fa-chart-line text-2xl text-orange-600"></i>
                            </div>
                            <h6 className="font-semibold text-gray-800">Skills Improved</h6>
                            <p className="text-sm text-gray-600">+15 this month</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            {/* Categories Tabs */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Practice By Categories</h2>
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8 overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        selectedCategoryId === category.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Use Cases Grid */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Use Cases {selectedCategoryId && `for ${categories.find(c => c.id === selectedCategoryId)?.name}`}
              </h3>
              {filteredUseCases.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Icon icon="heroicons-outline:folder-open" className="w-8 h-8 text-gray-400" />
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No use cases found</h4>
                  <p className="text-gray-500">No use cases available for this category yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredUseCases.map((useCase) => (
                    <div key={useCase.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">{useCase.name}</h4>
                            <p className="text-sm text-gray-600 line-clamp-3">{useCase.prompt}</p>
                          </div>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-3 ${
                            useCase.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {useCase.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Icon icon="heroicons-outline:clock" className="w-4 h-4 mr-1" />
                            <span>{useCase.time} minutes</span>
                          </div>
                          <div className="flex items-center">
                            <Icon icon="heroicons-outline:video-camera" className="w-4 h-4 mr-1" />
                            <span className="capitalize">{useCase.use_case_type}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="text-xs text-gray-500">
                            Created {new Date(useCase.created_at).toLocaleDateString()}
                          </span>
                          <button 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center"
                            onClick={() => {/* Handle use case click */}}
                          >
                            <Icon icon="heroicons-outline:play" className="w-4 h-4 mr-1" />
                            Start
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>


        


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
                {/* Left Column */}
                <div className="lg:col-span-2">
                    <div className="mb-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Your History</h2>
                        <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                            <option>Most Recent</option>
                            <option>Highest Score</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        {sessions.map((s, idx) => (
                            <div
                                key={idx}
                                className={`flex justify-between items-center p-4 rounded border shadow-sm ${s.status === 'success'
                                        ? 'bg-green-100 border-green-300'
                                        : 'bg-purple-100 border-purple-300'
                                    }`}
                            >
                                <div>
                                    <h3 className="font-semibold text-lg">{s.title}</h3>
                                    <p className="text-sm text-gray-600">{s.category}</p>
                                    <div className="text-sm text-gray-500 flex items-center gap-3 mt-1">
                                        <span>
                                            <Icon icon="ic:round-loop" className="inline-block mr-1" /> {s.attempts} attempts
                                        </span>
                                        <span>
                                            <Icon icon="heroicons-outline:calendar" className="inline-block mr-1" /> {s.date}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm mb-1">
                                        {s.status === 'warning' && <span className="text-red-500 font-semibold">Needs improvement</span>}
                                    </div>
                                    <p className="font-bold text-md mb-1">Score: <span className="text-green-700">{s.score}/10</span></p>
                                    <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded">View Progress</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                    <div className="bg-white shadow rounded p-4">
                        <h3 className="font-semibold mb-3">AI Recommendations</h3>
                        {recommendations.map((r, idx) => (
                            <div key={idx} className="mb-2">
                                <span
                                    className={`text-xs font-bold block mb-1 ${r.level === 'PRIORITY'
                                            ? 'text-blue-600'
                                            : r.level === 'STRENGTH'
                                                ? 'text-green-600'
                                                : 'text-yellow-600'
                                        }`}
                                >
                                    {r.level}
                                </span>
                                <p className="text-sm text-gray-700">{r.message}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white shadow rounded p-4">
                        <h6 className="font-semibold mb-3">Performance Overview</h6>
                        <div className="text-sm mb-2">Average Score: <span className="font-bold text-green-700">8.1/10</span></div>
                        <div className="mb-2">
                            <div className="text-xs text-gray-600">Completion Rate</div>
                            <div className="w-full h-2 bg-gray-200 rounded">
                                <div className="h-2 bg-yellow-500 rounded" style={{ width: '70%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-600">Retry Success</div>
                            <div className="w-full h-2 bg-gray-200 rounded">
                                <div className="h-2 bg-blue-500 rounded" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="bg-gray-800 shadow rounded p-4 text-white">
                        <h6 className="font-semibold mb-3 text-white">Quick Actions</h6>
                        <button className="w-full text-left mb-2 flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded">
                            <Icon icon="carbon:play-filled" /> Continue Incomplete Session
                        </button>
                        <button className="w-full text-left mb-2 flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded">
                            <Icon icon="carbon:renew" /> Retry Lowest Score
                        </button>
                        <button className="w-full text-left flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded">
                            <Icon icon="carbon:star-filled" /> Start Recommended
                        </button>
                    </div> */}

                    {/* <div className="bg-white shadow rounded p-4">
                        <h6 className="font-semibold mb-2 text-orange-500">Learning Streak</h6>
                        <div className="text-xl font-bold text-orange-600">7 Days</div>
                        <p className="text-sm text-gray-600">Keep practicing to maintain your streak!</p>
                        <div className="flex mt-2 space-x-1">
                            {[...Array(7)].map((_, idx) => (
                                <div key={idx} className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            ))}
                        </div>
                        <p className="text-xs mt-1 text-gray-500">Next milestone: 10 days</p>
                    </div> */}
                </div>
            </div>


            <section className="px-6 py-8">
                <h2 className="text-2xl font-bold text-dark mb-6">Discover New Practices</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* AI Suggestions */}
                    <div className="rounded-xl bg-blue-50 p-5 border border-blue-100">
                        <div className="flex items-center mb-2">
                            <div className="bg-blue-600 text-white rounded-md p-2 mr-3">
                                <Icon icon="fluent:bot-24-regular" className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-dark">AI Suggestions</h3>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                            Based on your progress, focus on System Design to improve your architecture skills.
                        </p>
                        <a href="#" className="text-blue-600 font-medium text-sm hover:underline">
                            Explore Technology →
                        </a>
                    </div>

                    {/* Skill Gaps */}
                    <div className="rounded-xl bg-green-50 p-5 border border-green-100">
                        <div className="flex items-center mb-2">
                            <div className="bg-green-600 text-white rounded-md p-2 mr-3">
                                <Icon icon="ph:trophy-bold" className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-dark">Skill Gaps</h3>
                        </div>
                        <p className="text-sm text-gray-700 mb-2 invisible">
                            Placeholder for layout consistency.
                        </p>
                        <a href="#" className="text-green-600 font-medium text-sm hover:underline">
                            Explore Data Science →
                        </a>
                    </div>

                    {/* Popular This Week */}
                    <div className="rounded-xl bg-purple-50 p-5 border border-purple-100">
                        <div className="flex items-center mb-2">
                            <div className="bg-purple-600 text-white rounded-md p-2 mr-3">
                                <Icon icon="mdi:star" className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-dark">Popular This Week</h3>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">
                            UI Design Principles is trending among users with similar profiles.
                        </p>
                        <a href="#" className="text-purple-600 font-medium text-sm hover:underline">
                            Explore Design →
                        </a>
                    </div>
                </div>
            </section>


        </>
    );
};

export default Practice;
