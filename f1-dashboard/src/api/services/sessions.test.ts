/**
 * Sessions API Service Tests
 * Requirements: 1.1, 1.2, 15.3
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { apiClient } from '../client';
import {
  getSessions,
  getSession,
  parseSessionType,
  calculateIsLive,
  normalizeSession,
} from './sessions';
import type { SessionResponse } from '../../types/api';

// Create mock adapter for axios
const mockApi = new MockAdapter(apiClient);

describe('parseSessionType', () => {
  it('should parse race session types', () => {
    expect(parseSessionType('Race')).toBe('race');
    expect(parseSessionType('race')).toBe('race');
    expect(parseSessionType('RACE')).toBe('race');
  });

  it('should parse qualifying session types', () => {
    expect(parseSessionType('Qualifying')).toBe('qualifying');
    expect(parseSessionType('qualifying')).toBe('qualifying');
    expect(parseSessionType('QUALIFYING')).toBe('qualifying');
  });

  it('should parse sprint session types', () => {
    expect(parseSessionType('Sprint')).toBe('sprint');
    expect(parseSessionType('Sprint Qualifying')).toBe('sprint');
    expect(parseSessionType('sprint')).toBe('sprint');
  });

  it('should parse practice session types', () => {
    expect(parseSessionType('Practice 1')).toBe('practice');
    expect(parseSessionType('Practice 2')).toBe('practice');
    expect(parseSessionType('Practice 3')).toBe('practice');
    expect(parseSessionType('Free Practice')).toBe('practice');
  });

  it('should default unknown types to practice', () => {
    expect(parseSessionType('Unknown')).toBe('practice');
    expect(parseSessionType('')).toBe('practice');
    expect(parseSessionType('Warm Up')).toBe('practice');
  });
});

describe('calculateIsLive', () => {
  beforeEach(() => {
    // Mock current time to 2024-01-15 12:00:00 UTC
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return true when current time is during session', () => {
    const startTime = new Date('2024-01-15T11:00:00Z');
    const endTime = new Date('2024-01-15T13:00:00Z');
    expect(calculateIsLive(startTime, endTime)).toBe(true);
  });

  it('should return true when within 30 minutes before session start', () => {
    const startTime = new Date('2024-01-15T12:15:00Z'); // 15 minutes from now
    const endTime = new Date('2024-01-15T14:00:00Z');
    expect(calculateIsLive(startTime, endTime)).toBe(true);
  });

  it('should return true when within 30 minutes after session end', () => {
    const startTime = new Date('2024-01-15T10:00:00Z');
    const endTime = new Date('2024-01-15T11:45:00Z'); // 15 minutes ago
    expect(calculateIsLive(startTime, endTime)).toBe(true);
  });

  it('should return false when more than 30 minutes before session', () => {
    const startTime = new Date('2024-01-15T12:31:00Z'); // 31 minutes from now
    const endTime = new Date('2024-01-15T14:00:00Z');
    expect(calculateIsLive(startTime, endTime)).toBe(false);
  });

  it('should return false when more than 30 minutes after session', () => {
    const startTime = new Date('2024-01-15T10:00:00Z');
    const endTime = new Date('2024-01-15T11:29:00Z'); // 31 minutes ago
    expect(calculateIsLive(startTime, endTime)).toBe(false);
  });

  it('should return true at exactly 30 minutes before session', () => {
    const startTime = new Date('2024-01-15T12:30:00Z'); // exactly 30 minutes from now
    const endTime = new Date('2024-01-15T14:00:00Z');
    expect(calculateIsLive(startTime, endTime)).toBe(true);
  });

  it('should return true at exactly 30 minutes after session', () => {
    const startTime = new Date('2024-01-15T10:00:00Z');
    const endTime = new Date('2024-01-15T11:30:00Z'); // exactly 30 minutes ago
    expect(calculateIsLive(startTime, endTime)).toBe(true);
  });
});

describe('normalizeSession', () => {
  it('should normalize a session response correctly', () => {
    const response: SessionResponse = {
      session_key: 9158,
      session_name: 'Race',
      session_type: 'Race',
      date_start: '2024-03-24T15:00:00Z',
      date_end: '2024-03-24T17:00:00Z',
      gmt_offset: '+03:00',
      location: 'Jeddah',
      country_name: 'Saudi Arabia',
      circuit_key: 15,
      circuit_short_name: 'Jeddah Corniche Circuit',
      year: 2024,
    };

    const session = normalizeSession(response);

    expect(session.key).toBe(9158);
    expect(session.name).toBe('Race');
    expect(session.type).toBe('race');
    expect(session.startTime).toEqual(new Date('2024-03-24T15:00:00Z'));
    expect(session.endTime).toEqual(new Date('2024-03-24T17:00:00Z'));
    expect(session.circuit.key).toBe(15);
    expect(session.circuit.name).toBe('Jeddah Corniche Circuit');
    expect(session.circuit.country).toBe('Saudi Arabia');
    expect(session.year).toBe(2024);
    expect(typeof session.isLive).toBe('boolean');
  });

  it('should handle qualifying sessions', () => {
    const response: SessionResponse = {
      session_key: 9157,
      session_name: 'Qualifying',
      session_type: 'Qualifying',
      date_start: '2024-03-23T16:00:00Z',
      date_end: '2024-03-23T17:00:00Z',
      gmt_offset: '+03:00',
      location: 'Jeddah',
      country_name: 'Saudi Arabia',
      circuit_key: 15,
      circuit_short_name: 'Jeddah Corniche Circuit',
      year: 2024,
    };

    const session = normalizeSession(response);
    expect(session.type).toBe('qualifying');
  });

  it('should handle practice sessions', () => {
    const response: SessionResponse = {
      session_key: 9155,
      session_name: 'Practice 1',
      session_type: 'Practice',
      date_start: '2024-03-22T13:30:00Z',
      date_end: '2024-03-22T14:30:00Z',
      gmt_offset: '+03:00',
      location: 'Jeddah',
      country_name: 'Saudi Arabia',
      circuit_key: 15,
      circuit_short_name: 'Jeddah Corniche Circuit',
      year: 2024,
    };

    const session = normalizeSession(response);
    expect(session.type).toBe('practice');
  });
});

describe('getSessions', () => {
  beforeEach(() => {
    mockApi.reset();
  });

  it('should fetch and normalize sessions for a given year', async () => {
    const mockResponse: SessionResponse[] = [
      {
        session_key: 9158,
        session_name: 'Race',
        session_type: 'Race',
        date_start: '2024-03-24T15:00:00Z',
        date_end: '2024-03-24T17:00:00Z',
        gmt_offset: '+03:00',
        location: 'Jeddah',
        country_name: 'Saudi Arabia',
        circuit_key: 15,
        circuit_short_name: 'Jeddah Corniche Circuit',
        year: 2024,
      },
      {
        session_key: 9157,
        session_name: 'Qualifying',
        session_type: 'Qualifying',
        date_start: '2024-03-23T16:00:00Z',
        date_end: '2024-03-23T17:00:00Z',
        gmt_offset: '+03:00',
        location: 'Jeddah',
        country_name: 'Saudi Arabia',
        circuit_key: 15,
        circuit_short_name: 'Jeddah Corniche Circuit',
        year: 2024,
      },
    ];

    mockApi.onGet('/sessions').reply(200, mockResponse);

    const sessions = await getSessions(2024);

    expect(sessions).toHaveLength(2);
    expect(sessions[0].key).toBe(9158);
    expect(sessions[0].type).toBe('race');
    expect(sessions[1].key).toBe(9157);
    expect(sessions[1].type).toBe('qualifying');
  });

  it('should return empty array when no sessions found', async () => {
    mockApi.onGet('/sessions').reply(200, []);

    const sessions = await getSessions(2024);

    expect(sessions).toHaveLength(0);
  });

  it('should pass year as query parameter', async () => {
    mockApi.onGet('/sessions', { params: { year: 2024 } }).reply(200, []);

    await getSessions(2024);

    expect(mockApi.history.get[0].params).toEqual({ year: 2024 });
  });
});

describe('getSession', () => {
  beforeEach(() => {
    mockApi.reset();
  });

  it('should fetch and normalize a specific session', async () => {
    const mockResponse: SessionResponse[] = [
      {
        session_key: 9158,
        session_name: 'Race',
        session_type: 'Race',
        date_start: '2024-03-24T15:00:00Z',
        date_end: '2024-03-24T17:00:00Z',
        gmt_offset: '+03:00',
        location: 'Jeddah',
        country_name: 'Saudi Arabia',
        circuit_key: 15,
        circuit_short_name: 'Jeddah Corniche Circuit',
        year: 2024,
      },
    ];

    mockApi.onGet('/sessions').reply(200, mockResponse);

    const session = await getSession(9158);

    expect(session.key).toBe(9158);
    expect(session.name).toBe('Race');
    expect(session.type).toBe('race');
  });

  it('should pass session_key as query parameter', async () => {
    const mockResponse: SessionResponse[] = [
      {
        session_key: 9158,
        session_name: 'Race',
        session_type: 'Race',
        date_start: '2024-03-24T15:00:00Z',
        date_end: '2024-03-24T17:00:00Z',
        gmt_offset: '+03:00',
        location: 'Jeddah',
        country_name: 'Saudi Arabia',
        circuit_key: 15,
        circuit_short_name: 'Jeddah Corniche Circuit',
        year: 2024,
      },
    ];

    mockApi
      .onGet('/sessions', { params: { session_key: 9158 } })
      .reply(200, mockResponse);

    await getSession(9158);

    expect(mockApi.history.get[0].params).toEqual({ session_key: 9158 });
  });

  it('should throw error when session not found', async () => {
    mockApi.onGet('/sessions').reply(200, []);

    await expect(getSession(9999)).rejects.toThrow(
      'Session with key 9999 not found'
    );
  });

  it('should throw error when response data is null', async () => {
    mockApi.onGet('/sessions').reply(200, null);

    await expect(getSession(9999)).rejects.toThrow(
      'Session with key 9999 not found'
    );
  });
});
