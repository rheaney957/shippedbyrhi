/**
 * Unit tests for Drivers API Service
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getDrivers, normalizeDriver } from './drivers';
import { apiClient } from '../client';
import type { DriverResponse } from '../../types/api';

// Mock the API client
vi.mock('../client');

describe('drivers service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('normalizeDriver', () => {
    it('should normalize driver response to domain model', () => {
      const rawDriver: DriverResponse = {
        driver_number: 44,
        full_name: 'Lewis Hamilton',
        name_acronym: 'HAM',
        team_name: 'Mercedes',
        team_colour: '00D2BE',
        country_code: 'GBR',
        headshot_url: 'https://example.com/ham.png',
        session_key: 9158,
      };

      const normalized = normalizeDriver(rawDriver);

      expect(normalized).toEqual({
        number: 44,
        name: 'Lewis Hamilton',
        abbreviation: 'HAM',
        team: 'Mercedes',
        teamColor: '#00D2BE', // # prefix added
        nationality: 'GBR',
        headshotUrl: 'https://example.com/ham.png',
      });
    });

    it('should add # prefix to team color hex', () => {
      const rawDriver: DriverResponse = {
        driver_number: 1,
        full_name: 'Max Verstappen',
        name_acronym: 'VER',
        team_name: 'Red Bull Racing',
        team_colour: '0600EF',
        country_code: 'NLD',
        session_key: 9158,
      };

      const normalized = normalizeDriver(rawDriver);

      expect(normalized.teamColor).toBe('#0600EF');
      expect(normalized.teamColor.startsWith('#')).toBe(true);
    });

    it('should handle missing headshot_url', () => {
      const rawDriver: DriverResponse = {
        driver_number: 16,
        full_name: 'Charles Leclerc',
        name_acronym: 'LEC',
        team_name: 'Ferrari',
        team_colour: 'DC0000',
        country_code: 'MON',
        session_key: 9158,
      };

      const normalized = normalizeDriver(rawDriver);

      expect(normalized.headshotUrl).toBeUndefined();
    });
  });

  describe('getDrivers', () => {
    it('should fetch and normalize drivers for a session', async () => {
      const mockResponse: DriverResponse[] = [
        {
          driver_number: 44,
          full_name: 'Lewis Hamilton',
          name_acronym: 'HAM',
          team_name: 'Mercedes',
          team_colour: '00D2BE',
          country_code: 'GBR',
          session_key: 9158,
        },
        {
          driver_number: 1,
          full_name: 'Max Verstappen',
          name_acronym: 'VER',
          team_name: 'Red Bull Racing',
          team_colour: '0600EF',
          country_code: 'NLD',
          session_key: 9158,
        },
      ];

      vi.mocked(apiClient.get).mockResolvedValue({
        data: mockResponse,
      } as any);

      const drivers = await getDrivers(9158);

      expect(apiClient.get).toHaveBeenCalledWith('/drivers', {
        params: { session_key: 9158 },
      });

      expect(drivers).toHaveLength(2);
      expect(drivers[0]).toEqual({
        number: 44,
        name: 'Lewis Hamilton',
        abbreviation: 'HAM',
        team: 'Mercedes',
        teamColor: '#00D2BE',
        nationality: 'GBR',
        headshotUrl: undefined,
      });
      expect(drivers[1]).toEqual({
        number: 1,
        name: 'Max Verstappen',
        abbreviation: 'VER',
        team: 'Red Bull Racing',
        teamColor: '#0600EF',
        nationality: 'NLD',
        headshotUrl: undefined,
      });
    });

    it('should return empty array when no drivers found', async () => {
      vi.mocked(apiClient.get).mockResolvedValue({
        data: [],
      } as any);

      const drivers = await getDrivers(9999);

      expect(drivers).toEqual([]);
    });

    it('should propagate API errors', async () => {
      const error = new Error('API Error');
      vi.mocked(apiClient.get).mockRejectedValue(error);

      await expect(getDrivers(9158)).rejects.toThrow('API Error');
    });
  });
});
