import React from "react";
import { useSelector } from "react-redux";
import Card from "@/components/ui/Card";
import { Icon } from "@iconify/react/dist/iconify.js";

const AdminDashboard = () => {
  const { adminUser, isAdminAuth } = useSelector((state) => state.adminAuth);

  const dashboardStats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: "heroicons-outline:users",
      color: "bg-blue-500",
      change: "+12%",
      changeType: "increase",
    },
    {
      title: "Active Sessions",
      value: "89",
      icon: "heroicons-outline:cursor-arrow-rays",
      color: "bg-green-500",
      change: "+8%",
      changeType: "increase",
    },
    {
      title: "Total Revenue",
      value: "$12,345",
      icon: "heroicons-outline:currency-dollar",
      color: "bg-yellow-500",
      change: "+15%",
      changeType: "increase",
    },
    {
      title: "Support Tickets",
      value: "23",
      icon: "heroicons-outline:ticket",
      color: "bg-red-500",
      change: "-5%",
      changeType: "decrease",
    },
  ];

  const recentActivities = [
    { 
      id: 1, 
      action: "New user registration", 
      user: "john@example.com", 
      time: "2 minutes ago",
      type: "user",
      icon: "heroicons-outline:user-plus"
    },
    { 
      id: 2, 
      action: "Payment completed", 
      user: "jane@example.com", 
      time: "5 minutes ago",
      type: "payment",
      icon: "heroicons-outline:credit-card"
    },
    { 
      id: 3, 
      action: "Support ticket created", 
      user: "bob@example.com", 
      time: "10 minutes ago",
      type: "support",
      icon: "heroicons-outline:chat-bubble-left-ellipsis"
    },
    { 
      id: 4, 
      action: "User profile updated", 
      user: "alice@example.com", 
      time: "15 minutes ago",
      type: "update",
      icon: "heroicons-outline:pencil-square"
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: "heroicons-outline:users",
      color: "bg-blue-500",
      link: "/admin/users"
    },
    {
      title: "View Reports",
      description: "Generate system reports",
      icon: "heroicons-outline:document-chart-bar",
      color: "bg-green-500",
      link: "/admin/reports"
    },
    {
      title: "System Settings",
      description: "Configure system settings",
      icon: "heroicons-outline:cog-6-tooth",
      color: "bg-purple-500",
      link: "/admin/settings"
    },
    {
      title: "Support Center",
      description: "Manage support tickets",
      icon: "heroicons-outline:chat-bubble-left-right",
      color: "bg-orange-500",
      link: "/admin/support"
    },
  ];

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              Welcome back, Admin! 👋
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your platform with powerful administrative tools
            </p>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-sm text-green-600 font-medium">
                <Icon icon="heroicons-outline:arrow-trending-up" className="inline mr-1" />
                System healthy
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                <Icon icon="heroicons-outline:clock" className="inline mr-1" />
                Last login: {adminUser?.loginTime ? new Date(adminUser.loginTime).toLocaleString() : 'Just now'}
              </span>
            </div>
          </div>
          <div className="floating">
            <Icon icon="heroicons-outline:shield-check" className="text-4xl text-slate-600" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Stats Section */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {dashboardStats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          {stat.title}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          stat.changeType === 'increase' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white ml-4`}>
                      <Icon icon={stat.icon} className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Recent Activities</h3>
                <button className="text-slate-600 hover:text-white hover:bg-slate-500 px-3 py-1 rounded transition-all text-sm">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all">
                    <div className="w-10 h-10 bg-slate-200 dark:bg-slate-600 rounded-full flex items-center justify-center mr-3">
                      <Icon icon={activity.icon} className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {activity.user}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="w-full p-4 text-left rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all group"
                    onClick={() => console.log(`Navigate to ${action.link}`)}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                        <Icon icon={action.icon} className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {action.title}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">Server Status</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">Database</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">API Response</span>
                  </div>
                  <span className="text-sm font-medium text-yellow-600">120ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm text-slate-700 dark:text-slate-300">Storage</span>
                  </div>
                  <span className="text-sm font-medium text-green-600">68% Free</span>
                </div>
              </div>
            </div>

            {/* Admin Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Admin Session</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</p>
                  <p className="text-slate-900 dark:text-white">{adminUser?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Role</p>
                  <p className="text-slate-900 dark:text-white capitalize">{adminUser?.type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Session Duration</p>
                  <p className="text-slate-900 dark:text-white">2h 45m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;