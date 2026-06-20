/**
 * Tests for LoadingSpinner Component
 * Validates: Requirements 18.1, 18.2, 18.3
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  LoadingSpinner,
  SkeletonPlaceholder,
  SkeletonTimingRow,
  SkeletonCard,
  LoadingIndicator,
} from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should render loading spinner with default size', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status', { name: /loading/i });
    expect(spinner).toBeInTheDocument();
  });

  it('should render loading spinner with small size', () => {
    render(<LoadingSpinner size="small" />);
    const spinner = screen.getByRole('status', { name: /loading/i });
    expect(spinner).toHaveClass('w-8', 'h-8');
  });

  it('should render loading spinner with medium size', () => {
    render(<LoadingSpinner size="medium" />);
    const spinner = screen.getByRole('status', { name: /loading/i });
    expect(spinner).toHaveClass('w-12', 'h-12');
  });

  it('should render loading spinner with large size', () => {
    render(<LoadingSpinner size="large" />);
    const spinner = screen.getByRole('status', { name: /loading/i });
    expect(spinner).toHaveClass('w-16', 'h-16');
  });

  it('should display optional message when provided', () => {
    const message = 'Loading race data...';
    render(<LoadingSpinner message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('should not display message when not provided', () => {
    const { container } = render(<LoadingSpinner />);
    const text = container.querySelector('p');
    expect(text).not.toBeInTheDocument();
  });

  it('should have animate-spin class for animation', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole('status', { name: /loading/i });
    expect(spinner).toHaveClass('animate-spin');
  });

  it('should have proper accessibility attributes', () => {
    const message = 'Loading...';
    render(<LoadingSpinner message={message} />);
    const spinner = screen.getByRole('status', { name: /loading/i });
    const text = screen.getByText(message);
    
    expect(spinner).toHaveAttribute('aria-label', 'Loading');
    expect(text).toHaveAttribute('aria-live', 'polite');
  });
});

describe('SkeletonPlaceholder', () => {
  it('should render with default dimensions', () => {
    render(<SkeletonPlaceholder />);
    const skeleton = screen.getByRole('status', { name: /loading content/i });
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('w-full', 'h-4');
  });

  it('should render with custom width', () => {
    render(<SkeletonPlaceholder width="w-1/2" />);
    const skeleton = screen.getByRole('status', { name: /loading content/i });
    expect(skeleton).toHaveClass('w-1/2');
  });

  it('should render with custom height', () => {
    render(<SkeletonPlaceholder height="h-8" />);
    const skeleton = screen.getByRole('status', { name: /loading content/i });
    expect(skeleton).toHaveClass('h-8');
  });

  it('should apply custom className', () => {
    render(<SkeletonPlaceholder className="rounded-full" />);
    const skeleton = screen.getByRole('status', { name: /loading content/i });
    expect(skeleton).toHaveClass('rounded-full');
  });

  it('should have animate-pulse class for animation', () => {
    render(<SkeletonPlaceholder />);
    const skeleton = screen.getByRole('status', { name: /loading content/i });
    expect(skeleton).toHaveClass('animate-pulse');
  });
});

describe('SkeletonTimingRow', () => {
  it('should render multiple skeleton placeholders', () => {
    render(<SkeletonTimingRow />);
    const skeletons = screen.getAllByRole('status', { name: /loading content/i });
    expect(skeletons.length).toBeGreaterThan(1);
  });

  it('should have proper structure for timing row', () => {
    const { container } = render(<SkeletonTimingRow />);
    const row = container.firstChild as HTMLElement;
    expect(row).toHaveClass('flex', 'items-center', 'gap-4');
  });
});

describe('SkeletonCard', () => {
  it('should render multiple skeleton placeholders in card layout', () => {
    render(<SkeletonCard />);
    const skeletons = screen.getAllByRole('status', { name: /loading content/i });
    expect(skeletons.length).toBeGreaterThan(1);
  });

  it('should have card styling', () => {
    const { container } = render(<SkeletonCard />);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'shadow');
  });
});

describe('LoadingIndicator', () => {
  it('should render with default text', () => {
    render(<LoadingIndicator />);
    expect(screen.getByText('Refreshing...')).toBeInTheDocument();
  });

  it('should render with custom text', () => {
    const customText = 'Updating data...';
    render(<LoadingIndicator text={customText} />);
    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it('should have spinner with proper size', () => {
    render(<LoadingIndicator />);
    const spinner = screen.getByRole('status', { name: /refreshing/i });
    expect(spinner).toHaveClass('w-4', 'h-4');
  });

  it('should have proper accessibility attributes', () => {
    render(<LoadingIndicator text="Loading..." />);
    const spinner = screen.getByRole('status', { name: /refreshing/i });
    const text = screen.getByText('Loading...');
    
    expect(spinner).toHaveAttribute('aria-label', 'Refreshing');
    expect(text).toHaveAttribute('aria-live', 'polite');
  });

  it('should have animate-spin class', () => {
    render(<LoadingIndicator />);
    const spinner = screen.getByRole('status', { name: /refreshing/i });
    expect(spinner).toHaveClass('animate-spin');
  });
});
