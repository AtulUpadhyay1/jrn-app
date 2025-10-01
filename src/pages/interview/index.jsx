import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';


const InterviewPlatform = () => {
  // Timer state
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  // Media controls state
  const [isMicOn, setIsMicOn] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  // Webcam state
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [micStream, setMicStream] = useState(null);
  const [micError, setMicError] = useState(null);
  const videoRef = useRef(null);

  // AI Interviewer state
  const [aiSpeaking, setAiSpeaking] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
      // Interview ended
      handleEndCall();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // Handle video stream changes
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().catch(console.error);
      };
    }
  }, [stream]);

  // Cleanup media streams on component unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
      if (micStream) {
        micStream.getTracks().forEach(track => {
          track.stop();
        });
      }
    };
  }, [stream, micStream]);

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Control handlers
  const handleStartInterview = () => {
    setIsTimerRunning(true);
    setTimerStarted(true);
    setIsCallActive(true);
    setAiSpeaking(true);
    
    // Simulate AI starting to speak
    setTimeout(() => setAiSpeaking(false), 3000);
  };

  const handleToggleMic = async () => {
    if (!isMicOn) {
      // Turn microphone ON - request mic access
      try {
        setMicError(null);
        const audioStream = await navigator.mediaDevices.getUserMedia({ 
          video: false, 
          audio: true 
        });
        setMicStream(audioStream);
        setIsMicOn(true);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        setMicError(error.message);
        setIsMicOn(false);
      }
    } else {
      // Turn microphone OFF - stop mic
      if (micStream) {
        micStream.getTracks().forEach(track => {
          track.stop();
        });
        setMicStream(null);
      }
      
      setIsMicOn(false);
      setMicError(null);
    }
  };

  const handleToggleVideo = async () => {
    if (!isVideoOn) {
      // Turn video ON - request camera access
      try {
        setCameraError(null);
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 }, 
            height: { ideal: 720 },
            facingMode: 'user'
          }, 
          audio: false // We'll handle audio separately
        });
        
        // Set the video element source first
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          // Ensure video plays
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(console.error);
          };
        }
        
        setStream(mediaStream);
        setIsVideoOn(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setCameraError(error.message);
        setIsVideoOn(false);
      }
    } else {
      // Turn video OFF - stop camera
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
        setStream(null);
      }
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      setIsVideoOn(false);
      setCameraError(null);
    }
  };

  const handleEndCall = () => {
    // Stop camera stream when ending call
    if (stream) {
      stream.getTracks().forEach(track => {
        track.stop();
      });
      setStream(null);
    }
    
    // Stop microphone stream when ending call
    if (micStream) {
      micStream.getTracks().forEach(track => {
        track.stop();
      });
      setMicStream(null);
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCallActive(false);
    setIsTimerRunning(false);
    setIsMicOn(false);
    setIsVideoOn(false);
    setCameraError(null);
    setMicError(null);
  };

  const handlePauseResume = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  return (
    <div className="h-screen  flex flex-col">
      {/* Header with Timer */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="text-white">
          <h1 className="text-xl font-semibold">AI Interview Session</h1>
          <p className="text-gray-400 text-sm">Technical Interview Round</p>
        </div>
        
        {/* Timer Display */}
        <div className="flex items-center space-x-4">
          <div className="bg-gray-700 px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon icon="heroicons:clock" className="w-5 h-5 text-gray-400" />
              <div className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></div>
              <span className="text-white font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          {!timerStarted ? (
            <button
              onClick={handleStartInterview}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Icon icon="heroicons:play" className="w-4 h-4" />
              <span>Start Interview</span>
            </button>
          ) : (
            <button
              onClick={handlePauseResume}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              {isTimerRunning ? <Icon icon="heroicons:pause" className="w-4 h-4" /> : <Icon icon="heroicons:play" className="w-4 h-4" />}
              <span>{isTimerRunning ? 'Pause' : 'Resume'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 p-4">
        <div className="h-full grid grid-cols-2 gap-4">
          
          {/* AI Interviewer */}
          <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-500">
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
              AI Interviewer
            </div>
            
            {/* AI Speaking Indicator */}
            {aiSpeaking && (
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <Icon icon="heroicons:speaker-wave" className="w-4 h-4 text-white" />
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-white rounded animate-pulse"></div>
                  <div className="w-1 h-6 bg-white rounded animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-1 h-5 bg-white rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            )}
            
            {/* AI Avatar */}
            <div className="h-full flex items-center justify-center">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center">
                  <Icon icon="heroicons:cpu-chip" className="w-10 h-10 text-blue-800" />
                </div>
              </div>
            </div>

            {/* AI Status */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black bg-opacity-50 text-white p-3 rounded-lg">
                <p className="text-sm">
                  {!timerStarted 
                    ? "Ready to start interview..." 
                    : aiSpeaking 
                      ? "Now speaking: Tell me about yourself..."
                      : "Listening for your response..."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* User Video */}
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-500">
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-medium">
              You
            </div>

            {/* Video Status Icons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              {cameraError && (
                <div className="bg-red-500 rounded-full p-2">
                  <Icon icon="heroicons:exclamation-triangle" className="w-4 h-4 text-white" />
                </div>
              )}
              {!isVideoOn && !cameraError && (
                <div className="bg-red-500 rounded-full p-2">
                  <Icon icon="heroicons:video-camera-slash" className="w-4 h-4 text-white" />
                </div>
              )}
              {micError && (
                <div className="bg-red-500 rounded-full p-2">
                  <Icon icon="heroicons:exclamation-triangle" className="w-4 h-4 text-white" />
                </div>
              )}
              {!isMicOn && isCallActive && !micError && (
                <div className="bg-red-500 rounded-full p-2">
                  <Icon icon="heroicons:x-mark" className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* User Video/Avatar Area */}
            <div className="h-full flex items-center justify-center">
              {isVideoOn && stream ? (
                // Real video feed from camera
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ transform: 'scaleX(-1)' }} // Mirror the video like a selfie camera
                  className="w-full h-full object-cover"
                />
              ) : cameraError ? (
                // Camera error state
                <div className="text-center text-red-300">
                  <div className="w-20 h-20 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon icon="heroicons:exclamation-triangle" className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm">Camera Error</p>
                  <p className="text-xs mt-2 opacity-75">
                    {cameraError.includes('Permission denied') 
                      ? 'Camera access denied' 
                      : 'Camera not available'
                    }
                  </p>
                </div>
              ) : (
                // Video off placeholder
                <div className="text-center text-gray-300">
                  <div className="w-20 h-20 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Icon icon="heroicons:video-camera-slash" className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-sm">Camera Off</p>
                </div>
              )}
            </div>

            {/* User Status */}
            {isCallActive && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black bg-opacity-50 text-white p-2 rounded-lg text-center">
                  <p className="text-xs flex items-center justify-center">
                    {micError ? (
                      <>
                        <Icon icon="heroicons:exclamation-triangle" className="w-4 h-4 mr-2 text-red-400" />
                        Mic Error
                      </>
                    ) : isMicOn ? (
                      <>
                        <Icon icon="heroicons:microphone" className="w-4 h-4 mr-2" />
                        Microphone Active
                      </>
                    ) : (
                      <>
                        <Icon icon="heroicons:x-mark" className="w-4 h-4 mr-2" />
                        Microphone Muted
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="bg-gray-800 px-6 py-4">
        <div className="flex items-center justify-center space-x-4">
          
          {/* Microphone Toggle */}
          <button
            onClick={handleToggleMic}
            disabled={!isCallActive}
            className={`p-4 rounded-full transition-all duration-200 ${
              micError
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : isMicOn 
                  ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
            } ${!isCallActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={micError ? `Microphone Error: ${micError}` : (isMicOn ? 'Mute microphone' : 'Unmute microphone')}
          >
            {micError ? (
              <Icon icon="heroicons:exclamation-triangle" className="w-6 h-6" />
            ) : isMicOn ? (
              <Icon icon="heroicons:microphone" className="w-6 h-6" />
            ) : (
              <Icon icon="heroicons:x-mark" className="w-6 h-6" />
            )}
          </button>

          {/* Video Toggle */}
          <button
            onClick={handleToggleVideo}
            disabled={!isCallActive}
            className={`p-4 rounded-full transition-all duration-200 ${
              cameraError
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : isVideoOn 
                  ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
            } ${!isCallActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={cameraError ? `Camera Error: ${cameraError}` : (isVideoOn ? 'Turn off camera' : 'Turn on camera')}
          >
            {cameraError ? (
              <Icon icon="heroicons:exclamation-triangle" className="w-6 h-6" />
            ) : isVideoOn ? (
              <Icon icon="heroicons:video-camera" className="w-6 h-6" />
            ) : (
              <Icon icon="heroicons:video-camera-slash" className="w-6 h-6" />
            )}
          </button>

          {/* End Call */}
          <button
            onClick={handleEndCall}
            disabled={!isCallActive}
            className={`p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200 ${
              !isCallActive ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Icon icon="heroicons:phone-x-mark" className="w-6 h-6" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="mt-4 flex items-center justify-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-green-500' : 'bg-gray-500'}`}></div>
            <span>Call Status: {isCallActive ? 'Connected' : 'Disconnected'}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isMicOn && isCallActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>Audio: {isMicOn && isCallActive ? 'On' : 'Off'}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isVideoOn && isCallActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>Video: {isVideoOn && isCallActive ? 'On' : 'Off'}</span>
          </div>
        </div>
      </div>

      {/* Interview End Modal */}
      {timeLeft === 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Interview Completed!</h2>
            <p className="text-gray-600 mb-6">
              Your 10-minute AI interview session has ended. Thank you for participating!
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start New Interview
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPlatform;