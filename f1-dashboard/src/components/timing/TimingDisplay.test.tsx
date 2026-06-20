/**
 * TimingDisplay Component Tests
 * 
 * Tests for the TimingDisplay component covering:
 * - Rendering timing data correctly
 * - Team color application
 * - Gap formatting (3 decimal places)
 * - Fastest lap highlighting
 * - Improvement detection
 * - Favorites filtering
 * - Loading and error states
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TimingDisplay } from './TimingDisplay';
import * as timingHook from '../../hooks/useTiming';
import * as driversHook from '../../hooks/useDrivers';
import type { TimingEntry, Driver } from '../../types/domain';

// Mock the hooks
vi.mock('../../hooks/useTiming');
vi.mock('../../hooks/useDrivers');

const mockUseTiming = vi.mocked(timingHook.useTiming);
const mockUseDrivers = vi.mocked(driversHook.useDrivers);

// Helper to create a test wrapper with QueryClient
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('TimingDisplay', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockDrivers: Driver[] = [
    {
      number: 1,
      name: 'Max Verstappen',
      abbreviation: 'VER',
      team: 'Red Bull Racing',
      teamColor: '#3671C6',
      nationality: 'NED',
    },
    {
      number: 44,
      name: 'Lewis Hamilton',
      abbreviation: 'HAM',
      team: 'Mercedes',
      teamColor: '#27F4D2',
      nationality: 'GBR',
    },
    {
      number: 16,
      name: 'Charles Leclerc',
      abbreviation: 'LEC',
      team: 'Ferrari',
      teamColor: '#E8002D',
      nationality: 'MON',
    },
  ];

  const mockTimingData: TimingEntry[] = [
    {
      position: 1,
      driverNumber: 1,
      lastLapTime: 83.456,
      bestLapTime: 82.123,
      gapToLeader: 0,
      gapToAhead: 0,
      isFastestLap: true,
      inPit: false,
    },
    {
      position: 2,
      driverNumber: 44,
      lastLapTime: 84.234,
      bestLapTime: 82.567,
      gapToLeader: 1.234,
      gapToAhead: 1.234,
      isFastestLap: false,
      inPit: false,
    },
    {
      position: 3,
      driverNumber: 16,
      lastLapTime: 85.123,
      bestLapTime: 83.456,
      gapToLeader: 3.567,
      gapToAhead: 2.333,
      isFastestLap: false,
      inPit: false,
    },
  ];

  it('renders timing data in table format', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    // Check table headers
    expect(screen.getByText('Pos')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('Driver')).toBeInTheDocument();
    expect(screen.getByText('Gap')).toBeInTheDocument();
    expect(screen.getByText('Int')).toBeInTheDocument();
    expect(screen.getByText('Last')).toBeInTheDocument();
    expect(screen.getByText('Best')).toBeInTheDocument();

    // Check driver data is displayed
    expect(screen.getByText('Max Verstappen')).toBeInTheDocument();
    expect(screen.getByText('Lewis Hamilton')).toBeInTheDocument();
    expect(screen.getByText('Charles Leclerc')).toBeInTheDocument();
  });

  it('displays position numbers correctly', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    const { container } = render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    // Check positions in table body cells (first column)
    const positionCells = container.querySelectorAll('tbody td:first-child');
    expect(positionCells[0]).toHaveTextContent('1');
    expect(positionCells[1]).toHaveTextContent('2');
    expect(positionCells[2]).toHaveTextContent('3');
  });

  it('displays driver numbers correctly', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    const { container } = render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    // Check driver numbers are displayed
    expect(screen.getByText('44')).toBeInTheDocument();
    expect(screen.getByText('16')).toBeInTheDocument();
  });

  it('displays gaps to 3 decimal places', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    // Leader shows "LEAD" instead of gap
    expect(screen.getByText('LEAD')).toBeInTheDocument();

    // Gap to leader and interval - there will be multiple +1.234 (gap to leader and interval for P2)
    const gaps = screen.getAllByText('+1.234');
    expect(gaps.length).toBeGreaterThanOrEqual(1);

    // Gap to leader for P3
    expect(screen.getByText('+3.567')).toBeInTheDocument();

    // Gap to ahead for P3
    expect(screen.getByText('+2.333')).toBeInTheDocument();
  });

  it('displays lap times in M:SS.XXX format', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    // Check lap time formatting (Requirement 2.5)
    // There will be multiple instances of some times (last lap and best lap)
    expect(screen.getAllByText('1:23.456').length).toBeGreaterThanOrEqual(1); // 83.456 seconds
    expect(screen.getByText('1:22.123')).toBeInTheDocument(); // 82.123 seconds
    expect(screen.getByText('1:24.234')).toBeInTheDocument(); // 84.234 seconds
  });

  it('highlights fastest lap with distinct indicator', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    // Check for fastest lap indicator (Requirement 2.6)
    const fastestLapIndicator = screen.getByLabelText('Fastest lap');
    expect(fastestLapIndicator).toBeInTheDocument();
    expect(fastestLapIndicator).toHaveTextContent('F');
  });

  it('applies team colors to driver rows', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    const { container } = render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    // Check for team color indicators (Requirement 3.3)
    const colorIndicators = container.querySelectorAll('[aria-label="Team color"]');
    expect(colorIndicators).toHaveLength(3);

    // Verify team colors are applied
    const redBullColor = Array.from(colorIndicators).find(
      el => (el as HTMLElement).style.backgroundColor === 'rgb(54, 113, 198)' // #3671C6
    );
    expect(redBullColor).toBeInTheDocument();
  });

  it('filters by favorites when favoritesOnly is true', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    const favoriteDrivers = new Set([1, 16]); // VER and LEC

    render(
      <TimingDisplay
        sessionKey={123}
        isLiveMode={false}
        favoritesOnly={true}
        favoriteDrivers={favoriteDrivers}
      />,
      { wrapper: createWrapper() }
    );

    // Should show only favorite drivers
    expect(screen.getByText('Max Verstappen')).toBeInTheDocument();
    expect(screen.getByText('Charles Leclerc')).toBeInTheDocument();
    expect(screen.queryByText('Lewis Hamilton')).not.toBeInTheDocument();
  });

  it('shows all drivers when favoritesOnly is false', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    const favoriteDrivers = new Set([1]);

    render(
      <TimingDisplay
        sessionKey={123}
        isLiveMode={false}
        favoritesOnly={false}
        favoriteDrivers={favoriteDrivers}
      />,
      { wrapper: createWrapper() }
    );

    // Should show all drivers
    expect(screen.getByText('Max Verstappen')).toBeInTheDocument();
    expect(screen.getByText('Lewis Hamilton')).toBeInTheDocument();
    expect(screen.getByText('Charles Leclerc')).toBeInTheDocument();
  });

  it('displays loading spinner while fetching data', () => {
    mockUseTiming.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any);

    render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    // Should show loading state (Requirement 18)
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays error message when timing data fails to load', () => {
    mockUseTiming.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to fetch timing data'),
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    // Should show error state (Requirement 17)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch timing data')).toBeInTheDocument();
  });

  it('displays error message when driver data fails to load', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to fetch drivers'),
    } as any);

    render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Failed to fetch drivers')).toBeInTheDocument();
  });

  it('displays empty state when no timing data is available', () => {
    mockUseTiming.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText('Timing data will appear when the session begins')).toBeInTheDocument();
  });

  it('displays empty state for favorites when none match', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    const favoriteDrivers = new Set([99]); // Non-existent driver

    render(
      <TimingDisplay
        sessionKey={123}
        isLiveMode={false}
        favoritesOnly={true}
        favoriteDrivers={favoriteDrivers}
      />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText('Add drivers to your favorites to see them here')).toBeInTheDocument();
  });

  it('displays favorite indicator for favorite drivers', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    const favoriteDrivers = new Set([1, 44]);

    render(
      <TimingDisplay
        sessionKey={123}
        isLiveMode={false}
        favoriteDrivers={favoriteDrivers}
      />,
      { wrapper: createWrapper() }
    );

    // Check for favorite stars (Requirement 11.5)
    const favoriteStars = screen.getAllByLabelText('Favorite driver');
    expect(favoriteStars).toHaveLength(2);
  });

  it('handles null lap times gracefully', () => {
    const timingWithNulls: TimingEntry[] = [
      {
        position: 1,
        driverNumber: 1,
        lastLapTime: null,
        bestLapTime: null,
        gapToLeader: null,
        gapToAhead: null,
        isFastestLap: false,
        inPit: false,
      },
    ];

    mockUseTiming.mockReturnValue({
      data: timingWithNulls,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: [mockDrivers[0]],
      isLoading: false,
      error: null,
    } as any);

    render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    // Should display "-" for null values
    expect(screen.getAllByText('-').length).toBeGreaterThan(0);
  });

  it('passes correct props to useTiming hook', () => {
    mockUseTiming.mockReturnValue({
      data: mockTimingData,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    render(
      <TimingDisplay sessionKey={456} isLiveMode={true} />,
      { wrapper: createWrapper() }
    );

    // Verify hook was called with correct parameters
    expect(mockUseTiming).toHaveBeenCalledWith(456, true);
  });

  it('displays driver fallback name when driver data is missing', () => {
    const timingWithUnknownDriver: TimingEntry[] = [
      {
        position: 1,
        driverNumber: 99,
        lastLapTime: 83.456,
        bestLapTime: 82.123,
        gapToLeader: 0,
        gapToAhead: 0,
        isFastestLap: false,
        inPit: false,
      },
    ];

    mockUseTiming.mockReturnValue({
      data: timingWithUnknownDriver,
      isLoading: false,
      error: null,
    } as any);

    mockUseDrivers.mockReturnValue({
      data: mockDrivers,
      isLoading: false,
      error: null,
    } as any);

    render(
      <TimingDisplay sessionKey={123} isLiveMode={false} />,
      { wrapper: createWrapper() }
    );

    expect(screen.getByText('Driver 99')).toBeInTheDocument();
  });
});
