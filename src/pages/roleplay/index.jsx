import React, { useState } from "react";
import Icon from "@/components/ui/Icon";

const SessionCard = ({ title, subtitle, duration, difficulty, score, status, icon, onClick, locked, buttonText }) => {
  const baseClasses = "scenario-card rounded-xl p-6 shadow-sm border ";
  const statusColors = {
    Completed: "bg-success",
    Available: "bg-grey-600",
    Locked: "bg-grey-50 opacity-60",
  };


  

  return (
    <div className={`${baseClasses} ${statusColors[status]} ${locked ? 'opacity-60' : ''}`} onClick={onClick}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${status === 'Completed' ? 'bg-success' : status === 'Available' ? 'bg-grey-600' : 'bg-grey-300'}`}>
            <Icon icon={icon} className={`${locked ? 'text-grey-400' : 'text-green-500'}`} />
          </div>
          <div>
            <h6 className={`font-semibold ${locked ? 'text-grey-500' : 'text-dark'}`}>{title}</h6>
            <p className={`text-sm ${locked ? 'text-grey-400' : 'text-grey-600'}`}>{subtitle}</p>
          </div>
        </div>
        <span className={`text-xs ${locked ? 'bg-grey-300 text-grey-600' : status === 'Completed' ? 'bg-success text-white' : 'bg-grey-600 text-white'} px-2 py-1 rounded`}>{status}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs">
          <span className={`${locked ? 'text-grey-400' : 'text-grey-500'} flex items-center`}><Icon icon="heroicons-outline:clock" className="mr-2" />{duration}</span>
          <span className={`${locked ? 'text-grey-400' : 'text-grey-500'} flex items-center`}><Icon icon="heroicons-outline:signal" className="mr-2" />{difficulty}</span>
        </div>
        {!locked ? (
          score ? (
            <div className="text-sm font-semibold text-success">Score: {score}</div>
          ) : (
            <button className="bg-grey-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-grey-700 transition-all">
              {buttonText || 'Start Session'}
            </button>
          )
        ) : (
          <span className="text-sm text-grey-400">{buttonText || 'Locked'}</span>
        )}
      </div>
    </div>
  );
};

const reportData = [
  {
    week: "Week 1 Report",
    title: "Foundation Skills",
    description:
      "Master the basics of professional interview communication and etiquette.",
    status: "Completed",
    icon: "heroicons-outline:document-text",
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
    buttonColor: "bg-green-600 hover:bg-green-700",
    score: "9.1/10",
    sessions: "5/5",
    date: "Jan 8, 2025",
    disabled: false,
  },
  {
    week: "Week 2 Report",
    title: "Behavioral Questions",
    description:
      "Learn the STAR method and effective storytelling techniques for behavioral interviews.",
    status: "Completed",
    icon: "heroicons-outline:chat-alt-2",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
    buttonColor: "bg-blue-600 hover:bg-blue-700",
    score: "8.7/10",
    sessions: "5/5",
    date: "Jan 12, 2025",
    disabled: false,
  },
  {
    week: "Week 3 Report",
    title: "Technical Deep Dive",
    description:
      "Programming concepts and technical problem solving in interview scenarios.",
    status: "Completed",
    icon: "heroicons-outline:code",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
    score: "8.9/10",
    sessions: "5/5",
    date: "Jan 16, 2025",
    disabled: false,
  },
  {
    week: "Week 4 Report",
    title: "System Design",
    description:
      "Architecture and scalability concepts for system design interviews.",
    status: "In Progress",
    icon: "heroicons-outline:server",
    iconColor: "text-gray-400",
    bgColor: "bg-gray-200",
    buttonColor: "bg-gray-300",
    score: "8.8/10",
    sessions: "2/5",
    date: "Jan 20, 2025",
    disabled: true,
  },
  {
    week: "Week 5+ Reports",
    title: "Future Weeks",
    description:
      "Complete previous weeks to unlock future performance reports.",
    status: "Locked",
    icon: "heroicons-outline:lock-closed",
    iconColor: "text-gray-400",
    bgColor: "bg-gray-200",
    buttonColor: "bg-gray-300",
    sessions: "4 weeks",
    disabled: true,
  },
];



const RoleplayPage = () => {

    const [filter, setFilter] = useState('desk');

  

    return (

        <>
        <section className="p-6 bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      {/* Overall Progress */}
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-3">
          <svg className="w-20 h-20 transform -rotate-90">
            <circle cx="40" cy="40" r="36" stroke="#E5E7EB" strokeWidth="8" fill="none" />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="#6B7280"
              strokeWidth="8"
              fill="none"
              strokeDasharray="226"
              strokeDashoffset="68"
              className="progress-ring"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-700">70%</span>
          </div>
        </div>
        <h6 className="font-semibold text-gray-800">Overall Progress</h6>
        <p className="text-sm text-gray-600">3 weeks completed</p>
      </div>

      {/* Current Streak */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
          {/* Replace this with <FaFire className="text-2xl text-orange-500" /> if using react-icons */}
          <span className="text-2xl text-orange-500">🔥</span>
        </div>
        <h6 className="font-semibold text-gray-800">Current Streak</h6>
        <p className="text-sm text-gray-600">5 days in a row</p>
      </div>

      {/* Total Sessions */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-blue-600">24</span>
        </div>
        <h6 className="font-semibold text-gray-800">Sessions Completed</h6>
        <p className="text-sm text-gray-600">+3 this week</p>
      </div>

      {/* Average Score */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-green-600">8.4</span>
        </div>
        <h6 className="font-semibold text-gray-800">Average Score</h6>
        <p className="text-sm text-gray-600">Out of 10</p>
      </div>

    </div>
  </div>
        </section>


        <section className="p-6">
  <div className="max-w-7xl mx-auto">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-gray-800">Your Learning Roadmap</h2>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Week 4 of 8</span>
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div className="bg-gray-600 h-2 rounded-full" style={{ width: "50%" }}></div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Week Cards */}
      {[
        {
          week: 1,
          title: "Foundation Skills",
          desc: "Basic interview etiquette and communication",
          status: "Completed",
          completed: "5/5",
          icon: "✅",
          style: "text-green-600 bg-green-100",
        },
        {
          week: 2,
          title: "Behavioral Questions",
          desc: "STAR method and storytelling",
          status: "Completed",
          completed: "5/5",
          icon: "✅",
          style: "text-green-600 bg-green-100",
        },
        {
          week: 3,
          title: "Technical Deep Dive",
          desc: "Programming concepts and problem solving",
          status: "Completed",
          completed: "5/5",
          icon: "✅",
          style: "text-green-600 bg-green-100",
        },
        {
          week: 4,
          title: "System Design",
          desc: "Architecture and scalability concepts",
          status: "Current",
          completed: "2/5",
          icon: "▶️",
          style: "text-gray-600 bg-gray-200",
        },
        {
          week: 5,
          title: "Advanced Scenarios",
          desc: "Complex interview situations",
          status: "Locked",
          completed: "0/5",
        },
        {
          week: 6,
          title: "Leadership & Management",
          desc: "Team leadership scenarios",
          status: "Locked",
          completed: "0/5",
        },
        {
          week: 7,
          title: "Negotiation Skills",
          desc: "Salary and offer negotiations",
          status: "Locked",
          completed: "0/5",
        },
        {
          week: 8,
          title: "Final Assessment",
          desc: "Complete interview simulation",
          status: "Locked",
          completed: "0/3",
        },
      ].map((item) => (
        <div
          key={item.week}
          className={`bg-white rounded-xl p-6 border-2 shadow-sm cursor-pointer ${
            item.status === "Locked" ? "opacity-50" : ""
          }`}
          onClick={() => item.status !== "Locked" && console.log(`Open Week ${item.week}`)}
        >
          <div className="flex items-center justify-between mb-4">
            <h5
              className={`font-bold ${
                item.status === "Locked" ? "text-gray-400" : "text-gray-800"
              }`}
            >
              Week {item.week}
            </h5>
            <span
              className={`text-xl ${
                item.status === "Locked" ? "text-gray-400" : item.style?.split(" ")[0]
              }`}
            >
              {item.icon || "🔒"}
            </span>
          </div>
          <h6
            className={`font-semibold mb-2 ${
              item.status === "Locked" ? "text-gray-400" : "text-gray-800"
            }`}
          >
            {item.title}
          </h6>
          <p
            className={`text-sm mb-4 ${
              item.status === "Locked" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {item.desc}
          </p>
          <div className="flex items-center justify-between">
            <span
              className={`text-xs px-2 py-1 rounded ${
                item.status === "Completed"
                  ? "bg-green-600 text-white"
                  : item.status === "Current"
                  ? "bg-gray-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {item.status}
            </span>
            <span
              className={`text-xs ${
                item.status === "Locked" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {item.completed}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

    <section className="p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-dark mb-6">Week 4: System Design - Continue Your Journey</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <SessionCard
                title="Session 1: Database Design Basics"
                subtitle="Introduction to database architecture"
                duration="15 min"
                difficulty="Easy"
                score="8.5/10"
                status="Completed"
                icon="heroicons-outline:database"
              />
              <SessionCard
                title="Session 2: API Design Principles"
                subtitle="RESTful API best practices"
                duration="20 min"
                difficulty="Easy"
                score="9.2/10"
                status="Completed"
                icon="heroicons-outline:code"
              />
              <SessionCard
                title="Session 3: Scalability Patterns"
                subtitle="Load balancing and caching strategies"
                duration="25 min"
                difficulty="Medium"
                status="Available"
                icon="heroicons-outline:server"
                onClick={() => console.log("Start Session 3")}
              />
              <SessionCard
                title="Session 4: Microservices Architecture"
                subtitle="Service decomposition strategies"
                duration="30 min"
                difficulty="Hard"
                status="Locked"
                icon="heroicons-outline:lock-closed"
                locked
                buttonText="Complete Session 3"
              />
              <SessionCard
                title="Session 5: System Design Interview"
                subtitle="Complete system design scenario"
                duration="45 min"
                difficulty="Expert"
                status="Locked"
                icon="heroicons-outline:lock-closed"
                locked
                buttonText="Complete Session 4"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h6 className="font-semibold text-dark mb-4">Week 4 Progress</h6>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-grey-600">Sessions Completed</span>
                  <span className="text-sm font-semibold text-dark">2/5</span>
                </div>
                <div className="w-full bg-grey-200 rounded-full h-2">
                  <div className="bg-grey-600 h-2 rounded-full" style={{ width: "40%" }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-grey-500">
                  <span>40% Complete</span>
                  <span>3 sessions remaining</span>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            <section >
              <div className=" bg-white rounded-xl p-6 shadow-sm border">
                <p className="font-bold text-gray-800 mb-4">Pro Tips</p>
                <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="text-xs text-green-600 font-semibold mb-1">STRENGTH</div>
                      <div className="text-sm text-grey-700">Strong technical foundation in React & Node.js</div>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <div className="text-xs text-yellow-600 font-semibold mb-1">FOCUS AREA</div>
                      <div className="text-sm text-grey-700">Improve system design knowledge</div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="text-xs text-blue-600 font-semibold mb-1">OPPORTUNITY</div>
                      <div className="text-sm text-grey-700">5 new roles match your profile</div>
                    </div>
              </div>
              </div>
            </section>

            {/* Achievements Section */}
            <section className="p-6 bg-gray-100">
                  <div className="max-w-2xl mx-auto">
                    <p className="font-bold text-gray-800 mb-4">Recently Achievements</p>

                    <div className="flex flex-col gap-4">
                      {/* Card 1 */}
                      <div className="bg-white rounded-xl shadow p-4 flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full p-5">
                          🎯
                        </div>
                        <div>
                          <h6 className="text-sm font-semibold mb-1">Completed 3 Sessions</h6>
                          <p className="text-xs text-gray-600">Watched all lessons in System Design Week 4</p>
                        </div>
                      </div>

                      {/* Card 2 */}
                      <div className="bg-white rounded-xl shadow p-4 flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full p-5">
                          📝
                        </div>
                        <div>
                          <h6 className="text-sm font-semibold mb-1">Quiz Passed</h6>
                          <p className="text-xs text-gray-600">Scored 85%+ on Load Balancing quiz</p>
                        </div>
                      </div>

                      {/* Card 3 */}
                      <div className="bg-white rounded-xl shadow p-4 flex items-start gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full p-5">
                          📦
                        </div>
                        <div>
                          <h6 className="text-lg font-semibold mb-1">Project Submission</h6>
                          <p className="text-xs text-gray-600">Submitted scalable chat app architecture</p>
                        </div>
                      </div>
                    </div>
                  </div>
              </section>



            {/* Next Steps Section */}
            <section className="p-6 bg-gray-700">
              <div className="max-w-7xl mx-auto">
                <p className="text-l font-bold text-white mb-3">Ready For Next Session</p>
                <p className="text-sm text-white mb-3">RContinue with "Scalability Patterns" to unlock the next level.</p>
                <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-blue-700 transition-all w-full">
                  Start Session 3
                </button>
              </div>
            </section>

          </div>
        </div>
      </div>
    </section>


    <section className="p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Weekly Performance Reports
          </h2>
          <p className="text-sm text-gray-500">
            Review your progress and insights from completed weeks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportData.map((report, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-6 border shadow-sm ${
                report.disabled ? "bg-gray-100 opacity-60" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${report.bgColor}`}
                  >
                    <Icon icon={report.icon} className={`w-6 h-6 ${report.iconColor}`} />
                  </div>
                  <div>
                    <h6
                      className={`font-semibold ${
                        report.disabled ? "text-gray-500" : "text-gray-800"
                      }`}
                    >
                      {report.week}
                    </h6>
                    <p
                      className={`text-sm ${
                        report.disabled ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {report.title}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    report.status === "Completed"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <div className="mb-4 text-sm">
                <p
                  className={`mb-3 ${
                    report.disabled ? "text-gray-400" : "text-gray-600"
                  } text-xs`}
                >
                  {report.description}
                </p>

                {report.status === "Locked" ? (
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Remaining:</span>
                    <span className="font-semibold text-gray-500">
                      {report.sessions}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">
                        {report.disabled ? "Current Score:" : "Average Score:"}
                      </span>
                      <span
                        className={`font-semibold ${
                          report.disabled
                            ? "text-gray-500"
                            : "text-green-600"
                        }`}
                      >
                        {report.score}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Sessions:</span>
                      <span className="font-semibold text-gray-800">
                        {report.sessions}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">
                        {report.disabled ? "Expected:" : "Completed:"}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {report.date}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <button
                disabled={report.disabled}
                className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center transition-all ${
                  report.disabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : `${report.buttonColor} text-white`
                }`}
              >
                {report.disabled ? (
                  <>
                    <Icon icon="heroicons-outline:clock" className="w-4 h-4 mr-2" />
                    {report.status === "Locked" ? "Locked" : "Report Pending"}
                  </>
                ) : (
                  <>
                    <Icon icon="heroicons-outline:document-text" className="w-4 h-4 mr-2" />
                    View Report
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>


        </>

        
    );
}

export default RoleplayPage;