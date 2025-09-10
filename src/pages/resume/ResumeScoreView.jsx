// ResumeScoreView.jsx
import React from "react";

const Pill = ({ children, tone = "neutral" }) => {
  const tones = {
    neutral: "bg-gray-100 text-gray-700",
    good: "bg-green-100 text-green-800",
    warn: "bg-yellow-100 text-yellow-800",
    bad: "bg-red-100 text-red-800",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
};

const Bar = ({ label, value }) => {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-600 font-medium">{v}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
};

const ResumeScoreView = ({ data }) => {
  if (!data || data.status !== "success") {
    return (
      <div className="border rounded-xl shadow-sm bg-white p-6 text-sm text-gray-600">
        No analysis available.
      </div>
    );
  }

  const analysis = data.analysis || {};
  const profile = analysis.profile || {};
  const rs = analysis.resume_analysis || {};
  const scores = rs.score || {};

  const qualityTone =
    (rs.quality || "").toLowerCase() === "excellent"
      ? "good"
      : (rs.quality || "").toLowerCase() === "good"
      ? "good"
      : (rs.quality || "").toLowerCase() === "average"
      ? "warn"
      : "neutral";

  return (
    <div className="border rounded-xl shadow-sm bg-white p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Resume Analysis
          </h2>
          <p className="text-sm text-gray-600">
            Summary of profile, strengths, gaps, and scores.
          </p>
        </div>
        {rs.quality && <Pill tone={qualityTone}>{rs.quality}</Pill>}
      </div>

      {/* Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Profile</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <div>
              <span className="text-gray-500">Name: </span>
              <span className="font-medium">{profile.name || "-"}</span>
            </div>
            <div>
              <span className="text-gray-500">Position: </span>
              <span className="font-medium">{profile.position || "-"}</span>
            </div>
            <div>
              <span className="text-gray-500">Industry: </span>
              <span className="font-medium capitalize">
                {profile.industry || "-"}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Location: </span>
              <span className="font-medium">{profile.location || "-"}</span>
            </div>
          </div>
        </div>

        {/* Scores */}
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Scores</h3>
          <div className="space-y-3">
            <Bar label="Overall" value={scores.overall} />
            <Bar label="Skills Match" value={scores.skills_match} />
            <Bar label="Experience Relevance" value={scores.experience_relevance} />
            <Bar label="Education Strength" value={scores.education_strength} />
            <Bar label="Presentation" value={scores.presentation} />
          </div>
        </div>
      </div>

      {/* Pros / Cons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-gray-800">
            Pros
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-700">
            {(rs.pros || []).length ? (
              rs.pros.map((p, i) => <li key={i}>{p}</li>)
            ) : (
              <li className="text-gray-500">No pros listed.</li>
            )}
          </ul>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-semibold text-gray-800">
            Cons
          </h3>
          <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-700">
            {(rs.cons || []).length ? (
              rs.cons.map((c, i) => <li key={i}>{c}</li>)
            ) : (
              <li className="text-gray-500">No cons listed.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-800">Recommendations</h3>
        <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-700">
          {(rs.recommendations || []).length ? (
            rs.recommendations.map((r, i) => <li key={i}>{r}</li>)
          ) : (
            <li className="text-gray-500">No recommendations available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ResumeScoreView;
