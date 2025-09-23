// src/pages/dashboard/QRCodePage.jsx
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import  useProfile  from "../../hooks/useProfile"; // keep same relative import you already use
import profileApi from "../../store/api/profileApi";

export default function QRCodePage() {
  const navigate = useNavigate();
  const { data: profile } = useProfile() || {}; // if your hook returns undefined while loading it's fine

  // fallback if hook not available or returns null
  const fallback = {
    id: "user123",
    name: "John Doe",
    username: "john-doe",
    publicProfilePath: `/u/john-doe`,
    resumeUrl: "https://example.com/resume/john-doe.pdf",
    videoUrl: "https://example.com/video/john-doe.mp4",
  };

  const p = profile || fallback;
  const origin = typeof window !== "undefined" ? window.location.origin : "https://yourdomain.com";
  const sharePath = p.publicProfilePath || `/u/${p.username || p.id || "user"}`;
  const shareUrl = `${origin}${sharePath}`;

  const links = useMemo(
    () => [
      { label: "Public profile", url: shareUrl },
      { label: "Resume / CV", url: p.resumeUrl || `${origin}/resume/${p.username || p.id}` },
      { label: "Intro / video", url: p.videoUrl || `${origin}/video/${p.username || p.id}` },
    ],
    [p, origin, shareUrl]
  );

  // QR image URL (uses public qrserver)
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(
    shareUrl
  )}`;

  useEffect(() => {
    //call api to generate qr code 
    const generateQr = async () => {
        const response= await profileApi.generateQrCode();
        if(response?.success){
          console.log("QR code generated successfully");
        } else {
          console.error("Failed to generate QR code:", response?.message || "Unknown error");
        }
    };
    generateQr();

    //get qr code
    const fetchQr = async () => {
        const response= await profileApi.fetchQrCode();
        if(response?.success){
          console.log("QR code fetched successfully");
        } else {
          console.error("Failed to fetch QR code:", response?.message || "Unknown error");
        }
    };
    fetchQr();

  }, []);


  async function downloadQr() {
    try {
      const res = await fetch(qrImageUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${p.username || "profile"}-qr.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("Unable to download QR image.");
    }
  }

  function copyToClipboard(text) {
    if (!navigator.clipboard) {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
      alert("Copied to clipboard");
      return;
    }
    navigator.clipboard.writeText(text).then(
      () => {
        alert("Copied to clipboard");
      },
      () => {
        alert("Copy failed");
      }
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Generate QR & Share</h1>
          <p className="text-sm text-gray-500">Create a QR that links to your public profile and related resources.</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-3 py-2 rounded border bg-white text-sm hover:bg-gray-50"
          >
            Back to dashboard
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 flex flex-col items-center justify-center space-y-4">
          <div className="bg-gray-50 p-4 rounded">
            <img src={qrImageUrl} alt="QR code" className="w-56 h-56 object-contain" />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => copyToClipboard(shareUrl)}
              className="px-4 py-2 rounded bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            >
              Copy URL
            </button>
            <button onClick={downloadQr} className="px-4 py-2 rounded border text-sm hover:bg-gray-50">
              Download QR
            </button>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-sm font-medium text-gray-600 mb-3">Links included</h3>

          <div className="space-y-3">
            {links.map((l) => (
              <div key={l.url} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                <div className="pr-4 min-w-0">
                  <div className="text-sm font-medium text-gray-800">{l.label}</div>
                  <div className="text-xs text-gray-500 truncate">{l.url}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => copyToClipboard(l.url)} className="px-3 py-1 rounded border text-sm">
                    Copy
                  </button>
                  <a
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 rounded bg-white border text-sm hover:bg-gray-50"
                  >
                    Open
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Customize</h4>
            <p className="text-xs text-gray-500">
              To include other links or a dedicated landing page, create a public profile landing (e.g. <code>/u/your-handle</code>)
              and update your profile settings. The QR encodes a single URL (best practice for scanners).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
