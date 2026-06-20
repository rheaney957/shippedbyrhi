import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import DriverProfile from './pages/DriverProfile';
import TeamPage from './pages/TeamPage';
import NotFound from './pages/NotFound';
import * as sessionHooks from './hooks/useSession';

// Mock session hooks
vi.mock('./hooks/useSession');

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

describe('Application Routing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock useSessions hook to return empty data
    vi.mocked(sessionHooks.useSessions).mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    } as any);
  });

  it('should render Dashboard at /', () => {
    const queryClient = createTestQueryClient();
    const router = createMemoryRouter(
      [
        { path: '/', element: <Dashboard /> },
        { path: '/driver/:driverNumber', element: <DriverProfile /> },
        { path: '/team/:teamName', element: <TeamPage /> },
        { path: '*', element: <NotFound /> },
      ],
      { initialEntries: ['/'] }
    );

    render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    );
    
    // Check for unique content from Dashboard page
    expect(screen.getByText(/Real-time and historical Formula 1 data visualization/)).toBeInTheDocument();
    expect(screen.getByText(/Select a session from the list to view detailed data/)).toBeInTheDocument();
  });

  it('should render DriverProfile at /driver/:driverNumber', () => {
    const router = createMemoryRouter(
      [
        { path: '/', element: <Dashboard /> },
        { path: '/driver/:driverNumber', element: <DriverProfile /> },
        { path: '/team/:teamName', element: <TeamPage /> },
        { path: '*', element: <NotFound /> },
      ],
      { initialEntries: ['/driver/44'] }
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByText('Driver Profile')).toBeInTheDocument();
    expect(screen.getByText(/Driver #44/)).toBeInTheDocument();
  });

  it('should render TeamPage at /team/:teamName', () => {
    const router = createMemoryRouter(
      [
        { path: '/', element: <Dashboard /> },
        { path: '/driver/:driverNumber', element: <DriverProfile /> },
        { path: '/team/:teamName', element: <TeamPage /> },
        { path: '*', element: <NotFound /> },
      ],
      { initialEntries: ['/team/Mercedes'] }
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByText('Team Page')).toBeInTheDocument();
    expect(screen.getByText(/Mercedes/)).toBeInTheDocument();
  });

  it('should render NotFound for unknown routes', () => {
    const router = createMemoryRouter(
      [
        { path: '/', element: <Dashboard /> },
        { path: '/driver/:driverNumber', element: <DriverProfile /> },
        { path: '/team/:teamName', element: <TeamPage /> },
        { path: '*', element: <NotFound /> },
      ],
      { initialEntries: ['/unknown-route'] }
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('should have navigation links in DriverProfile', () => {
    const router = createMemoryRouter(
      [
        { path: '/', element: <Dashboard /> },
        { path: '/driver/:driverNumber', element: <DriverProfile /> },
        { path: '/team/:teamName', element: <TeamPage /> },
        { path: '*', element: <NotFound /> },
      ],
      { initialEntries: ['/driver/44'] }
    );

    render(<RouterProvider router={router} />);
    const backLink = screen.getByText('← Back to Dashboard');
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('should have navigation links in TeamPage', () => {
    const router = createMemoryRouter(
      [
        { path: '/', element: <Dashboard /> },
        { path: '/driver/:driverNumber', element: <DriverProfile /> },
        { path: '/team/:teamName', element: <TeamPage /> },
        { path: '*', element: <NotFound /> },
      ],
      { initialEntries: ['/team/Mercedes'] }
    );

    render(<RouterProvider router={router} />);
    const backLink = screen.getByText('← Back to Dashboard');
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/');
  });

  it('should have return link in NotFound page', () => {
    const router = createMemoryRouter(
      [
        { path: '/', element: <Dashboard /> },
        { path: '/driver/:driverNumber', element: <DriverProfile /> },
        { path: '/team/:teamName', element: <TeamPage /> },
        { path: '*', element: <NotFound /> },
      ],
      { initialEntries: ['/unknown'] }
    );

    render(<RouterProvider router={router} />);
    const returnLink = screen.getByText('Return to Dashboard');
    expect(returnLink).toBeInTheDocument();
    expect(returnLink).toHaveAttribute('href', '/');
  });
});
