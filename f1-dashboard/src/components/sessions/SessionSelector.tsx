/**
 * SessionSelector Component
 * Displays list of available F1 sessions and handles session selection
 * Requirements: 1.1, 1.2, 1.3, 1.4, 18.1
 */

import { useSessions } from '../../hooks/useSession';
import { useSessionStore } from '../../stores/sessionStore';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { NoSessionsEmptyState } from '../common/EmptyState';
import { ErrorDisplay } from '../common/ErrorDisplay';
import type { Session } from '../../types/domain';

/**
 * Format session date for display
 */
function formatSessionDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

/**
 * Get badge color based on session type
 */
function getSessionTypeBadgeColor(type: Session['type']): string {
  const colors = {
    race: 'bg-red-100 text-red-800',
    qualifying: 'bg-blue-100 text-blue-800',
    sprint: 'bg-purple-100 text-purple-800',
    practice: 'bg-gray-100 text-gray-800',
  };
  return colors[type];
}

/**
 * Individual session card component
 */
interface SessionCardProps {
  session: Session;
  isSelected: boolean;
  onSelect: () => void;
}

function SessionCard({ session, isSelected, onSelect }: SessionCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full text-left p-4 rounded-lg border-2 transition-all
        ${
          isSelected
            ? 'border-blue-600 bg-blue-50 shadow-md'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
        }
      `}
      aria-pressed={isSelected}
      aria-label={`Select ${session.name} at ${session.circuit.name}`}
    >
      {/* Session header with name and live badge */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg text-gray-900">
          {session.name}
        </h3>
        {session.isLive && (
          <span
            className="px-2 py-1 text-xs font-medium bg-red-600 text-white rounded-full animate-pulse"
            aria-label="Live session"
          >
            LIVE
          </span>
        )}
      </div>

      {/* Circuit information */}
      <p className="text-sm text-gray-700 mb-2">
        <span className="font-medium">{session.circuit.name}</span>
        {' • '}
        <span className="text-gray-600">{session.circuit.country}</span>
      </p>

      {/* Session metadata */}
      <div className="flex items-center gap-2 text-xs text-gray-600">
        {/* Session type badge */}
        <span
          className={`
            px-2 py-1 rounded-full font-medium
            ${getSessionTypeBadgeColor(session.type)}
          `}
        >
          {session.type.toUpperCase()}
        </span>

        {/* Session date */}
        <span>{formatSessionDate(session.startTime)}</span>
      </div>
    </button>
  );
}

/**
 * SessionSelector Component
 * 
 * Displays a list of available F1 sessions for the current year.
 * Allows users to browse and select sessions to view data.
 * 
 * Features:
 * - Displays session metadata (circuit name, date, session type)
 * - Shows loading state while fetching sessions
 * - Displays empty state when no sessions available
 * - Highlights currently selected session
 * - Indicates live sessions with a badge
 * 
 * Requirements:
 * - 1.1: Display available sessions from current season
 * - 1.2: Handle session selection
 * - 1.3: Display session metadata
 * - 1.4: Show empty state when no sessions available
 * - 18.1: Display loading indicator while fetching
 */
export function SessionSelector() {
  const currentYear = new Date().getFullYear();
  const { data: sessions, isLoading, error, refetch } = useSessions(currentYear);
  const { selectedSessionKey, setSelectedSession } = useSessionStore();

  // Loading state (Req 18.1)
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {currentYear} F1 Sessions
        </h2>
        <LoadingSpinner message="Loading sessions..." />
      </div>
    );
  }

  // Error state (Req 17.1, 17.4)
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {currentYear} F1 Sessions
        </h2>
        <ErrorDisplay
          message={error.message || 'Failed to load sessions. Please try again.'}
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  // Empty state (Req 1.4)
  if (!sessions || sessions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {currentYear} F1 Sessions
        </h2>
        <NoSessionsEmptyState />
      </div>
    );
  }

  // Main display (Req 1.1, 1.2, 1.3)
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {currentYear} F1 Sessions
      </h2>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {sessions.map((session) => (
          <SessionCard
            key={session.key}
            session={session}
            isSelected={selectedSessionKey === session.key}
            onSelect={() => setSelectedSession(session)}
          />
        ))}
      </div>

      {/* Session count indicator */}
      <p className="mt-4 text-sm text-gray-500 text-center">
        {sessions.length} session{sessions.length !== 1 ? 's' : ''} available
      </p>
    </div>
  );
}
