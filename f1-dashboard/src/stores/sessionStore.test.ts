import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { useSessionStore } from './sessionStore';
import type { Session } from '../types/domain';

// Helper function to create a mock session
function createMockSession(overrides?: Partial<Session>): Session {
  return {
    key: 9158,
    name: 'Race',
    type: 'race',
    startTime: new Date('2024-03-24T15:00:00Z'),
    endTime: new Date('2024-03-24T17:00:00Z'),
    circuit: {
      key: 1,
      name: 'Bahrain International Circuit',
      country: 'Bahrain',
    },
    year: 2024,
    isLive: false,
    ...overrides,
  };
}

describe('sessionStore', () => {
  beforeEach(() => {
    // Reset the store state before each test
    useSessionStore.setState({
      selectedSessionKey: null,
      selectedSession: null,
      isLiveMode: false,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('initial state', () => {
    it('should have null selectedSessionKey initially', () => {
      const { selectedSessionKey } = useSessionStore.getState();
      expect(selectedSessionKey).toBeNull();
    });

    it('should have null selectedSession initially', () => {
      const { selectedSession } = useSessionStore.getState();
      expect(selectedSession).toBeNull();
    });

    it('should have isLiveMode false initially', () => {
      const { isLiveMode } = useSessionStore.getState();
      expect(isLiveMode).toBe(false);
    });
  });

  describe('setSelectedSession', () => {
    it('should set selectedSessionKey when session is selected', () => {
      const mockSession = createMockSession();
      const { setSelectedSession } = useSessionStore.getState();

      setSelectedSession(mockSession);

      const { selectedSessionKey } = useSessionStore.getState();
      expect(selectedSessionKey).toBe(9158);
    });

    it('should set selectedSession when session is selected', () => {
      const mockSession = createMockSession();
      const { setSelectedSession } = useSessionStore.getState();

      setSelectedSession(mockSession);

      const { selectedSession } = useSessionStore.getState();
      expect(selectedSession).toEqual(mockSession);
    });

    it('should reset to null when null is passed', () => {
      const mockSession = createMockSession();
      const { setSelectedSession } = useSessionStore.getState();

      // First set a session
      setSelectedSession(mockSession);
      expect(useSessionStore.getState().selectedSessionKey).toBe(9158);

      // Then clear it
      setSelectedSession(null);

      const state = useSessionStore.getState();
      expect(state.selectedSessionKey).toBeNull();
      expect(state.selectedSession).toBeNull();
      expect(state.isLiveMode).toBe(false);
    });
  });

  describe('isLiveMode computation', () => {
    it('should set isLiveMode to false when session is null', () => {
      const { setSelectedSession } = useSessionStore.getState();

      setSelectedSession(null);

      const { isLiveMode } = useSessionStore.getState();
      expect(isLiveMode).toBe(false);
    });

    it('should set isLiveMode to true when current time is during the session', () => {
      const now = new Date('2024-03-24T16:00:00Z'); // During the session
      vi.useFakeTimers();
      vi.setSystemTime(now);

      const mockSession = createMockSession({
        startTime: new Date('2024-03-24T15:00:00Z'),
        endTime: new Date('2024-03-24T17:00:00Z'),
      });

      const { setSelectedSession } = useSessionStore.getState();
      setSelectedSession(mockSession);

      const { isLiveMode } = useSessionStore.getState();
      expect(isLiveMode).toBe(true);
    });

    it('should set isLiveMode to true when current time is 30 minutes before session start', () => {
      const now = new Date('2024-03-24T14:30:00Z'); // 30 min before start
      vi.useFakeTimers();
      vi.setSystemTime(now);

      const mockSession = createMockSession({
        startTime: new Date('2024-03-24T15:00:00Z'),
        endTime: new Date('2024-03-24T17:00:00Z'),
      });

      const { setSelectedSession } = useSessionStore.getState();
      setSelectedSession(mockSession);

      const { isLiveMode } = useSessionStore.getState();
      expect(isLiveMode).toBe(true);
    });

    it('should set isLiveMode to true when current time is 30 minutes after session end', () => {
      const now = new Date('2024-03-24T17:30:00Z'); // 30 min after end
      vi.useFakeTimers();
      vi.setSystemTime(now);

      const mockSession = createMockSession({
        startTime: new Date('2024-03-24T15:00:00Z'),
        endTime: new Date('2024-03-24T17:00:00Z'),
      });

      const { setSelectedSession } = useSessionStore.getState();
      setSelectedSession(mockSession);

      const { isLiveMode } = useSessionStore.getState();
      expect(isLiveMode).toBe(true);
    });

    it('should set isLiveMode to false when current time is 31 minutes before session start', () => {
      const now = new Date('2024-03-24T14:29:00Z'); // 31 min before start
      vi.useFakeTimers();
      vi.setSystemTime(now);

      const mockSession = createMockSession({
        startTime: new Date('2024-03-24T15:00:00Z'),
        endTime: new Date('2024-03-24T17:00:00Z'),
      });

      const { setSelectedSession } = useSessionStore.getState();
      setSelectedSession(mockSession);

      const { isLiveMode } = useSessionStore.getState();
      expect(isLiveMode).toBe(false);
    });

    it('should set isLiveMode to false when current time is 31 minutes after session end', () => {
      const now = new Date('2024-03-24T17:31:00Z'); // 31 min after end
      vi.useFakeTimers();
      vi.setSystemTime(now);

      const mockSession = createMockSession({
        startTime: new Date('2024-03-24T15:00:00Z'),
        endTime: new Date('2024-03-24T17:00:00Z'),
      });

      const { setSelectedSession } = useSessionStore.getState();
      setSelectedSession(mockSession);

      const { isLiveMode } = useSessionStore.getState();
      expect(isLiveMode).toBe(false);
    });

    it('should set isLiveMode to false for historical sessions', () => {
      const now = new Date('2024-06-01T12:00:00Z');
      vi.useFakeTimers();
      vi.setSystemTime(now);

      const mockSession = createMockSession({
        startTime: new Date('2024-03-24T15:00:00Z'),
        endTime: new Date('2024-03-24T17:00:00Z'),
      });

      const { setSelectedSession } = useSessionStore.getState();
      setSelectedSession(mockSession);

      const { isLiveMode } = useSessionStore.getState();
      expect(isLiveMode).toBe(false);
    });

    it('should set isLiveMode to false for future sessions beyond the 30-minute window', () => {
      const now = new Date('2024-03-24T14:00:00Z'); // 60 min before start
      vi.useFakeTimers();
      vi.setSystemTime(now);

      const mockSession = createMockSession({
        startTime: new Date('2024-03-24T15:00:00Z'),
        endTime: new Date('2024-03-24T17:00:00Z'),
      });

      const { setSelectedSession } = useSessionStore.getState();
      setSelectedSession(mockSession);

      const { isLiveMode } = useSessionStore.getState();
      expect(isLiveMode).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle sessions with Date objects as startTime and endTime', () => {
      const now = new Date('2024-03-24T16:00:00Z');
      vi.useFakeTimers();
      vi.setSystemTime(now);

      const mockSession = createMockSession({
        startTime: new Date('2024-03-24T15:00:00Z'),
        endTime: new Date('2024-03-24T17:00:00Z'),
      });

      const { setSelectedSession } = useSessionStore.getState();
      setSelectedSession(mockSession);

      const state = useSessionStore.getState();
      expect(state.selectedSessionKey).toBe(mockSession.key);
      expect(state.isLiveMode).toBe(true);
    });

    it('should handle rapid session changes', () => {
      const now = new Date('2024-03-24T16:00:00Z');
      vi.useFakeTimers();
      vi.setSystemTime(now);

      const session1 = createMockSession({ key: 1 });
      const session2 = createMockSession({ key: 2 });
      const session3 = createMockSession({ key: 3 });

      const { setSelectedSession } = useSessionStore.getState();

      setSelectedSession(session1);
      expect(useSessionStore.getState().selectedSessionKey).toBe(1);

      setSelectedSession(session2);
      expect(useSessionStore.getState().selectedSessionKey).toBe(2);

      setSelectedSession(session3);
      expect(useSessionStore.getState().selectedSessionKey).toBe(3);
    });

    it('should handle session at exact boundary - start time minus 30 minutes', () => {
      const now = new Date('2024-03-24T14:30:00.000Z'); // Exactly 30 min before
      vi.useFakeTimers();
      vi.setSystemTime(now);

      const mockSession = createMockSession({
        startTime: new Date('2024-03-24T15:00:00.000Z'),
        endTime: new Date('2024-03-24T17:00:00.000Z'),
      });

      const { setSelectedSession } = useSessionStore.getState();
      setSelectedSession(mockSession);

      const { isLiveMode } = useSessionStore.getState();
      expect(isLiveMode).toBe(true);
    });

    it('should handle session at exact boundary - end time plus 30 minutes', () => {
      const now = new Date('2024-03-24T17:30:00.000Z'); // Exactly 30 min after
      vi.useFakeTimers();
      vi.setSystemTime(now);

      const mockSession = createMockSession({
        startTime: new Date('2024-03-24T15:00:00.000Z'),
        endTime: new Date('2024-03-24T17:00:00.000Z'),
      });

      const { setSelectedSession } = useSessionStore.getState();
      setSelectedSession(mockSession);

      const { isLiveMode } = useSessionStore.getState();
      expect(isLiveMode).toBe(true);
    });
  });
});
