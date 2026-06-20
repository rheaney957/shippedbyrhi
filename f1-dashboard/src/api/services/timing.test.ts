/**
 * Unit Tests for Timing API Service
 * Requirements: 2.1, 2.4, 2.5, 2.6, 2.7
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mergeLapsAndIntervals, getTiming } from './timing';
import { apiClient } from '../client';
import type { LapResponse, IntervalResponse } from '../../types/api';

// Mock the API client
vi.mock('../client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

describe('mergeLapsAndIntervals', () => {
  it('should merge lap and interval data correctly', () => {
    const laps: LapResponse[] = [
      {
        date_start: '2024-01-01T10:00:00Z',
        driver_number: 1,
        duration_sector_1: 25.5,
        duration_sector_2: 30.2,
        duration_sector_3: 28.1,
        lap_duration: 83.8,
        lap_number: 1,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
      {
        date_start: '2024-01-01T10:00:05Z',
        driver_number: 2,
        duration_sector_1: 26.0,
        duration_sector_2: 30.5,
        duration_sector_3: 28.5,
        lap_duration: 85.0,
        lap_number: 1,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
    ];

    const intervals: IntervalResponse[] = [
      {
        date: '2024-01-01T10:00:10Z',
        driver_number: 1,
        gap_to_leader: 0,
        interval: 0,
        session_key: 1000,
      },
      {
        date: '2024-01-01T10:00:10Z',
        driver_number: 2,
        gap_to_leader: 1.2,
        interval: 1.2,
        session_key: 1000,
      },
    ];

    const result = mergeLapsAndIntervals(laps, intervals);

    expect(result).toHaveLength(2);
    
    // Check leader (P1)
    expect(result[0]).toMatchObject({
      position: 1,
      driverNumber: 1,
      lastLapTime: 83.8,
      bestLapTime: 83.8,
      gapToLeader: 0,
      gapToAhead: 0,
      isFastestLap: true, // Fastest lap
      inPit: false,
    });

    // Check P2
    expect(result[1]).toMatchObject({
      position: 2,
      driverNumber: 2,
      lastLapTime: 85.0,
      bestLapTime: 85.0,
      gapToLeader: 1.2,
      gapToAhead: 1.2,
      isFastestLap: false,
      inPit: false,
    });
  });

  it('should identify fastest lap correctly across multiple drivers', () => {
    const laps: LapResponse[] = [
      {
        date_start: '2024-01-01T10:00:00Z',
        driver_number: 1,
        duration_sector_1: 25.5,
        duration_sector_2: 30.2,
        duration_sector_3: 28.1,
        lap_duration: 85.0,
        lap_number: 1,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
      {
        date_start: '2024-01-01T10:00:05Z',
        driver_number: 2,
        duration_sector_1: 24.0,
        duration_sector_2: 29.0,
        duration_sector_3: 27.5,
        lap_duration: 80.5, // Fastest lap
        lap_number: 1,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
      {
        date_start: '2024-01-01T10:00:10Z',
        driver_number: 3,
        duration_sector_1: 26.0,
        duration_sector_2: 31.0,
        duration_sector_3: 29.0,
        lap_duration: 86.0,
        lap_number: 1,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
    ];

    const intervals: IntervalResponse[] = [
      {
        date: '2024-01-01T10:00:15Z',
        driver_number: 1,
        gap_to_leader: 2.5,
        interval: 2.5,
        session_key: 1000,
      },
      {
        date: '2024-01-01T10:00:15Z',
        driver_number: 2,
        gap_to_leader: 0,
        interval: 0,
        session_key: 1000,
      },
      {
        date: '2024-01-01T10:00:15Z',
        driver_number: 3,
        gap_to_leader: 5.0,
        interval: 2.5,
        session_key: 1000,
      },
    ];

    const result = mergeLapsAndIntervals(laps, intervals);

    // Driver 2 has the fastest lap
    const driver2Entry = result.find((e) => e.driverNumber === 2);
    expect(driver2Entry?.isFastestLap).toBe(true);

    // Others should not have fastest lap
    const driver1Entry = result.find((e) => e.driverNumber === 1);
    const driver3Entry = result.find((e) => e.driverNumber === 3);
    expect(driver1Entry?.isFastestLap).toBe(false);
    expect(driver3Entry?.isFastestLap).toBe(false);
  });

  it('should track best lap time across multiple laps', () => {
    const laps: LapResponse[] = [
      // Lap 1 - slower
      {
        date_start: '2024-01-01T10:00:00Z',
        driver_number: 1,
        duration_sector_1: 25.5,
        duration_sector_2: 30.2,
        duration_sector_3: 28.1,
        lap_duration: 85.0,
        lap_number: 1,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
      // Lap 2 - faster (best lap)
      {
        date_start: '2024-01-01T10:01:30Z',
        driver_number: 1,
        duration_sector_1: 24.0,
        duration_sector_2: 29.0,
        duration_sector_3: 27.0,
        lap_duration: 80.0,
        lap_number: 2,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
      // Lap 3 - slower again
      {
        date_start: '2024-01-01T10:03:00Z',
        driver_number: 1,
        duration_sector_1: 25.0,
        duration_sector_2: 30.0,
        duration_sector_3: 28.0,
        lap_duration: 83.0,
        lap_number: 3,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
    ];

    const intervals: IntervalResponse[] = [
      {
        date: '2024-01-01T10:03:05Z',
        driver_number: 1,
        gap_to_leader: 0,
        interval: 0,
        session_key: 1000,
      },
    ];

    const result = mergeLapsAndIntervals(laps, intervals);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      driverNumber: 1,
      lastLapTime: 83.0, // Last lap (lap 3)
      bestLapTime: 80.0, // Best lap (lap 2)
      isFastestLap: true,
    });
  });

  it('should handle null lap times gracefully', () => {
    const laps: LapResponse[] = [
      {
        date_start: '2024-01-01T10:00:00Z',
        driver_number: 1,
        duration_sector_1: null,
        duration_sector_2: null,
        duration_sector_3: null,
        lap_duration: null, // No lap time
        lap_number: 1,
        is_pit_out_lap: true, // Out lap
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
      {
        date_start: '2024-01-01T10:01:30Z',
        driver_number: 1,
        duration_sector_1: 25.0,
        duration_sector_2: 30.0,
        duration_sector_3: 28.0,
        lap_duration: 83.0,
        lap_number: 2,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
    ];

    const intervals: IntervalResponse[] = [
      {
        date: '2024-01-01T10:01:35Z',
        driver_number: 1,
        gap_to_leader: 0,
        interval: 0,
        session_key: 1000,
      },
    ];

    const result = mergeLapsAndIntervals(laps, intervals);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      driverNumber: 1,
      lastLapTime: 83.0, // Latest lap with time
      bestLapTime: 83.0,
      isFastestLap: true,
    });
  });

  it('should sort drivers by position based on gap to leader', () => {
    const laps: LapResponse[] = [
      {
        date_start: '2024-01-01T10:00:00Z',
        driver_number: 1,
        duration_sector_1: 25.0,
        duration_sector_2: 30.0,
        duration_sector_3: 28.0,
        lap_duration: 83.0,
        lap_number: 1,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
      {
        date_start: '2024-01-01T10:00:00Z',
        driver_number: 2,
        duration_sector_1: 25.0,
        duration_sector_2: 30.0,
        duration_sector_3: 28.0,
        lap_duration: 84.0,
        lap_number: 1,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
      {
        date_start: '2024-01-01T10:00:00Z',
        driver_number: 3,
        duration_sector_1: 25.0,
        duration_sector_2: 30.0,
        duration_sector_3: 28.0,
        lap_duration: 82.0,
        lap_number: 1,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
    ];

    const intervals: IntervalResponse[] = [
      {
        date: '2024-01-01T10:00:10Z',
        driver_number: 1,
        gap_to_leader: 1.5,
        interval: 0.5,
        session_key: 1000,
      },
      {
        date: '2024-01-01T10:00:10Z',
        driver_number: 2,
        gap_to_leader: 3.0,
        interval: 1.5,
        session_key: 1000,
      },
      {
        date: '2024-01-01T10:00:10Z',
        driver_number: 3,
        gap_to_leader: 0, // Leader
        interval: 0,
        session_key: 1000,
      },
    ];

    const result = mergeLapsAndIntervals(laps, intervals);

    expect(result).toHaveLength(3);
    expect(result[0].position).toBe(1);
    expect(result[0].driverNumber).toBe(3); // Leader
    expect(result[1].position).toBe(2);
    expect(result[1].driverNumber).toBe(1);
    expect(result[2].position).toBe(3);
    expect(result[2].driverNumber).toBe(2);
  });

  it('should handle drivers with only lap data (no interval data)', () => {
    const laps: LapResponse[] = [
      {
        date_start: '2024-01-01T10:00:00Z',
        driver_number: 1,
        duration_sector_1: 25.0,
        duration_sector_2: 30.0,
        duration_sector_3: 28.0,
        lap_duration: 83.0,
        lap_number: 1,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
    ];

    const intervals: IntervalResponse[] = [];

    const result = mergeLapsAndIntervals(laps, intervals);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      position: 1,
      driverNumber: 1,
      lastLapTime: 83.0,
      bestLapTime: 83.0,
      gapToLeader: null,
      gapToAhead: null,
      isFastestLap: true,
    });
  });

  it('should handle drivers with only interval data (no lap data)', () => {
    const laps: LapResponse[] = [];

    const intervals: IntervalResponse[] = [
      {
        date: '2024-01-01T10:00:10Z',
        driver_number: 1,
        gap_to_leader: 0,
        interval: 0,
        session_key: 1000,
      },
    ];

    const result = mergeLapsAndIntervals(laps, intervals);

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      position: 1,
      driverNumber: 1,
      lastLapTime: null,
      bestLapTime: null,
      gapToLeader: 0,
      gapToAhead: 0,
      isFastestLap: false, // No lap times to compare
    });
  });

  it('should handle empty data', () => {
    const result = mergeLapsAndIntervals([], []);
    expect(result).toEqual([]);
  });
});

describe('getTiming', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and merge timing data from API', async () => {
    const mockLaps: LapResponse[] = [
      {
        date_start: '2024-01-01T10:00:00Z',
        driver_number: 1,
        duration_sector_1: 25.0,
        duration_sector_2: 30.0,
        duration_sector_3: 28.0,
        lap_duration: 83.0,
        lap_number: 1,
        is_pit_out_lap: false,
        session_key: 1000,
        segments_sector_1: [],
        segments_sector_2: [],
        segments_sector_3: [],
      },
    ];

    const mockIntervals: IntervalResponse[] = [
      {
        date: '2024-01-01T10:00:10Z',
        driver_number: 1,
        gap_to_leader: 0,
        interval: 0,
        session_key: 1000,
      },
    ];

    // Mock the API responses
    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockLaps });
    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockIntervals });

    const result = await getTiming(1000);

    // Verify API was called correctly
    expect(apiClient.get).toHaveBeenCalledTimes(2);
    expect(apiClient.get).toHaveBeenCalledWith('/laps', {
      params: { session_key: 1000 },
    });
    expect(apiClient.get).toHaveBeenCalledWith('/intervals', {
      params: { session_key: 1000 },
    });

    // Verify result
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      position: 1,
      driverNumber: 1,
      lastLapTime: 83.0,
      bestLapTime: 83.0,
      gapToLeader: 0,
      gapToAhead: 0,
      isFastestLap: true,
    });
  });

  it('should handle API errors', async () => {
    vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network error'));

    await expect(getTiming(1000)).rejects.toThrow('Network error');
  });
});
