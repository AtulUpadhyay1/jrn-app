import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
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
                            onClick={() => {
                                // open this in new tab
                                window.open('/practice/start', '_blank');
                                //navigate('/practice/start');
                            }}
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


        </>
    );
};

export default Practice;
