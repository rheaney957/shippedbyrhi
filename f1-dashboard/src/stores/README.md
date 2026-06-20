# Zustand Stores

This directory contains Zustand state stores for client-side state management in the F1 Dashboard application.

## Session Store

The `sessionStore` manages the currently selected F1 session and its live mode status.

### Usage

```typescript
import { useSessionStore } from './stores';

function SessionSelector() {
  const { selectedSessionKey, isLiveMode, setSelectedSession } = useSessionStore();
  
  const handleSelectSession = (session: Session) => {
    setSelectedSession(session);
  };
  
  return (
    <div>
      <p>Selected Session: {selectedSessionKey}</p>
      <p>Live Mode: {isLiveMode ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

### State

- **selectedSessionKey**: `number | null` - The unique identifier of the currently selected session
- **selectedSession**: `Session | null` - The full session object with all metadata
- **isLiveMode**: `boolean` - Computed value indicating if the session is currently live

### Actions

- **setSelectedSession(session: Session | null)**: Updates the selected session and recomputes the live mode status

### Live Mode Calculation

A session is considered "live" when the current time falls within:
- 30 minutes before the session start time
- The duration of the session
- 30 minutes after the session end time

This provides a buffer for pre-session buildup and post-session analysis while the data is still being updated in real-time.

## Future Stores

Additional stores will be added for:
- **favoritesStore**: Managing user-favorited drivers and teams (persisted to localStorage)
- **viewPreferencesStore**: Managing UI preferences like compact mode, theme, and filters
