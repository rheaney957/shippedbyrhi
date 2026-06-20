/**
 * TimingDisplay Component
 * Requirements: 2.1, 2.3, 2.4, 2.5, 2.6, 2.7, 3.1, 3.3
 * 
 * Displays live race timing data in a table format showing:
 * - Position, driver number, driver name
 * - Gaps to leader and car ahead (to 3 decimal places)
 * - Last lap time and best lap time
 * - Visual indicators for improvements and fastest lap
 * - Team colors for driver distinction
 * - Optional filtering by favorites
 */

import { useMemo } from 'react';
import { useTiming } from '../../hooks/useTiming';
import { useDrivers } from '../../hooks/useDrivers';
import { LoadingSpinner, ErrorDisplay, EmptyState } from '../common';
import { formatGap, formatLapTime } from '../../utils/formatting';

export interface TimingDisplayProps {
  sessionKey: number | null;
  isLiveMode: boolean;
  favoritesOnly?: boolean;
  favoriteDrivers?: Set<number>;
}

interface TimingRowData {
  position: number;
  driverNumber: number;
  driverName: string;
  teamColor: string;
  gapToLeader: string;
  gapToAhead: string;
  lastLapTime: string;
  bestLapTime: string;
  isFastestLap: boolean;
  isImprovement: boolean;
  isFavorite: boolean;
}

/**
 * TimingDisplay Component
 * 
 * Displays timing data in a table format with live updates
 * 
 * @param sessionKey - Session identifier
 * @param isLiveMode - Whether session is live
 * @param favoritesOnly - Filter to show only favorite drivers
 * @param favoriteDrivers - Set of favorite driver numbers
 */
export function TimingDisplay({
  sessionKey,
  isLiveMode,
  favoritesOnly = false,
  favoriteDrivers = new Set(),
}: TimingDisplayProps) {
  // Fetch timing data with automatic polling in live mode
  const { data: timingData, isLoading: timingLoading, error: timingError } = useTiming(
    sessionKey,
    isLiveMode
  );

  // Fetch driver data for names and team colors
  const { data: drivers, isLoading: driversLoading, error: driversError } = useDrivers(
    sessionKey
  );

  // Track previous lap times for improvement detection
  const previousBestTimes = useMemo(() => {
    if (!timingData) return new Map<number, number | null>();
    
    const times = new Map<number, number | null>();
    timingData.forEach(entry => {
      times.set(entry.driverNumber, entry.bestLapTime);
    });
    return times;
  }, [timingData?.map(e => `${e.driverNumber}-${e.bestLapTime}`).join(',')]);

  // Build timing row data by combining timing entries with driver info
  const timingRows = useMemo<TimingRowData[]>(() => {
    if (!timingData || !drivers) return [];

    // Create driver lookup map
    const driverMap = new Map(
      drivers.map(driver => [driver.number, driver])
    );

    // Transform timing entries to row data
    const rows = timingData.map(entry => {
      const driver = driverMap.get(entry.driverNumber);
      const previousBest = previousBestTimes.get(entry.driverNumber);
      
      // Check if this is an improvement (current best < previous best)
      const isImprovement = 
        entry.bestLapTime !== null &&
        previousBest !== null &&
        entry.bestLapTime < previousBest;

      return {
        position: entry.position,
        driverNumber: entry.driverNumber,
        driverName: driver?.name || `Driver ${entry.driverNumber}`,
        teamColor: driver?.teamColor || '#808080',
        gapToLeader: entry.position === 1 ? 'LEAD' : formatGap(entry.gapToLeader),
        gapToAhead: entry.position === 1 ? '-' : formatGap(entry.gapToAhead),
        lastLapTime: formatLapTime(entry.lastLapTime),
        bestLapTime: formatLapTime(entry.bestLapTime),
        isFastestLap: entry.isFastestLap,
        isImprovement,
        isFavorite: favoriteDrivers.has(entry.driverNumber),
      };
    });

    // Filter by favorites if requested
    if (favoritesOnly) {
      return rows.filter(row => row.isFavorite);
    }

    return rows;
  }, [timingData, drivers, favoritesOnly, favoriteDrivers, previousBestTimes]);

  // Handle loading state
  if (timingLoading || driversLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  // Handle error state
  if (timingError || driversError) {
    return (
      <ErrorDisplay
        message={(timingError || driversError)?.message || 'An error occurred'}
      />
    );
  }

  // Handle empty state
  if (timingRows.length === 0) {
    if (favoritesOnly) {
      return (
        <EmptyState
          message="Add drivers to your favorites to see them here"
        />
      );
    }
    return (
      <EmptyState
        message="Timing data will appear when the session begins"
      />
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-left">
            <th className="px-3 py-2 text-sm font-semibold">Pos</th>
            <th className="px-3 py-2 text-sm font-semibold">No</th>
            <th className="px-3 py-2 text-sm font-semibold">Driver</th>
            <th className="px-3 py-2 text-sm font-semibold text-right">Gap</th>
            <th className="px-3 py-2 text-sm font-semibold text-right">Int</th>
            <th className="px-3 py-2 text-sm font-semibold text-right">Last</th>
            <th className="px-3 py-2 text-sm font-semibold text-right">Best</th>
          </tr>
        </thead>
        <tbody>
          {timingRows.map((row) => (
            <TimingRow key={row.driverNumber} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * TimingRow Component
 * 
 * Displays a single driver's timing information
 * - Shows position, driver number, name
 * - Displays gaps with 3 decimal precision
 * - Highlights fastest lap with purple indicator
 * - Highlights improvements with green indicator
 * - Uses team colors for visual distinction
 */
interface TimingRowProps {
  row: TimingRowData;
}

function TimingRow({ row }: TimingRowProps) {
  return (
    <tr
      className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
        row.isFavorite ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''
      }`}
    >
      {/* Position */}
      <td className="px-3 py-3 text-sm font-medium">{row.position}</td>

      {/* Driver Number with team color indicator */}
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <div
            className="w-1 h-8 rounded-full"
            style={{ backgroundColor: row.teamColor }}
            aria-label="Team color"
          />
          <span className="text-sm font-semibold">{row.driverNumber}</span>
        </div>
      </td>

      {/* Driver Name */}
      <td className="px-3 py-3 text-sm font-medium">
        {row.driverName}
        {row.isFavorite && (
          <span className="ml-2 text-yellow-500" aria-label="Favorite driver">
            ★
          </span>
        )}
      </td>

      {/* Gap to Leader */}
      <td className="px-3 py-3 text-right text-sm font-mono">
        {row.gapToLeader}
      </td>

      {/* Gap to Ahead (Interval) */}
      <td className="px-3 py-3 text-right text-sm font-mono">
        {row.gapToAhead}
      </td>

      {/* Last Lap Time */}
      <td className="px-3 py-3 text-right text-sm font-mono">
        {row.lastLapTime}
      </td>

      {/* Best Lap Time with indicators */}
      <td className="px-3 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <span
            className={`text-sm font-mono ${
              row.isFastestLap ? 'text-purple-600 dark:text-purple-400 font-bold' : ''
            } ${
              row.isImprovement ? 'text-green-600 dark:text-green-400' : ''
            }`}
          >
            {row.bestLapTime}
          </span>
          {row.isFastestLap && (
            <span
              className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-purple-600 rounded"
              aria-label="Fastest lap"
              title="Fastest lap"
            >
              F
            </span>
          )}
          {row.isImprovement && !row.isFastestLap && (
            <span
              className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-600 rounded"
              aria-label="Personal best improvement"
              title="Improved personal best"
            >
              ↑
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}
