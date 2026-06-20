/**
 * SessionSelector Component Tests
 * Tests for session selection functionality
 * Requirements: 1.1, 1.2, 1.3, 1.4, 18.1
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionSelector } from './SessionSelector';
import * as sessionHooks from '../../hooks/useSession';
import * as sessionStore from '../../stores/sessionStore';
import type { Session } from '../../types/domain';

// Mock the hooks and stores
vi.mock('../../hooks/useSession');
vi.mock('../../stores/sessionStore');

// Test helper to create a query client
function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

// Test helper to render component with providers
function renderWithProviders(component: React.ReactElement) {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
}

// Mock session data
const mockSessions: Session[] = [
  {
    key: 1,
    name: 'Race',
    type: 'race',
    startTime: new Date('2024-03-01T15:00:00Z'),
    endTime: new Date('2024-03-01T17:00:00Z'),
    circuit: {
      key: 1,
      name: 'Bahrain International Circuit',
      country: 'Bahrain',
    },
    year: 2024,
    isLive: false,
  },
  {
    key: 2,
    name: 'Qualifying',
    type: 'qualifying',
    startTime: new Date('2024-02-29T14:00:00Z'),
    endTime: new Date('2024-02-29T15:00:00Z'),
    circuit: {
      key: 1,
      name: 'Bahrain International Circuit',
      country: 'Bahrain',
    },
    year: 2024,
    isLive: true,
  },
  {
    key: 3,
    name: 'Practice 1',
    type: 'practice',
    startTime: new Date('2024-02-28T11:00:00Z'),
    endTime: new Date('2024-02-28T12:00:00Z'),
    circuit: {
      key: 1,
      name: 'Bahrain International Circuit',
      country: 'Bahrain',
    },
    year: 2024,
    isLive: false,
  },
];

describe('SessionSelector', () => {
  const mockSetSelectedSession = vi.fn();
  const mockRefetch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock session store
    vi.mocked(sessionStore.useSessionStore).mockReturnValue({
      selectedSessionKey: null,
      selectedSession: null,
      isLiveMode: false,
      setSelectedSession: mockSetSelectedSession,
    });
  });

  describe('Loading State', () => {
    it('should display loading spinner while fetching sessions (Req 18.1)', () => {
      // Mock loading state
      vi.mocked(sessionHooks.useSessions).mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
        refetch: mockRefetch,
      } as any);

      renderWithProviders(<SessionSelector />);

      expect(screen.getByText(/Loading sessions/i)).toBeInTheDocument();
      expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when fetch fails (Req 17.1)', () => {
      // Mock error state
      vi.mocked(sessionHooks.useSessions).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: new Error('Network error'),
        refetch: mockRefetch,
      } as any);

      renderWithProviders(<SessionSelector />);

      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });

    it('should provide retry button on error (Req 17.4)', async () => {
      // Mock error state
      vi.mocked(sessionHooks.useSessions).mockReturnValue({
        data: undefined,
        isLoading: false,
        error: new Error('Network error'),
        refetch: mockRefetch,
      } as any);

      renderWithProviders(<SessionSelector />);

      const retryButton = screen.getByRole('button', { name: /retry/i });
      await userEvent.click(retryButton);

      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Empty State', () => {
    it('should display empty state when no sessions available (Req 1.4)', () => {
      // Mock empty data
      vi.mocked(sessionHooks.useSessions).mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      } as any);

      renderWithProviders(<SessionSelector />);

      expect(screen.getByText(/No F1 sessions are currently available/i)).toBeInTheDocument();
    });
  });

  describe('Session Display', () => {
    beforeEach(() => {
      // Mock successful data fetch
      vi.mocked(sessionHooks.useSessions).mockReturnValue({
        data: mockSessions,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      } as any);
    });

    it('should display list of available sessions (Req 1.1)', () => {
      renderWithProviders(<SessionSelector />);

      expect(screen.getByText('Race')).toBeInTheDocument();
      expect(screen.getByText('Qualifying')).toBeInTheDocument();
      expect(screen.getByText('Practice 1')).toBeInTheDocument();
    });

    it('should display session metadata including circuit name (Req 1.3)', () => {
      renderWithProviders(<SessionSelector />);

      // Check circuit name appears for each session
      const circuitNames = screen.getAllByText('Bahrain International Circuit');
      expect(circuitNames.length).toBeGreaterThan(0);
    });

    it('should display session metadata including country (Req 1.3)', () => {
      renderWithProviders(<SessionSelector />);

      const countryNames = screen.getAllByText(/Bahrain/);
      expect(countryNames.length).toBeGreaterThan(0);
    });

    it('should display session type badges (Req 1.3)', () => {
      renderWithProviders(<SessionSelector />);

      expect(screen.getByText('RACE')).toBeInTheDocument();
      expect(screen.getByText('QUALIFYING')).toBeInTheDocument();
      expect(screen.getByText('PRACTICE')).toBeInTheDocument();
    });

    it('should display LIVE badge for live sessions (Req 1.3)', () => {
      renderWithProviders(<SessionSelector />);

      const liveBadges = screen.getAllByText('LIVE');
      expect(liveBadges).toHaveLength(1); // Only qualifying is live in mock data
    });

    it('should display session count', () => {
      renderWithProviders(<SessionSelector />);

      expect(screen.getByText('3 sessions available')).toBeInTheDocument();
    });
  });

  describe('Session Selection', () => {
    beforeEach(() => {
      vi.mocked(sessionHooks.useSessions).mockReturnValue({
        data: mockSessions,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      } as any);
    });

    it('should call setSelectedSession when a session is clicked (Req 1.2)', async () => {
      renderWithProviders(<SessionSelector />);

      const raceButton = screen.getByRole('button', { name: /Select Race/i });
      await userEvent.click(raceButton);

      expect(mockSetSelectedSession).toHaveBeenCalledWith(mockSessions[0]);
    });

    it('should highlight the currently selected session', () => {
      // Mock selected session
      vi.mocked(sessionStore.useSessionStore).mockReturnValue({
        selectedSessionKey: 1,
        selectedSession: mockSessions[0],
        isLiveMode: false,
        setSelectedSession: mockSetSelectedSession,
      });

      renderWithProviders(<SessionSelector />);

      const raceButton = screen.getByRole('button', { name: /Select Race/i });
      expect(raceButton).toHaveAttribute('aria-pressed', 'true');
      expect(raceButton).toHaveClass('border-blue-600');
    });

    it('should not highlight non-selected sessions', () => {
      // Mock selected session
      vi.mocked(sessionStore.useSessionStore).mockReturnValue({
        selectedSessionKey: 1,
        selectedSession: mockSessions[0],
        isLiveMode: false,
        setSelectedSession: mockSetSelectedSession,
      });

      renderWithProviders(<SessionSelector />);

      const qualifyingButton = screen.getByRole('button', { name: /Select Qualifying/i });
      expect(qualifyingButton).toHaveAttribute('aria-pressed', 'false');
      expect(qualifyingButton).not.toHaveClass('border-blue-600');
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      vi.mocked(sessionHooks.useSessions).mockReturnValue({
        data: mockSessions,
        isLoading: false,
        error: null,
        refetch: mockRefetch,
      } as any);
    });

    it('should have accessible button labels', () => {
      renderWithProviders(<SessionSelector />);

      expect(screen.getByRole('button', { name: /Select Race at Bahrain/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Select Qualifying at Bahrain/i })).toBeInTheDocument();
    });

    it('should have proper aria-pressed attributes', () => {
      renderWithProviders(<SessionSelector />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('aria-pressed');
      });
    });

    it('should have accessible live session labels', () => {
      renderWithProviders(<SessionSelector />);

      const liveBadge = screen.getByLabelText('Live session');
      expect(liveBadge).toBeInTheDocument();
    });
  });
});
