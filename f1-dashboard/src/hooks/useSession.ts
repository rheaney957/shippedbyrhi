/**
 * useSession Hooks
 * Custom React hooks for fetching F1 session data using TanStack Query
 * Requirements: 1, 19.2
 */

import { useQuery } from '@tanstack/react-query';
import { getSessions, getSession } from '../api/services/sessions';
import type { Session } from '../types/domain';

/**
 * Hook to fetch all sessions for a given year
 * Requirement: 1.1 - Display available sessions from current season
 * 
 * @param year - Year to fetch sessions for (e.g., 2024)
 * @returns TanStack Query result with sessions array
 */
export function useSessions(year: number) {
  return useQuery<Session[], Error>({
    queryKey: ['sessions', year],
    queryFn: () => getSessions(year),
    staleTime: 30 * 60 * 1000, // 30 minutes (Req 19.2)
    gcTime: 60 * 60 * 1000, // 1 hour cache
    retry: 3, // Req 17.3
  });
}

/**
 * Hook to fetch a specific session by key
 * Requirement: 1.2 - Load and display data for selected session
 * 
 * @param sessionKey - Unique session identifier (null to disable query)
 * @returns TanStack Query result with session data
 */
export function useSession(sessionKey: number | null) {
  return useQuery<Session, Error>({
    queryKey: ['session', sessionKey],
    queryFn: () => getSession(sessionKey!),
    enabled: sessionKey !== null, // Only fetch when sessionKey is provided
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour cache
  });
}
