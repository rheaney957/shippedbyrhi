import { describe, it, expect } from 'vitest';
import { formatTime, formatGap, formatLapTime } from './formatting';

describe('formatTime', () => {
  it('formats positive time with + sign and 3 decimal places', () => {
    expect(formatTime(1.234)).toBe('+1.234s');
    expect(formatTime(0.567)).toBe('+0.567s');
    expect(formatTime(10.123)).toBe('+10.123s');
  });

  it('formats negative time with - sign and 3 decimal places', () => {
    expect(formatTime(-1.234)).toBe('-1.234s');
    expect(formatTime(-0.567)).toBe('-0.567s');
    expect(formatTime(-10.123)).toBe('-10.123s');
  });

  it('formats zero time without sign', () => {
    expect(formatTime(0)).toBe('0.000s');
  });

  it('handles null values', () => {
    expect(formatTime(null)).toBe('-');
  });

  it('always shows exactly 3 decimal places', () => {
    expect(formatTime(1)).toBe('+1.000s');
    expect(formatTime(1.1)).toBe('+1.100s');
    expect(formatTime(1.12)).toBe('+1.120s');
    expect(formatTime(1.123456)).toBe('+1.123s');
  });

  it('handles very small positive numbers', () => {
    expect(formatTime(0.001)).toBe('+0.001s');
    expect(formatTime(0.0001)).toBe('+0.000s'); // Rounds down
  });

  it('handles very small negative numbers', () => {
    expect(formatTime(-0.001)).toBe('-0.001s');
    expect(formatTime(-0.0001)).toBe('-0.000s'); // Rounds down
  });

  it('handles large numbers', () => {
    expect(formatTime(123.456)).toBe('+123.456s');
    expect(formatTime(-123.456)).toBe('-123.456s');
  });
});

describe('formatGap', () => {
  it('formats positive gap with + sign and 3 decimal places', () => {
    expect(formatGap(1.234)).toBe('+1.234');
    expect(formatGap(0.567)).toBe('+0.567');
    expect(formatGap(10.123)).toBe('+10.123');
  });

  it('formats negative gap with - sign and 3 decimal places', () => {
    expect(formatGap(-1.234)).toBe('-1.234');
    expect(formatGap(-0.567)).toBe('-0.567');
    expect(formatGap(-10.123)).toBe('-10.123');
  });

  it('formats zero gap without sign', () => {
    expect(formatGap(0)).toBe('0.000');
  });

  it('handles null values', () => {
    expect(formatGap(null)).toBe('-');
  });

  it('always shows exactly 3 decimal places', () => {
    expect(formatGap(1)).toBe('+1.000');
    expect(formatGap(1.1)).toBe('+1.100');
    expect(formatGap(1.12)).toBe('+1.120');
    expect(formatGap(1.123456)).toBe('+1.123');
  });

  it('handles very small gaps', () => {
    expect(formatGap(0.001)).toBe('+0.001');
    expect(formatGap(-0.001)).toBe('-0.001');
  });

  it('handles large gaps', () => {
    expect(formatGap(123.456)).toBe('+123.456');
    expect(formatGap(-123.456)).toBe('-123.456');
  });
});

describe('formatLapTime', () => {
  it('formats lap time in M:SS.XXX format', () => {
    expect(formatLapTime(83.456)).toBe('1:23.456');
    expect(formatLapTime(125.789)).toBe('2:05.789');
    expect(formatLapTime(59.123)).toBe('0:59.123');
  });

  it('handles null values', () => {
    expect(formatLapTime(null)).toBe('-');
  });

  it('pads seconds with leading zero when less than 10', () => {
    expect(formatLapTime(65.123)).toBe('1:05.123');
    expect(formatLapTime(61.456)).toBe('1:01.456');
    expect(formatLapTime(60.789)).toBe('1:00.789');
  });

  it('always shows exactly 3 decimal places', () => {
    expect(formatLapTime(83)).toBe('1:23.000');
    expect(formatLapTime(83.1)).toBe('1:23.100');
    expect(formatLapTime(83.12)).toBe('1:23.120');
    expect(formatLapTime(83.123456)).toBe('1:23.123');
  });

  it('handles times under one minute', () => {
    expect(formatLapTime(45.678)).toBe('0:45.678');
    expect(formatLapTime(5.123)).toBe('0:05.123');
    expect(formatLapTime(0.456)).toBe('0:00.456');
  });

  it('handles times over 2 minutes', () => {
    expect(formatLapTime(150.456)).toBe('2:30.456');
    expect(formatLapTime(180.123)).toBe('3:00.123');
  });

  it('handles exactly 1 minute', () => {
    expect(formatLapTime(60)).toBe('1:00.000');
  });

  it('handles exactly 2 minutes', () => {
    expect(formatLapTime(120)).toBe('2:00.000');
  });

  it('handles very fast lap times', () => {
    expect(formatLapTime(75.234)).toBe('1:15.234');
  });

  it('handles very slow lap times', () => {
    expect(formatLapTime(200.789)).toBe('3:20.789');
  });
});

describe('edge cases and requirements validation', () => {
  it('formatTime and formatGap handle positive zero correctly', () => {
    expect(formatTime(0)).toBe('0.000s');
    expect(formatGap(0)).toBe('0.000');
  });

  it('formatTime and formatGap handle negative zero correctly', () => {
    expect(formatTime(-0)).toBe('0.000s');
    expect(formatGap(-0)).toBe('0.000');
  });

  it('all functions handle null gracefully', () => {
    expect(formatTime(null)).toBe('-');
    expect(formatGap(null)).toBe('-');
    expect(formatLapTime(null)).toBe('-');
  });

  it('formatTime includes "s" suffix while formatGap does not', () => {
    const time = 1.234;
    expect(formatTime(time)).toContain('s');
    expect(formatGap(time)).not.toContain('s');
  });

  it('formatLapTime uses colon separator', () => {
    expect(formatLapTime(83.456)).toContain(':');
  });

  it('all functions maintain 3 decimal precision as per requirements 2.4, 2.5, 8.2', () => {
    const testValue = 1.123456789;
    expect(formatTime(testValue)).toMatch(/\d+\.\d{3}s$/);
    expect(formatGap(testValue)).toMatch(/[+-]?\d+\.\d{3}$/);
    expect(formatLapTime(65.123456789)).toMatch(/\d+:\d{2}\.\d{3}$/);
  });
});
