/**
 * Simple test suite for AkoolService
 * Run this to verify the service integration
 */

import { akoolService } from '../services/akoolService';

class AkoolServiceTests {
  constructor() {
    this.results = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${type.toUpperCase()}] ${message}`;
    console.log(logMessage);
    this.results.push({ timestamp, type, message });
  }

  async test(name, testFunction) {
    this.log(`Starting test: ${name}`);
    try {
      await testFunction();
      this.log(`✅ Test passed: ${name}`, 'success');
    } catch (error) {
      this.log(`❌ Test failed: ${name} - ${error.message}`, 'error');
    }
  }

  async runAllTests(clientId, clientSecret) {
    this.log('🚀 Starting Akool Service Tests');
    
    if (!clientId || !clientSecret) {
      this.log('⚠️ No credentials provided, running limited tests', 'warn');
    }

    // Test 1: Service initialization
    await this.test('Service Initialization', async () => {
      akoolService.initialize(clientId || 'test-id', clientSecret || 'test-secret');
      const cacheInfo = akoolService.getCacheInfo();
      if (!cacheInfo) throw new Error('Cache info not available');
    });

    // Test 2: Token validation (without network call)
    await this.test('Token Validation Logic', async () => {
      // Test with no token
      if (akoolService.isTokenValid()) {
        throw new Error('Should return false for invalid token');
      }
    });

    if (clientId && clientSecret) {
      // Test 3: Token generation
      await this.test('Token Generation', async () => {
        const success = await akoolService.generateToken();
        if (!success) throw new Error('Token generation failed');
      });

      // Test 4: Avatar list retrieval
      await this.test('Get Talking Avatars', async () => {
        const avatars = await akoolService.getTalkingAvatars();
        if (!Array.isArray(avatars)) {
          throw new Error('Avatars should be an array');
        }
      });

      // Test 5: Session creation
      await this.test('Create Session', async () => {
        const session = await akoolService.createSession('avatar_1001');
        if (!session || !session.id) {
          throw new Error('Session creation failed');
        }
        
        // Clean up
        await akoolService.closeSession(session.id);
      });

      // Test 6: Avatar generation (without waiting for completion)
      await this.test('Avatar Generation Request', async () => {
        const result = await akoolService.generateTalkingAvatar(
          'This is a test message',
          'avatar_1001'
        );
        if (!result || !result.taskId) {
          throw new Error('Avatar generation request failed');
        }
      });
    }

    // Test 7: Cache functionality
    await this.test('Cache Operations', async () => {
      const cacheInfo = akoolService.getCacheInfo();
      if (typeof cacheInfo.avatarCacheSize !== 'number') {
        throw new Error('Cache size should be a number');
      }
    });

    // Test 8: Cleanup
    await this.test('Service Cleanup', async () => {
      akoolService.cleanup();
      const cacheInfo = akoolService.getCacheInfo();
      if (cacheInfo.avatarCacheSize !== 0 || cacheInfo.sessionCacheSize !== 0) {
        throw new Error('Cleanup should clear caches');
      }
    });

    this.generateReport();
  }

  generateReport() {
    const passed = this.results.filter(r => r.type === 'success').length;
    const failed = this.results.filter(r => r.type === 'error').length;
    const warnings = this.results.filter(r => r.type === 'warn').length;

    this.log('📊 Test Summary:');
    this.log(`   ✅ Passed: ${passed}`);
    this.log(`   ❌ Failed: ${failed}`);
    this.log(`   ⚠️ Warnings: ${warnings}`);
    this.log(`   📊 Total: ${passed + failed} tests`);

    if (failed === 0) {
      this.log('🎉 All tests passed!', 'success');
    } else {
      this.log(`⚠️ ${failed} tests failed`, 'warn');
    }

    return {
      passed,
      failed,
      warnings,
      results: this.results
    };
  }
}

// Export test runner
export function runAkoolTests(clientId, clientSecret) {
  const tests = new AkoolServiceTests();
  return tests.runAllTests(clientId, clientSecret);
}

// Quick test function for development
export async function quickTest() {
  console.log('🔬 Running quick Akool service test...');
  
  try {
    // Test basic initialization
    akoolService.initialize('test-client-id', 'test-client-secret');
    
    // Test cache info
    const cacheInfo = akoolService.getCacheInfo();
    console.log('Cache info:', cacheInfo);
    
    // Test token validation (should be false initially)
    const isValid = akoolService.isTokenValid();
    console.log('Token valid:', isValid);
    
    console.log('✅ Quick test completed successfully');
    
  } catch (error) {
    console.error('❌ Quick test failed:', error);
  }
}

// Auto-run quick test in development
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  // Add to window for manual testing
  window.runAkoolTests = runAkoolTests;
  window.quickAkoolTest = quickTest;
  
  console.log('🧪 Akool test functions available:');
  console.log('- window.quickAkoolTest() - Run quick tests');
  console.log('- window.runAkoolTests(clientId, clientSecret) - Run full test suite');
}
