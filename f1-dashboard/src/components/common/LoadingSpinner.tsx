/**
 * LoadingSpinner Component
 * Displays a loading indicator with optional message and skeleton placeholders
 * Validates: Requirements 18.1, 18.2
 */

import type { LoadingSpinnerProps } from '../../types/ui';

export function LoadingSpinner({ 
  size = 'medium', 
  message 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-8 h-8 border-2',
    medium: 'w-12 h-12 border-3',
    large: 'w-16 h-16 border-4'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div 
        className={`
          ${sizeClasses[size]} 
          border-gray-200 
          border-t-blue-600 
          rounded-full 
          animate-spin
        `}
        role="status"
        aria-label="Loading"
      />
      {message && (
        <p className="mt-4 text-sm text-gray-600" aria-live="polite">
          {message}
        </p>
      )}
    </div>
  );
}

/**
 * SkeletonPlaceholder Component
 * Displays skeleton loading placeholders for content areas during initial load
 * Validates: Requirement 18.2
 */
interface SkeletonPlaceholderProps {
  width?: string;
  height?: string;
  className?: string;
}

export function SkeletonPlaceholder({ 
  width = 'w-full', 
  height = 'h-4',
  className = ''
}: SkeletonPlaceholderProps) {
  return (
    <div 
      className={`
        ${width} 
        ${height} 
        ${className}
        bg-gray-200 
        rounded 
        animate-pulse
      `}
      role="status"
      aria-label="Loading content"
    />
  );
}

/**
 * SkeletonTimingRow Component
 * Skeleton placeholder for a timing display row
 * Validates: Requirement 18.2
 */
export function SkeletonTimingRow() {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      <SkeletonPlaceholder width="w-8" height="h-8" className="rounded-full" />
      <SkeletonPlaceholder width="w-32" height="h-4" />
      <SkeletonPlaceholder width="w-24" height="h-4" />
      <SkeletonPlaceholder width="w-20" height="h-4" />
      <SkeletonPlaceholder width="w-20" height="h-4" />
    </div>
  );
}

/**
 * SkeletonCard Component
 * Skeleton placeholder for a card component
 * Validates: Requirement 18.2
 */
export function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <SkeletonPlaceholder width="w-1/2" height="h-6" className="mb-4" />
      <SkeletonPlaceholder width="w-full" height="h-4" className="mb-2" />
      <SkeletonPlaceholder width="w-3/4" height="h-4" className="mb-2" />
      <SkeletonPlaceholder width="w-5/6" height="h-4" />
    </div>
  );
}

/**
 * LoadingIndicator Component
 * Small inline loading indicator for refresh states
 * Validates: Requirement 18.3 (indicate when data is being refreshed in Live Mode)
 */
interface LoadingIndicatorProps {
  text?: string;
}

export function LoadingIndicator({ text = 'Refreshing...' }: LoadingIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <div 
        className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"
        role="status"
        aria-label="Refreshing"
      />
      <span aria-live="polite">{text}</span>
    </div>
  );
}
