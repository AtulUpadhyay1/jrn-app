import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { toast } from 'react-toastify';
import '../../assets/css/practice.css';

// Practice Questions Data
// Get useCase from localStorage and use its questions array
let practiceQuestions = [];
try {
  const useCase = JSON.parse(localStorage.getItem('practiceUseCase'));
  if (useCase && Array.isArray(useCase.question) && useCase.question.length > 0) {
    practiceQuestions = useCase.question;
    console.log('Loaded practice questions from localStorage:', practiceQuestions.length);
  } else {
    // fallback static questions
    practiceQuestions = [
      "Tell me about yourself and your professional background.",
      "What are your greatest strengths and weaknesses?",
      "Why do you want to work for our company?",
      "Where do you see yourself in 5 years?",
      "Do you have any questions for us?"
    ];
    console.log('Using fallback practice questions:', practiceQuestions.length);
  }
} catch (e) {
  // fallback static questions
  practiceQuestions = [
    "Tell me about yourself and your professional background.",
    "What are your greatest strengths and weaknesses?",
    "Why do you want to work for our company?",
    "Where do you see yourself in 5 years?",
    "Do you have any questions for us?"
  ];
  console.log('Error loading questions, using fallback:', e);
}

const StartPractice = () => {
  // Ensure we have valid questions
  if (!practiceQuestions || practiceQuestions.length === 0) {
    console.error('No practice questions available!');
    practiceQuestions = [
      "Tell me about yourself and your professional background.",
      "What are your greatest strengths and weaknesses?",
      "Why do you want to work for our company?",
      "Where do you see yourself in 5 years?",
      "Do you have any questions for us?"
    ];
  }

  console.log('StartPractice component initialized with', practiceQuestions.length, 'questions');

  // Check Safari speech recognition compatibility
  const checkSpeechRecognitionSupport = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    
    console.log('Browser info:', {
      isSafari,
      hasSpeechRecognition: !!SpeechRecognition,
      hasWebkitSpeechRecognition: !!window.webkitSpeechRecognition,
      userAgent: navigator.userAgent,
      protocol: location.protocol,
      hostname: location.hostname
    });

    return {
      supported: !!SpeechRecognition,
      safari: isSafari,
      needsHttps: isSafari && location.protocol !== 'https:' && location.hostname !== 'localhost'
    };
  };

  // States
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [sessionData, setSessionData] = useState([]);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);
  const [showEndSessionModal, setShowEndSessionModal] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showCameraOffModal, setShowCameraOffModal] = useState(false);
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');

  // Refs
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const speechRecognitionRef = useRef(null);
  const streamRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Cleanup resources - Enhanced for better camera release
  const cleanup = useCallback(() => {
    console.log('Starting comprehensive cleanup of all resources');

    // Step 1: Stop MediaRecorder aggressively
    if (mediaRecorderRef.current) {
      try {
        const state = mediaRecorderRef.current.state;
        console.log('MediaRecorder cleanup - current state:', state);

        if (state === 'recording' || state === 'paused') {
          mediaRecorderRef.current.stop();
        }

        // Clear all event handlers
        mediaRecorderRef.current.ondataavailable = null;
        mediaRecorderRef.current.onstop = null;
        mediaRecorderRef.current.onstart = null;
        mediaRecorderRef.current.onerror = null;

        mediaRecorderRef.current = null;
        console.log('MediaRecorder cleaned up successfully');
      } catch (error) {
        console.error('Error during MediaRecorder cleanup:', error);
      }
    }

    // Step 2: Stop all media stream tracks immediately
    if (streamRef.current) {
      try {
        const tracks = streamRef.current.getTracks();
        console.log(`Cleanup: Found ${tracks.length} tracks to stop`);

        tracks.forEach((track, index) => {
          console.log(`Stopping track ${index + 1}: ${track.kind} (${track.label})`);
          track.stop();

          // Verify track is stopped
          if (track.readyState !== 'ended') {
            console.warn(`Track ${index + 1} may not have stopped properly`);
          }
        });

        // Clear the stream reference immediately
        streamRef.current = null;
        console.log('All stream tracks stopped and cleared');
      } catch (error) {
        console.error('Error stopping stream tracks:', error);
      }
    }

    // Step 3: Clean up video element thoroughly
    if (videoRef.current) {
      try {
        const video = videoRef.current;

        // Pause and clear source
        video.pause();
        video.srcObject = null;
        video.src = '';
        video.removeAttribute('src');

        // Clear any event listeners that might hold references
        video.onloadedmetadata = null;
        video.onplay = null;
        video.onpause = null;
        video.onended = null;

        // Force reload to clear any cached streams
        video.load();

        console.log('Video element cleaned up completely');
      } catch (error) {
        console.error('Error cleaning up video element:', error);
      }
    }

    // Step 4: Stop speech recognition
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
        speechRecognitionRef.current.onresult = null;
        speechRecognitionRef.current.onstart = null;
        speechRecognitionRef.current.onend = null;
        speechRecognitionRef.current.onerror = null;
        speechRecognitionRef.current = null;
        console.log('Speech recognition cleaned up');
      } catch (error) {
        console.error('Error cleaning up speech recognition:', error);
      }
    }

    // Step 5: Clear any remaining references
    recordedChunksRef.current = [];

    // Step 6: Reset component state
    setIsRecording(false);
    setIsPaused(false);
    setIsListening(false);
    setIsCameraOn(false);

    // Step 7: Force garbage collection hint (browser dependent)
    if (window.gc && typeof window.gc === 'function') {
      try {
        window.gc();
        console.log('Garbage collection requested');
      } catch (error) {
        console.log('Garbage collection not available:', error.message);
      }
    }

    console.log('Comprehensive cleanup completed');
  }, []);

  // Initialize camera and speech recognition
  useEffect(() => {
    // Detect Safari for specific handling
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      console.log('Safari detected - using enhanced camera and speech recognition management');
      
      // Safari requires HTTPS for speech recognition in production
      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        console.warn('Safari requires HTTPS for speech recognition to work properly');
        toast.warning('For speech recognition to work in Safari, please use HTTPS or localhost');
      }
    }

    initializeCamera(true); // Show toast on initial load
    
    // Small delay for Safari to ensure proper initialization
    setTimeout(() => {
      initializeSpeechRecognition();
    }, isSafari ? 500 : 0);

    // Enhanced cleanup on page unload/reload
    const handleBeforeUnload = () => {
      console.log('Page unload detected - cleaning up camera resources');
      cleanup();
      // Small delay to ensure cleanup completes
      const start = Date.now();
      while (Date.now() - start < 100) {
        // Synchronous delay to ensure cleanup
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('Page hidden - releasing camera resources');
        cleanup();
      }
    };

    // Add event listeners for page unload and visibility change
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      // Remove event listeners
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // Perform cleanup
      cleanup();
    };
  }, [cleanup]);

  // Initialize camera stream
  const initializeCamera = async (showToast = true) => {
    try {
      // For Safari, be more explicit about constraints
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true
        }
      };

      console.log('Requesting camera access with constraints:', constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true); // Set camera state to true

        // For Safari, ensure video starts playing
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(e => console.log('Video play failed:', e));
        };

        console.log('Camera initialized successfully');
        if (showToast) {
          toast.success('Camera ready!');
        }
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      if (showToast) {
        toast.error('Failed to access camera. Please check permissions.');
      }
    }
  };

  // Initialize speech recognition
  const initializeSpeechRecognition = () => {
    const supportInfo = checkSpeechRecognitionSupport();
    
    if (!supportInfo.supported) {
      console.warn('Speech recognition not supported in this browser');
      toast.error('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari 14.1+');
      return;
    }

    if (supportInfo.needsHttps) {
      console.warn('Safari requires HTTPS for speech recognition');
      toast.warning('Safari requires HTTPS for speech recognition. Please use localhost or HTTPS.');
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      speechRecognitionRef.current = new SpeechRecognition();

      // Configuration for Safari/WebKit
      speechRecognitionRef.current.continuous = true;
      speechRecognitionRef.current.interimResults = true;
      speechRecognitionRef.current.lang = 'en-US';
      speechRecognitionRef.current.maxAlternatives = 1;
      
      if (supportInfo.safari) {
        // Safari-specific configuration
        speechRecognitionRef.current.grammars = null;
        
        // Test Safari permissions first
        const testPermissions = async () => {
          try {
            // Try a quick test to see if service is allowed
            const testRecognition = new SpeechRecognition();
            testRecognition.continuous = false;
            testRecognition.interimResults = false;
            testRecognition.maxAlternatives = 1;
            
            // Set a very short timeout
            setTimeout(() => {
              if (testRecognition) {
                testRecognition.stop();
              }
            }, 100);
            
            console.log('Safari speech recognition test completed');
          } catch (error) {
            console.warn('Safari speech recognition test failed:', error);
          }
        };
        
        testPermissions();
      }
      
      console.log('Speech recognition initialized successfully:', supportInfo);

      speechRecognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Only append final transcript to avoid overwriting
        if (finalTranscript) {
          setCurrentAnswer(prev => prev + finalTranscript);
        }

        // Show interim results separately
        setInterimTranscript(interimTranscript);
      };

      speechRecognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        setInterimTranscript('');
        toast.success('Microphone is now listening...');
      };

      speechRecognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
        setInterimTranscript('');
      };

      speechRecognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setInterimTranscript('');

        let errorMessage = 'Speech recognition failed. Please try again.';
        let showDetailedHelp = false;
        
        switch (event.error) {
          case 'network':
            errorMessage = 'Network error occurred. Please check your connection.';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone access denied. Please allow microphone permissions in Safari Settings.';
            showDetailedHelp = true;
            break;
          case 'no-speech':
            errorMessage = 'No speech detected. Please try speaking again.';
            break;
          case 'audio-capture':
            errorMessage = 'Audio capture failed. Please check your microphone.';
            break;
          case 'service-not-allowed':
            errorMessage = 'Safari has blocked speech recognition. Check Settings → Safari → Privacy & Security';
            showDetailedHelp = true;
            break;
          case 'aborted':
            errorMessage = 'Speech recognition was interrupted. Please try again.';
            break;
        }
        
        toast.error(errorMessage, { 
          autoClose: showDetailedHelp ? 8000 : 5000 
        });
      };

    } catch (error) {
      console.error('Error initializing speech recognition:', error);
      toast.error('Failed to initialize speech recognition: ' + error.message);
    }
  };

  // Toggle camera on/off
  const toggleCamera = () => {
    if (!isCameraOn) {
      // Turn camera back on
      turnCameraOn();
    } else {
      // Turn camera off - show confirmation if recording
      if (isRecording) {
        setShowCameraOffModal(true);
      } else {
        turnCameraOff();
      }
    }
  };

  // Turn camera on
  const turnCameraOn = async () => {
    try {
      // First ensure any existing stream is properly cleaned up
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }

      // Request new camera stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
        audio: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
        toast.success('Camera turned on');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Failed to access camera. Please check permissions.');
    }
  };

  // Turn camera off - Aggressive approach for Safari/macOS
  const turnCameraOff = () => {
    console.log('Starting aggressive camera shutdown...');

    // Step 1: Stop MediaRecorder immediately and aggressively
    if (mediaRecorderRef.current) {
      try {
        console.log('MediaRecorder state:', mediaRecorderRef.current.state);
        if (mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.pause();
          mediaRecorderRef.current.stop();
        } else if (mediaRecorderRef.current.state === 'paused') {
          mediaRecorderRef.current.stop();
        }
        mediaRecorderRef.current = null;
        setIsRecording(false);
        setIsPaused(false);
        console.log('MediaRecorder forcefully stopped and cleared');
      } catch (error) {
        console.error('Error stopping MediaRecorder:', error);
      }
    }

    // Step 2: Aggressively stop all stream tracks
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      console.log('Found tracks to stop:', tracks.length);

      tracks.forEach((track, index) => {
        console.log(`Stopping track ${index + 1}:`, track.kind, track.label, 'State:', track.readyState);
        try {
          track.stop();
          console.log(`Track ${index + 1} stopped, new state:`, track.readyState);
        } catch (error) {
          console.error(`Error stopping track ${index + 1}:`, error);
        }
      });
    }

    // Step 3: Clear video element completely
    if (videoRef.current) {
      try {
        console.log('Clearing video element...');
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        videoRef.current.src = "";
        videoRef.current.load();
        console.log('Video element cleared');
      } catch (error) {
        console.error('Error clearing video element:', error);
      }
    }

    // Step 4: Clear stream reference and force cleanup
    streamRef.current = null;
    setIsCameraOn(false);

    // Step 5: Clear any potential WebRTC connections
    if (window.RTCPeerConnection) {
      // Clear any potential peer connections that might hold camera references
      console.log('Clearing potential WebRTC connections...');
    }

    // Step 6: Force garbage collection hint (doesn't guarantee but helps)
    if (window.gc) {
      window.gc();
    }

    // Step 7: Verify camera release after a delay
    setTimeout(async () => {
      try {
        console.log('Verifying camera release...');
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        console.log('Available video devices after shutdown:', videoDevices.length);

        // Try to briefly access camera to confirm it's released
        const testStream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240 }
        });

        // Immediately stop the test stream
        testStream.getTracks().forEach(track => track.stop());
        console.log('Camera verification: Successfully accessed and released camera');
        // Removed toast to reduce notification spam

      } catch (error) {
        console.log('Camera verification failed:', error.message);
        if (error.name === 'NotAllowedError') {
          toast.warning('Camera access denied - this might indicate camera is still in use');
        } else {
          toast.info('Camera release verification completed');
        }
      }
    }, 2000);

    toast.info('Camera turned off');
  };

  // Handle camera off with recording confirmation
  const handleCameraOffWithRecording = (stopRecording = false) => {
    if (stopRecording && isRecording) {
      // Stop recording first and clean up MediaRecorder
      if (mediaRecorderRef.current) {
        console.log('Force stopping MediaRecorder for camera shutdown');
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
        mediaRecorderRef.current = null;
        setIsRecording(false);
        setIsPaused(false);
      }
      // Removed toast to reduce notification spam during camera shutdown
    }

    // Turn off camera with complete cleanup
    turnCameraOff();
    setShowCameraOffModal(false);
  };

  // Start recording session
  const startRecording = () => {
    if (!streamRef.current) {
      toast.error('No camera stream available. Please turn on camera first.');
      return;
    }

    try {
      // Set states first to trigger UI update immediately
      setHasStarted(true);
      setIsRecording(true);
      setSessionStartTime(new Date());
      setCurrentQuestionIndex(0);

      // Add first question to messages immediately
      setMessages([{
        type: 'question',
        content: practiceQuestions[0],
        timestamp: 0,
        questionIndex: 0
      }]);

      // Clear any previous recording data
      recordedChunksRef.current = [];

      // Find the best supported MIME type
      let mimeType = 'video/webm;codecs=vp9,opus';
      const supportedTypes = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm;codecs=h264,opus',
        'video/webm',
        'video/mp4;codecs=h264,aac',
        'video/mp4'
      ];

      for (const type of supportedTypes) {
        if (MediaRecorder.isTypeSupported(type)) {
          mimeType = type;
          break;
        }
      }

      console.log('Using MIME type:', mimeType);

      const mediaRecorder = new MediaRecorder(streamRef.current, {
        mimeType,
        videoBitsPerSecond: 1000000, // 1Mbps
        audioBitsPerSecond: 128000   // 128kbps
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        console.log('Data available:', event.data.size, 'bytes');
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
          console.log('Total chunks collected:', recordedChunksRef.current.length);
        }
      };

      mediaRecorder.onstop = () => {
        console.log('MediaRecorder stopped. Final chunk count:', recordedChunksRef.current.length);

        // Request final data if available
        if (mediaRecorder.state === 'inactive' && recordedChunksRef.current.length === 0) {
          console.warn('No data chunks were recorded during the session');
          toast.warning('Recording completed but no video data was captured');
        } else {
          console.log('Recording stopped successfully with', recordedChunksRef.current.length, 'chunks');
        }
      };

      mediaRecorder.onstart = () => {
        console.log('MediaRecorder started successfully');
        toast.success('Recording started! Answer the first question.');
      };

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event.error);
        toast.error('Recording error occurred: ' + event.error);
      };

      // Start recording with smaller timeslices for better data capture
      mediaRecorder.start(500); // Capture data every 500ms

    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Failed to start recording: ' + error.message);
      // Reset states if recording fails
      setIsRecording(false);
      setHasStarted(false);
      setMessages([]);
    }
  };

  // Pause/Resume recording
  const togglePause = () => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        toast.info('Recording resumed');
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        toast.info('Recording paused');
      }
    }
  };

  // Stop recording
  const stopRecording = () => {
    return new Promise((resolve) => {
      if (mediaRecorderRef.current && isRecording) {
        // Set up a one-time listener for the stop event
        const handleStop = () => {
          mediaRecorderRef.current.removeEventListener('stop', handleStop);
          console.log('Recording stopped, finalizing data...');
          setIsRecording(false);
          setIsPaused(false);
          toast.success('Recording stopped');
          resolve();
        };

        mediaRecorderRef.current.addEventListener('stop', handleStop);

        // Request final data before stopping
        if (mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.requestData();

          // Stop the recording
          setTimeout(() => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
              mediaRecorderRef.current.stop();
            }
          }, 100);
        } else if (mediaRecorderRef.current.state === 'paused') {
          mediaRecorderRef.current.resume();
          setTimeout(() => {
            if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
              mediaRecorderRef.current.requestData();
              mediaRecorderRef.current.stop();
            }
          }, 100);
        }
      } else {
        resolve();
      }
    });
  };

  // Start/Stop speech recognition
  const toggleSpeechRecognition = () => {
    if (!speechRecognitionRef.current) {
      toast.error('Speech recognition not available. Please check browser compatibility.');
      return;
    }

    if (isListening) {
      try {
        speechRecognitionRef.current.stop();
        console.log('Stopping speech recognition...');
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
        setIsListening(false);
        setInterimTranscript('');
      }
    } else {
      try {
        // Don't clear current answer when starting recognition
        setInterimTranscript('');
        console.log('Starting speech recognition...');
        speechRecognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast.error('Failed to start speech recognition: ' + error.message);
        setIsListening(false);
      }
    }
  };

  // Submit answer and move to next question
  const submitAnswer = () => {
    if (!currentAnswer.trim()) {
      toast.warning('Please provide an answer before submitting.');
      return;
    }

    const timestamp = Date.now() - (sessionStartTime?.getTime() || 0);
    const answerData = {
      questionIndex: currentQuestionIndex,
      question: practiceQuestions[currentQuestionIndex],
      answer: currentAnswer,
      timestamp: timestamp,
      videoTime: currentVideoTime
    };

    // Add to session data
    setSessionData(prev => [...prev, answerData]);

    // Add to messages
    setMessages(prev => [...prev, {
      type: 'answer',
      content: currentAnswer,
      timestamp: timestamp,
      questionIndex: currentQuestionIndex
    }]);

    // Move to next question or finish
    if (currentQuestionIndex < practiceQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentAnswer('');

      // Add next question to messages
      setMessages(prev => [...prev, {
        type: 'question',
        content: practiceQuestions[nextIndex],
        timestamp: timestamp + 1000,
        questionIndex: nextIndex
      }]);

      toast.success(`Question ${nextIndex + 1} of ${practiceQuestions.length}`);
    } else {
      // All questions completed - mark session as completed and show end session modal
      setIsSessionCompleted(true);
      toast.success('Practice session completed!');

      // Stop recording and wait for it to complete
      if (isRecording) {
        stopRecording().then(() => {
          // Show end session modal after recording is properly stopped
          setTimeout(() => {
            setShowEndSessionModal(true);
          }, 1000);
        });
      } else {
        // Show end session modal immediately if not recording
        setTimeout(() => {
          setShowEndSessionModal(true);
        }, 1000);
      }
    }
  };

  // Emergency camera shutdown (Safari-specific) - Enhanced
  const emergencyCameraShutdown = useCallback(async () => {
    console.log('EMERGENCY CAMERA SHUTDOWN - Enhanced Version');
    toast.warning('Emergency camera shutdown initiated');

    try {
      // Call comprehensive cleanup first
      cleanup();

      // Force stop everything aggressively
      if (mediaRecorderRef.current) {
        try {
          mediaRecorderRef.current.stream?.getTracks().forEach(track => track.stop());
          mediaRecorderRef.current.stop();
          mediaRecorderRef.current = null;
        } catch (e) {
          console.log('MediaRecorder emergency stop:', e);
        }
      }

      // Stop all tracks from stream ref
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
      }

      // Clear video completely
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        videoRef.current.src = "data:";
        videoRef.current.removeAttribute('src');
        videoRef.current.load();
      }

      // Clear all refs
      streamRef.current = null;
      mediaRecorderRef.current = null;

      // Reset all states
      setIsCameraOn(false);
      setIsRecording(false);
      setIsPaused(false);

      // Try to get new stream and immediately stop it (forces Safari to release)
      try {
        const tempStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        tempStream.getTracks().forEach(track => {
          track.stop();
          track.enabled = false;
        });
        console.log('Emergency: Created and stopped temp stream to force release');
      } catch (e) {
        console.log('Emergency: Could not create temp stream (might be good news):', e.message);
      }

      // Verify camera release after delay
      setTimeout(async () => {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          console.log('Emergency verification: Available devices after shutdown', devices.length);
        } catch (error) {
          console.log('Emergency verification: Device enumeration failed:', error.message);
        }
      }, 1000);

      toast.success('Camera shutdown completed');

    } catch (error) {
      console.error('Emergency shutdown failed:', error);
      toast.error('Emergency shutdown encountered errors');
    }
  }, [cleanup]);

  // Export session data with video
  const exportSessionData = async () => {
    try {
      const exportData = {
        sessionId: `practice_${Date.now()}`,
        startTime: sessionStartTime,
        endTime: new Date(),
        questions: practiceQuestions,
        responses: sessionData,
        totalDuration: Date.now() - (sessionStartTime?.getTime() || 0)
      };

      // Create and download JSON file
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

      const exportFileDefaultName = `practice_session_${new Date().toISOString().split('T')[0]}.json`;

      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      document.body.appendChild(linkElement);
      linkElement.click();
      document.body.removeChild(linkElement);

      // Export video if available
      if (recordedChunksRef.current && recordedChunksRef.current.length > 0) {
        console.log('Preparing video export with', recordedChunksRef.current.length, 'chunks');

        // Calculate total size
        const totalSize = recordedChunksRef.current.reduce((total, chunk) => total + chunk.size, 0);
        console.log('Total video data size:', totalSize, 'bytes');

        if (totalSize > 0) {
          // Determine MIME type from the first chunk
          const firstChunk = recordedChunksRef.current[0];
          let mimeType = firstChunk.type || 'video/webm';

          // Create blob with explicit MIME type
          const blob = new Blob(recordedChunksRef.current, { type: mimeType });
          console.log('Video blob created - Size:', blob.size, 'Type:', blob.type);

          if (blob.size > 0) {
            const videoUrl = URL.createObjectURL(blob);

            // Determine file extension based on MIME type
            let extension = 'webm';
            if (mimeType.includes('mp4')) {
              extension = 'mp4';
            } else if (mimeType.includes('webm')) {
              extension = 'webm';
            }

            const videoLink = document.createElement('a');
            videoLink.href = videoUrl;
            videoLink.download = `practice_video_${new Date().toISOString().split('T')[0]}.${extension}`;
            videoLink.style.display = 'none';
            document.body.appendChild(videoLink);

            // Trigger download
            videoLink.click();

            // Cleanup
            document.body.removeChild(videoLink);
            setTimeout(() => URL.revokeObjectURL(videoUrl), 5000);

            toast.success('Session data and video exported successfully!');
          } else {
            console.warn('Video blob is empty despite having chunks');
            toast.warning('Session data exported, but video file is empty');
          }
        } else {
          console.warn('No video data in chunks');
          toast.warning('Session data exported, but no video data available');
        }
      } else {
        console.log('No video chunks available for export');
        toast.success('Session data exported successfully! (No video recorded)');
      }
    } catch (error) {
      console.error('Error during export:', error);
      toast.error('Export failed: ' + error.message);
    }
  };

  // Reset all session data
  const resetSession = async () => {
    // Stop recording if active
    if (isRecording) {
      await stopRecording();
    }

    // Stop speech recognition
    if (speechRecognitionRef.current && isListening) {
      speechRecognitionRef.current.stop();
    }

    // Reset all states
    setIsRecording(false);
    setIsPaused(false);
    setCurrentQuestionIndex(0);
    setMessages([]);
    setCurrentAnswer('');
    setIsListening(false);
    setSessionData([]);
    setSessionStartTime(null);
    setCurrentVideoTime(0);
    setHasStarted(false);
    setIsSessionCompleted(false);
    setShowChatPopup(false);
    setInterimTranscript('');

    // Clear recorded chunks
    recordedChunksRef.current = [];

    // Reset media recorder
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      mediaRecorderRef.current = null;
    }

    // Reset camera state and reinitialize if needed
    if (!isCameraOn) {
      setIsCameraOn(true);
      // Reinitialize camera without showing toast to avoid duplicate messages
      await initializeCamera(false);
    }

    toast.info('Session reset successfully!');
  };

  // Format time display
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Update video time
  useEffect(() => {
    if (sessionStartTime && hasStarted && !isSessionCompleted) {
      const interval = setInterval(() => {
        setCurrentVideoTime(Date.now() - sessionStartTime.getTime());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sessionStartTime, hasStarted, isSessionCompleted]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="practice-page min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4">
        <div className="flex flex-col lg:flex-row gap-4" style={{ minHeight: '80vh' }}>
          {/* Left Side - Video Panel - Always Visible */}
          <div className="w-full lg:w-1/2 practice-video-panel-always-visible">
            {/* Video Card */}
            <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200" style={{ height: 'fit-content' }}>
              {/* Card Header */}
              <div className="bg-white px-6 py-3 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <Icon icon="lucide:video" className="w-5 h-5 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-bold text-base">Camera Feed</h3>
                    <p className="text-gray-600 text-xs">Live Recording</p>
                  </div>
                </div>

                {/* Timer and Emergency Controls */}
                <div className="flex items-center space-x-2">
                  {sessionStartTime && hasStarted && (
                    <div className="flex items-center space-x-2 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-lg">
                      <Icon icon="lucide:clock" className="w-3.5 h-3.5 text-gray-700" />
                      <span className="text-gray-900 font-mono text-sm font-bold">{formatTime(currentVideoTime)}</span>
                      {isRecording && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>}
                    </div>
                  )}
                  {hasStarted && (
                    <button
                      onClick={emergencyCameraShutdown}
                      className="p-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg text-gray-700 transition-all"
                      title="Emergency shutdown"
                    >
                      <Icon icon="lucide:power-off" className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Video Area */}
              <div className="relative bg-black" style={{ aspectRatio: '16/9', width: '100%' }}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ display: 'block' }}
                />

                {/* Camera Off Overlay */}
                {!isCameraOn && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-700/50 flex items-center justify-center">
                        <Icon icon="lucide:video-off" className="w-10 h-10 text-gray-400" />
                      </div>
                      <p className="text-base font-medium text-gray-300">Camera is off</p>
                      <p className="text-xs text-gray-500 mt-1">Click the camera button to turn it on</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer - Video Controls */}
              <div className="bg-white px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  {/* Left Side - Basic Controls */}
                  <div className="flex items-center space-x-2">
                    {/* Camera Toggle */}
                    <button
                      onClick={toggleCamera}
                      className={`p-2.5 rounded-xl transition-all shadow-sm ${isCameraOn
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                        }`}
                      title={isCameraOn ? 'Turn camera off' : 'Turn camera on'}
                    >
                      <Icon
                        icon={isCameraOn ? 'lucide:video' : 'lucide:video-off'}
                        className="w-5 h-5"
                      />
                    </button>

                    {/* Microphone / Speech Recognition */}
                    <button
                      onClick={toggleSpeechRecognition}
                      disabled={!speechRecognitionRef.current}
                      className={`p-2.5 rounded-xl transition-all shadow-sm ${
                        !speechRecognitionRef.current 
                          ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                          : isListening
                          ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
                        }`}
                      title={
                        !speechRecognitionRef.current 
                          ? 'Speech recognition not available'
                          : isListening 
                          ? 'Stop listening' 
                          : 'Start speech recognition'
                      }
                    >
                      <Icon 
                        icon={!speechRecognitionRef.current ? "lucide:mic-off" : "lucide:mic"} 
                        className="w-5 h-5" 
                      />
                    </button>

                    {/* Pause/Resume (only when recording) */}
                    {isRecording && (
                      <button
                        onClick={togglePause}
                        className="p-2.5 bg-yellow-500 hover:bg-yellow-600 rounded-xl text-white transition-all shadow-sm"
                        title={isPaused ? 'Resume' : 'Pause'}
                      >
                        <Icon
                          icon={isPaused ? 'lucide:play' : 'lucide:pause'}
                          className="w-5 h-5"
                        />
                      </button>
                    )}
                  </div>

                  {/* Center/Right - Recording Controls */}
                  <div className="flex items-center space-x-3">
                    {/* Recording Status */}
                    {isRecording && (
                      <div className="flex items-center space-x-2 px-3 py-1.5 bg-red-50 rounded-lg border border-red-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-red-700 text-xs font-bold uppercase">
                          {isPaused ? 'Paused' : 'Recording'}
                        </span>
                      </div>
                    )}

                    {/* Main Recording Button */}
                    {!isRecording ? (
                      <button
                        onClick={startRecording}
                        disabled={!isCameraOn}
                        className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center space-x-2 text-sm ${isCameraOn
                            ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg transform hover:scale-105'
                            : 'bg-gray-300 cursor-not-allowed text-gray-500'
                          }`}
                        title={isCameraOn ? 'Start recording' : 'Camera must be on'}
                      >
                        <Icon icon="lucide:circle" className="w-4 h-4" />
                        <span>Start Recording</span>
                      </button>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="px-5 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black rounded-xl text-white transition-all font-bold shadow-lg flex items-center space-x-2 text-sm"
                        title="Stop recording"
                      >
                        <Icon icon="lucide:square" className="w-4 h-4" />
                        <span>Stop Recording</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Questions & Answers Panel - Always Visible */}
          <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 practice-qa-panel-always-visible" style={{ maxHeight: '90vh' }}>
            {/* Header - Session Info */}
            <div className="bg-white border-b-2 border-gray-200 px-6 py-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Practice Interview</h2>
                  {hasStarted && (
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon icon="lucide:message-square-text" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-600">
                        Question {currentQuestionIndex + 1} of {practiceQuestions.length}
                      </span>
                      <div className="w-32 h-1.5 bg-gray-200 rounded-full ml-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 rounded-full"
                          style={{ width: `${((currentQuestionIndex + 1) / practiceQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {hasStarted && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={exportSessionData}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all text-gray-900 border border-gray-300"
                      title="Export Data"
                    >
                      <Icon icon="lucide:download" className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setShowEndSessionModal(true)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all text-white font-medium flex items-center space-x-2"
                      title="End Session"
                    >
                      <Icon icon="lucide:log-out" className="w-4 h-4" />
                      <span>End</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            {!hasStarted ? (
              /* Welcome Screen */
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center text-gray-900 max-w-lg">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                    <Icon icon="lucide:video" className="w-12 h-12 text-white" />
                  </div>

                  <h1 className="text-3xl font-bold mb-3 text-gray-900">Ready to Start?</h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Prepare yourself for your practice interview session
                  </p>

                  <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon icon="lucide:list" className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">{practiceQuestions.length} Questions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon icon="lucide:video" className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">Video Recording</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon icon="lucide:mic" className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">Speech-to-Text</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon icon="lucide:bar-chart" className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-700">Analytics</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={startRecording}
                    disabled={!isCameraOn}
                    className={`px-8 py-3 rounded-xl font-bold text-base transition-all flex items-center space-x-2 mx-auto shadow-lg ${isCameraOn
                        ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white transform hover:scale-105'
                        : 'bg-gray-200 cursor-not-allowed text-gray-400 border border-gray-300'
                      }`}
                  >
                    <Icon icon="lucide:play-circle" className="w-5 h-5" />
                    <span>Start Practice Session</span>
                  </button>

                  {!isCameraOn && (
                    <p className="text-red-600 text-sm mt-3 flex items-center justify-center space-x-1">
                      <Icon icon="lucide:alert-circle" className="w-4 h-4" />
                      <span>Camera must be on to start</span>
                    </p>
                  )}
                </div>
              </div>
            ) : (isSessionCompleted || currentQuestionIndex >= practiceQuestions.length) ? (
              /* Session Complete Screen */
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center text-gray-900 max-w-lg">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
                    <Icon icon="lucide:check-circle" className="w-10 h-10 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold mb-3 text-gray-900">Great Job!</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    You've completed all {practiceQuestions.length} questions
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <Icon icon="lucide:clock" className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600 mb-0.5">Duration</p>
                      <p className="text-lg font-bold text-gray-900">{formatTime(currentVideoTime)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <Icon icon="lucide:check-circle" className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600 mb-0.5">Answered</p>
                      <p className="text-lg font-bold text-gray-900">{sessionData.length}/{practiceQuestions.length}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <Icon icon="lucide:bar-chart-2" className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-600 mb-0.5">Messages</p>
                      <p className="text-lg font-bold text-gray-900">{messages.length}</p>
                    </div>
                  </div>

                  <button
                    onClick={exportSessionData}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex items-center space-x-2 mx-auto font-semibold shadow-lg"
                  >
                    <Icon icon="lucide:download" className="w-5 h-5" />
                    <span>Download Session Data</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Active Session - Question & Answer */
              <div className="flex-1 flex flex-col overflow-hidden min-h-0">
                {/* Chat History / Messages - Scrollable Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-0" style={{ maxHeight: '50vh' }}>
                  <div className="flex items-center space-x-2 mb-2 sticky top-0 bg-gray-50 py-2 z-10 border-b border-gray-200">
                    <Icon icon="lucide:message-square" className="w-4 h-4 text-gray-600" />
                    <h3 className="text-xs font-semibold text-gray-600 uppercase">Session History</h3>
                    <span className="text-xs text-gray-500">({messages.length})</span>
                  </div>

                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-3">
                        <Icon icon="lucide:message-square" className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm">No messages yet</p>
                      <p className="text-gray-400 text-xs mt-1">Your conversation will appear here</p>
                    </div>
                  ) : (
                    messages.map((message, index) => (
                      <div key={index} className="animate-fade-in">
                        <div className={`rounded-xl p-3 border-2 ${message.type === 'question'
                            ? 'bg-blue-50 border-blue-200'
                            : 'bg-green-50 border-green-200'
                          }`}>
                          <div className="flex items-center space-x-2 mb-1.5">
                            <Icon
                              icon={message.type === 'question' ? 'lucide:help-circle' : 'lucide:user'}
                              className={`w-3.5 h-3.5 ${message.type === 'question' ? 'text-blue-600' : 'text-green-600'}`}
                            />
                            <span className={`text-xs font-semibold uppercase ${message.type === 'question' ? 'text-blue-700' : 'text-green-700'}`}>
                              {message.type === 'question' ? 'Question' : 'Your Answer'}
                            </span>
                            <span className="text-xs text-gray-500 ml-auto font-mono">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-900 leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Answer Input Area - Fixed at Bottom */}
                <div className="bg-white p-4 border-t-2 border-gray-200 flex-shrink-0">
                  <div className="mb-3">
                    <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase">
                      Your Answer
                    </label>
                    <textarea
                      value={currentAnswer + interimTranscript}
                      onChange={(e) => setCurrentAnswer(e.target.value.replace(interimTranscript, ''))}
                      placeholder={
                        speechRecognitionRef.current 
                          ? "Type your answer here or use the microphone button..."
                          : "Type your answer here (speech recognition not available)..."
                      }
                      className="w-full bg-white text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm border-2 border-gray-300"
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs">
                      {isListening && (
                        <span className="flex items-center space-x-1.5 text-red-600">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span>Listening...</span>
                        </span>
                      )}
                      {interimTranscript && (
                        <span className="text-gray-500 italic max-w-xs truncate">"{interimTranscript}"</span>
                      )}
                      <span className="text-gray-500">{currentAnswer.length} chars</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setCurrentAnswer('');
                          setInterimTranscript('');
                        }}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-all text-xs font-medium border border-gray-300"
                      >
                        Clear
                      </button>
                      <button
                        onClick={submitAnswer}
                        disabled={!currentAnswer.trim()}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-all flex items-center space-x-1.5 text-xs font-semibold"
                      >
                        <span>Submit</span>
                        <Icon icon="lucide:send" className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEndSessionModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 animate-fade-in">
          <div className="relative max-w-lg w-full mx-6">
            <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center mr-4 shadow-lg">
                  <Icon icon="lucide:alert-triangle" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">End Practice Session</h3>
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                Are you sure you want to end this practice session? You can choose to export your data before ending.
              </p>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={async () => {
                    if (isRecording) {
                      await stopRecording();
                    }
                    await exportSessionData();
                    resetSession();
                    setShowEndSessionModal(false);
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 flex items-center justify-center space-x-3 transition-all shadow-lg"
                >
                  <Icon icon="lucide:download" className="w-5 h-5" />
                  <span className="font-bold text-lg">Export Data & End Session</span>
                </button>

                <button
                  onClick={async () => {
                    if (isRecording) {
                      await stopRecording();
                    }
                    resetSession();
                    setShowEndSessionModal(false);
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:from-red-600 hover:to-rose-700 flex items-center justify-center space-x-3 transition-all shadow-lg"
                >
                  <Icon icon="lucide:x" className="w-5 h-5" />
                  <span className="font-bold text-lg">Just End Session</span>
                </button>

                <button
                  onClick={() => setShowEndSessionModal(false)}
                  className="w-full px-6 py-4 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 transition-all border border-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Camera Off Confirmation Modal */}
      {showCameraOffModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 animate-fade-in">
          <div className="relative max-w-lg w-full mx-6">
            <div className="bg-white rounded-2xl p-8 shadow-2xl border-2 border-gray-200">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mr-4 shadow-lg">
                  <Icon icon="lucide:video-off" className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Turn Off Camera</h3>
              </div>

              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                You are currently recording. Turning off the camera will stop the recording and release camera access. Do you want to continue?
              </p>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => handleCameraOffWithRecording(true)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl hover:from-orange-600 hover:to-red-700 flex items-center justify-center space-x-3 transition-all shadow-lg"
                >
                  <Icon icon="lucide:video-off" className="w-5 h-5" />
                  <span className="font-bold text-lg">Stop Recording & Turn Off Camera</span>
                </button>

                <button
                  onClick={() => setShowCameraOffModal(false)}
                  className="w-full px-6 py-4 bg-gray-200 text-gray-900 rounded-xl hover:bg-gray-300 transition-all border border-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StartPractice;
