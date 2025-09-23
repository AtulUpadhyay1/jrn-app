import React, { useState, useEffect, useRef } from 'react';

const InterviewPlatform = () => {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10 * 60); // 10 minutes in seconds
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showEndConfirmation, setShowEndConfirmation] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [akoolVideoUrl, setAkoolVideoUrl] = useState('');
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [akoolClientId, setAkoolClientId] = useState('zUQkvQlU4+2vfb+lyIsT9Q=='); // Client ID
  const [akoolClientSecret, setAkoolClientSecret] = useState('u4QDUyalkg1JnQ/vXtsDFiCTB2ExfQ5k'); // Client Secret
  const [akoolAccessToken, setAkoolAccessToken] = useState(''); // Generated access token
  const [tokenExpiry, setTokenExpiry] = useState(null); // Token expiration time
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const videoRef = useRef(null);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamRef = useRef(null);

  // Sample interview questions
  const interviewQuestions = [
    "Hello! Welcome to your interview. Please introduce yourself and tell me about your background.",
    "What interests you most about this position and our company?",
    "Can you describe a challenging project you've worked on recently?",
    "How do you handle working under pressure and tight deadlines?",
    "What are your greatest strengths and how do they apply to this role?",
    "Where do you see yourself in the next 5 years?",
    "Do you have any questions about the role or our company?"
  ];

  const [questionIndex, setQuestionIndex] = useState(0);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          handleSpeechInput(finalTranscript);
        }
      };
    }
  }, []);

  // Timer effect
  useEffect(() => {
    let timer;
    if (isInterviewActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleEndInterview();
    }
    return () => clearInterval(timer);
  }, [isInterviewActive, timeRemaining]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Akool Authentication - Generate Access Token
  const generateAkoolToken = async () => {
    if (!akoolClientId || !akoolClientSecret) {
      console.warn('Akool Client ID or Client Secret not set.');
      return false;
    }

    setIsAuthenticating(true);

    try {
      const response = await fetch('https://api.akool.com/api/open/v3/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientId: akoolClientId,
          clientSecret: akoolClientSecret
        })
      });

      const data = await response.json();

      if (data.code === 1000 && data.data) {
        setAkoolAccessToken(data.data.token);
        // Set expiry time (typically tokens expire in 1 hour, but check API docs)
        const expiryTime = Date.now() + (data.data.expires_in || 3600) * 1000;
        setTokenExpiry(expiryTime);
        setIsAuthenticating(false);
        return true;
      } else {
        console.error('Failed to generate token:', data);
        setIsAuthenticating(false);
        return false;
      }
    } catch (error) {
      console.error('Error generating token:', error);
      setIsAuthenticating(false);
      return false;
    }
  };

  // Check if token is valid and not expired
  const isTokenValid = () => {
    if (!akoolAccessToken || !tokenExpiry) return false;
    return Date.now() < tokenExpiry;
  };

  // Ensure valid token before API calls
  const ensureValidToken = async () => {
    if (isTokenValid()) {
      return true;
    }
    return await generateAkoolToken();
  };

  // Akool Talking Avatar API integration
  const generateAkoolAvatar = async (text, isFirstMessage = false) => {
    // Ensure we have valid credentials and token
    const hasValidToken = await ensureValidToken();
    
    if (!hasValidToken) {
      console.warn('Unable to authenticate with Akool API. Using fallback animation.');
      simulateAISpeech(text);
      return;
    }

    setIsGeneratingAvatar(true);
    setAiSpeaking(true);

    try {
      // Step 1: Create talking avatar
      const createResponse = await fetch('https://api.akool.com/api/open/v3/avatar/talking', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${akoolAccessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          stitch: true,
          input_text: text,
          avatar_id: "avatar_1001", // Default avatar, you can change this
          voice_id: "voice_1001", // Default voice, you can change this
          webhook_url: null // Optional webhook for status updates
        })
      });

      const createData = await createResponse.json();
      
      if (createData.code === 1000) {
        const taskId = createData.data._id;
        
        // Step 2: Poll for completion
        pollAvatarStatus(taskId);
      } else {
        console.error('Failed to create avatar:', createData);
        setIsGeneratingAvatar(false);
        setAiSpeaking(false);
        // Fallback to static animation
        simulateAISpeech(text);
      }
    } catch (error) {
      console.error('Error generating avatar:', error);
      setIsGeneratingAvatar(false);
      setAiSpeaking(false);
      // Fallback to static animation
      simulateAISpeech(text);
    }
  };

  // Poll avatar generation status
  const pollAvatarStatus = async (taskId) => {
    const maxAttempts = 30; // Max 5 minutes polling
    let attempts = 0;

    const poll = async () => {
      try {
        const response = await fetch(`https://api.akool.com/api/open/v3/avatar/talking/${taskId}`, {
          headers: {
            'Authorization': `Bearer ${akoolAccessToken}`
          }
        });

        const data = await response.json();

        if (data.code === 1000) {
          const status = data.data.status;
          
          if (status === 'completed') {
            setAkoolVideoUrl(data.data.resource.resource_url);
            setIsGeneratingAvatar(false);
            // Keep aiSpeaking true while video plays
          } else if (status === 'failed') {
            console.error('Avatar generation failed');
            setIsGeneratingAvatar(false);
            setAiSpeaking(false);
            simulateAISpeech('Sorry, there was an issue generating the response.');
          } else if (attempts < maxAttempts) {
            // Still processing, poll again in 10 seconds
            attempts++;
            setTimeout(poll, 10000);
          } else {
            console.error('Avatar generation timeout');
            setIsGeneratingAvatar(false);
            setAiSpeaking(false);
            simulateAISpeech('Response generation timed out.');
          }
        }
      } catch (error) {
        console.error('Error polling avatar status:', error);
        setIsGeneratingAvatar(false);
        setAiSpeaking(false);
        simulateAISpeech('There was an error processing the response.');
      }
    };

    poll();
  };

  // Handle video end event
  const handleAvatarVideoEnd = () => {
    setAiSpeaking(false);
    setAkoolVideoUrl('');
  };

  // Simulate AI speech fallback (when API key is not available)
  const simulateAISpeech = (text) => {
    setAiSpeaking(true);
    setTimeout(() => {
      setAiSpeaking(false);
    }, Math.max(3000, text.length * 50)); // Approximate speaking time
  };

  // Handle credentials setup
  const handleCredentialsSetup = () => {
    const clientId = prompt('Enter your Akool Client ID:');
    if (!clientId) return;
    
    const clientSecret = prompt('Enter your Akool Client Secret:');
    if (!clientSecret) return;
    
    setAkoolClientId(clientId);
    setAkoolClientSecret(clientSecret);
    
    // Automatically generate token after setting credentials
    setTimeout(() => {
      generateAkoolToken();
    }, 100);
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: isMicOn 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsCameraOn(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsCameraOn(false);
  };

  // Toggle microphone
  const toggleMicrophone = () => {
    setIsMicOn(!isMicOn);
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !isMicOn;
      });
    }
  };

  // Start interview
  const startInterview = async () => {
    setIsInterviewActive(true);
    await startCamera();
    setIsMicOn(true);
    
    // Add welcome message
    const welcomeMsg = {
      id: Date.now(),
      sender: 'ai',
      message: interviewQuestions[0],
      timestamp: new Date().toLocaleTimeString()
    };
    setChatMessages([welcomeMsg]);
    setCurrentQuestion(interviewQuestions[0]);
    
    // Generate Akool avatar for welcome message
    generateAkoolAvatar(interviewQuestions[0], true);
  };

  // Handle speech input
  const handleSpeechInput = (transcript) => {
    const message = {
      id: Date.now(),
      sender: 'user',
      message: transcript,
      timestamp: new Date().toLocaleTimeString()
    };
    setChatMessages(prev => [...prev, message]);
    
    // Simulate AI response after user speaks
    setTimeout(() => {
      handleAIResponse();
    }, 2000);
  };

  // Handle AI response
  const handleAIResponse = () => {
    if (questionIndex < interviewQuestions.length - 1) {
      const nextQuestion = interviewQuestions[questionIndex + 1];
      const aiMessage = {
        id: Date.now(),
        sender: 'ai',
        message: nextQuestion,
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, aiMessage]);
      setCurrentQuestion(nextQuestion);
      setQuestionIndex(prev => prev + 1);
      generateAkoolAvatar(nextQuestion);
    } else {
      const closingMessage = {
        id: Date.now(),
        sender: 'ai',
        message: "Thank you for your time! This concludes our interview. Good luck!",
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, closingMessage]);
      generateAkoolAvatar("Thank you for your time! This concludes our interview. Good luck!");
      setTimeout(() => handleEndInterview(), 5000);
    }
  };

  // Send text message
  const sendMessage = () => {
    if (currentMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'user',
        message: currentMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, message]);
      setCurrentMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        handleAIResponse();
      }, 2000);
    }
  };

  // Toggle speech recognition
  const toggleSpeechRecognition = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  // Handle end interview
  const handleEndInterview = () => {
    setShowEndConfirmation(true);
  };

  // Confirm end interview
  const confirmEndInterview = () => {
    setIsInterviewActive(false);
    setShowEndConfirmation(false);
    stopCamera();
    setIsMicOn(false);
    setTimeRemaining(10 * 60);
    setQuestionIndex(0);
    setChatMessages([]);
    setCurrentQuestion('');
    setAkoolVideoUrl('');
    setIsGeneratingAvatar(false);
    
    // Keep authentication credentials but clear tokens if expired
    if (!isTokenValid()) {
      setAkoolAccessToken('');
      setTokenExpiry(null);
    }
    
    // Here you would submit the interview data to your backend
    alert('Interview submitted successfully!');
  };

  // Cancel end interview
  const cancelEndInterview = () => {
    setShowEndConfirmation(false);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* API Configuration (show when no valid token) */}
      {!isTokenValid() && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-2">⚠️</span>
              <div>
                <p className="text-sm text-yellow-700">
                  {!akoolClientId || !akoolClientSecret ? 
                    'Akool credentials not configured. Set your Client ID and Client Secret to enable talking avatar.' :
                    'Akool token expired or invalid. Click to refresh authentication.'
                  }
                </p>
                {akoolAccessToken && tokenExpiry && (
                  <p className="text-xs text-yellow-600 mt-1">
                    Token expires: {new Date(tokenExpiry).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              {(!akoolClientId || !akoolClientSecret) ? (
                <button
                  onClick={handleCredentialsSetup}
                  className="bg-yellow-400 hover:bg-yellow-500 text-yellow-800 px-3 py-1 rounded text-sm"
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? 'Authenticating...' : 'Set Credentials'}
                </button>
              ) : (
                <button
                  onClick={generateAkoolToken}
                  className="bg-yellow-400 hover:bg-yellow-500 text-yellow-800 px-3 py-1 rounded text-sm"
                  disabled={isAuthenticating}
                >
                  {isAuthenticating ? 'Refreshing...' : 'Refresh Token'}
                </button>
              )}
              {(akoolClientId && akoolClientSecret) && (
                <button
                  onClick={() => {
                    setAkoolClientId('');
                    setAkoolClientSecret('');
                    setAkoolAccessToken('');
                    setTokenExpiry(null);
                  }}
                  className="bg-red-400 hover:bg-red-500 text-red-800 px-3 py-1 rounded text-sm"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header with Timer */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">AI Interview Platform</h1>
        <div className="flex items-center space-x-2 text-lg font-mono">
          <span className="text-blue-600">🕒</span>
          <span className={`${timeRemaining < 120 ? 'text-red-600' : 'text-gray-700'}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Section (50%) */}
        <div className="w-1/2 flex flex-col">
          {/* AI Section (Top Half) */}
          <div className="h-1/2 bg-gray-900 relative flex items-center justify-center">
            {akoolVideoUrl ? (
              // Akool Talking Avatar Video
              <video
                key={akoolVideoUrl}
                autoPlay
                onEnded={handleAvatarVideoEnd}
                className="w-full h-full object-cover rounded-lg"
                controls={false}
              >
                <source src={akoolVideoUrl} type="video/mp4" />
              </video>
            ) : (
              // Fallback Static Avatar
              <div className="text-center text-white">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 mx-auto ${aiSpeaking || isGeneratingAvatar ? 'animate-pulse' : ''}`}>
                  <span className="text-6xl">🤖</span>
                </div>
                <h3 className="text-lg font-semibold">AI Interviewer</h3>
                <p className="text-sm opacity-75">
                  {isGeneratingAvatar ? 'Generating response...' : 
                   aiSpeaking ? 'Speaking...' : 'Listening...'}
                </p>
                {!isTokenValid() && (
                  <p className="text-xs text-yellow-400 mt-2">
                    Authentication required for Akool Avatar
                  </p>
                )}
              </div>
            )}
            
            {/* Akool.com Integration Label */}
            <div className="absolute bottom-4 right-4 text-xs text-gray-400">
              Powered by Akool.com
            </div>
            
            {/* Loading overlay for avatar generation */}
            {isGeneratingAvatar && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
                  <p className="text-sm">Generating AI Avatar...</p>
                </div>
              </div>
            )}
          </div>

          {/* User Section (Bottom Half) */}
          <div className="h-1/2 bg-black relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${isCameraOn ? 'block' : 'hidden'}`}
            />
            {!isCameraOn && (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <div className="text-center text-white">
                  <span className="text-6xl opacity-50">📷</span>
                  <p>Camera Off</p>
                </div>
              </div>
            )}

            {/* Control Buttons */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
              {!isInterviewActive ? (
                <button
                  onClick={startInterview}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2"
                >
                  <span>Start Interview</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsCameraOn(!isCameraOn)}
                    className={`p-3 rounded-full ${isCameraOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'} text-white`}
                    title={isCameraOn ? "Turn off camera" : "Turn on camera"}
                  >
                    <span className="text-lg">{isCameraOn ? "📹" : "📷"}</span>
                  </button>
                  
                  <button
                    onClick={toggleMicrophone}
                    className={`p-3 rounded-full ${isMicOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'} text-white`}
                    title={isMicOn ? "Mute microphone" : "Unmute microphone"}
                  >
                    <span className="text-lg">{isMicOn ? "🎤" : "🔇"}</span>
                  </button>
                  
                  <button
                    onClick={toggleSpeechRecognition}
                    className={`p-3 rounded-full ${isListening ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
                    title={isListening ? "Stop listening" : "Start voice input"}
                  >
                    <span className="text-lg">{isListening ? "🔴" : "🎙️"}</span>
                  </button>
                  
                  <button
                    onClick={handleEndInterview}
                    className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white"
                    title="End interview"
                  >
                    <span className="text-lg">📞</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Section (50%) - Chat */}
        <div className="w-1/2 bg-white flex flex-col">
          <div className="bg-gray-50 p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Interview Conversation</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm">{message.sender === 'user' ? "👤" : "🤖"}</span>
                    <span className="text-xs opacity-75">{message.timestamp}</span>
                  </div>
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input */}
          {isInterviewActive && (
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your response or use voice..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                  title="Send message"
                >
                  <span className="text-lg">📤</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* End Interview Confirmation Modal */}
      {showEndConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <h3 className="text-lg font-semibold mb-4">End Interview?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end the interview? This action will submit your responses.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={cancelEndInterview}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Continue Interview
              </button>
              <button
                onClick={confirmEndInterview}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                End & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPlatform;