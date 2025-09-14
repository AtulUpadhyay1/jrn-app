import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const InstagramProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Load data only once when component mounts
  useEffect(() => {
    if (!profileData) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setProfileData({
          followers: 2847,
          following: 543,
          posts: 89,
          stories: 5,
          recentPosts: [
            {
              id: 1,
              image: "https://via.placeholder.com/300x300/E4405F/ffffff?text=Post+1",
              likes: 124,
              comments: 18,
              caption: "Beautiful sunset from my balcony 🌅 #sunset #photography",
              timestamp: "2 hours ago",
              type: "photo"
            },
            {
              id: 2,
              image: "https://via.placeholder.com/300x300/E4405F/ffffff?text=Post+2",
              likes: 89,
              comments: 12,
              caption: "Coffee and code ☕ Perfect morning combination #developer #coffee",
              timestamp: "1 day ago",
              type: "photo"
            },
            {
              id: 3,
              image: "https://via.placeholder.com/300x300/E4405F/ffffff?text=Reel",
              likes: 256,
              comments: 34,
              caption: "Quick coding tip! How to optimize React components 🚀",
              timestamp: "2 days ago",
              type: "reel"
            },
            {
              id: 4,
              image: "https://via.placeholder.com/300x300/E4405F/ffffff?text=Post+4",
              likes: 67,
              comments: 9,
              caption: "Team lunch at our favorite spot 🍕 #team #food",
              timestamp: "3 days ago",
              type: "photo"
            },
            {
              id: 5,
              image: "https://via.placeholder.com/300x300/E4405F/ffffff?text=Post+5",
              likes: 142,
              comments: 21,
              caption: "New workspace setup complete! Loving the minimalist vibe ✨",
              timestamp: "4 days ago",
              type: "photo"
            },
            {
              id: 6,
              image: "https://via.placeholder.com/300x300/E4405F/ffffff?text=Post+6",
              likes: 98,
              comments: 15,
              caption: "Weekend hiking adventure 🥾 Nature therapy at its best",
              timestamp: "5 days ago",
              type: "photo"
            }
          ],
          stories: [
            { id: 1, image: "https://via.placeholder.com/100x100/E4405F/ffffff?text=S1", viewed: false },
            { id: 2, image: "https://via.placeholder.com/100x100/E4405F/ffffff?text=S2", viewed: true },
            { id: 3, image: "https://via.placeholder.com/100x100/E4405F/ffffff?text=S3", viewed: false },
            { id: 4, image: "https://via.placeholder.com/100x100/E4405F/ffffff?text=S4", viewed: true },
            { id: 5, image: "https://via.placeholder.com/100x100/E4405F/ffffff?text=S5", viewed: false }
          ],
          engagement: {
            avgLikes: 128,
            avgComments: 19,
            engagementRate: 4.2,
            bestTimeToPost: "7:00 PM",
            topHashtags: ["#coding", "#photography", "#lifestyle", "#tech", "#coffee"]
          },
          insights: {
            reach: 8542,
            impressions: 12847,
            profileVisits: 234,
            websiteClicks: 45
          }
        });
        setLoading(false);
      }, 1000);
    }
  }, [profileData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <Icon icon="mdi:loading" className="w-6 h-6 text-pink-600 animate-spin" />
          <span className="text-slate-600">Loading Instagram profile...</span>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="text-center py-12">
        <Icon icon="mdi:instagram" className="w-16 h-16 text-pink-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Connect Your Instagram</h3>
        <p className="text-slate-600 mb-4">Connect your Instagram account to view posts and insights</p>
        <Button className="btn-primary">
          <Icon icon="mdi:instagram" className="w-4 h-4 mr-2" />
          Connect Instagram
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Instagram Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-pink-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Icon icon="heroicons:users" className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Followers</p>
              <p className="text-xl font-bold text-slate-800">{profileData.followers.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Icon icon="heroicons:user-plus" className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Following</p>
              <p className="text-xl font-bold text-slate-800">{profileData.following}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon icon="heroicons:photo" className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Posts</p>
              <p className="text-xl font-bold text-slate-800">{profileData.posts}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Icon icon="heroicons:play-circle" className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Stories</p>
              <p className="text-xl font-bold text-slate-800">{profileData.stories}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stories */}
      <Card title="Stories">
        <div className="p-6">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {profileData.stories.map((story) => (
              <div key={story.id} className="flex-shrink-0">
                <div className={`w-16 h-16 rounded-full p-0.5 ${
                  story.viewed ? 'bg-gradient-to-r from-gray-300 to-gray-400' : 'bg-gradient-to-r from-pink-500 to-orange-500'
                }`}>
                  <img
                    src={story.image}
                    alt={`Story ${story.id}`}
                    className="w-full h-full rounded-full object-cover border-2 border-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts Grid */}
        <div className="lg:col-span-2">
          <Card title="Recent Posts">
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {profileData.recentPosts.map((post) => (
                  <div key={post.id} className="relative group cursor-pointer">
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <img
                        src={post.image}
                        alt={`Post ${post.id}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {post.type === 'reel' && (
                        <div className="absolute top-2 right-2">
                          <Icon icon="heroicons:play-circle" className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <div className="flex items-center gap-4 text-white">
                        <div className="flex items-center gap-1">
                          <Icon icon="heroicons:heart" className="w-5 h-5" />
                          <span className="font-medium">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon icon="heroicons:chat-bubble-left" className="w-5 h-5" />
                          <span className="font-medium">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Insights & Engagement */}
        <div className="space-y-6">
          {/* Engagement Metrics */}
          <Card title="Engagement">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Avg. Likes</span>
                <span className="font-semibold text-slate-800">{profileData.engagement.avgLikes}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Avg. Comments</span>
                <span className="font-semibold text-slate-800">{profileData.engagement.avgComments}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Engagement Rate</span>
                <span className="font-semibold text-slate-800">{profileData.engagement.engagementRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Best Time</span>
                <span className="font-semibold text-slate-800">{profileData.engagement.bestTimeToPost}</span>
              </div>
            </div>
          </Card>

          {/* Top Hashtags */}
          <Card title="Top Hashtags">
            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {profileData.engagement.topHashtags.map((hashtag) => (
                  <span key={hashtag} className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Insights */}
          <Card title="Insights">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Reach</span>
                <span className="font-semibold text-slate-800">{profileData.insights.reach.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Impressions</span>
                <span className="font-semibold text-slate-800">{profileData.insights.impressions.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Profile Visits</span>
                <span className="font-semibold text-slate-800">{profileData.insights.profileVisits}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Website Clicks</span>
                <span className="font-semibold text-slate-800">{profileData.insights.websiteClicks}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InstagramProfile;
