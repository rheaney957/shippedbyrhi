/**
 * EmptyState Component
 * Displays user-friendly empty state messages for "no data" scenarios
 * Validates: Requirement 1.4 (no sessions available)
 */

import type { EmptyStateProps } from '../../types/ui';

export function EmptyState({ message, icon }: EmptyStateProps) {
  const defaultIcon = (
    <svg 
      className="w-16 h-16 text-gray-400" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
      />
    </svg>
  );

  return (
    <div 
      className="flex flex-col items-center justify-center p-12 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="mb-4">
        {icon || defaultIcon}
      </div>
      
      <p className="text-base text-gray-600 max-w-md">
        {message}
      </p>
    </div>
  );
}

/**
 * NoSessionsEmptyState Component
 * Specialized empty state for when no sessions are available
 * Validates: Requirement 1.4
 */
export function NoSessionsEmptyState() {
  const icon = (
    <svg 
      className="w-16 h-16 text-gray-400" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
      />
    </svg>
  );

  return (
    <EmptyState
      message="No F1 sessions are currently available. Please check back later for upcoming races and events."
      icon={icon}
    />
  );
}

/**
 * NoDataEmptyState Component
 * Generic empty state for when data is not available
 */
interface NoDataEmptyStateProps {
  dataType?: string;
}

export function NoDataEmptyState({ dataType = 'data' }: NoDataEmptyStateProps) {
  return (
    <EmptyState
      message={`No ${dataType} available for this selection.`}
    />
  );
}

/**
 * NoResultsEmptyState Component
 * Empty state for search/filter results
 */
interface NoResultsEmptyStateProps {
  searchTerm?: string;
}

export function NoResultsEmptyState({ searchTerm }: NoResultsEmptyStateProps) {
  const icon = (
    <svg 
      className="w-16 h-16 text-gray-400" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  );

  const message = searchTerm 
    ? `No results found for "${searchTerm}". Try adjusting your search.`
    : 'No results found. Try adjusting your filters.';

  return (
    <EmptyState
      message={message}
      icon={icon}
    />
  );
}

/**
 * NoFavoritesEmptyState Component
 * Empty state for when no favorites are selected
 */
export function NoFavoritesEmptyState() {
  const icon = (
    <svg 
      className="w-16 h-16 text-gray-400" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1.5} 
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
      />
    </svg>
  );

  return (
    <EmptyState
      message="You haven't added any favorites yet. Click the star icon on drivers or teams to save them here."
      icon={icon}
    />
  );
}
