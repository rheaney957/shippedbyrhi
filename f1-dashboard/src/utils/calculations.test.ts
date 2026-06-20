/**
 * Unit tests for calculation utilities
 */

import { describe, it, expect } from 'vitest';
import {
  detectLapImprovement,
  identifyFastestLap,
  calculateGapsToLeader,
} from './calculations';
import { TimingEntry } from '../types/domain';

describe('detectLapImprovement', () => {
  it('should return true when current lap is faster than previous best', () => {
    expect(detectLapImprovement(83.456, 84.123)).toBe(true);
  });

  it('should return false when current lap is slower than previous best', () => {
    expect(detectLapImprovement(85.000, 84.123)).toBe(false);
  });

  it('should return false when current lap equals previous best', () => {
    expect(detectLapImprovement(84.123, 84.123)).toBe(false);
  });

  it('should return false when current lap time is null', () => {
    expect(detectLapImprovement(null, 84.123)).toBe(false);
  });

  it('should return true when previous best is null and current is valid', () => {
    expect(detectLapImprovement(83.456, null)).toBe(true);
  });

  it('should return false when both lap times are null', () => {
    expect(detectLapImprovement(null, null)).toBe(false);
  });

  it('should handle very small improvements', () => {
    expect(detectLapImprovement(83.001, 83.002)).toBe(true);
  });

  it('should handle negative lap times (edge case)', () => {
    // While unrealistic, function should handle any numbers
    expect(detectLapImprovement(-1.0, -0.5)).toBe(true);
  });
});

describe('identifyFastestLap', () => {
  const createTimingEntry = (
    driverNumber: number,
    bestLapTime: number | null
  ): TimingEntry => ({
    position: driverNumber,
    driverNumber,
    lastLapTime: bestLapTime,
    bestLapTime,
    gapToLeader: null,
    gapToAhead: null,
    isFastestLap: false,
    inPit: false,
  });

  it('should identify the driver with the fastest lap time', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 83.456),
      createTimingEntry(44, 82.789),
      createTimingEntry(33, 84.123),
    ];

    const fastest = identifyFastestLap(entries);
    expect(fastest).not.toBeNull();
    expect(fastest?.driverNumber).toBe(44);
    expect(fastest?.bestLapTime).toBe(82.789);
  });

  it('should ignore entries with null lap times', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 83.456),
      createTimingEntry(44, null),
      createTimingEntry(33, 84.123),
    ];

    const fastest = identifyFastestLap(entries);
    expect(fastest).not.toBeNull();
    expect(fastest?.driverNumber).toBe(1);
    expect(fastest?.bestLapTime).toBe(83.456);
  });

  it('should return null when all lap times are null', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, null),
      createTimingEntry(44, null),
      createTimingEntry(33, null),
    ];

    const fastest = identifyFastestLap(entries);
    expect(fastest).toBeNull();
  });

  it('should return null for empty array', () => {
    const fastest = identifyFastestLap([]);
    expect(fastest).toBeNull();
  });

  it('should handle single entry with valid lap time', () => {
    const entries: TimingEntry[] = [createTimingEntry(1, 83.456)];

    const fastest = identifyFastestLap(entries);
    expect(fastest).not.toBeNull();
    expect(fastest?.driverNumber).toBe(1);
  });

  it('should handle single entry with null lap time', () => {
    const entries: TimingEntry[] = [createTimingEntry(1, null)];

    const fastest = identifyFastestLap(entries);
    expect(fastest).toBeNull();
  });

  it('should be idempotent - calling twice returns same result', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 83.456),
      createTimingEntry(44, 82.789),
      createTimingEntry(33, 84.123),
    ];

    const fastest1 = identifyFastestLap(entries);
    const fastest2 = identifyFastestLap(entries);

    expect(fastest1).toEqual(fastest2);
  });

  it('should handle entries with identical lap times', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 83.456),
      createTimingEntry(44, 83.456),
      createTimingEntry(33, 84.123),
    ];

    const fastest = identifyFastestLap(entries);
    expect(fastest).not.toBeNull();
    expect(fastest?.bestLapTime).toBe(83.456);
    // Should return the first one found
    expect(fastest?.driverNumber).toBe(1);
  });

  it('should handle very close lap times', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 83.001),
      createTimingEntry(44, 83.000),
      createTimingEntry(33, 83.002),
    ];

    const fastest = identifyFastestLap(entries);
    expect(fastest).not.toBeNull();
    expect(fastest?.driverNumber).toBe(44);
    expect(fastest?.bestLapTime).toBe(83.000);
  });
});

