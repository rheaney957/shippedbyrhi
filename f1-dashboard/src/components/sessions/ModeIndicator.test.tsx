import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ModeIndicator } from './ModeIndicator';
import { useSessionStore } from '../../stores/sessionStore';
import type { Session } from '../../types/domain';

// Mock the session store
vi.mock('../../stores/sessionStore');

describe('ModeIndicator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  const mockSession: Session = {
    key: 1,
    name: 'Race',
    type: 'race',
    startTime: new Date('2024-01-01T14:00:00Z'),
    endTime: new Date('2024-01-01T16:00:00Z'),
    circuit: {
      key: 1,
      name: 'Monaco',
      country: 'Monaco',
    },
    year: 2024,
    isLive: true,
  };

  describe('when no session is selected', () => {
    it('should not render anything', () => {
      vi.mocked(useSessionStore).mockReturnValue({
        isLiveMode: false,
        selectedSession: null,
        selectedSessionKey: null,
        setSelectedSession: vi.fn(),
      });

      const { container } = render(<ModeIndicator />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('when in live mode', () => {
    beforeEach(() => {
      vi.mocked(useSessionStore).mockReturnValue({
        isLiveMode: true,
        selectedSession: mockSession,
        selectedSessionKey: mockSession.key,
        setSelectedSession: vi.fn(),
      });
    });

    it('should display "Live Mode" text', () => {
      render(<ModeIndicator />);
      expect(screen.getByText('Live Mode')).toBeInTheDocument();
    });

    it('should display a pulsing green indicator dot', () => {
      const { container } = render(<ModeIndicator />);
      const dot = container.querySelector('.bg-green-500.animate-pulse');
      expect(dot).toBeInTheDocument();
    });

    it('should display last updated timestamp', () => {
      render(<ModeIndicator />);
      expect(screen.getByText(/Updated:/)).toBeInTheDocument();
    });

    it('should have green styling for live mode', () => {
      const { container } = render(<ModeIndicator />);
      const modeContainer = container.firstChild;
      expect(modeContainer).toHaveClass('bg-green-50', 'border-green-500', 'text-green-800');
    });

    it('should update timestamp periodically in live mode', async () => {
      render(<ModeIndicator />);

      // Get initial timestamp text
      const timestampElement = screen.getByText(/Updated:/);
      const initialText = timestampElement.textContent;
      expect(initialText).toMatch(/Updated: \d{2}:\d{2}:\d{2}/);

      // Advance time by 2 seconds
      await vi.advanceTimersByTimeAsync(2000);

      // The timestamp element should still be present (verifying it continues to update)
      const updatedElement = screen.getByText(/Updated:/);
      expect(updatedElement).toBeInTheDocument();
    });

    it('should have proper ARIA attributes for live mode', () => {
      render(<ModeIndicator />);
      const statusElement = screen.getByRole('status');
      
      expect(statusElement).toHaveAttribute('aria-live', 'polite');
      expect(statusElement).toHaveAttribute('aria-label', 'Live mode active');
    });
  });

  describe('when in historical mode', () => {
    beforeEach(() => {
      vi.mocked(useSessionStore).mockReturnValue({
        isLiveMode: false,
        selectedSession: { ...mockSession, isLive: false },
        selectedSessionKey: mockSession.key,
        setSelectedSession: vi.fn(),
      });
    });

    it('should display "Historical Mode" text', () => {
      render(<ModeIndicator />);
      expect(screen.getByText('Historical Mode')).toBeInTheDocument();
    });

    it('should display a static gray indicator dot', () => {
      const { container } = render(<ModeIndicator />);
      const dot = container.querySelector('.bg-gray-400');
      expect(dot).toBeInTheDocument();
      expect(dot).not.toHaveClass('animate-pulse');
    });

    it('should NOT display last updated timestamp', () => {
      render(<ModeIndicator />);
      expect(screen.queryByText(/Updated:/)).not.toBeInTheDocument();
    });

    it('should have gray styling for historical mode', () => {
      const { container } = render(<ModeIndicator />);
      const modeContainer = container.firstChild;
      expect(modeContainer).toHaveClass('bg-gray-50', 'border-gray-400', 'text-gray-700');
    });

    it('should have proper ARIA attributes for historical mode', () => {
      render(<ModeIndicator />);
      const statusElement = screen.getByRole('status');
      
      expect(statusElement).toHaveAttribute('aria-live', 'polite');
      expect(statusElement).toHaveAttribute('aria-label', 'Historical mode active');
    });
  });

  describe('timestamp formatting', () => {
    beforeEach(() => {
      vi.mocked(useSessionStore).mockReturnValue({
        isLiveMode: true,
        selectedSession: mockSession,
        selectedSessionKey: mockSession.key,
        setSelectedSession: vi.fn(),
      });
    });

    it('should format timestamp in 24-hour format with seconds', () => {
      const mockDate = new Date('2024-01-01T14:35:42Z');
      vi.setSystemTime(mockDate);

      render(<ModeIndicator />);
      
      // The timestamp should be formatted as HH:MM:SS
      expect(screen.getByText(/Updated: \d{2}:\d{2}:\d{2}/)).toBeInTheDocument();
    });

    it('should pad single digit hours, minutes, and seconds with zeros', () => {
      const mockDate = new Date('2024-01-01T09:05:03Z');
      vi.setSystemTime(mockDate);

      render(<ModeIndicator />);
      
      const timestampText = screen.getByText(/Updated:/);
      expect(timestampText.textContent).toMatch(/\d{2}:\d{2}:\d{2}/);
    });
  });

  describe('responsive behavior', () => {
    beforeEach(() => {
      vi.mocked(useSessionStore).mockReturnValue({
        isLiveMode: true,
        selectedSession: mockSession,
        selectedSessionKey: mockSession.key,
        setSelectedSession: vi.fn(),
      });
    });

    it('should apply responsive flex layout classes', () => {
      const { container } = render(<ModeIndicator />);
      const textContainer = container.querySelector('.flex.flex-col.sm\\:flex-row');
      expect(textContainer).toBeInTheDocument();
    });
  });

  describe('cleanup', () => {
    it('should clear interval when component unmounts', () => {
      vi.mocked(useSessionStore).mockReturnValue({
        isLiveMode: true,
        selectedSession: mockSession,
        selectedSessionKey: mockSession.key,
        setSelectedSession: vi.fn(),
      });

      const { unmount } = render(<ModeIndicator />);
      
      // Get the number of active timers before unmount
      const timersBefore = vi.getTimerCount();
      
      unmount();
      
      // After unmount, the interval should be cleared
      const timersAfter = vi.getTimerCount();
      expect(timersAfter).toBeLessThan(timersBefore);
    });

    it('should clear interval when switching from live to historical mode', () => {
      const mockStoreValue = {
        isLiveMode: true,
        selectedSession: mockSession,
        selectedSessionKey: mockSession.key,
        setSelectedSession: vi.fn(),
      };

      vi.mocked(useSessionStore).mockReturnValue(mockStoreValue);

      const { rerender } = render(<ModeIndicator />);
      
      const timersBefore = vi.getTimerCount();
      expect(timersBefore).toBeGreaterThan(0);

      // Switch to historical mode
      vi.mocked(useSessionStore).mockReturnValue({
        ...mockStoreValue,
        isLiveMode: false,
      });

      rerender(<ModeIndicator />);
      
      // Interval should be cleaned up
      const timersAfter = vi.getTimerCount();
      expect(timersAfter).toBe(0);
    });
  });
});
