import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const GitHubProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Load data only once when component mounts
  useEffect(() => {
    if (!profileData) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setProfileData({
          followers: 156,
          following: 89,
          publicRepos: 42,
          stars: 245,
          totalCommits: 1247,
          contributionsThisYear: 892,
          repositories: [
            {
              id: 1,
              name: "react-dashboard",
              description: "Modern React dashboard with TypeScript and Tailwind CSS",
              language: "JavaScript",
              stars: 34,
              forks: 8,
              updated: "2 hours ago",
              isPrivate: false,
              topics: ["react", "typescript", "dashboard", "tailwind"]
            },
            {
              id: 2,
              name: "node-api-boilerplate",
              description: "Node.js REST API boilerplate with authentication and validation",
              language: "TypeScript",
              stars: 21,
              forks: 5,
              updated: "1 day ago",
              isPrivate: false,
              topics: ["nodejs", "api", "typescript", "express"]
            },
            {
              id: 3,
              name: "ml-data-analysis",
              description: "Machine learning project for data analysis and prediction",
              language: "Python",
              stars: 67,
              forks: 12,
              updated: "3 days ago",
              isPrivate: false,
              topics: ["python", "machine-learning", "data-science"]
            },
            {
              id: 4,
              name: "portfolio-website",
              description: "Personal portfolio website built with Next.js",
              language: "JavaScript",
              stars: 15,
              forks: 3,
              updated: "1 week ago",
              isPrivate: false,
              topics: ["nextjs", "portfolio", "react"]
            }
          ],
          recentActivity: [
            {
              type: "push",
              repo: "react-dashboard",
              message: "Add new authentication flow",
              timestamp: "2 hours ago",
              commits: 3
            },
            {
              type: "star",
              repo: "awesome-react-components",
              message: "Starred awesome-react-components",
              timestamp: "5 hours ago"
            },
            {
              type: "fork",
              repo: "open-source-project",
              message: "Forked open-source-project",
              timestamp: "1 day ago"
            },
            {
              type: "issue",
              repo: "node-api-boilerplate",
              message: "Opened issue #12: Add rate limiting",
              timestamp: "2 days ago"
            },
            {
              type: "pr",
              repo: "community-project",
              message: "Created pull request #45",
              timestamp: "3 days ago"
            }
          ],
          languages: [
            { name: "JavaScript", percentage: 35, color: "#f1e05a" },
            { name: "TypeScript", percentage: 28, color: "#2b7489" },
            { name: "Python", percentage: 20, color: "#3572A5" },
            { name: "CSS", percentage: 12, color: "#563d7c" },
            { name: "HTML", percentage: 5, color: "#e34c26" }
          ],
          contributions: {
            currentStreak: 15,
            longestStreak: 47,
            totalContributions: 892,
            averagePerDay: 2.4
          },
          achievements: [
            { name: "Pull Shark", description: "Opened pull requests", count: 2, icon: "heroicons:code-bracket" },
            { name: "YOLO", description: "Merged without review", count: 1, icon: "heroicons:bolt" },
            { name: "Quickdraw", description: "Fast issue closer", count: 3, icon: "heroicons:lightning-bolt" }
          ]
        });
        setLoading(false);
      }, 1000);
    }
  }, [profileData]);

  const getLanguageIcon = (language) => {
    switch (language.toLowerCase()) {
      case 'javascript': return 'logos:javascript';
      case 'typescript': return 'logos:typescript-icon';
      case 'python': return 'logos:python';
      case 'css': return 'logos:css-3';
      case 'html': return 'logos:html-5';
      default: return 'heroicons:code-bracket';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'push': return 'heroicons:arrow-up-circle';
      case 'star': return 'heroicons:star';
      case 'fork': return 'heroicons:arrows-pointing-out';
      case 'issue': return 'heroicons:exclamation-circle';
      case 'pr': return 'heroicons:code-bracket';
      default: return 'heroicons:information-circle';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <Icon icon="mdi:loading" className="w-6 h-6 text-gray-600 animate-spin" />
          <span className="text-slate-600">Loading GitHub profile...</span>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="text-center py-12">
        <Icon icon="mdi:github" className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Connect Your GitHub</h3>
        <p className="text-slate-600 mb-4">Connect your GitHub account to view repositories and activity</p>
        <Button className="btn-primary">
          <Icon icon="mdi:github" className="w-4 h-4 mr-2" />
          Connect GitHub
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* GitHub Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-center">
            <div className="p-2 bg-blue-100 rounded-lg mx-auto w-fit mb-2">
              <Icon icon="heroicons:users" className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm text-slate-600">Followers</p>
            <p className="text-lg font-bold text-slate-800">{profileData.followers}</p>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-center">
            <div className="p-2 bg-green-100 rounded-lg mx-auto w-fit mb-2">
              <Icon icon="heroicons:user-plus" className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-slate-600">Following</p>
            <p className="text-lg font-bold text-slate-800">{profileData.following}</p>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-center">
            <div className="p-2 bg-purple-100 rounded-lg mx-auto w-fit mb-2">
              <Icon icon="heroicons:folder" className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm text-slate-600">Repositories</p>
            <p className="text-lg font-bold text-slate-800">{profileData.publicRepos}</p>
          </div>
        </div>
        
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-center">
            <div className="p-2 bg-yellow-100 rounded-lg mx-auto w-fit mb-2">
              <Icon icon="heroicons:star" className="w-5 h-5 text-yellow-600" />
            </div>
            <p className="text-sm text-slate-600">Stars</p>
            <p className="text-lg font-bold text-slate-800">{profileData.stars}</p>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="text-center">
            <div className="p-2 bg-indigo-100 rounded-lg mx-auto w-fit mb-2">
              <Icon icon="heroicons:code-bracket" className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-sm text-slate-600">Commits</p>
            <p className="text-lg font-bold text-slate-800">{profileData.totalCommits}</p>
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="text-center">
            <div className="p-2 bg-orange-100 rounded-lg mx-auto w-fit mb-2">
              <Icon icon="heroicons:chart-bar" className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-sm text-slate-600">This Year</p>
            <p className="text-lg font-bold text-slate-800">{profileData.contributionsThisYear}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Repositories */}
        <div className="lg:col-span-2">
          <Card title="Recent Repositories">
            <div className="p-6 space-y-4">
              {profileData.repositories.map((repo) => (
                <div key={repo.id} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon icon="heroicons:folder" className="w-5 h-5 text-blue-500" />
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200">{repo.name}</h3>
                      {repo.isPrivate && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">Private</span>
                      )}
                    </div>
                    <span className="text-sm text-slate-500">{repo.updated}</span>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-3 text-sm">{repo.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Icon icon={getLanguageIcon(repo.language)} className="w-4 h-4" />
                        <span>{repo.language}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon icon="heroicons:star" className="w-4 h-4" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon icon="heroicons:arrows-pointing-out" className="w-4 h-4" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {repo.topics.map((topic) => (
                      <span key={topic} className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Languages & Activity */}
        <div className="space-y-6">
          {/* Top Languages */}
          <Card title="Languages">
            <div className="p-6 space-y-4">
              {profileData.languages.map((lang) => (
                <div key={lang.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-slate-700 dark:text-slate-300">{lang.name}</span>
                    </div>
                    <span className="text-slate-500">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Contributions */}
          <Card title="Contributions">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Current Streak</span>
                <span className="font-semibold text-slate-800">{profileData.contributions.currentStreak} days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Longest Streak</span>
                <span className="font-semibold text-slate-800">{profileData.contributions.longestStreak} days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total This Year</span>
                <span className="font-semibold text-slate-800">{profileData.contributions.totalContributions}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Daily Average</span>
                <span className="font-semibold text-slate-800">{profileData.contributions.averagePerDay}</span>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card title="Recent Activity">
            <div className="p-6 space-y-4">
              {profileData.recentActivity.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="p-1 bg-slate-100 rounded-full">
                    <Icon icon={getActivityIcon(activity.type)} className="w-3 h-3 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300">{activity.message}</p>
                    <p className="text-xs text-slate-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GitHubProfile;
