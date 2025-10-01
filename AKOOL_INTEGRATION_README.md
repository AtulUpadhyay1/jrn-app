# Akool AI Service Integration (Backend API Version)

This integration provides a complete solution for using Akool's AI avatar service through your backend API. The service is optimized for performance with caching, session management, and error handling.

## Features

- ✅ **Backend Integration**: Uses your backend API endpoints instead of direct Akool calls
- ✅ **Token Management**: Automatic token generation and renewal via backend
- ✅ **Caching**: Smart caching for avatars and sessions to minimize API calls
- ✅ **Session Management**: Automatic session creation and cleanup
- ✅ **Error Handling**: Graceful fallbacks when service is unavailable
- ✅ **Progress Tracking**: Real-time generation progress updates
- ✅ **Resource Cleanup**: Automatic cleanup to prevent memory leaks

## Backend API Endpoints Required

Your backend should implement these endpoints:

1. **POST** `/akool/generate-token` - Generate access token
2. **GET** `/akool/talking-avatars` - Get available avatars
3. **POST** `/akool/create-session` - Create avatar session
   ```json
   { "avatar_id": "string" }
   ```
4. **POST** `/akool/close-session` - Close avatar session
   ```json
   { "id": "string" }
   ```

## Optional Endpoints (for full avatar generation)

If you want to handle avatar generation through your backend:

5. **POST** `/akool/generate-avatar` - Generate talking avatar
   ```json
   { "text": "string", "avatar_id": "string", "voice_id": "string" }
   ```
6. **GET** `/akool/avatar-status/:taskId` - Get generation status

## Files Structure

```
src/
├── services/
│   └── akoolService.js          # Main service class
├── hooks/
│   └── useAkool.js             # React hook for state management
└── pages/
    └── interview/
        └── index.jsx           # Updated interview component
```

## Usage

### 1. Basic Service Usage

```javascript
import { akoolService } from '../services/akoolService';

// Initialize service (no credentials needed - backend handles them)
akoolService.initialize();

// Generate avatar (if backend supports it)
const videoUrl = await akoolService.generateAndWaitForAvatar(
  "Hello, welcome to the interview!",
  "avatar_1001"
);
```

### 2. Using the React Hook

```javascript
import { useAkool } from '../hooks/useAkool';

const MyComponent = () => {
  const {
    isInitialized,
    availableAvatars,
    generateAvatar,
    isGenerating,
    currentVideoUrl
  } = useAkool(); // No parameters needed

  const handleGenerateAvatar = async () => {
    await generateAvatar("Hello World!", "avatar_1001");
  };

  return (
    <div>
      {currentVideoUrl && (
        <video src={currentVideoUrl} autoPlay />
      )}
      <button onClick={handleGenerateAvatar}>
        Generate Avatar
      </button>
    </div>
  );
};
```

## Configuration

### Backend Setup Required

Your backend needs to handle the Akool API credentials and implement the required endpoints. The frontend no longer needs to manage credentials directly.

### Response Format

Your backend endpoints should return data in this format:

```javascript
// /akool/generate-token response
{
  "token": "access_token_string",
  "expires_in": 3600
}

// /akool/talking-avatars response
[
  { "id": "avatar_1001", "name": "Professional Avatar" },
  { "id": "avatar_1002", "name": "Friendly Avatar" }
]

// /akool/create-session response
{
  "id": "session_id_string",
  "avatar_id": "avatar_1001"
}

// /akool/close-session response
{
  "success": true
}
```

### Caching Strategy

- **Token Cache**: Stored in localStorage with expiry
- **Avatar Cache**: In-memory cache for 5 minutes
- **Session Cache**: In-memory cache for 30 minutes

## Error Handling

The service includes comprehensive error handling:

- **Network Failures**: Automatic retries with exponential backoff
- **API Errors**: Detailed error messages and fallback behavior
- **Token Expiry**: Automatic token renewal
- **Generation Timeout**: Configurable timeout with cleanup

## Performance Optimizations

1. **Lazy Loading**: Avatars loaded only when needed
2. **Request Deduplication**: Prevents duplicate API calls
3. **Background Cleanup**: Automatic resource cleanup
4. **Memory Management**: Smart cache eviction

## Example Integration

The interview page demonstrates full integration:

1. **Credential Setup**: Modal for entering API credentials
2. **Avatar Selection**: Dropdown to choose from available avatars
3. **Real-time Generation**: Progress tracking during avatar creation
4. **Session Management**: Automatic session creation/cleanup
5. **Fallback Handling**: Graceful degradation when service unavailable

## Best Practices

1. **Always Initialize**: Check `isInitialized` before using
2. **Handle Errors**: Implement fallbacks for API failures
3. **Clean Up**: Call cleanup methods on component unmount
4. **Cache Wisely**: Use appropriate cache durations
5. **Monitor Usage**: Track API usage to avoid limits

## Troubleshooting

### Common Issues

1. **Authentication Fails**: Check Client ID and Secret
2. **Generation Timeout**: Increase timeout or check network
3. **No Avatars Available**: Verify API access and quota
4. **Session Errors**: Ensure proper session lifecycle

### Debug Information

Use the service's debug methods:

```javascript
console.log(akoolService.getCacheInfo());
console.log(useAkool.getServiceStatus());
```

## Future Enhancements

- [ ] WebSocket support for real-time updates
- [ ] Background avatar pre-generation
- [ ] Advanced caching strategies
- [ ] Metrics and analytics
- [ ] A/B testing for different avatars
