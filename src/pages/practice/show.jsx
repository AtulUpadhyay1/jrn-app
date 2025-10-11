import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRolePlayUseCase } from '@/services/practiceService';
import { Icon } from '@iconify/react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { toast } from 'react-toastify';

const PracticeInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: apiResponse, isLoading, error } = useRolePlayUseCase(id);
  
  // State management
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordingState, setRecordingState] = useState('idle'); // idle, recording, paused
  const [elapsedTime, setElapsedTime] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [sessionHistory, setSessionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  
  // Refs
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerIntervalRef = useRef(null);
  
  const useCaseData = apiResponse?.data;
  const questions = useCaseData?.question || [];
  const totalQuestions = questions.length;

  // Initialize webcam
  useEffect(() => {
    let mounted = true;
    
    const setupCamera = async () => {
      if (mounted && !streamRef.current) {
        await initializeCamera();
      }
    };
    
    setupCamera();
    
    return () => {
      mounted = false;
      stopCamera();
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (recordingState === 'recording') {
      timerIntervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [recordingState]);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      // Removed toast to prevent duplicate notifications on re-renders
    } catch (err) {
      console.error('Error accessing camera:', err);
      toast.error('Unable to access camera and microphone. Please grant permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const toggleCamera = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
        if (videoTrack.enabled) {
          toast.success('Camera turned on');
        } else {
          toast.info('Camera turned off');
        }
      }
    }
  };

  const toggleMicrophone = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
        if (audioTrack.enabled) {
          toast.success('Microphone turned on');
        } else {
          toast.info('Microphone muted');
        }
      }
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    recordedChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current, {
      mimeType: 'video/webm;codecs=vp9',
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecordingState('recording');
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.pause();
      setRecordingState('paused');
      toast.info('Recording paused');
    } else if (mediaRecorderRef.current && recordingState === 'paused') {
      mediaRecorderRef.current.resume();
      setRecordingState('recording');
      toast.success('Recording resumed');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setRecordingState('idle');
      // Toast removed - will be shown by the calling function if needed
    }
  };

  const downloadRecording = () => {
    if (recordedChunksRef.current.length > 0) {
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `practice-interview-${Date.now()}.webm`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Recording downloaded successfully');
    } else {
      toast.warning('No recording available to download');
    }
  };

  const handleStartSession = () => {
    setIsStarted(true);
    startRecording();
    toast.info('Practice session started');
  };

  const handleSubmitAnswer = () => {
    const newAnswer = {
      questionIndex: currentQuestionIndex,
      question: questions[currentQuestionIndex],
      answer: currentAnswer,
      timestamp: new Date().toISOString(),
    };
    
    setAnswers([...answers, newAnswer]);
    setSessionHistory([...sessionHistory, newAnswer]);
    setCurrentAnswer('');
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      toast.success('Answer submitted! Moving to next question');
    } else {
      handleEndSession();
    }
  };

  const handleEndSession = () => {
    // Stop recording
    stopRecording();
    
    // Stop camera and microphone
    stopCamera();
    
    // Clear video source
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    // You can add logic to save data to backend here
    
    // Show success message briefly
    const toastId = toast.success('Session completed! Closing...', {
      autoClose: 1000
    });
    
    // Try to close tab or navigate back
    setTimeout(() => {
      toast.dismiss(toastId); // Dismiss this specific toast
      
      // Try to close the current tab/window
      // This only works if the window was opened via JavaScript (window.open)
      window.close();
      
      // If window.close() doesn't work (browser security prevents it),
      // navigate back to practice page as fallback
      setTimeout(() => {
        // Check if window is still open (close didn't work)
        navigate('/practice', { replace: true });
      }, 100);
    }, 1000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading practice session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-6 max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Session</h2>
          <p className="text-gray-600">Unable to load the practice interview. Please try again.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[calc(100vh-2rem)]">
          {/* Left Panel - Camera Feed (40%) */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center justify-between">
                  <span>Camera Feed</span>
                  {recordingState === 'recording' && (
                    <span className="flex items-center text-red-600 text-sm">
                      <span className="w-2 h-2 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                      Live
                    </span>
                  )}
                </h2>
              </div>
              
              <div className="flex-1 bg-black relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!isCameraOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <Icon icon="heroicons-outline:video-camera-slash" className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="p-4 flex justify-center gap-4">
                <button
                  onClick={toggleCamera}
                  className={`p-3 rounded-full ${
                    isCameraOn ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-100 hover:bg-red-200'
                  }`}
                  title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
                >
                  {isCameraOn ? (
                    <Icon icon="heroicons-outline:video-camera" className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Icon icon="heroicons-outline:video-camera-slash" className="w-6 h-6 text-red-600" />
                  )}
                </button>
                
                <button
                  onClick={toggleMicrophone}
                  className={`p-3 rounded-full ${
                    isMicOn ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-100 hover:bg-red-200'
                  }`}
                  title={isMicOn ? 'Mute microphone' : 'Unmute microphone'}
                >
                  {isMicOn ? (
                    <Icon icon="heroicons-outline:microphone" className="w-6 h-6 text-gray-700" />
                  ) : (
                    <Icon icon="heroicons-solid:microphone" className="w-6 h-6 text-red-600 opacity-50" />
                  )}
                </button>
              </div>
            </Card>
          </div>

          {/* Right Panel - Interview Panel (60%) */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {!isStarted ? (
                // Initial State
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                    <Icon icon="heroicons-outline:video-camera" className="w-12 h-12 text-white" />
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Ready to Start?</h1>
                  <p className="text-gray-600 mb-8 max-w-md">
                    Prepare yourself for your practice interview session
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8 max-w-md w-full">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Icon icon="heroicons-outline:view-list" className="w-6 h-6 text-blue-500" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">{totalQuestions} Questions</div>
                        <div className="text-sm text-gray-500">{useCaseData?.category?.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Icon icon="heroicons-outline:video-camera" className="w-6 h-6 text-blue-500" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Video Recording</div>
                        <div className="text-sm text-gray-500">Full session</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Icon icon="heroicons-outline:microphone" className="w-6 h-6 text-blue-500" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Speech-to-Text</div>
                        <div className="text-sm text-gray-500">Automatic</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Icon icon="heroicons-outline:chart-bar" className="w-6 h-6 text-blue-500" />
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Analytics</div>
                        <div className="text-sm text-gray-500">Performance</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6 text-left w-full max-w-md">
                    <p className="text-sm text-gray-700">
                      <strong>Session:</strong> {useCaseData?.name}
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Duration:</strong> {useCaseData?.time} minutes
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Type:</strong> {useCaseData?.use_case_type}
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleStartSession}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-lg"
                    title="Start your practice interview session"
                  >
                    Start Practice Session
                  </Button>
                </div>
              ) : (
                // Active State
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Practice Interview</h2>
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-mono font-bold text-gray-700">
                        {formatTime(elapsedTime)}
                      </div>
                      <button
                        onClick={downloadRecording}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                        title="Download Recording"
                      >
                        <Icon icon="heroicons-outline:download" className="w-5 h-5 text-gray-700" />
                      </button>
                      <Button
                        onClick={handleEndSession}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
                        title="End the practice session"
                      >
                        End
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          Question {currentQuestionIndex + 1} of {totalQuestions}
                        </span>
                        <span className="text-sm text-gray-500">
                          {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Session History */}
                    {sessionHistory.length > 0 && (
                      <div className="border rounded-lg">
                        <button
                          onClick={() => setShowHistory(!showHistory)}
                          className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                          title={showHistory ? "Hide session history" : "Show session history"}
                        >
                          <span className="font-semibold text-gray-700">
                            SESSION HISTORY ({sessionHistory.length})
                          </span>
                          {showHistory ? (
                            <Icon icon="heroicons-outline:chevron-up" className="w-5 h-5" />
                          ) : (
                            <Icon icon="heroicons-outline:chevron-down" className="w-5 h-5" />
                          )}
                        </button>
                        {showHistory && (
                          <div className="p-4 border-t space-y-2 max-h-40 overflow-y-auto">
                            {sessionHistory.map((item, idx) => (
                              <div key={idx} className="text-sm p-2 bg-gray-50 rounded">
                                <div className="font-semibold text-gray-700">Q{idx + 1}: {item.question}</div>
                                <div className="text-gray-600 truncate">A: {item.answer}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Current Question */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {questions[currentQuestionIndex]}
                      </h3>
                    </div>
                    
                    {/* Recording Status */}
                    <div className="flex items-center justify-center gap-4">
                      {recordingState === 'recording' && (
                        <div className="flex items-center gap-2 text-red-600">
                          <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
                          <span className="font-semibold">RECORDING</span>
                        </div>
                      )}
                      
                      <button
                        onClick={pauseRecording}
                        className="p-3 bg-yellow-400 hover:bg-yellow-500 rounded-full"
                        title={recordingState === 'recording' ? 'Pause recording' : 'Resume recording'}
                      >
                        {recordingState === 'recording' ? (
                          <Icon icon="heroicons-outline:pause" className="w-6 h-6 text-white" />
                        ) : (
                          <Icon icon="heroicons-outline:play" className="w-6 h-6 text-white" />
                        )}
                      </button>
                      
                      <button
                        onClick={stopRecording}
                        className="p-3 bg-gray-800 hover:bg-gray-900 rounded-full"
                        title="Stop recording"
                      >
                        <Icon icon="heroicons-outline:stop" className="w-6 h-6 text-white" />
                      </button>
                    </div>
                    
                    {/* Answer Section */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        YOUR ANSWER
                      </label>
                      <textarea
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder="Type your answer here or use the microphone button..."
                        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500">{currentAnswer.length} chars</span>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setCurrentAnswer('')}
                            className="px-4 py-2 border border-gray-300 hover:bg-gray-50"
                            title="Clear your answer"
                          >
                            Clear
                          </Button>
                          <Button
                            onClick={handleSubmitAnswer}
                            disabled={!currentAnswer.trim()}
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            title={currentAnswer.trim() ? "Submit your answer and move to next question" : "Please enter an answer first"}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeInterview;