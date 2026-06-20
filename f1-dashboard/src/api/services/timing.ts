/**
 * Timing API Service
 * Requirements: 2.1, 2.4, 2.5, 2.6, 2.7
 * 
 * Provides functions to fetch and process timing data from the OpenF1 API,
 * combining laps and intervals to create a unified view of race positions
 * and timing information.
 */

import { apiClient } from '../client';
import type { LapResponse, IntervalResponse } from '../../types/api';
import type { TimingEntry } from '../../types/domain';

/**
 * Merge lap data and interval data to create timing entries
 * 
 * This function combines the latest lap times for each driver with their
 * current position and gap information. It:
 * 1. Groups laps by driver and finds the latest lap and best lap time
 * 2. Groups intervals by driver and finds the latest interval data
 * 3. Combines both datasets into TimingEntry objects
 * 4. Calculates positions based on gap_to_leader (or lap count if not available)
 * 5. Identifies the fastest lap across all drivers
 * 6. Sorts by position
 * 
 * Requirements: 2.1, 2.4, 2.5, 2.6, 2.7
 * 
 * @param laps - Array of lap responses from the OpenF1 API
 * @param intervals - Array of interval responses from the OpenF1 API
 * @returns Array of TimingEntry objects sorted by position
 */
export function mergeLapsAndIntervals(
  laps: LapResponse[],
  intervals: IntervalResponse[]
): TimingEntry[] {
  // Group laps by driver to find latest and best lap times
  const lapsByDriver = new Map<number, {
    latestLap: LapResponse;
    bestLapTime: number | null;
  }>();

  for (const lap of laps) {
    const driverNumber = lap.driver_number;
    const existing = lapsByDriver.get(driverNumber);

    // Determine if this is the latest lap for this driver
    const isLatest = !existing || 
      new Date(lap.date_start) > new Date(existing.latestLap.date_start);

    // Determine best lap time
    let bestLapTime = existing?.bestLapTime ?? null;
    if (lap.lap_duration !== null) {
      if (bestLapTime === null || lap.lap_duration < bestLapTime) {
        bestLapTime = lap.lap_duration;
      }
    }

    // Update or create entry
    if (isLatest) {
      lapsByDriver.set(driverNumber, {
        latestLap: lap,
        bestLapTime,
      });
    } else if (bestLapTime !== existing?.bestLapTime) {
      // Update best lap time even if this isn't the latest lap
      lapsByDriver.set(driverNumber, {
        latestLap: existing.latestLap,
        bestLapTime,
      });
    }
  }

  // Group intervals by driver to find latest position/gap data
  const intervalsByDriver = new Map<number, IntervalResponse>();

  for (const interval of intervals) {
    const driverNumber = interval.driver_number;
    const existing = intervalsByDriver.get(driverNumber);

    // Keep the most recent interval for each driver
    if (!existing || new Date(interval.date) > new Date(existing.date)) {
      intervalsByDriver.set(driverNumber, interval);
    }
  }

  // Combine lap and interval data into TimingEntry objects
  const allDriverNumbers = new Set([
    ...lapsByDriver.keys(),
    ...intervalsByDriver.keys(),
  ]);

  const timingEntries: TimingEntry[] = [];

  for (const driverNumber of allDriverNumbers) {
    const lapData = lapsByDriver.get(driverNumber);
    const intervalData = intervalsByDriver.get(driverNumber);

    const entry: TimingEntry = {
      position: 0, // Will be calculated below
      driverNumber,
      lastLapTime: lapData?.latestLap.lap_duration ?? null,
      bestLapTime: lapData?.bestLapTime ?? null,
      gapToLeader: intervalData?.gap_to_leader ?? null,
      gapToAhead: intervalData?.interval ?? null,
      isFastestLap: false, // Will be calculated below
      inPit: lapData?.latestLap.is_pit_out_lap ?? false,
    };

    timingEntries.push(entry);
  }

  // Sort entries by gap to leader (ascending), with leader first (gap = 0 or null)
  // Drivers without gap data go to the end
  timingEntries.sort((a, b) => {
    // Leader (gap = 0 or null with lap times) comes first
    const aGap = a.gapToLeader ?? Infinity;
    const bGap = b.gapToLeader ?? Infinity;
    
    // If both have gaps, sort by gap
    if (aGap !== Infinity && bGap !== Infinity) {
      return aGap - bGap;
    }
    
    // If one has a gap and the other doesn't, the one with gap comes first
    if (aGap !== Infinity) return -1;
    if (bGap !== Infinity) return 1;
    
    // Both have no gap data, maintain relative order by driver number
    return a.driverNumber - b.driverNumber;
  });

  // Assign positions based on sort order
  timingEntries.forEach((entry, index) => {
    entry.position = index + 1;
  });

  // Identify the fastest lap across all drivers (Requirement 2.6)
  let fastestLapTime: number | null = null;
  let fastestLapDriverNumber: number | null = null;

  for (const entry of timingEntries) {
    if (entry.bestLapTime !== null) {
      if (fastestLapTime === null || entry.bestLapTime < fastestLapTime) {
        fastestLapTime = entry.bestLapTime;
        fastestLapDriverNumber = entry.driverNumber;
      }
    }
  }

  // Mark the driver with the fastest lap
  if (fastestLapDriverNumber !== null) {
    const fastestEntry = timingEntries.find(
      (e) => e.driverNumber === fastestLapDriverNumber
    );
    if (fastestEntry) {
      fastestEntry.isFastestLap = true;
    }
  }

  return timingEntries;
}

/**
 * Fetch timing data for a session
 * 
 * Combines lap times and interval/gap data from the OpenF1 API to create
 * a complete timing picture. This is the primary function for getting
 * timing information to display in the dashboard.
 * 
 * Requirements: 2.1, 2.4, 2.5, 2.6, 2.7
 * 
 * @param sessionKey - Unique session identifier
 * @returns Promise resolving to array of TimingEntry objects sorted by position
 * @throws {ApiError} If the request fails after retries
 */
export async function getTiming(sessionKey: number): Promise<TimingEntry[]> {
  // Fetch both laps and intervals in parallel
  const [lapsResponse, intervalsResponse] = await Promise.all([
    apiClient.get<LapResponse[]>('/laps', {
      params: { session_key: sessionKey },
    }),
    apiClient.get<IntervalResponse[]>('/intervals', {
      params: { session_key: sessionKey },
    }),
  ]);

  // Merge and process the data
  return mergeLapsAndIntervals(lapsResponse.data, intervalsResponse.data);
}
