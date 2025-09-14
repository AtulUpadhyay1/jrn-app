import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import linkedinService from "../../services/linkedinService";

const Social = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Excited to share my latest project on React development! 🚀",
      likes: 24,
      comments: 8,
      shares: 5,
      timestamp: "2 hours ago",
      image: "https://via.placeholder.com/400x200/667eea/ffffff?text=Project+Image",
      liked: false
    },
    {
      id: 2,
      content: "Just completed my certification in Full Stack Development. Looking forward to new opportunities!",
      likes: 42,
      comments: 12,
      shares: 8,
      timestamp: "1 day ago",
      image: null,
      liked: true
    }
  ]);

  const [socialStats, setSocialStats] = useState({
    profileViews: 1847,
    connections: 892,
    postReach: 3256,
    engagementRate: 4.8
  });

  const [connectedPlatforms, setConnectedPlatforms] = useState([
    { name: "LinkedIn", connected: true, followers: 1200, icon: "mdi:linkedin", color: "bg-blue-600" },
    { name: "Twitter", connected: true, followers: 850, icon: "mdi:twitter", color: "bg-sky-500" },
    { name: "GitHub", connected: true, followers: 320, icon: "mdi:github", color: "bg-gray-800" },
    { name: "Instagram", connected: false, followers: 0, icon: "mdi:instagram", color: "bg-pink-500" },
    { name: "Facebook", connected: false, followers: 0, icon: "mdi:facebook", color: "bg-blue-700" }
  ]);

  const [linkedinSnapshot, setLinkedinSnapshot] = useState({
    loading: false,
    lastSnapshot: null,
    error: null
  });

  const [notification, setNotification] = useState({
    show: false,
    type: 'success', // 'success' | 'error'
    message: ''
  });

  const [userProfile, setUserProfile] = useState({
    fullName: "John Doe",
    headline: "Senior Full Stack Developer | React | Node.js | Cloud Solutions",
    location: "San Francisco, CA",
    industry: "Information Technology",
    summary: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Currently seeking new opportunities in fintech.",
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "MongoDB", "PostgreSQL", "GraphQL", "TypeScript"],
    experience: [
      {
        title: "Senior Full Stack Developer",
        company: "Tech Innovators Inc",
        duration: "2021 - Present",
        description: "Led development of microservices architecture, improved system performance by 40%"
      },
      {
        title: "Frontend Developer", 
        company: "Digital Solutions LLC",
        duration: "2019 - 2021",
        description: "Built responsive web applications using React and TypeScript"
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University of California, Berkeley", 
        year: "2019"
      }
    ]
  });

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: 'success', message: '' });
    }, 5000);
  };

  const handlePostAction = (postId, action) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        switch(action) {
          case 'like':
            return {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1
            };
          default:
            return post;
        }
      }
      return post;
    }));
  };

  const handlePlatformToggle = (platformName) => {
    setConnectedPlatforms(connectedPlatforms.map(platform =>
      platform.name === platformName 
        ? { ...platform, connected: !platform.connected }
        : platform
    ));
  };

  const handleLinkedInSnapshot = async () => {
    setLinkedinSnapshot({ ...linkedinSnapshot, loading: true, error: null });
    
    try {
      const result = await linkedinService.createProfileSnapshot();
      
      if (result.success) {
        setLinkedinSnapshot({
          loading: false,
          lastSnapshot: result.data,
          error: null
        });
        
        showNotification('success', 'LinkedIn profile snapshot created successfully!');
        
        // Optionally update social stats based on snapshot results
        if (result.data.profileViews) {
          setSocialStats(prev => ({
            ...prev,
            profileViews: result.data.profileViews
          }));
        }
      } else {
        setLinkedinSnapshot({
          loading: false,
          lastSnapshot: null,
          error: result.message
        });
        showNotification('error', result.message || 'Failed to create LinkedIn snapshot');
      }
    } catch (error) {
      setLinkedinSnapshot({
        loading: false,
        lastSnapshot: null,
        error: "Failed to create LinkedIn snapshot"
      });
      showNotification('error', 'Failed to create LinkedIn snapshot');
    }
  };

  // Call LinkedIn snapshot API on page load
  useEffect(() => {
    const fetchLinkedInSnapshot = async () => {
      // Only call if LinkedIn is connected and we haven't already fetched data
      const linkedinPlatform = connectedPlatforms.find(p => p.name === "LinkedIn");
      if (linkedinPlatform?.connected && !linkedinSnapshot.lastSnapshot && !linkedinSnapshot.loading) {
        console.log("🔄 Auto-fetching LinkedIn snapshot on page load...");
        showNotification('success', 'Auto-analyzing your LinkedIn profile...');
        try {
          await handleLinkedInSnapshot();
        } catch (error) {
          console.error("❌ Failed to auto-fetch LinkedIn snapshot:", error);
        }
      }
    };

    // Add a small delay to ensure component is fully mounted
    const timer = setTimeout(fetchLinkedInSnapshot, 1500);
    
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Empty dependency array means this runs only once on mount

  const tabs = [
    { id: "overview", name: "Overview", icon: "material-symbols:dashboard" },
    { id: "posts", name: "Posts", icon: "material-symbols:article" },
    { id: "analytics", name: "Analytics", icon: "material-symbols:analytics" },
    { id: "connections", name: "Connections", icon: "material-symbols:people" },
    { id: "settings", name: "Settings", icon: "material-symbols:settings" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <div className="flex items-center gap-2">
            <Icon 
              icon={notification.type === 'success' ? "material-symbols:check-circle" : "material-symbols:error"} 
              className="w-5 h-5" 
            />
            <p className="font-medium">{notification.message}</p>
            <button
              onClick={() => setNotification({ show: false, type: 'success', message: '' })}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <Icon icon="material-symbols:close" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Social Branding Hub</h1>
            <p className="text-purple-100 text-lg">Build your professional presence across platforms</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{socialStats.connections}</div>
            <div className="text-purple-100">Total Connections</div>
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

      {/* Content Area */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Profile Views</p>
                  <p className="text-2xl font-bold text-gray-900">{socialStats.profileViews.toLocaleString()}</p>
                  <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                    <Icon icon="material-symbols:trending-up" className="w-4 h-4" />
                    +12% this week
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Icon icon="material-symbols:visibility" className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Post Reach</p>
                  <p className="text-2xl font-bold text-gray-900">{socialStats.postReach.toLocaleString()}</p>
                  <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                    <Icon icon="material-symbols:trending-up" className="w-4 h-4" />
                    +8% this week
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Icon icon="material-symbols:share" className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Connections</p>
                  <p className="text-2xl font-bold text-gray-900">{socialStats.connections}</p>
                  <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                    <Icon icon="material-symbols:trending-up" className="w-4 h-4" />
                    +24 this week
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Icon icon="material-symbols:people" className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Engagement Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{socialStats.engagementRate}%</p>
                  <p className="text-green-600 text-sm flex items-center gap-1 mt-1">
                    <Icon icon="material-symbols:trending-up" className="w-4 h-4" />
                    +0.3% this week
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Icon icon="material-symbols:favorite" className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Connected Platforms */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon icon="material-symbols:link" className="w-5 h-5" />
              Connected Platforms
            </h3>
            <div className="space-y-3">
              {connectedPlatforms.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${platform.color}`}>
                      <Icon icon={platform.icon} className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{platform.name}</p>
                      <p className="text-sm text-gray-600">
                        {platform.connected ? `${platform.followers} followers` : 'Not connected'}
                      </p>
                      {platform.name === "LinkedIn" && platform.connected && linkedinSnapshot.lastSnapshot && (
                        <p className="text-xs text-green-600">
                          Last snapshot: {new Date(linkedinSnapshot.lastSnapshot.timestamp || Date.now()).toLocaleDateString()}
                        </p>
                      )}
                      {platform.name === "LinkedIn" && linkedinSnapshot.loading && (
                        <p className="text-xs text-blue-600 flex items-center gap-1">
                          <Icon icon="material-symbols:refresh" className="w-3 h-3 animate-spin" />
                          Analyzing profile...
                        </p>
                      )}
                      {platform.name === "LinkedIn" && linkedinSnapshot.error && (
                        <p className="text-xs text-red-600">
                          {linkedinSnapshot.error}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {platform.name === "LinkedIn" && platform.connected && (
                      <button
                        onClick={handleLinkedInSnapshot}
                        disabled={linkedinSnapshot.loading}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          linkedinSnapshot.loading
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        {linkedinSnapshot.loading ? (
                          <div className="flex items-center gap-1">
                            <Icon icon="material-symbols:refresh" className="w-3 h-3 animate-spin" />
                            Snapping...
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Icon icon="material-symbols:camera" className="w-3 h-3" />
                            AI Snapshot
                          </div>
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => handlePlatformToggle(platform.name)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        platform.connected
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {platform.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "posts" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Post */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h3>
              <textarea
                placeholder="What's on your mind? Share your professional insights..."
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows="4"
              ></textarea>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
                    <Icon icon="material-symbols:image" className="w-5 h-5" />
                    Photo
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
                    <Icon icon="material-symbols:video-library" className="w-5 h-5" />
                    Video
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600">
                    <Icon icon="material-symbols:article" className="w-5 h-5" />
                    Article
                  </button>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Post
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      JD
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-600">{post.timestamp}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post content"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handlePostAction(post.id, 'like')}
                        className={`flex items-center gap-2 transition-colors ${
                          post.liked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                        }`}
                      >
                        <Icon icon={post.liked ? "material-symbols:favorite" : "material-symbols:favorite-border"} className="w-5 h-5" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                        <Icon icon="material-symbols:comment" className="w-5 h-5" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                        <Icon icon="material-symbols:share" className="w-5 h-5" />
                        {post.shares}
                      </button>
                    </div>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Icon icon="material-symbols:more-horiz" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
              <div className="space-y-3">
                {['#ReactJS', '#JobSearch', '#TechCareers', '#RemoteWork', '#WebDevelopment'].map((topic, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-purple-600 font-medium">{topic}</span>
                    <span className="text-sm text-gray-600">{Math.floor(Math.random() * 100)}K posts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Connections */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Connections</h3>
              <div className="space-y-4">
                {[
                  { name: "Sarah Wilson", role: "Frontend Developer", mutual: 12 },
                  { name: "Mike Johnson", role: "Product Manager", mutual: 8 },
                  { name: "Emily Chen", role: "UX Designer", mutual: 15 }
                ].map((person, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900">{person.name}</p>
                        <p className="text-sm text-gray-600">{person.role}</p>
                        <p className="text-xs text-gray-500">{person.mutual} mutual connections</p>
                      </div>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LinkedIn AI Snapshot Results */}
          {linkedinSnapshot.lastSnapshot && (
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Icon icon="mdi:linkedin" className="w-5 h-5 text-blue-600" />
                LinkedIn AI Snapshot Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 font-medium">Profile Score</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {linkedinSnapshot.lastSnapshot.profileScore || 'N/A'}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-600 font-medium">Optimization Tips</p>
                  <p className="text-2xl font-bold text-green-900">
                    {linkedinSnapshot.lastSnapshot.tips?.length || 0}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-600 font-medium">AI Insights</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {linkedinSnapshot.lastSnapshot.insights?.length || 0}
                  </p>
                </div>
              </div>
              {linkedinSnapshot.lastSnapshot.summary && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700 mb-2">AI Summary:</p>
                  <p className="text-gray-600">{linkedinSnapshot.lastSnapshot.summary}</p>
                </div>
              )}
            </div>
          )}

          {/* Engagement Chart */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Overview</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart Placeholder - Engagement Over Time</p>
            </div>
          </div>

          {/* Platform Performance */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h3>
            <div className="space-y-4">
              {connectedPlatforms.filter(p => p.connected).map((platform) => (
                <div key={platform.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${platform.color}`}>
                      <Icon icon={platform.icon} className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{platform.followers}</p>
                    <p className="text-sm text-gray-600">followers</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Posts */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Posts</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Post</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Platform</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Engagement</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Reach</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-100">
                      <td className="py-3 px-4">
                        <p className="font-medium text-gray-900 truncate max-w-xs">{post.content}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">LinkedIn</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">{post.likes + post.comments + post.shares}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium">{Math.floor(Math.random() * 1000) + 500}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "connections" && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Your Connections</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Icon icon="material-symbols:search" className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search connections..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                Invite Friends
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Connection {idx + 1}</p>
                    <p className="text-sm text-gray-600">Software Engineer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Message
                  </button>
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-6">
          {/* Profile Information for AI Analysis */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Icon icon="material-symbols:person" className="w-5 h-5" />
              Profile Information for AI Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={userProfile.fullName}
                  onChange={(e) => setUserProfile({...userProfile, fullName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={userProfile.location}
                  onChange={(e) => setUserProfile({...userProfile, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Headline</label>
                <input
                  type="text"
                  value={userProfile.headline}
                  onChange={(e) => setUserProfile({...userProfile, headline: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <input
                  type="text"
                  value={userProfile.industry}
                  onChange={(e) => setUserProfile({...userProfile, industry: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</label>
                <input
                  type="text"
                  value={userProfile.skills.join(", ")}
                  onChange={(e) => setUserProfile({...userProfile, skills: e.target.value.split(", ").map(s => s.trim())})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Professional Summary</label>
                <textarea
                  value={userProfile.summary}
                  onChange={(e) => setUserProfile({...userProfile, summary: e.target.value})}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">This information will be sent to LinkedIn AI for profile analysis</p>
              <button
                onClick={handleLinkedInSnapshot}
                disabled={linkedinSnapshot.loading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  linkedinSnapshot.loading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {linkedinSnapshot.loading ? (
                  <div className="flex items-center gap-2">
                    <Icon icon="material-symbols:refresh" className="w-4 h-4 animate-spin" />
                    Analyzing Profile...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Icon icon="material-symbols:psychology" className="w-4 h-4" />
                    Analyze with AI
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
            <div className="space-y-4">
            {/* Profile Section */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Profile</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Password</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Privacy</h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-700">Profile Visibility</span>
                <button className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Public
                </button>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-700">Search Engine Indexing</span>
                <button className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Disabled
                </button>
              </div>
            </div>

            {/* Delete Account Section */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Delete Account</h4>
              <p className="text-sm text-gray-600 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Delete My Account
              </button>
            </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};export default Social;
