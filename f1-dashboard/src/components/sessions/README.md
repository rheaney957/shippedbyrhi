# Session Components

This directory contains React components related to F1 session management and display.

## Components

### SessionSelector

Displays a list of available F1 sessions and allows users to select one for viewing.

**Validates:** Requirements 1.1, 1.2, 1.3, 1.4

### ModeIndicator

Displays whether the dashboard is currently in Live Mode or Historical Mode, with real-time update indicators.

**Validates:** Requirements 15.3, 18.3

**Features:**
- Shows "Live Mode" with pulsing green indicator when viewing an active session
- Shows "Historical Mode" with static gray indicator when viewing past sessions
- Displays "Last updated" timestamp in live mode that refreshes every 2 seconds
- Automatically updates based on session store state
- Responsive design for mobile and desktop
- Accessible with proper ARIA attributes

**Usage:**

```tsx
import { ModeIndicator } from '../components/sessions';

function Dashboard() {
  return (
    <div>
      <ModeIndicator />
      {/* Other dashboard content */}
    </div>
  );
}
```

The component automatically reads from the session store - no props required!

**Requirements Mapping:**
- **Requirement 15.3**: Dashboard SHALL clearly indicate when displaying Historical_Mode data versus Live_Mode data
- **Requirement 18.3**: While in Live_Mode, Dashboard SHALL indicate when data is being refreshed

## Implementation Notes

- All components use the `useSessionStore` Zustand store for state management
- Live mode is determined by checking if current time falls within the session's active window (30 minutes before start to 30 minutes after end)
- Components follow the project's Tailwind CSS styling patterns
- All components include comprehensive unit tests
