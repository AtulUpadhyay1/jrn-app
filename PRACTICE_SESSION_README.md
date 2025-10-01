# Practice Session Feature

## Overview
The Practice Session feature provides an interactive video-based interview practice environment with real-time speec### Latest Updates

### Version 2.2 Features
- ✅ **True Camera Control**: Camera on/off completely releases/accesses camera hardware
- ✅ **Recording Protection**: Confirmation dialog when turning off camera during recording
- ✅ **Smart Recording**: Recording disabled when camera is off (requires camera access)
- ✅ **Complete Privacy**: Camera off truly stops camera access, not just video display
- ✅ **Visual Feedback**: Clear indication of camera state and recording availability

### Version 2.1 Features
- ✅ **Camera On/Off Toggle**: Turn camera on/off during session while keeping audio recording
- ✅ **Improved Video Export**: Enhanced video recording with proper format support and debugging
- ✅ **Auto End Session**: Shows end session modal automatically after completing all questions
- ✅ **Visual Camera State**: Clear overlay when camera is turned off
- ✅ **Enhanced Recording**: Better MediaRecorder configuration with format fallbacks

### Version 2.0 Features
- ✅ **Video Export**: Automatic video file export alongside JSON data
- ✅ **Fixed Layout**: Video panel maintains consistent size regardless of chat length
- ✅ **Scrollable Chat**: Chat messages area scrolls smoothly with auto-scroll to latest
- ✅ **End Session Modal**: User-friendly session termination with export options
- ✅ **Session Reset**: Complete state reset functionality for new sessions
- ✅ **Enhanced UI**: Better visual feedback and modal animationstion, timestamp tracking, and session data export capabilities.

## Features

### 🎥 Video Recording
- **Webcam Integration**: Automatically accesses user's camera and microphone
- **True Camera Control**: Complete camera access release when turned off (not just display)
- **Recording Protection**: Confirmation dialog prevents accidental recording interruption
- **Smart Recording**: Recording only available when camera is active
- **Recording Controls**: Start, pause, resume, and stop recording
- **Real-time Display**: Live video feed with time tracking
- **High Quality**: Records in 1280x720 resolution with audio
- **Format Support**: Automatic fallback to supported video formats (VP9, VP8, WebM)

### 💬 Interactive Chat Interface
- **Question Progression**: 10 pre-defined interview questions presented one by one
- **Answer Input**: Text area for typing answers
- **Speech-to-Text**: Real-time voice recognition to populate answers
- **Message History**: Complete conversation log with timestamps

### 🎤 Speech Recognition
- **Browser Support**: Works with Chrome, Edge, and Safari
- **Real-time Conversion**: Converts speech to text as you speak
- **Error Handling**: Provides feedback for different error conditions
- **Visual Feedback**: Animated microphone button when listening

### ⏱️ Timestamp Tracking
- **Video Timing**: Tracks exact time when each answer is submitted
- **Analysis Ready**: Correlates answers with video timestamps
- **Session Duration**: Shows total practice session time

### 📊 Data Export
- **JSON Format**: Exports session data in structured JSON format
- **Video Export**: Automatically exports recorded video file (.webm format)
- **Complete Data**: Includes questions, answers, timestamps, and session info
- **Analysis Ready**: Data formatted for post-session analysis

## How to Use

### 1. Start Practice Session
1. Navigate to the Practice page
2. Click "Start Session" button
3. Allow camera and microphone permissions when prompted

### 2. Record Your Session
1. Click the red record button to start recording
2. The first question will appear automatically
3. Answer the question by typing or using speech recognition

### 3. Answer Questions
- **Type Answer**: Use the text area to type your response
- **Voice Input**: Click the microphone button and speak your answer
- **Submit**: Click "Submit Answer" to move to the next question

### 4. Complete Session
1. Continue through all 10 questions
2. Session automatically completes after the last question
3. End session modal appears automatically with export options
4. View session summary with statistics

