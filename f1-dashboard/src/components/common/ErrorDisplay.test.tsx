/**
 * Tests for ErrorDisplay Component
 * Validates: Requirements 17.1, 17.2, 17.4
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  ErrorDisplay,
  NetworkErrorDisplay,
  APIErrorDisplay,
  InlineError,
} from './ErrorDisplay';

describe('ErrorDisplay', () => {
  it('should render error message', () => {
    const message = 'An error has occurred';
    render(<ErrorDisplay message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('should have proper alert role', () => {
    render(<ErrorDisplay message="Error" />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute('aria-live', 'assertive');
  });

  it('should render retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(<ErrorDisplay message="Error" onRetry={onRetry} />);
    const button = screen.getByRole('button', { name: /retry/i });
    expect(button).toBeInTheDocument();
  });

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorDisplay message="Error" />);
    const button = screen.queryByRole('button', { name: /retry/i });
    expect(button).not.toBeInTheDocument();
  });

  it('should call onRetry when button is clicked', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorDisplay message="Error" onRetry={onRetry} />);
    
    const button = screen.getByRole('button', { name: /retry/i });
    await user.click(button);
    
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should display error icon', () => {
    const { container } = render(<ErrorDisplay message="Error" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have proper styling', () => {
    const { container } = render(<ErrorDisplay message="Error" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('bg-red-50', 'border-red-200');
  });
});

describe('NetworkErrorDisplay', () => {
  it('should render network error message', () => {
    render(<NetworkErrorDisplay />);
    expect(screen.getByText(/unable to connect to the network/i)).toBeInTheDocument();
  });

  it('should render retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(<NetworkErrorDisplay onRetry={onRetry} />);
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('should call onRetry when button is clicked', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<NetworkErrorDisplay onRetry={onRetry} />);
    
    const button = screen.getByRole('button', { name: /retry/i });
    await user.click(button);
    
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});

describe('APIErrorDisplay', () => {
  it('should render default API error message when no status code provided', () => {
    render(<APIErrorDisplay />);
    expect(screen.getByText(/unable to load f1 data/i)).toBeInTheDocument();
  });

  it('should render 503 specific message', () => {
    render(<APIErrorDisplay statusCode={503} />);
    expect(screen.getByText(/service is temporarily unavailable/i)).toBeInTheDocument();
  });

  it('should render 404 specific message', () => {
    render(<APIErrorDisplay statusCode={404} />);
    expect(screen.getByText(/could not be found/i)).toBeInTheDocument();
  });

  it('should render 500+ specific message', () => {
    render(<APIErrorDisplay statusCode={500} />);
    expect(screen.getByText(/experiencing issues/i)).toBeInTheDocument();
  });

  it('should render retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(<APIErrorDisplay onRetry={onRetry} />);
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('should call onRetry when button is clicked', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<APIErrorDisplay statusCode={503} onRetry={onRetry} />);
    
    const button = screen.getByRole('button', { name: /retry/i });
    await user.click(button);
    
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});

describe('InlineError', () => {
  it('should render error message', () => {
    const message = 'Invalid input';
    render(<InlineError message={message} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('should have proper alert role', () => {
    render(<InlineError message="Error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should display error icon', () => {
    const { container } = render(<InlineError message="Error" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have compact styling', () => {
    const { container } = render(<InlineError message="Error" />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('text-sm', 'bg-red-50');
  });
});
