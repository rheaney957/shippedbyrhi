/**
 * Drivers API Service
 * Requirements: 3.1, 3.3, 3.4
 * 
 * Provides functions to fetch F1 driver data from the OpenF1 API
 * and normalize it into application domain models.
 */

import { apiClient } from '../client';
import type { DriverResponse } from '../../types/api';
import type { Driver } from '../../types/domain';

/**
 * Normalize a DriverResponse from the API into a Driver domain model
 * Requirement: 3.3 - Display team colors to visually distinguish drivers
 * Requirement: 3.4 - Display driver nationality with appropriate flag icons
 * 
 * @param raw - Raw driver response from OpenF1 API
 * @returns Normalized Driver object
 */
export function normalizeDriver(raw: DriverResponse): Driver {
  return {
    number: raw.driver_number,
    name: raw.full_name,
    abbreviation: raw.name_acronym,
    team: raw.team_name,
    teamColor: `#${raw.team_colour}`, // Add # prefix to hex color
    nationality: raw.country_code,
    headshotUrl: raw.headshot_url,
  };
}

/**
 * Fetch all drivers for a given session
 * Requirement: 3.1 - Display a list of all drivers in the current session
 * 
 * @param sessionKey - Unique session identifier
 * @returns Promise resolving to array of normalized Driver objects
 * @throws {ApiError} If the request fails after retries
 */
export async function getDrivers(sessionKey: number): Promise<Driver[]> {
  const response = await apiClient.get<DriverResponse[]>('/drivers', {
    params: { session_key: sessionKey },
  });
  
  return response.data.map(normalizeDriver);
}