### 5. End Session and Export Data
1. Click "End Session" button in the header
2. Choose from three options:
   - **Export Data & End Session**: Downloads both JSON data and video file, then resets
   - **Just End Session**: Ends session without exporting (data is lost)
   - **Cancel**: Returns to the session
3. Alternatively, use "Export Data" button to export without ending session

## Technical Requirements

### Browser Support
- **Chrome**: Full support (recommended)
- **Edge**: Full support
- **Safari**: Full support
- **Firefox**: Limited (no speech recognition)

### Permissions Required
- **Camera Access**: Required for video recording
- **Microphone Access**: Required for audio recording and speech recognition

### Hardware Requirements
- **Webcam**: Any built-in or external camera
- **Microphone**: Any built-in or external microphone
- **Storage**: Minimal local storage for session data

## File Structure

```
src/pages/practice/
├── start_practice.jsx          # Main practice session component
├── index.jsx                   # Practice page with session launcher
└── ../../assets/css/
    └── practice.css            # Custom styles for practice session
```

## Data Export Format

The exported JSON file contains:

```json
{
  "sessionId": "practice_1234567890",
  "startTime": "2025-01-01T10:00:00.000Z",
  "endTime": "2025-01-01T10:30:00.000Z",
  "questions": ["Question 1", "Question 2", ...],
  "responses": [
    {
      "questionIndex": 0,
      "question": "Tell me about yourself...",
      "answer": "I am a software developer...",
      "timestamp": 15000,
      "videoTime": 15000
    }
  ],
  "totalDuration": 1800000
}
```

## Best Practices

### For Users
1. **Environment**: Use in a quiet environment for best speech recognition
2. **Lighting**: Ensure good lighting for clear video recording
3. **Preparation**: Review questions beforehand if needed
4. **Browser**: Use Chrome or Edge for best experience

### For Developers
1. **Error Handling**: Always handle camera/microphone permission errors
2. **Browser Support**: Check for speech recognition API availability
3. **Performance**: Monitor memory usage during long recording sessions
4. **User Experience**: Provide clear feedback for all user actions

## Troubleshooting

### Common Issues

**Camera not working**
- Check browser permissions
- Ensure camera is not being used by another application
- Try refreshing the page

**Speech recognition not working**
- Verify microphone permissions
- Check if using supported browser
- Ensure microphone is not muted

**Export not working**
- Check browser's download settings
- Ensure sufficient storage space
- Try using a different browser

**Video not exporting**
- Ensure recording was started before answering questions
- Check browser console for MediaRecorder errors
- Verify camera permissions are granted
- Try recording a shorter session first

### Error Messages

- **"Failed to access camera"**: Grant camera permissions in browser settings
- **"Speech recognition not supported"**: Use Chrome, Edge, or Safari
- **"Microphone access denied"**: Allow microphone access in browser permissions
- **"Network error occurred"**: Check internet connection for speech recognition

## Latest Updates

### Version 2.0 Features
- ✅ **Video Export**: Automatic video file export alongside JSON data
- ✅ **Fixed Layout**: Video panel maintains consistent size regardless of chat length
- ✅ **Scrollable Chat**: Chat messages area scrolls smoothly with auto-scroll to latest
- ✅ **End Session Modal**: User-friendly session termination with export options
- ✅ **Session Reset**: Complete state reset functionality for new sessions
- ✅ **Enhanced UI**: Better visual feedback and modal animations

## Future Enhancements

- [ ] Video quality selection
- [ ] Custom question sets
- [ ] AI-powered feedback
- [ ] Progress tracking across sessions
- [ ] Integration with external video platforms
- [ ] Mobile app support
- [ ] Multi-language support
- [ ] Real-time coaching suggestions
- [ ] Video compression options
- [ ] Cloud storage integration

## Support

For technical support or feature requests, please refer to the project documentation or contact the development team.
