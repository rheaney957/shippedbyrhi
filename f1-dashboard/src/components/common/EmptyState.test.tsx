/**
 * Tests for EmptyState Component
 * Validates: Requirement 1.4
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  EmptyState,
  NoSessionsEmptyState,
  NoDataEmptyState,
  NoResultsEmptyState,
  NoFavoritesEmptyState,
} from './EmptyState';

describe('EmptyState', () => {
  it('should render message', () => {
    const message = 'No data available';
    render(<EmptyState message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<EmptyState message="Empty" />);
    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();
    expect(status).toHaveAttribute('aria-live', 'polite');
  });

  it('should render default icon when not provided', () => {
    const { container } = render(<EmptyState message="Empty" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render custom icon when provided', () => {
    const customIcon = <div data-testid="custom-icon">Custom</div>;
    render(<EmptyState message="Empty" icon={customIcon} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('should have centered layout', () => {
    const { container } = render(<EmptyState message="Empty" />);
    const wrapper = screen.getByRole('status');
    expect(wrapper).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center');
  });
});

describe('NoSessionsEmptyState', () => {
  it('should render sessions-specific message', () => {
    render(<NoSessionsEmptyState />);
    expect(screen.getByText(/no f1 sessions are currently available/i)).toBeInTheDocument();
  });

  it('should render calendar icon', () => {
    const { container } = render(<NoSessionsEmptyState />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have proper accessibility', () => {
    render(<NoSessionsEmptyState />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

describe('NoDataEmptyState', () => {
  it('should render with default data type', () => {
    render(<NoDataEmptyState />);
    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });

  it('should render with custom data type', () => {
    render(<NoDataEmptyState dataType="telemetry" />);
    expect(screen.getByText(/no telemetry available/i)).toBeInTheDocument();
  });

  it('should render with timing data type', () => {
    render(<NoDataEmptyState dataType="timing data" />);
    expect(screen.getByText(/no timing data available/i)).toBeInTheDocument();
  });
});

describe('NoResultsEmptyState', () => {
  it('should render without search term', () => {
    render(<NoResultsEmptyState />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    expect(screen.getByText(/try adjusting your filters/i)).toBeInTheDocument();
  });

  it('should render with search term', () => {
    const searchTerm = 'Hamilton';
    render(<NoResultsEmptyState searchTerm={searchTerm} />);
    expect(screen.getByText(new RegExp(`no results found for "${searchTerm}"`, 'i'))).toBeInTheDocument();
  });

  it('should render search icon', () => {
    const { container } = render(<NoResultsEmptyState />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});

describe('NoFavoritesEmptyState', () => {
  it('should render favorites-specific message', () => {
    render(<NoFavoritesEmptyState />);
    expect(screen.getByText(/haven't added any favorites yet/i)).toBeInTheDocument();
  });

  it('should provide guidance on adding favorites', () => {
    render(<NoFavoritesEmptyState />);
    expect(screen.getByText(/click the star icon/i)).toBeInTheDocument();
  });

  it('should render star icon', () => {
    const { container } = render(<NoFavoritesEmptyState />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
