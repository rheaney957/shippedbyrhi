/**
 * Sessions API Service
 * Requirements: 1.1, 1.2, 15.3
 * 
 * Provides functions to fetch F1 session data from the OpenF1 API
 * and normalize it into application domain models.
 */

import { apiClient } from '../client';
import type { SessionResponse } from '../../types/api';
import type { Session } from '../../types/domain';

/**
 * Parse session_type string into normalized session type
 * 
 * @param sessionType - Raw session type from API (e.g., "Race", "Qualifying")
 * @returns Normalized session type
 */
export function parseSessionType(
  sessionType: string
): 'race' | 'qualifying' | 'sprint' | 'practice' {
  const normalized = sessionType.toLowerCase();
  
  // Check for sprint first since "Sprint Qualifying" contains both words
  if (normalized.includes('sprint')) {
    return 'sprint';
  }
  if (normalized.includes('qualifying')) {
    return 'qualifying';
  }
  if (normalized.includes('race')) {
    return 'race';
  }
  // Default to practice for any practice session (Practice 1, 2, 3, etc.)
  return 'practice';
}

/**
 * Calculate if a session is currently live
 * 
 * A session is considered live if the current time is:
 * - Within 30 minutes before the session start time, OR
 * - Between session start and end time, OR
 * - Within 30 minutes after the session end time
 * 
 * @param startTime - Session start time
 * @param endTime - Session end time
 * @returns true if session is live, false otherwise
 */
export function calculateIsLive(startTime: Date, endTime: Date): boolean {
  const now = new Date();
  const thirtyMinutesMs = 30 * 60 * 1000;
  
  const liveWindowStart = new Date(startTime.getTime() - thirtyMinutesMs);
  const liveWindowEnd = new Date(endTime.getTime() + thirtyMinutesMs);
  
  return now >= liveWindowStart && now <= liveWindowEnd;
}

/**
 * Normalize a SessionResponse from the API into a Session domain model
 * 
 * @param raw - Raw session response from OpenF1 API
 * @returns Normalized Session object
 */
export function normalizeSession(raw: SessionResponse): Session {
  const startTime = new Date(raw.date_start);
  const endTime = new Date(raw.date_end);
  
  return {
    key: raw.session_key,
    name: raw.session_name,
    type: parseSessionType(raw.session_type),
    startTime,
    endTime,
    circuit: {
      key: raw.circuit_key,
      name: raw.circuit_short_name,
      country: raw.country_name,
    },
    year: raw.year,
    isLive: calculateIsLive(startTime, endTime),
  };
}

/**
 * Fetch all sessions for a given year
 * Requirement: 1.1 - Display available sessions from current season
 * 
 * @param year - Year to fetch sessions for (e.g., 2024)
 * @returns Promise resolving to array of normalized Session objects
 * @throws {ApiError} If the request fails after retries
 */
export async function getSessions(year: number): Promise<Session[]> {
  const response = await apiClient.get<SessionResponse[]>('/sessions', {
    params: { year },
  });
  
  return response.data.map(normalizeSession);
}

/**
 * Fetch a specific session by its key
 * Requirement: 1.2 - Load and display data for selected session
 * 
 * @param sessionKey - Unique session identifier
 * @returns Promise resolving to normalized Session object
 * @throws {ApiError} If the request fails after retries
 * @throws {Error} If session is not found
 */
export async function getSession(sessionKey: number): Promise<Session> {
  const response = await apiClient.get<SessionResponse[]>('/sessions', {
    params: { session_key: sessionKey },
  });
  
  if (!response.data || response.data.length === 0) {
    throw new Error(`Session with key ${sessionKey} not found`);
  }
  
  return normalizeSession(response.data[0]);
}
