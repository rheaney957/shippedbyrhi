/**
 * useTiming Hook
 * Custom React hook for fetching F1 timing data with live polling support
 * Requirements: 2.2, 15.2
 */

import { useQuery } from '@tanstack/react-query';
import { getTiming } from '../api/services/timing';
import type { TimingEntry } from '../types/domain';

/**
 * Hook to fetch timing data for a given session with automatic live polling
 * 
 * Requirement: 2.2 - Update Timing_Data at a maximum interval of 2 seconds in live mode
 * Requirement: 15.2 - Display the same data views in historical mode (no polling)
 * 
 * In live mode:
 * - Polls every 2 seconds (refetchInterval: 2000)
 * - Always considers data stale (staleTime: 0)
 * 
 * In historical mode:
 * - No polling (refetchInterval: false)
 * - Caches data for 5 minutes (staleTime: 5 * 60 * 1000)
 * 
 * @param sessionKey - Unique session identifier (null to disable query)
 * @param isLiveMode - Whether the session is currently live
 * @returns TanStack Query result with timing entries array
 */
export function useTiming(sessionKey: number | null, isLiveMode: boolean) {
  return useQuery<TimingEntry[], Error>({
    queryKey: ['timing', sessionKey],
    queryFn: () => getTiming(sessionKey!),
    enabled: sessionKey !== null, // Only fetch when sessionKey is provided
    refetchInterval: isLiveMode ? 2000 : false, // 2s polling in live mode (Req 2.2)
    staleTime: isLiveMode ? 0 : 5 * 60 * 1000, // Always fresh in live, 5min cache in historical
    gcTime: 2 * 60 * 1000, // 2 minutes cache
    retry: 3, // Req 17.3
  });
}
