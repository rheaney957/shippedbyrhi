/**
 * ErrorDisplay Component
 * Displays user-friendly error messages with optional retry button
 * Validates: Requirements 17.1, 17.2, 17.4
 */

import type { ErrorDisplayProps } from '../../types/ui';

export function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <div 
      className="flex flex-col items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
        <svg 
          className="w-8 h-8 text-red-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-red-900 mb-2">
        Something went wrong
      </h3>
      
      <p className="text-sm text-red-700 text-center max-w-md mb-4">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="
            px-4 
            py-2 
            bg-red-600 
            text-white 
            rounded-md 
            hover:bg-red-700 
            focus:outline-none 
            focus:ring-2 
            focus:ring-red-500 
            focus:ring-offset-2
            transition-colors
          "
          aria-label="Retry failed operation"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

/**
 * NetworkErrorDisplay Component
 * Specialized error display for network connectivity issues
 * Validates: Requirement 17.2
 */
interface NetworkErrorDisplayProps {
  onRetry?: () => void;
}

export function NetworkErrorDisplay({ onRetry }: NetworkErrorDisplayProps) {
  return (
    <ErrorDisplay
      message="Unable to connect to the network. Please check your internet connection and try again."
      onRetry={onRetry}
    />
  );
}

/**
 * APIErrorDisplay Component
 * Specialized error display for API errors
 * Validates: Requirement 17.1, 17.3
 */
interface APIErrorDisplayProps {
  statusCode?: number;
  onRetry?: () => void;
}

export function APIErrorDisplay({ statusCode, onRetry }: APIErrorDisplayProps) {
  const getMessage = () => {
    if (statusCode === 503) {
      return 'The F1 data service is temporarily unavailable. We\'re trying to reconnect...';
    }
    if (statusCode === 404) {
      return 'The requested data could not be found. Please try a different selection.';
    }
    if (statusCode && statusCode >= 500) {
      return 'The F1 data service is experiencing issues. Please try again in a moment.';
    }
    return 'Unable to load F1 data. Please try again.';
  };

  return (
    <ErrorDisplay
      message={getMessage()}
      onRetry={onRetry}
    />
  );
}

/**
 * InlineError Component
 * Compact error message for inline use in forms or smaller sections
 */
interface InlineErrorProps {
  message: string;
}

export function InlineError({ message }: InlineErrorProps) {
  return (
    <div 
      className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700"
      role="alert"
    >
      <svg 
        className="w-5 h-5 text-red-600 flex-shrink-0" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <span>{message}</span>
    </div>
  );
}
