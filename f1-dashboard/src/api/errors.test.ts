/**
 * Tests for Error Classification
 * Requirements: 17.1, 17.2
 */

import { describe, it, expect } from 'vitest';
import {
  classifyError,
  NetworkError,
  APIError,
  NetworkTimeoutError,
} from './errors';

describe('Error Classification', () => {
  describe('NetworkTimeoutError', () => {
    it('should classify ECONNABORTED as NetworkTimeoutError', () => {
      const error = {
        isAxiosError: true,
        code: 'ECONNABORTED',
        message: 'timeout of 10000ms exceeded',
      };

      const result = classifyError(error);
      
      expect(result).toBeInstanceOf(NetworkTimeoutError);
      expect(result.message).toBe('Request timed out. Please try again.');
    });

    it('should classify ETIMEDOUT as NetworkTimeoutError', () => {
      const error = {
        isAxiosError: true,
        code: 'ETIMEDOUT',
        message: 'Connection timed out',
      };

      const result = classifyError(error);
      
      expect(result).toBeInstanceOf(NetworkTimeoutError);
      expect(result.message).toBe('Request timed out. Please try again.');
    });
  });

  describe('NetworkError', () => {
    it('should classify ERR_NETWORK as NetworkError', () => {
      const error = {
        isAxiosError: true,
        code: 'ERR_NETWORK',
        message: 'Network Error',
      };

      const result = classifyError(error);
      
      expect(result).toBeInstanceOf(NetworkError);
      expect(result.message).toBe('Network connection failed. Please check your internet connection.');
    });

    it('should classify ENOTFOUND as NetworkError', () => {
      const error = {
        isAxiosError: true,
        code: 'ENOTFOUND',
        message: 'getaddrinfo ENOTFOUND api.example.com',
      };

      const result = classifyError(error);
      
      expect(result).toBeInstanceOf(NetworkError);
      expect(result.message).toBe('Network connection failed. Please check your internet connection.');
    });

    it('should classify ECONNREFUSED as NetworkError', () => {
      const error = {
        isAxiosError: true,
        code: 'ECONNREFUSED',
        message: 'connect ECONNREFUSED',
      };

      const result = classifyError(error);
      
      expect(result).toBeInstanceOf(NetworkError);
    });

    it('should include original error in NetworkError', () => {
      const axiosError = {
        isAxiosError: true,
        code: 'ERR_NETWORK',
        message: 'Network Error',
        name: 'Error',
      };

      const result = classifyError(axiosError) as NetworkError;
      
      expect(result).toBeInstanceOf(NetworkError);
      expect(result.originalError).toBeDefined();
    });
  });

  describe('APIError', () => {
    it('should classify 500 status as APIError with server error message', () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 500,
          data: { error: 'Internal Server Error' },
        },
        message: 'Request failed with status code 500',
      };

      const result = classifyError(error);
      
      expect(result).toBeInstanceOf(APIError);
      expect(result.message).toBe('Server error. Please try again later.');
      expect((result as APIError).statusCode).toBe(500);
    });

    it('should classify 404 status as APIError', () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 404,
          data: { message: 'Not Found' },
        },
        message: 'Request failed with status code 404',
      };

      const result = classifyError(error);
      
      expect(result).toBeInstanceOf(APIError);
      expect(result.message).toBe('Request failed. Please check your parameters.');
      expect((result as APIError).statusCode).toBe(404);
    });

    it('should classify 400 status as APIError', () => {
      const error = {
        isAxiosError: true,
        response: {
          status: 400,
          data: { message: 'Bad Request' },
        },
        message: 'Request failed with status code 400',
      };

      const result = classifyError(error);
      
      expect(result).toBeInstanceOf(APIError);
      expect((result as APIError).statusCode).toBe(400);
    });

    it('should include response data in APIError', () => {
      const responseData = { error: 'Invalid parameters', details: ['Missing field'] };
      const error = {
        isAxiosError: true,
        response: {
          status: 400,
          data: responseData,
        },
        message: 'Request failed',
      };

      const result = classifyError(error) as APIError;
      
      expect(result).toBeInstanceOf(APIError);
      expect(result.responseData).toEqual(responseData);
    });
  });

  describe('Generic Error Handling', () => {
    it('should return NetworkError as-is if already classified', () => {
      const error = new NetworkError('Already classified');
      const result = classifyError(error);
      
      expect(result).toBe(error);
      expect(result).toBeInstanceOf(NetworkError);
    });

    it('should return APIError as-is if already classified', () => {
      const error = new APIError('Already classified', 500);
      const result = classifyError(error);
      
      expect(result).toBe(error);
      expect(result).toBeInstanceOf(APIError);
    });

    it('should return NetworkTimeoutError as-is if already classified', () => {
      const error = new NetworkTimeoutError('Already classified');
      const result = classifyError(error);
      
      expect(result).toBe(error);
      expect(result).toBeInstanceOf(NetworkTimeoutError);
    });

    it('should return Error as-is if it is a generic Error instance', () => {
      const error = new Error('Generic error');
      const result = classifyError(error);
      
      expect(result).toBe(error);
    });

    it('should wrap unknown errors in generic Error', () => {
      const error = 'String error';
      const result = classifyError(error);
      
      expect(result).toBeInstanceOf(Error);
      expect(result.message).toBe('An unknown error occurred');
    });

    it('should handle axios errors without response as NetworkError', () => {
      const error = {
        isAxiosError: true,
        message: 'Something went wrong',
      };

      const result = classifyError(error);
      
      expect(result).toBeInstanceOf(NetworkError);
      expect(result.message).toBe('Something went wrong');
    });
  });

  describe('Error Properties', () => {
    it('NetworkError should have correct name property', () => {
      const error = new NetworkError('Test');
      expect(error.name).toBe('NetworkError');
    });

    it('APIError should have correct name property', () => {
      const error = new APIError('Test', 500);
      expect(error.name).toBe('APIError');
    });

    it('NetworkTimeoutError should have correct name property', () => {
      const error = new NetworkTimeoutError('Test');
      expect(error.name).toBe('NetworkTimeoutError');
    });

    it('should maintain instanceof check after throw/catch', () => {
      try {
        throw new NetworkError('Test error');
      } catch (error) {
        expect(error).toBeInstanceOf(NetworkError);
        expect(error).toBeInstanceOf(Error);
      }
    });
  });
});
