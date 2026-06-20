/**
 * Custom error types for API client
 * Requirements: 17.1, 17.2
 */

export class NetworkError extends Error {
  readonly originalError?: Error;
  
  constructor(message: string, originalError?: Error) {
    super(message);
    this.name = 'NetworkError';
    this.originalError = originalError;
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class APIError extends Error {
  readonly statusCode?: number;
  readonly responseData?: unknown;
  
  constructor(
    message: string,
    statusCode?: number,
    responseData?: unknown
  ) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.responseData = responseData;
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export class NetworkTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkTimeoutError';
    Object.setPrototypeOf(this, NetworkTimeoutError.prototype);
  }
}

/**
 * Classifies errors from axios into our custom error types
 * Requirements: 17.1, 17.2
 */
export function classifyError(error: unknown): Error {
  // Handle axios errors
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as unknown as {
      code?: string;
      response?: { status: number; data: unknown };
      message: string;
    };

    // Network timeout errors
    if (axiosError.code === 'ECONNABORTED' || axiosError.code === 'ETIMEDOUT') {
      return new NetworkTimeoutError('Request timed out. Please try again.');
    }

    // Network connectivity errors
    if (
      axiosError.code === 'ERR_NETWORK' ||
      axiosError.code === 'ENOTFOUND' ||
      axiosError.code === 'ECONNREFUSED'
    ) {
      return new NetworkError(
        'Network connection failed. Please check your internet connection.',
        error as unknown as Error
      );
    }

    // API errors with response
    if (axiosError.response) {
      const status = axiosError.response.status;
      const data = axiosError.response.data;

      if (status >= 500) {
        return new APIError(
          'Server error. Please try again later.',
          status,
          data
        );
      }

      if (status >= 400) {
        return new APIError(
          'Request failed. Please check your parameters.',
          status,
          data
        );
      }

      return new APIError(
        `API error: ${axiosError.message}`,
        status,
        data
      );
    }

    // Generic network error
    return new NetworkError(
      axiosError.message || 'Network request failed',
      error as unknown as Error
    );
  }

  // Return as-is if already one of our error types
  if (
    error instanceof NetworkError ||
    error instanceof APIError ||
    error instanceof NetworkTimeoutError
  ) {
    return error;
  }

  // Generic error fallback
  if (error instanceof Error) {
    return error;
  }

  return new Error('An unknown error occurred');
}
