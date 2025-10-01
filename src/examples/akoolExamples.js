/**
 * Example usage of AkoolService
 * This file demonstrates various ways to use the Akool AI service
 */

import { akoolService } from '../services/akoolService';

// Example 1: Basic service usage
export async function basicUsageExample() {
  try {
    // Initialize service
    akoolService.initialize('your-client-id', 'your-client-secret');
    
    // Check if token is valid
    const hasValidToken = await akoolService.ensureValidToken();
    if (!hasValidToken) {
      console.error('Failed to authenticate');
      return;
    }
    
    // Get available avatars
    const avatars = await akoolService.getTalkingAvatars();
    console.log('Available avatars:', avatars);
    
    // Create session
    const session = await akoolService.createSession('avatar_1001');
    console.log('Session created:', session);
    
    // Generate avatar video
    const videoUrl = await akoolService.generateAndWaitForAvatar(
      'Hello! Welcome to the interview. Please introduce yourself.',
      'avatar_1001'
    );
    
    console.log('Avatar video generated:', videoUrl);
    
    // Close session when done
    await akoolService.closeSession(session.id);
    
  } catch (error) {
    console.error('Error in basic usage:', error);
  }
}

// Example 2: Advanced usage with progress tracking
export async function advancedUsageExample() {
  try {
    akoolService.initialize('your-client-id', 'your-client-secret');
    
    // Generate avatar with progress tracking
    const generation = await akoolService.generateTalkingAvatar(
      'This is a test message for avatar generation.',
      'avatar_1001'
    );
    
    // Poll for completion with progress callback
    const videoUrl = await akoolService.pollAvatarCompletion(
      generation.taskId,
      (progress) => {
        console.log(`Generation progress: ${progress.status} - ${progress.progress || 0}%`);
      },
      30 // max 30 attempts (5 minutes)
    );
    
    console.log('Final video URL:', videoUrl);
    
  } catch (error) {
    console.error('Error in advanced usage:', error);
  }
}

// Example 3: Error handling and fallbacks
export async function errorHandlingExample() {
  try {
    // Initialize with potentially invalid credentials
    akoolService.initialize('invalid-id', 'invalid-secret');
    
    try {
      await akoolService.generateAndWaitForAvatar('Test message', 'avatar_1001');
    } catch (error) {
      console.log('Primary generation failed, using fallback...');
      
      // Fallback: show static animation or message
      showStaticAvatar('Test message');
    }
    
  } catch (error) {
    console.error('Service initialization failed:', error);
  }
}

// Example 4: Batch operations
export async function batchOperationsExample() {
  try {
    akoolService.initialize('your-client-id', 'your-client-secret');
    
    const messages = [
      'Welcome to the interview.',
      'Please tell us about yourself.',
      'What are your strengths?',
      'Thank you for your time.'
    ];
    
    const avatarId = 'avatar_1001';
    const videoUrls = [];
    
    for (const message of messages) {
      try {
        const videoUrl = await akoolService.generateAndWaitForAvatar(message, avatarId);
        videoUrls.push({ message, videoUrl });
        console.log(`Generated video for: "${message}"`);
      } catch (error) {
        console.warn(`Failed to generate video for: "${message}"`, error);
        videoUrls.push({ message, videoUrl: null, error: error.message });
      }
    }
    
    return videoUrls;
    
  } catch (error) {
    console.error('Error in batch operations:', error);
  }
}

// Example 5: Service monitoring and debugging
export function serviceMonitoringExample() {
  // Get cache information
  const cacheInfo = akoolService.getCacheInfo();
  console.log('Service Cache Info:', cacheInfo);
  
  // Check service health
  const isHealthy = akoolService.isTokenValid();
  console.log('Service Health:', isHealthy ? 'Healthy' : 'Needs Authentication');
  
  // Monitor service events (if you extend the service with event emitters)
  // This is a placeholder for future enhancements
  console.log('Service monitoring active...');
}

// Utility function for fallback behavior
function showStaticAvatar(message) {
  console.log(`Showing static avatar with message: "${message}"`);
  // This would trigger your fallback UI
  return {
    type: 'static',
    message,
    duration: Math.max(3000, message.length * 50)
  };
}

// Export all examples
export const akoolExamples = {
  basicUsage: basicUsageExample,
  advancedUsage: advancedUsageExample,
  errorHandling: errorHandlingExample,
  batchOperations: batchOperationsExample,
  serviceMonitoring: serviceMonitoringExample
};

// Usage demonstration
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  // Only run in development
  console.log('Akool Service Examples Available:');
  console.log('Run akoolExamples.basicUsage() to test basic functionality');
  console.log('Run akoolExamples.advancedUsage() to test with progress tracking');
  console.log('Run akoolExamples.errorHandling() to test error handling');
  console.log('Run akoolExamples.batchOperations() to test batch processing');
  console.log('Run akoolExamples.serviceMonitoring() to monitor service status');
}
