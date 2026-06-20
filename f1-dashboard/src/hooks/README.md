# Hooks

Custom React hooks for the F1 Dashboard application. These hooks wrap API services with TanStack Query to provide data fetching, caching, and state management.

## useSession Hooks

### `useSessions(year: number)`

Fetches all F1 sessions for a given year with automatic caching and background refetching.

**Features:**
- 30-minute stale time (data considered fresh for 30 minutes)
- 1-hour cache time (data kept in cache for 1 hour)
- Automatic retries (3 attempts) on failure
- Loading and error states

**Example:**
```tsx
import { useSessions } from './hooks';

function SessionList() {
  const { data: sessions, isLoading, error } = useSessions(2024);

  if (isLoading) return <div>Loading sessions...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {sessions?.map(session => (
        <li key={session.key}>
          {session.name} - {session.circuit.name}
        </li>
      ))}
    </ul>
  );
}
```

### `useSession(sessionKey: number | null)`

Fetches a specific session by its key with conditional fetching support.

**Features:**
- Only fetches when `sessionKey` is not null (enabled flag)
- 30-minute stale time
- 1-hour cache time
- Automatic retries (3 attempts) on failure
- Loading and error states

**Example:**
```tsx
import { useSession } from './hooks';
import { useSessionStore } from '../stores/sessionStore';

function SessionDetails() {
  const { selectedSessionKey } = useSessionStore();
  const { data: session, isLoading, error } = useSession(selectedSessionKey);

  if (!selectedSessionKey) {
    return <div>Please select a session</div>;
  }

  if (isLoading) return <div>Loading session details...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{session?.name}</h1>
      <p>{session?.circuit.name}, {session?.circuit.country}</p>
      <p>
        {session?.isLive ? 'Live Session' : 'Historical Session'}
      </p>
    </div>
  );
}
```

## Caching Strategy

All session hooks implement the following caching strategy per the design document:

- **Stale Time**: 30 minutes - Data is considered fresh for 30 minutes
- **Cache Time (GC Time)**: 1 hour - Data remains in cache for 1 hour after last use
- **Retry**: 3 attempts - Failed requests are retried up to 3 times with exponential backoff

This strategy balances:
1. Fresh data for users (automatic background refetching after 30 minutes)
2. Reduced API calls (using cached data when fresh)
3. Good offline experience (cached data available for 1 hour)

## Requirements Fulfilled

- **Requirement 1**: Session Selection - Provides data fetching for browsing and selecting sessions
- **Requirement 19.2**: Data Caching - Implements caching with 5-minute freshness threshold
