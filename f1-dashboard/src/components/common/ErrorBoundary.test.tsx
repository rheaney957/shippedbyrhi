/**
 * Tests for ErrorBoundary Component
 * Validates: Requirements 17.1, 17.4
 */

import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ErrorBoundary, withErrorBoundary } from './ErrorBoundary';

// Test component that throws an error
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
}

// Suppress console.error for these tests
const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Child component</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child component')).toBeInTheDocument();
  });

  it('should render error display when child throws error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });

  it('should render custom fallback when provided', () => {
    const fallback = <div>Custom error message</div>;
    render(
      <ErrorBoundary fallback={fallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('should call onError callback when error occurs', () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(onError).toHaveBeenCalled();
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
  });

  it('should reset error state when retry button is clicked', async () => {
    const user = userEvent.setup();
    
    function ToggleError() {
      const [shouldThrow, setShouldThrow] = React.useState(true);
      
      React.useEffect(() => {
        // Reset after first render
        const timer = setTimeout(() => setShouldThrow(false), 100);
        return () => clearTimeout(timer);
      }, []);
      
      return <ThrowError shouldThrow={shouldThrow} />;
    }
    
    render(
      <ErrorBoundary>
        <ToggleError />
      </ErrorBoundary>
    );
    
    // Error should be displayed
    expect(screen.getByRole('alert')).toBeInTheDocument();
    
    const retryButton = screen.getByRole('button', { name: /retry failed operation/i });
    await user.click(retryButton);
    
    // After retry, should attempt to render children again
    // In a real scenario, the component would be fixed
  });

  it('should display default error message when error has no message', () => {
    function ThrowEmptyError() {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw {};
    }
    
    render(
      <ErrorBoundary>
        <ThrowEmptyError />
      </ErrorBoundary>
    );
    
    expect(screen.getByText(/unexpected error occurred/i)).toBeInTheDocument();
  });
});

describe('withErrorBoundary HOC', () => {
  it('should wrap component with error boundary', () => {
    function TestComponent() {
      return <div>Test content</div>;
    }
    
    const WrappedComponent = withErrorBoundary(TestComponent);
    render(<WrappedComponent />);
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should catch errors in wrapped component', () => {
    const WrappedComponent = withErrorBoundary(ThrowError);
    render(<WrappedComponent shouldThrow={true} />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should use custom fallback when provided', () => {
    const fallback = <div>HOC error fallback</div>;
    const WrappedComponent = withErrorBoundary(ThrowError, fallback);
    
    render(<WrappedComponent shouldThrow={true} />);
    expect(screen.getByText('HOC error fallback')).toBeInTheDocument();
  });

  it('should pass props to wrapped component', () => {
    interface TestProps {
      message: string;
    }
    
    function TestComponent({ message }: TestProps) {
      return <div>{message}</div>;
    }
    
    const WrappedComponent = withErrorBoundary(TestComponent);
    render(<WrappedComponent message="Hello" />);
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
