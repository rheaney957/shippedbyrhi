/**
 * API Client for OpenF1 API
 * Requirements: 17.1, 17.2, 17.3
 */

import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { classifyError } from './errors';

const BASE_URL = 'https://api.openf1.org/v1';
const REQUEST_TIMEOUT = 10000; // 10 seconds

/**
 * Extended request config with retry tracking
 */
interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

/**
 * Axios instance configured for OpenF1 API
 * Base URL, timeout, and headers configured per design spec
 */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor for logging
 * Requirement: 17.1
 */
apiClient.interceptors.request.use(
  (config) => {
    console.debug(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor with retry logic and error handling
 * Requirements: 17.1, 17.2, 17.3
 * 
 * Implements exponential backoff retry strategy:
 * - Retry 1: 1 second delay
 * - Retry 2: 2 seconds delay
 * - Retry 3: 3 seconds delay
 */
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in debug mode
    console.debug(
      `API Response: ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`
    );
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig;

    // Can't retry without original request config
    if (!originalRequest) {
      console.error('No request config available for retry');
      return Promise.reject(classifyError(error));
    }

    // Initialize retry count if not present
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    // Check if we should retry (up to 3 attempts per Requirement 17.3)
    if (originalRequest._retryCount < 3) {
      originalRequest._retryCount += 1;
      
      // Calculate exponential backoff delay
      const delayMs = 1000 * originalRequest._retryCount;
      
      console.debug(
        `Retry attempt ${originalRequest._retryCount}/3 for ${originalRequest.url} after ${delayMs}ms`
      );

      // Wait for exponential backoff delay
      await new Promise((resolve) => setTimeout(resolve, delayMs));

      // Retry the request
      try {
        return await apiClient(originalRequest);
      } catch (retryError) {
        // If this was the last retry, classify and reject the error
        if (originalRequest._retryCount >= 3) {
          console.error(
            `Request failed after ${originalRequest._retryCount} retries:`,
            originalRequest.url
          );
          return Promise.reject(classifyError(retryError));
        }
        // Otherwise, let it retry again
        throw retryError;
      }
    }

    // Max retries exceeded, classify and reject the error
    console.error(
      `Max retries (3) exceeded for ${originalRequest.url}`
    );
    return Promise.reject(classifyError(error));
  }
);
