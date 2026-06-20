# Common UI Components

This directory contains reusable UI components for loading, error, and empty states throughout the F1 Dashboard application.

## Components

### LoadingSpinner

Displays a loading indicator with optional message and skeleton placeholders.

**Validates:** Requirements 18.1, 18.2, 18.3

**Usage:**
```tsx
import { LoadingSpinner, SkeletonTimingRow, LoadingIndicator } from '@/components/common';

// Basic spinner
<LoadingSpinner />

// With custom size and message
<LoadingSpinner size="large" message="Loading race data..." />

// Skeleton placeholders for timing rows
<SkeletonTimingRow />

// Inline refresh indicator
<LoadingIndicator text="Refreshing..." />
```

**Props:**
- `size?: 'small' | 'medium' | 'large'` - Size of the spinner (default: 'medium')
- `message?: string` - Optional message to display below spinner

### ErrorDisplay

Displays user-friendly error messages with optional retry button.

**Validates:** Requirements 17.1, 17.2, 17.4

**Usage:**
```tsx
import { ErrorDisplay, NetworkErrorDisplay, APIErrorDisplay } from '@/components/common';

// Basic error display
<ErrorDisplay message="Failed to load data" onRetry={handleRetry} />

// Network error
<NetworkErrorDisplay onRetry={handleRetry} />

// API error with status code
<APIErrorDisplay statusCode={503} onRetry={handleRetry} />
```

**Props:**
- `message: string` - Error message to display
- `onRetry?: () => void` - Optional callback for retry button

### ErrorBoundary

Catches React errors and displays a fallback UI.

**Validates:** Requirements 17.1, 17.4

**Usage:**
```tsx
import { ErrorBoundary, withErrorBoundary } from '@/components/common';

// Wrap components
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary fallback={<CustomErrorUI />}>
  <YourComponent />
</ErrorBoundary>

// As HOC
const SafeComponent = withErrorBoundary(YourComponent);
```

**Props:**
- `children: ReactNode` - Components to wrap
- `fallback?: ReactNode` - Custom error UI (optional)
- `onError?: (error: Error, errorInfo: ErrorInfo) => void` - Error callback (optional)

### EmptyState

Displays user-friendly empty state messages for "no data" scenarios.

**Validates:** Requirement 1.4

**Usage:**
```tsx
import { 
  EmptyState, 
  NoSessionsEmptyState, 
  NoDataEmptyState,
  NoResultsEmptyState,
  NoFavoritesEmptyState 
} from '@/components/common';

// Generic empty state
<EmptyState message="No data available" />

// With custom icon
<EmptyState message="No items" icon={<CustomIcon />} />

// Specialized empty states
<NoSessionsEmptyState />
<NoDataEmptyState dataType="telemetry" />
<NoResultsEmptyState searchTerm="Hamilton" />
<NoFavoritesEmptyState />
```

**Props:**
- `message: string` - Message to display
- `icon?: ReactNode` - Custom icon (optional)

## Testing

All components have comprehensive test coverage. Run tests with:

```bash
npm test -- src/components/common
```

## Accessibility

All components follow accessibility best practices:
- Proper ARIA roles and labels
- Live regions for dynamic content
- Keyboard navigation support
- Screen reader friendly

## Requirements Coverage

- **Requirement 17.1:** User-friendly error messages for API errors ✓
- **Requirement 17.2:** Connection error notifications ✓
- **Requirement 17.4:** Retry option for failed operations ✓
- **Requirement 18.1:** Loading indicators while fetching data ✓
- **Requirement 18.2:** Skeleton placeholders during initial load ✓
- **Requirement 18.3:** Data refresh indicators in Live Mode ✓
