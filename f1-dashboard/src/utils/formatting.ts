/**
 * Formatting utilities for F1 timing data
 * 
 * This module provides functions to format timing data consistently across the application,
 * including proper sign handling, decimal precision, and null value handling.
 */

/**
 * Formats a time value in seconds to "+X.XXXs" format
 * 
 * @param time - Time value in seconds, or null
 * @returns Formatted time string with sign, 3 decimal places, and 's' suffix
 *          Returns "-" for null values
 * 
 * @example
 * formatTime(1.234) // "+1.234s"
 * formatTime(-0.567) // "-0.567s"
 * formatTime(0) // "0.000s"
 * formatTime(null) // "-"
 */
export function formatTime(time: number | null): string {
  if (time === null) {
    return '-';
  }

  const sign = time > 0 ? '+' : time < 0 ? '-' : '';
  const absValue = Math.abs(time);
  
  return `${sign}${absValue.toFixed(3)}s`;
}

/**
 * Formats a gap value to 3 decimal places
 * 
 * @param gap - Gap value in seconds, or null
 * @returns Formatted gap string with sign and 3 decimal places
 *          Returns "-" for null values
 * 
 * @example
 * formatGap(1.234) // "+1.234"
 * formatGap(-0.567) // "-0.567"
 * formatGap(0) // "0.000"
 * formatGap(null) // "-"
 */
export function formatGap(gap: number | null): string {
  if (gap === null) {
    return '-';
  }

  const sign = gap > 0 ? '+' : gap < 0 ? '-' : '';
  const absValue = Math.abs(gap);
  
  return `${sign}${absValue.toFixed(3)}`;
}

/**
 * Formats a lap time in seconds to "M:SS.XXX" format
 * 
 * @param lapTime - Lap time in seconds, or null
 * @returns Formatted lap time string in minutes:seconds.milliseconds format
 *          Returns "-" for null values
 * 
 * @example
 * formatLapTime(83.456) // "1:23.456"
 * formatLapTime(125.789) // "2:05.789"
 * formatLapTime(59.123) // "0:59.123"
 * formatLapTime(null) // "-"
 */
export function formatLapTime(lapTime: number | null): string {
  if (lapTime === null) {
    return '-';
  }

  const minutes = Math.floor(lapTime / 60);
  const seconds = lapTime % 60;
  
  // Pad seconds to always show 2 digits before decimal point
  const secondsStr = seconds.toFixed(3).padStart(6, '0');
  
  return `${minutes}:${secondsStr}`;
}
