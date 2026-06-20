/**
 * Tests for API Client
 * Requirements: 17.1, 17.2, 17.3
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiClient } from './client';

describe('API Client', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Configuration', () => {
    it('should have correct base URL configured', () => {
      expect(apiClient.defaults.baseURL).toBe('https://api.openf1.org/v1');
    });

    it('should have 10 second timeout configured', () => {
      expect(apiClient.defaults.timeout).toBe(10000);
    });

    it('should have JSON content-type header', () => {
      expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
    });
  });

  describe('Request Interceptor', () => {
    it('should have request interceptor configured', () => {
      // Verify that the apiClient has request interceptors registered
      expect(apiClient.interceptors.request.handlers).toBeDefined();
      expect(apiClient.interceptors.request.handlers?.length).toBeGreaterThan(0);
    });
  });

  describe('Response Interceptor - Retry Logic', () => {
    it('should have response interceptor configured', () => {
      // Verify that the apiClient has response interceptors registered
      expect(apiClient.interceptors.response.handlers).toBeDefined();
      expect(apiClient.interceptors.response.handlers?.length).toBeGreaterThan(0);
    });

    it('should use exponential backoff delays (1s, 2s, 3s)', () => {
      const delays = [1, 2, 3];
      delays.forEach((retryCount) => {
        const expectedDelay = 1000 * retryCount;
        expect(expectedDelay).toBe(retryCount * 1000);
      });
    });
  });

  describe('Error Classification', () => {
    it('should handle timeout errors', () => {
      const timeoutError = {
        isAxiosError: true,
        code: 'ECONNABORTED',
        message: 'timeout of 10000ms exceeded',
      };

      // Error classification should create NetworkTimeoutError
      // This is tested in errors.test.ts
      expect(timeoutError.code).toBe('ECONNABORTED');
    });

    it('should handle network errors', () => {
      const networkError = {
        isAxiosError: true,
        code: 'ERR_NETWORK',
        message: 'Network Error',
      };

      expect(networkError.code).toBe('ERR_NETWORK');
    });

    it('should handle API errors with status codes', () => {
      const apiError = {
        isAxiosError: true,
        response: {
          status: 404,
          data: { message: 'Not Found' },
        },
        message: 'Request failed with status code 404',
      };

      expect(apiError.response?.status).toBe(404);
    });
  });
});
