import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Chart from "chart.js/auto";
import { axiosInstance } from "@/store/api/apiSlice";

const Dashboard = () => {
  const [filterMap, setFilterMap] = useState("usa");
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  // Resume parsing service function
  const parseResume = async (resumeUrl) => {
    try {
      console.log("📄 Parsing resume...");
      const response = await axiosInstance.post("/resume-parse", {
        resume_url: resumeUrl
      });
      console.log("✅ Resume parsing successful:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Resume parsing failed:", error);
      throw error;
    }
  };

  // Profile service function
  const getProfile = async () => {
    try {
      console.log("📡 Fetching profile data...");
      setIsLoading(true);
      setError(null);
      
      const response = await axiosInstance.get("/profile");
      console.log("✅ getProfile successful:", response.data);
      
      const profileData = response.data;
      
      // Check if resume_parsed is null and resume URL exists
      if (profileData?.user_detail?.resume_parsed === null && profileData?.user_detail?.resume) {
        console.log("🔍 Resume not parsed yet, initiating parsing...");
        try {
          await parseResume(profileData.user_detail.resume);
          console.log("✅ Resume parsing initiated successfully");
        } catch (parseError) {
          console.warn("⚠️ Resume parsing failed, but continuing with profile data:", parseError);
        }
      }
      
      setProfile(profileData);
      return profileData;
    } catch (error) {
      console.error("❌ getProfile failed:", error);

      let message = "Something went wrong";
      if (error.response) {
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        message = error.response.data?.message || `Error ${error.response.status}`;
      } else if (error.request) {
        message = "No response from server";
      } else {
        message = error.message;
      }

      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch profile data on component mount
  useEffect(() => {
    getProfile().catch((err) => {
      console.error("Failed to fetch profile:", err);
    });
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("scoreChart");

    if (!ctx) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // green color
    const greenColor = "#4CAF50";
    const aiScore = profile?.user_detail?.aiScore || 78;

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [aiScore, 100 - aiScore],
            backgroundColor: [greenColor, "#E5E7EB"], // grey and light grey
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: "80%",
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
        },
        animation: {
          animateRotate: true,
          duration: 1000,
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [profile]);

  return (
    <div>
      {/* Loading state */}
      {isLoading && (
        <div className="bg-blue-50 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <p className="text-blue-600">Loading profile data...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center">
            <Icon icon="heroicons-solid:exclamation-triangle" className="h-5 w-5 text-red-600 mr-2" />
            <p className="text-red-600">Failed to load profile: {error}</p>
            <button 
              onClick={() => getProfile()}
              className="ml-auto bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Welcome section */}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-dark mb-1">
              Welcome back, {profile?.user?.first_name || "User"}! 👋
            </h2>
            <p className="text-grey-600">Get Job-Ready with AI-driven insights</p>
            <div className="flex items-center mt-2 space-x-4">
              <span className="text-sm text-success font-medium">
                <i className="fas fa-chart-line mr-1"></i>
                +12% this week
              </span>
              <span className="text-sm text-grey-600 font-medium">
                <i className="fas fa-fire mr-1 text-orange-500"></i>
                3 day streak
              </span>
            </div>
          </div>
          <div className="floating">
            <i className="fas fa-rocket text-4xl text-grey-600"></i>
          </div>
        </div>
      </div>



      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main AI Score */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-grey-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-dark mb-1">Your AI Readiness Score</h3>
                <p className="text-grey-600">Based on skills, experience, and market demand</p>
              </div>
              <button className="text-grey-600 hover:text-white hover:bg-grey-500 px-3 py-1 rounded transition-all text-sm">
                <div className="flex items-center">
                  <Icon className="h-4 w-4 mr-1" icon="akar-icons:info" />
                  How it's calculated
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Score Circle */}
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <canvas id="scoreChart" width="192" height="192"></canvas>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-grey-700">
                        {profile?.user_detail?.aiScore || 78}
                      </div>
                      <div className="text-sm text-grey-500">/100</div>
                      <div className="flex items-center justify-center mt-2">
                        <Icon className="fas fa-arrow-up text-green-600 text-sm mr-1" icon="heroicons-solid:arrow-up" />
                        <span className="text-green-600 text-sm font-medium">+5 this week</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="space-y-4">
                {[
                  { label: "Technical Skills", value: profile?.user_detail?.skills?.technical || 85 },
                  { label: "Soft Skills", value: profile?.user_detail?.skills?.soft || 72 },
                  { label: "Market Readiness", value: profile?.user_detail?.skills?.market || 78 },
                  { label: "Industry Knowledge", value: profile?.user_detail?.skills?.industry || 68 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-grey-700">{item.label}</span>
                    <div className="flex items-center space-x-2">
                      <div className="relative w-20 h-2 bg-gray-300 rounded-full overflow-hidden">
                        {/* Filled (light green) */}
                        <div
                          className="absolute top-0 left-0 h-full bg-green-400 rounded-full"
                          style={{ width: `${item.value}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-dark">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-grey-200">
            <h4 className="font-semibold text-dark mb-4 flex items-center">
              <i className="fas fa-brain text-grey-600 mr-2"></i>
              AI Insights
            </h4>

            <div className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="text-xs text-success font-semibold mb-1">STRENGTH</div>
                <div className="text-sm text-grey-700">
                  {profile?.user_detail?.insights?.strength || "Strong technical foundation in React & Node.js"}
                </div>
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="text-xs text-warning font-semibold mb-1">FOCUS AREA</div>
                <div className="text-sm text-grey-700">
                  {profile?.user_detail?.insights?.focusArea || "Improve system design knowledge"}
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="text-xs text-blue-600 font-semibold mb-1">OPPORTUNITY</div>
                <div className="text-sm text-grey-700">
                  {profile?.user_detail?.insights?.opportunity || "5 new roles match your profile"}
                </div>
              </div>
            </div>


            <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-all mt-4">
              Get Personalized Plan
            </button>
          </div>
        </div>
      </div>


      <section className="p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Card 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h6 className="font-semibold text-gray-800">Roleplay Training</h6>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  🎓
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Weekly Progress</span>
                  <span className="text-xl font-bold text-gray-800">3/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Next: Technical Interview</p>
              </div>
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-all">
                Continue Roleplay
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h6 className="font-semibold text-gray-800">Practice Sessions</h6>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  🧑‍🏫
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-2 mb-4">
                <li className="flex justify-between bg-gray-50 p-2 rounded">
                  <span>Python Basics</span>
                  <span className="text-xs text-gray-500">30 min</span>
                </li>
                <li className="flex justify-between bg-gray-50 p-2 rounded">
                  <span>React Hooks</span>
                  <span className="text-xs text-gray-500">45 min</span>
                </li>
              </ul>
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-all">
                Start Practice
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h6 className="font-semibold text-gray-800">Job Matches</h6>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  🤝
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between bg-gray-50 p-2 rounded">
                  <div>
                    <p className="font-medium">Senior React Dev</p>
                    <p className="text-xs text-gray-500">TechCorp</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">95%</span>
                </div>
              </div>
              <button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-all">
                View Matches
              </button>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h6 className="font-semibold text-gray-800">Social Branding</h6>
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  📣
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">Profile Views: <span className="font-bold text-gray-800">1.2k</span></p>
              <p className="text-xs text-green-600">+18% from last week</p>
              <button className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-all">
                Create Post
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h6 className="font-semibold text-gray-800 mb-4 flex items-center">
              🌍 Your Rank in Ecosystem
            </h6>
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-gray-700 mb-1">#123</div>
              <p className="text-sm text-gray-500">Out of 2,547 profiles</p>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between bg-gray-50 p-3 rounded">
                <span>Regional Rank</span>
                <span className="font-semibold">#45</span>
              </div>
              <div className="flex justify-between bg-gray-50 p-3 rounded">
                <span>Skill Level</span>
                <span className="font-semibold">Advanced</span>
              </div>
              <div className="flex justify-between bg-gray-50 p-3 rounded">
                <span>Industry Rank</span>
                <span className="font-semibold">#78</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-all">
              Compare with Peers
            </button>
          </div>
        </div>
      </section>

      <section className="p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h6 className="font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-clock text-gray-600 mr-2"></i>
              Recent Activities
            </h6>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-check text-white text-sm"></i>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Completed React Practice</div>
                  <div className="text-sm text-gray-600">+15 AI Score points</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-briefcase text-white text-sm"></i>
                </div>
                <div>
                  <div className="font-medium text-gray-800">New Job Match</div>
                  <div className="text-sm text-gray-600">Frontend Dev at TechCorp</div>
                  <div className="text-xs text-gray-500">1 day ago</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-users text-white text-sm"></i>
                </div>
                <div>
                  <div className="font-medium text-gray-800">Profile Views Increased</div>
                  <div className="text-sm text-gray-600">+25% engagement</div>
                  <div className="text-xs text-gray-500">2 days ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h6 className="font-semibold text-gray-800 mb-4 flex items-center">
              <i className="fas fa-brain text-gray-600 mr-2"></i>
              AI Recommendations
            </h6>

            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="text-xs text-blue-600 font-semibold mb-1">SKILL UPGRADE</div>
                <div className="text-sm text-gray-700 font-medium">System Design Practice</div>
                <div className="text-xs text-gray-500">Increase AI Score by 15 points</div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="text-xs text-green-600 font-semibold mb-1">JOB OPPORTUNITY</div>
                <div className="text-sm text-gray-700 font-medium">Senior React Position</div>
                <div className="text-xs text-gray-500">95% match • Apply by July 25</div>
              </div>

              <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="text-xs text-purple-600 font-semibold mb-1">NETWORKING</div>
                <div className="text-sm text-gray-700 font-medium">React Meetup Tomorrow</div>
                <div className="text-xs text-gray-500">5 connections in your network</div>
              </div>

              <div className="p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="text-xs text-orange-600 font-semibold mb-1">SOCIAL BOOST</div>
                <div className="text-sm text-gray-700 font-medium">Post Your Latest Project</div>
                <div className="text-xs text-gray-500">Best time: Today 6 PM</div>
              </div>
            </div>

            <button className="w-full mt-4 bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition-all">
              View All Recommendations
            </button>
          </div>
        </div>
      </section>






      {/* Old Code -------------------- */}



      {/* <HomeBredCurbs title="Email Analytics" /> */}
      {/* Evenly space class */}

      <div className="flex gap-6 mb-6">
        {/* <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
          <ImageBlock1 />
        </div> */}
        {/* <GroupChart3 /> */}
      </div>

      <div className="grid grid-cols-12 gap-5">

        {/* <div className="lg:col-span-8 col-span-12">
          <Card title="Email Activity" headerSlot={<SelectMonth />}>
          <ReAreaChart />
          </Card>
        </div>

        <div className="lg:col-span-4 col-span-12">
          <Card title="AI Insights ✨" headerSlot={<SelectMonth />}>
            <RecentActivity />
          </Card>
        </div> */}

        {/* <div className="lg:col-span-8 col-span-12">
          <Card>
            <div className="legend-ring">
              <RevenueBarChart />
            </div>
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="Overview" headerSlot={<SelectMonth />}>
            <RadialsChart />
          </Card>
        </div> */}


        {/* <div className="lg:col-span-8 col-span-12">
          <Card title="All Company" headerSlot={<SelectMonth />} noBorder>
            <CompanyTable />
          </Card>
        </div> */}

        {/* <div className="lg:col-span-8 col-span-12">
          <Card
            title="Most Sales"
            headerSlot={
              <div className="border border-slate-200 dark:border-slate-700 dark:bg-slate-900 rounded-sm p-1 flex items-center">
                <span
                  className={` flex-1 text-sm font-normal px-3 py-1 transition-all duration-150 rounded cursor-pointer
                ${
                  filterMap === "global"
                    ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                    : "dark:text-slate-300"
                }  
                `}
                  onClick={() => setFilterMap("global")}
                >
                  Global
                </span>
                <span
                  className={` flex-1 text-sm font-normal px-3 py-1 rounded transition-all duration-150 cursor-pointer
                  ${
                    filterMap === "usa"
                      ? "bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-300"
                      : "dark:text-slate-300"
                  }
              `}
                  onClick={() => setFilterMap("usa")}
                >
                  USA
                </span>
              </div>
            }
          >
            <MostSales filterMap={filterMap} />
          </Card>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <Card title="Overview" headerSlot={<SelectMonth />}>
            <RadarChart />
            <div className="bg-slate-50 dark:bg-slate-900 rounded-sm p-4 mt-8 flex justify-between flex-wrap">
              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Invested amount
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  $8264.35
                </div>
                <div className="text-slate-500 dark:text-slate-300 text-xs font-normal">
                  +0.001.23 (0.2%)
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Invested amount
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  $8264.35
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-slate-600 dark:text-slate-200 text-xs font-normal">
                  Invested amount
                </h4>
                <div className="text-sm font-medium text-slate-900 dark:text-white">
                  $8264.35
                </div>
              </div>
            </div>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
