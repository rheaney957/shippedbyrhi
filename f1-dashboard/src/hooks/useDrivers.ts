/**
 * useDrivers Hook
 * Custom React hook for fetching F1 driver data using TanStack Query
 * Requirements: 3.1, 19
 */

import { useQuery } from '@tanstack/react-query';
import { getDrivers } from '../api/services/drivers';
import type { Driver } from '../types/domain';

/**
 * Hook to fetch all drivers for a given session
 * Requirement: 3.1 - Display a list of all drivers in the current session
 * Requirement: 19 - Cache driver data to reduce API calls
 * 
 * @param sessionKey - Unique session identifier (null to disable query)
 * @returns TanStack Query result with drivers array
 */
export function useDrivers(sessionKey: number | null) {
  return useQuery<Driver[], Error>({
    queryKey: ['drivers', sessionKey],
    queryFn: () => getDrivers(sessionKey!),
    enabled: sessionKey !== null, // Only fetch when sessionKey is provided
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - driver data is relatively static
    gcTime: 24 * 60 * 60 * 1000, // 24 hours cache
    retry: 3, // Req 17.3
  });
}
