/**
 * Calculation utilities for timing data
 * 
 * This module provides functions for detecting lap improvements, identifying fastest laps,
 * and calculating gaps between drivers. All functions properly handle null values.
 */

import { TimingEntry } from '../types/domain';

/**
 * Detects if a current lap time is an improvement over a previous best lap time
 * 
 * @param currentLapTime - Current lap time in seconds, or null if not available
 * @param previousBestLapTime - Previous best lap time in seconds, or null if not available
 * @returns true if current lap is faster than previous best, false otherwise
 * 
 * Null handling:
 * - null current lap time = no improvement (false)
 * - null previous best with valid current = improvement (true)
 * - both null = no improvement (false)
 * 
 * @example
 * detectLapImprovement(83.456, 84.123) // true (improved by 0.667s)
 * detectLapImprovement(85.000, 84.123) // false (slower)
 * detectLapImprovement(null, 84.123) // false (no current time)
 * detectLapImprovement(83.456, null) // true (first valid lap)
 * detectLapImprovement(null, null) // false (no data)
 */
export function detectLapImprovement(
  currentLapTime: number | null,
  previousBestLapTime: number | null
): boolean {
  // No current lap time means no improvement
  if (currentLapTime === null) {
    return false;
  }
  
  // If no previous best, any valid current lap is an improvement
  if (previousBestLapTime === null) {
    return true;
  }
  
  // Current lap is an improvement if it's strictly less than previous best
  return currentLapTime < previousBestLapTime;
}

/**
 * Identifies the timing entry with the fastest lap time
 * 
 * @param timingEntries - Array of timing entries to search
 * @returns The timing entry with the minimum lap time, or null if no valid lap times exist
 * 
 * Null handling:
 * - Ignores entries with null bestLapTime
 * - Returns null if all entries have null lap times or array is empty
 * - Idempotent: calling multiple times returns the same result
 * 
 * @example
 * identifyFastestLap([
 *   { driverNumber: 1, bestLapTime: 83.456, ... },
 *   { driverNumber: 44, bestLapTime: 82.789, ... },
 *   { driverNumber: 33, bestLapTime: null, ... }
 * ]) // Returns entry for driver 44
 */
export function identifyFastestLap(
  timingEntries: TimingEntry[]
): TimingEntry | null {
  // Filter out entries with no valid lap time
  const entriesWithLapTimes = timingEntries.filter(
    entry => entry.bestLapTime !== null
  );
  
  // Return null if no valid lap times exist
  if (entriesWithLapTimes.length === 0) {
    return null;
  }
  
  // Find the entry with the minimum lap time
  let fastestEntry = entriesWithLapTimes[0];
  
  for (const entry of entriesWithLapTimes) {
    if (entry.bestLapTime! < fastestEntry.bestLapTime!) {
      fastestEntry = entry;
    }
  }
  
  return fastestEntry;
}

/**
 * Calculates gaps to the race leader for all timing entries
 * 
 * Assumes timing entries are already sorted by position (position 1 is the leader).
 * 
 * @param timingEntries - Array of timing entries sorted by position
 * @returns Array of gaps in seconds, one per entry (leader has gap of 0)
 * 
 * Behavior:
 * - Position 1 (leader) always has gap of 0
 * - Other positions have positive gaps representing time behind leader
 * - For sorted positions with valid times, gaps are monotonically increasing
 * - Null lap times result in null gaps
 * - Empty array returns empty array
 * 
 * @example
 * calculateGapsToLeader([
 *   { position: 1, bestLapTime: 82.000, ... },
 *   { position: 2, bestLapTime: 82.500, ... },
 *   { position: 3, bestLapTime: 83.200, ... }
 * ]) // Returns [0, 0.500, 1.200]
 */
export function calculateGapsToLeader(
  timingEntries: TimingEntry[]
): (number | null)[] {
  if (timingEntries.length === 0) {
    return [];
  }
  
  // Find the leader (position 1)
  const leader = timingEntries.find(entry => entry.position === 1);
  
  // If no leader found or leader has no lap time, return nulls
  if (!leader || leader.bestLapTime === null) {
    return timingEntries.map(() => null);
  }
  
  const leaderTime = leader.bestLapTime;
  
  // Calculate gaps: time difference from leader
  return timingEntries.map(entry => {
    // Leader always has gap of 0
    if (entry.position === 1) {
      return 0;
    }
    
    // If entry has no lap time, gap is null
    if (entry.bestLapTime === null) {
      return null;
    }
    
    // Gap is the time difference between this entry and the leader
    return entry.bestLapTime - leaderTime;
  });
}
