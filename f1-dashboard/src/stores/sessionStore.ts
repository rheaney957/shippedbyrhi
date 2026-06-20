import { create } from 'zustand';
import type { Session } from '../types/domain';

interface SessionState {
  selectedSessionKey: number | null;
  selectedSession: Session | null;
  isLiveMode: boolean;
  setSelectedSession: (session: Session | null) => void;
}

/**
 * Determines if a session is currently in live mode.
 * A session is considered live if the current time is within:
 * - 30 minutes before the session start time
 * - 30 minutes after the session end time
 * 
 * @param session - The session to check
 * @returns true if the session is in live mode, false otherwise
 */
function computeIsLiveMode(session: Session | null): boolean {
  if (!session) {
    return false;
  }

  const now = new Date();
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);

  // Live if within 30min before start to 30min after end
  const liveWindowStart = new Date(start.getTime() - 30 * 60 * 1000);
  const liveWindowEnd = new Date(end.getTime() + 30 * 60 * 1000);

  return now >= liveWindowStart && now <= liveWindowEnd;
}

/**
 * Session store manages the currently selected F1 session and its live mode status.
 * 
 * The store tracks:
 * - selectedSessionKey: The unique identifier of the selected session
 * - selectedSession: The full session object with metadata
 * - isLiveMode: Computed boolean indicating if the session is currently live
 * 
 * Live mode is determined by checking if the current time falls within the session's
 * active window (30 minutes before start to 30 minutes after end).
 */
export const useSessionStore = create<SessionState>((set) => ({
  selectedSessionKey: null,
  selectedSession: null,
  isLiveMode: false,

  setSelectedSession: (session: Session | null) => {
    const isLive = computeIsLiveMode(session);
    
    set({
      selectedSessionKey: session?.key ?? null,
      selectedSession: session,
      isLiveMode: isLive,
    });
  },
}));
