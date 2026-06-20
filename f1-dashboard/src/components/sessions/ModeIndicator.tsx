import { useSessionStore } from '../../stores/sessionStore';
import { useEffect, useState } from 'react';

/**
 * ModeIndicator component displays whether the dashboard is in Live or Historical mode.
 * 
 * Features:
 * - Shows "Live Mode" when viewing an active session (Requirement 15.3)
 * - Shows "Historical Mode" when viewing past session data (Requirement 15.3)
 * - Displays "Last updated" timestamp in live mode (Requirement 18.3)
 * - Updates timestamp when data refreshes in live mode
 * 
 * Validates: Requirements 15.3, 18.3
 */
export function ModeIndicator() {
  const { isLiveMode, selectedSession } = useSessionStore();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Update timestamp periodically in live mode to show data freshness
  useEffect(() => {
    if (!isLiveMode) {
      return;
    }

    // Update timestamp immediately when entering live mode
    setLastUpdated(new Date());

    // Update timestamp every 2 seconds (aligned with live data refresh interval)
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

  // Don't render if no session is selected
  if (!selectedSession) {
    return null;
  }

  const formatTimestamp = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg border-2 ${
        isLiveMode
          ? 'bg-green-50 border-green-500 text-green-800'
          : 'bg-gray-50 border-gray-400 text-gray-700'
      }`}
      role="status"
      aria-live="polite"
      aria-label={isLiveMode ? 'Live mode active' : 'Historical mode active'}
    >
      {/* Mode indicator dot */}
      <div
        className={`w-3 h-3 rounded-full ${
          isLiveMode ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
        }`}
        aria-hidden="true"
      />

      {/* Mode text */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <span className="font-semibold text-sm">
          {isLiveMode ? 'Live Mode' : 'Historical Mode'}
        </span>

        {/* Last updated timestamp - only shown in live mode */}
        {isLiveMode && (
          <span className="text-xs text-green-700">
            Updated: {formatTimestamp(lastUpdated)}
          </span>
        )}
      </div>
    </div>
  );
}
