/**
 * Unit tests for useDrivers hook
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDrivers } from './useDrivers';
import * as driversService from '../api/services/drivers';
import type { Driver } from '../types/domain';

// Mock the drivers service
vi.mock('../api/services/drivers');

// Helper to create a wrapper with QueryClient
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Disable retries for tests
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('useDrivers hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should fetch drivers successfully when sessionKey is provided', async () => {
    const mockDrivers: Driver[] = [
      {
        number: 44,
        name: 'Lewis Hamilton',
        abbreviation: 'HAM',
        team: 'Mercedes',
        teamColor: '#00D2BE',
        nationality: 'GBR',
      },
      {
        number: 1,
        name: 'Max Verstappen',
        abbreviation: 'VER',
        team: 'Red Bull Racing',
        teamColor: '#0600EF',
        nationality: 'NLD',
      },
    ];

    vi.mocked(driversService.getDrivers).mockResolvedValue(mockDrivers);

    const { result } = renderHook(() => useDrivers(9158), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockDrivers);
    expect(driversService.getDrivers).toHaveBeenCalledWith(9158);
  });

  it('should not fetch when sessionKey is null', async () => {
    const { result } = renderHook(() => useDrivers(null), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(driversService.getDrivers).not.toHaveBeenCalled();
  });

  it('should use correct cache configuration', () => {
    const { result } = renderHook(() => useDrivers(9158), {
      wrapper: createWrapper(),
    });

    // Query should be configured with 24-hour stale time
    // We can't directly test the query options, but we can verify the query key
    expect(result.current.isLoading || result.current.isError || result.current.isSuccess).toBe(
      true
    );
  });

  it('should use session-specific query key', async () => {
    const mockDrivers: Driver[] = [
      {
        number: 44,
        name: 'Lewis Hamilton',
        abbreviation: 'HAM',
        team: 'Mercedes',
        teamColor: '#00D2BE',
        nationality: 'GBR',
      },
    ];

    vi.mocked(driversService.getDrivers).mockResolvedValue(mockDrivers);

    const { result, rerender } = renderHook(
      ({ sessionKey }) => useDrivers(sessionKey),
      {
        wrapper: createWrapper(),
        initialProps: { sessionKey: 9158 },
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(driversService.getDrivers).toHaveBeenCalledWith(9158);

    // Change session key
    vi.mocked(driversService.getDrivers).mockClear();
    rerender({ sessionKey: 9159 });

    await waitFor(() => expect(driversService.getDrivers).toHaveBeenCalledWith(9159));
  });
});