describe('calculateGapsToLeader', () => {
  const createTimingEntry = (
    position: number,
    driverNumber: number,
    bestLapTime: number | null
  ): TimingEntry => ({
    position,
    driverNumber,
    lastLapTime: bestLapTime,
    bestLapTime,
    gapToLeader: null,
    gapToAhead: null,
    isFastestLap: false,
    inPit: false,
  });

  it('should calculate gaps with leader at position 1 having gap of 0', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 44, 82.000),
      createTimingEntry(2, 1, 82.500),
      createTimingEntry(3, 33, 83.200),
    ];

    const gaps = calculateGapsToLeader(entries);
    expect(gaps.length).toBe(3);
    expect(gaps[0]).toBe(0);
    expect(gaps[1]).toBeCloseTo(0.5, 3);
    expect(gaps[2]).toBeCloseTo(1.2, 3);
  });

  it('should produce monotonically increasing gaps for sorted positions', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 44, 82.000),
      createTimingEntry(2, 1, 82.300),
      createTimingEntry(3, 33, 82.800),
      createTimingEntry(4, 16, 83.500),
    ];

    const gaps = calculateGapsToLeader(entries);
    
    // Leader has gap of 0
    expect(gaps[0]).toBe(0);
    
    // Each subsequent gap should be larger than the previous
    for (let i = 1; i < gaps.length; i++) {
      expect(gaps[i]).toBeGreaterThan(gaps[i - 1]!);
    }
  });

  it('should return null gaps when leader has no lap time', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 44, null),
      createTimingEntry(2, 1, 82.500),
      createTimingEntry(3, 33, 83.200),
    ];

    const gaps = calculateGapsToLeader(entries);
    expect(gaps).toEqual([null, null, null]);
  });

  it('should return null gap for entries with null lap times', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 44, 82.000),
      createTimingEntry(2, 1, 82.500),
      createTimingEntry(3, 33, null),
      createTimingEntry(4, 16, 83.500),
    ];

    const gaps = calculateGapsToLeader(entries);
    expect(gaps).toEqual([0, 0.5, null, 1.5]);
  });

  it('should return empty array for empty input', () => {
    const gaps = calculateGapsToLeader([]);
    expect(gaps).toEqual([]);
  });

  it('should handle single entry (leader only)', () => {
    const entries: TimingEntry[] = [createTimingEntry(1, 44, 82.000)];

    const gaps = calculateGapsToLeader(entries);
    expect(gaps).toEqual([0]);
  });

  it('should calculate correct gap values', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 44, 80.000),
      createTimingEntry(2, 1, 81.234),
      createTimingEntry(3, 33, 82.567),
    ];

    const gaps = calculateGapsToLeader(entries);
    
    expect(gaps[0]).toBe(0);
    expect(gaps[1]).toBeCloseTo(1.234, 3);
    expect(gaps[2]).toBeCloseTo(2.567, 3);
  });

  it('should handle entries not in position order', () => {
    // Gaps should still be calculated correctly based on position field
    const entries: TimingEntry[] = [
      createTimingEntry(3, 33, 83.200),
      createTimingEntry(1, 44, 82.000),
      createTimingEntry(2, 1, 82.500),
    ];

    const gaps = calculateGapsToLeader(entries);
    expect(gaps[0]).toBeCloseTo(1.2, 3); // Position 3
    expect(gaps[1]).toBe(0);             // Position 1 (leader)
    expect(gaps[2]).toBeCloseTo(0.5, 3); // Position 2
  });

  it('should handle very small gap differences', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 44, 82.000),
      createTimingEntry(2, 1, 82.001),
      createTimingEntry(3, 33, 82.002),
    ];

    const gaps = calculateGapsToLeader(entries);
    expect(gaps[0]).toBe(0);
    expect(gaps[1]).toBeCloseTo(0.001, 3);
    expect(gaps[2]).toBeCloseTo(0.002, 3);
  });

  it('should handle all drivers with same lap time', () => {
    const entries: TimingEntry[] = [
      createTimingEntry(1, 44, 82.000),
      createTimingEntry(2, 1, 82.000),
      createTimingEntry(3, 33, 82.000),
    ];

    const gaps = calculateGapsToLeader(entries);
    expect(gaps).toEqual([0, 0, 0]);
  });
});
