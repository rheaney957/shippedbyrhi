# Implementation Plan: OpenF1 Dashboard

## Overview

This implementation plan breaks down the OpenF1 Dashboard feature into 8 phases following the technical design. The application is built with Vite, TypeScript, React, TanStack Query, Zustand, and Tailwind CSS. Each task references specific requirements and builds incrementally to create a fully functional F1 data visualization dashboard.

## Tasks

- [x] 1. Phase 1: Foundation and Project Setup
  - [x] 1.1 Initialize Vite project with TypeScript and React
    - Create Vite project using `npm create vite@latest` with react-ts template
    - Install core dependencies: @tanstack/react-query, zustand, react-router-dom, axios
    - Install dev dependencies: @testing-library/react, @testing-library/user-event, vitest, jsdom, fast-check
    - Install UI dependencies: tailwindcss, postcss, autoprefixer, recharts
    - Configure Tailwind CSS with custom theme for F1 branding
    - Set up Vitest configuration for unit and component testing
    - _Requirements: All requirements - foundation for entire application_

  - [x] 1.2 Create TypeScript type definitions for API and domain models
    - Implement all OpenF1 API response types in `src/types/api.ts` (SessionResponse, DriverResponse, PositionResponse, LapResponse, IntervalResponse, CarDataResponse, WeatherResponse, RaceControlResponse, PitStopResponse, TeamRadioResponse)
    - Implement normalized domain models in `src/types/domain.ts` (Session, Driver, TimingEntry, TelemetryPoint, Weather, FlagStatus, PitStop, RadioMessage)
    - Implement UI-specific types in `src/types/ui.ts` (component props, state shapes)
    - _Requirements: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14_

  - [x] 1.3 Implement API client with error handling and retry logic
    - Create axios instance in `src/api/client.ts` with base URL, timeout, and headers
    - Add request interceptor for logging
    - Add response interceptor with retry logic (up to 3 attempts with exponential backoff)
    - Implement error classification (NetworkError, APIError, NetworkTimeoutError)
    - _Requirements: 17.1, 17.2, 17.3_

  - [x] 1.4 Set up TanStack Query client with caching configuration
    - Create QueryClient in `src/main.tsx` with default options (retry: 3, retryDelay with exponential backoff)
    - Configure QueryClientProvider for the application
    - Set up cache time and stale time defaults
    - _Requirements: 19.1, 19.2_

  - [x] 1.5 Create application routing structure
    - Implement router configuration in `src/router.tsx` with routes for Dashboard (/), DriverProfile (/driver/:driverNumber), TeamPage (/team/:teamName), and NotFound (*)
    - Set up RouterProvider in `src/App.tsx`
    - _Requirements: 1, 3.2, 4, 12_

  - [x] 1.6 Implement basic layout components
    - Create Header component with navigation and app title
    - Create layout Container component for consistent spacing
    - Create responsive Sidebar component for desktop navigation
    - Implement responsive breakpoint strategy (mobile < 768px, tablet 768-1023px, desktop >= 1024px)
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

  - [x] 1.7 Create common UI components for loading and error states
    - Implement LoadingSpinner component with skeleton placeholders
    - Implement ErrorDisplay component with user-friendly messages and retry button
    - Create ErrorBoundary component for catching React errors
    - Implement EmptyState component for "no data" scenarios
    - _Requirements: 17.1, 17.4, 18.1, 18.2_

  - [ ]* 1.8 Write unit tests for error handling utilities
    - Test error classification functions
    - Test user-friendly message generation
    - Test retry logic calculations
    - _Requirements: 17_

- [x] 2. Phase 2: Session Selection and Core API Integration
  - [x] 2.1 Implement sessions API service
    - Create `src/api/services/sessions.ts` with getSessions and getSession functions
    - Implement session normalization function (parseSessionType, calculate isLive status)
    - Handle API response mapping from SessionResponse to Session domain model
    - _Requirements: 1.1, 1.2, 15.3_

  - [x] 2.2 Create useSession and useSessions custom hooks
    - Implement `src/hooks/useSession.ts` with TanStack Query integration
    - Configure staleTime (30 minutes) and cacheTime (1 hour) per design
    - Add enabled flag for conditional fetching
    - _Requirements: 1, 19.2_

  - [x] 2.3 Build SessionSelector component
    - Create component that displays list of available sessions
    - Implement session selection handler
    - Display session metadata (circuit name, date, session type)
    - Show loading state while fetching sessions
    - Display empty state when no sessions available
    - Highlight currently selected session
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 18.1_

  - [x] 2.4 Create session state store with Zustand
    - Implement `src/stores/sessionStore.ts` with selectedSessionKey and isLiveMode
    - Add setSelectedSession action
    - Compute isLiveMode based on session start/end times
    - _Requirements: 1, 15.3_

  - [ ]* 2.5 Write property test for session live status determination
    - **Property 9: Session Live Status Determination**
    - **Validates: Requirements 15.3**
    - Test that isLive calculation returns correct value for any timestamp relative to session times
    - Verify boundaries at 30 minutes before start and 30 minutes after end
    - Use fast-check with date and time offset generators

  - [ ]* 2.6 Write unit tests for session service
    - Test session normalization function
    - Test parseSessionType function
    - Test API response mapping
    - _Requirements: 1, 15.3_

- [ ] 3. Phase 3: Core Timing Display
  - [x] 3.1 Implement timing API service
    - Create `src/api/services/timing.ts` with getTiming function
    - Implement mergeLapsAndIntervals function to combine lap data and interval data
    - Calculate positions, fastest lap identification, and gaps
    - Return TimingEntry array sorted by position
    - _Requirements: 2.1, 2.4, 2.5, 2.6, 2.7_

  - [x] 3.2 Create formatting utility functions
    - Implement `src/utils/formatting.ts` with formatTime (time to "+X.XXXs" format), formatGap (gap to 3 decimal places), formatLapTime (lap time to "M:SS.XXX" format)
    - Ensure proper sign handling (+ for positive, - for negative, no sign for zero)
    - Handle null values gracefully
    - _Requirements: 2.4, 2.5, 8.2_

  - [ ]* 3.3 Write property test for time formatting consistency
    - **Property 1: Time Formatting Consistency**
    - **Validates: Requirements 2.4, 8.2**
    - Test that formatTime produces exactly 3 decimal places for any numeric time value
    - Verify proper sign indication and 's' suffix
    - Use fast-check with float generators

  - [ ] 3.4 Create useTiming custom hook with live polling
    - Implement `src/hooks/useTiming.ts` with TanStack Query integration
    - Configure refetchInterval: 2000ms when isLiveMode is true, false otherwise
    - Set staleTime: 0 in live mode, 5 minutes in historical mode
    - _Requirements: 2.2, 15.2_

  - [ ] 3.5 Implement calculation utilities for timing data
    - Create `src/utils/calculations.ts` with functions: detectLapImprovement, identifyFastestLap, calculateGapsToLeader
    - Handle null values correctly in all calculations
    - Ensure monotonically increasing gaps for sorted positions
    - _Requirements: 2.3, 2.6, 2.7_

  - [ ]* 3.6 Write property tests for timing calculations
    - **Property 2: Lap Time Improvement Detection**
    - **Validates: Requirements 2.3**
    - Test detectLapImprovement returns true iff current < previous
    - **Property 3: Fastest Lap Identification**
    - **Validates: Requirements 2.6**
    - Test identifyFastestLap returns minimum lap time and is idempotent
    - **Property 4: Gap Calculation Correctness**
    - **Validates: Requirements 2.7**
    - Test calculateGapsToLeader produces zero gap for P1, positive gaps for others, monotonically increasing gaps

  - [x] 3.7 Implement drivers API service and hook
    - Create `src/api/services/drivers.ts` with getDrivers function
    - Normalize DriverResponse to Driver domain model (add # to teamColor hex)
    - Create `src/hooks/useDrivers.ts` with 24-hour cache time for driver data
    - _Requirements: 3.1, 3.3, 3.4_

  - [ ] 3.8 Build TimingDisplay component
    - Create component that displays timing data in a table/list format
    - Show position, driver number, driver name, gaps, last lap time, best lap time
    - Apply team colors to visually distinguish drivers
    - Highlight lap time improvements with visual indicator
    - Highlight fastest lap with distinct indicator
    - Display gaps to 3 decimal places
    - Support favoritesOnly filtering prop
    - _Requirements: 2.1, 2.3, 2.4, 2.5, 2.6, 2.7, 3.1, 3.3_

  - [ ] 3.9 Add live mode indicator component
    - Create ModeIndicator component showing "Live Mode" or "Historical Mode"
    - Update display based on isLiveMode from session store
    - Add "last updated" timestamp in live mode
    - _Requirements: 15.3, 18.3_

  - [ ]* 3.10 Write component tests for TimingDisplay
    - Test loading state display
    - Test fastest lap highlighting
    - Test improvement highlighting
    - Test favorites filtering
    - _Requirements: 2, 3_

- [ ] 4. Checkpoint - Core timing functionality complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Phase 4: Track Visualization and Live Polling
  - [ ] 5.1 Create circuit layout data and constants
    - Define circuit SVG path data in `src/constants/circuits.ts` for major F1 tracks
    - Include sector boundaries (percentage along track) for each circuit
    - Provide default/fallback circuit layout for unknown circuits
    - _Requirements: 7.1, 7.5_

  - [ ] 5.2 Implement positions API service
    - Create `src/api/services/positions.ts` with getPositions function
    - Map PositionResponse to DriverPosition domain model
    - Handle coordinate normalization (0-1000 range)
    - _Requirements: 7.2, 7.3_

  - [ ] 5.3 Create usePositions hook with live polling
    - Implement `src/hooks/usePositions.ts` with 2-second refetch interval in live mode
    - Configure similar caching strategy as timing data
    - _Requirements: 7.3, 7.6_

  - [ ] 5.4 Build TrackMap component with SVG rendering
    - Create component that renders circuit layout as SVG path
    - Display driver position markers using team colors
    - Implement hover tooltip showing driver name and position
    - Draw sector boundaries on the circuit
    - Scale and position SVG appropriately for container
    - Handle responsive sizing (desktop: 600x400px, tablet: 400x300px, mobile: 320x240px)
    - _Requirements: 7.1, 7.2, 7.4, 7.5, 16_

  - [ ] 5.5 Implement position animation logic
    - Add smooth transitions for driver marker positions using CSS transforms or animation library
    - Update marker positions when new position data arrives
    - Ensure animation doesn't lag behind real-time updates
    - _Requirements: 7.3, 7.6_

  - [ ] 5.6 Create useLivePolling orchestration hook
    - Implement `src/hooks/useLivePolling.ts` that sets up polling intervals
    - Poll timing, positions, flags every 2 seconds in live mode
    - Poll weather every 30 seconds in live mode
    - Clean up intervals when component unmounts or live mode ends
    - _Requirements: 2.2, 6.5, 7.6, 14.5_

  - [ ]* 5.7 Write component tests for TrackMap
    - Test circuit rendering
    - Test driver marker display
    - Test hover tooltip
    - Test sector boundary rendering
    - _Requirements: 7_

- [ ] 6. Phase 5: Race Control and Flags
  - [ ] 6.1 Implement flags API service
    - Create `src/api/services/flags.ts` with getFlags function
    - Parse RaceControlResponse to extract flag information
    - Normalize to FlagStatus domain model
    - Filter by category="Flag" or category="SafetyCar"
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6_

  - [ ] 6.2 Create useFlags hook with live polling
    - Implement `src/hooks/useFlags.ts` with 2-second refetch interval in live mode
    - Return current flag status from most recent race control message
    - _Requirements: 6.5_

  - [ ] 6.3 Build FlagsDisplay component
    - Create component that prominently displays current flag status
    - Show yellow flag with affected sector number
    - Show red flag indicator covering full screen header area
    - Show blue flag next to affected driver in timing display
    - Display safety car or virtual safety car status
    - Use appropriate colors and icons for each flag type
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6_

  - [ ] 6.4 Integrate flag indicators into TimingDisplay
    - Add blue flag indicator column/icon in timing rows
    - Update pit lane indicator when driver enters pits
    - _Requirements: 6.4, 8.5_

  - [ ]* 6.5 Write component tests for FlagsDisplay
    - Test each flag type renders correctly
    - Test sector display for yellow flags
    - Test safety car status display
    - _Requirements: 6_

- [ ] 7. Phase 6: Additional Data Features
  - [ ] 7.1 Implement telemetry API service
    - Create `src/api/services/telemetry.ts` with getTelemetry function
    - Map CarDataResponse to TelemetryPoint domain model
    - Aggregate data points for a specific driver and lap
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ] 7.2 Create useTelemetry hook
    - Implement `src/hooks/useTelemetry.ts` with conditional fetching based on driver selection
    - Handle telemetry unavailable state gracefully
    - _Requirements: 5.1, 5.5_

  - [ ] 7.3 Build TelemetryChart component
    - Create component using Recharts to visualize telemetry data
    - Display speed, throttle, brake, and gear on synchronized charts
    - Use line charts for speed, area charts for throttle/brake
    - Show "Data not available" message when telemetry is unavailable
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 7.4 Implement pit stops API service
    - Create `src/api/services/pit-stops.ts` with getPitStops function
    - Map PitStopResponse to PitStop domain model
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

  - [ ] 7.5 Create usePitStops hook
    - Implement `src/hooks/usePitStops.ts` for fetching pit stop data
    - _Requirements: 8_

  - [ ] 7.6 Build PitStopPanel component
    - Create component displaying pit stop summary for each driver
    - Show pit stop duration to 3 decimal places
    - Display lap number for each stop
    - Rank pit stops by duration to show fastest crews
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 7.7 Write property test for pit stop sorting
    - **Property 6: Pit Stop Sorting Correctness**
    - **Validates: Requirements 8.4**
    - Test sorting produces non-decreasing order by duration
    - Verify all elements present and stable sort for equal durations

  - [ ] 7.8 Implement radio messages API service
    - Create `src/api/services/radio.ts` with getRadioMessages function
    - Map TeamRadioResponse to RadioMessage domain model
    - _Requirements: 9.1, 9.2, 9.5_

  - [ ] 7.9 Create useRadio hook with live updates
    - Implement `src/hooks/useRadio.ts` with polling for live messages
    - Limit to most recent 20 messages by default
    - _Requirements: 9.4, 9.5_

  - [ ] 7.10 Build RadioFeed component
    - Create component displaying scrollable feed of radio messages
    - Show driver name and timestamp for each message
    - Implement driver filter dropdown
    - Add new messages to feed in live mode
    - Display most recent 20 messages
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 7.11 Write property test for array filtering
    - **Property 5: Array Filtering Preserves Predicates**
    - **Validates: Requirements 9.3, 11.4, 13.6, 13.7**
    - Test that filtered array contains only items satisfying predicate
    - Verify order preservation and idempotence

  - [ ] 7.12 Implement weather API service
    - Create `src/api/services/weather.ts` with getWeather function
    - Map WeatherResponse to Weather domain model
    - Determine rainfall boolean from rainfall value
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

  - [ ] 7.13 Create useWeather hook with 30-second polling
    - Implement `src/hooks/useWeather.ts` with 30-second refetch interval in live mode
    - _Requirements: 14.5_

  - [ ] 7.14 Build WeatherModule component
    - Create component displaying current weather conditions
    - Show air temperature, track temperature, humidity, rainfall status
    - Update every 30 seconds in live mode
    - Use weather icons for visual representation
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

  - [ ]* 7.15 Write component tests for weather, pit stops, and radio components
    - Test WeatherModule displays all weather data correctly
    - Test PitStopPanel sorting and display
    - Test RadioFeed filtering and message display
    - _Requirements: 8, 9, 14_

- [ ] 8. Checkpoint - All data features implemented
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Phase 7: Driver Profiles, Teams, and Advanced Features
  - [ ] 9.1 Implement driver profile data aggregation
    - Create functions in `src/api/services/drivers.ts` to aggregate driver season statistics
    - Calculate championship position, season points, career points
    - Fetch season race results for a driver
    - Fetch best lap times across sessions
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ] 9.2 Build DriverProfilePage component
    - Create page displaying driver biographical information (name, number, team, nationality with flag)
    - Show championship position and season points
    - Display career statistics including total career points
    - Show season race results table
    - Display best lap times for each session
    - Provide navigation back to main dashboard
    - _Requirements: 3.2, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [ ] 9.3 Create team colors and data constants
    - Define team color mappings in `src/constants/teams.ts`
    - Include primary and secondary colors for each F1 team
    - _Requirements: 3.3, 12.4_

  - [ ] 9.4 Implement team data aggregation
    - Create functions to aggregate team championship data
    - Calculate constructor points and position
    - Fetch current driver lineup for each team
    - _Requirements: 12.2, 12.3_

  - [ ] 9.5 Build TeamPage component
    - Create page displaying team information
    - Show constructor championship position and points
    - Display current driver lineup with links to driver profiles
    - Apply team colors and branding
    - Provide navigation back to dashboard
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

  - [ ] 9.6 Implement favorites Zustand store with localStorage persistence
    - Create `src/stores/favoritesStore.ts` with Set-based state for drivers and teams
    - Implement addDriver, removeDriver, addTeam, removeTeam actions
    - Implement isFavoriteDriver and isFavoriteTeam selectors
    - Configure zustand persist middleware with localStorage
    - Implement custom serialize/deserialize for Set <-> Array conversion
    - _Requirements: 11.1, 11.2, 11.3_

  - [ ]* 9.7 Write property test for favorites storage round-trip
    - **Property 7: Favorites Storage Round-Trip**
    - **Validates: Requirements 11.3**
    - Test that serialize then deserialize preserves all favorite drivers and teams
    - Use fast-check to generate arbitrary arrays of drivers and teams

  - [ ] 9.8 Add favorite indicators and filtering to UI
    - Add star icon to TimingDisplay for marking drivers as favorites
    - Implement favoritesOnly filter toggle
    - Highlight favorites with visual indicator in all views
    - Persist favorite state across sessions
    - _Requirements: 11.4, 11.5_

  - [ ] 9.9 Implement circuit history API queries
    - Create functions in `src/api/services/sessions.ts` to fetch historical races for a circuit
    - Aggregate race results, winners, and pit stop strategies by year
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.8_

  - [ ] 9.10 Create useCircuitHistory hook
    - Implement `src/hooks/useCircuitHistory.ts` for fetching historical data
    - _Requirements: 13_

  - [ ] 9.11 Build CircuitHistory component
    - Create component displaying previous years' results at current circuit
    - Show finishing positions, winning team and driver for each year
    - Display pit stop strategies including number of stops and lap numbers
    - Implement team and driver filter dropdowns
    - Show average pit stop times by team
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8_

  - [ ] 9.12 Build ComparisonTool component
    - Create component allowing selection of two drivers for comparison
    - Display lap time comparison chart over the session
    - Show sector time comparison
    - Display speed comparison at key circuit points when telemetry available
    - Use Recharts for graphical comparison
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ]* 9.13 Write component tests for driver profile, team page, and comparison tool
    - Test DriverProfilePage displays all driver information
    - Test TeamPage displays team data and driver lineup
    - Test ComparisonTool handles driver selection and displays comparisons
    - _Requirements: 4, 10, 12_

- [ ] 10. Phase 8: Polish, Caching, and Responsive Design
  - [ ] 10.1 Implement cache utilities
    - Create `src/utils/caching.ts` with cache key generation functions
    - Implement cache age calculation function
    - Implement freshness determination (age < 5 minutes)
    - _Requirements: 19.1, 19.2_

  - [ ]* 10.2 Write property test for cache age calculation
    - **Property 8: Cache Age Calculation**
    - **Validates: Requirements 19.2**
    - Test that age is non-negative, zero when timestamps equal, increases with time
    - Test freshness threshold (5 minutes)

  - [ ] 10.3 Add force refresh functionality
    - Add refresh button to dashboard header
    - Implement force refetch by invalidating React Query cache
    - Show refresh in progress indicator
    - _Requirements: 19.3_

  - [ ] 10.4 Optimize responsive design for all breakpoints
    - Refine dashboard layout for desktop (3-column grid)
    - Adjust layout for tablet (2-column grid with stacked panels)
    - Optimize for mobile (single column with tabs)
    - Test all components at each breakpoint
    - Implement responsive navigation (sidebar for desktop, top nav for tablet, hamburger for mobile)
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

  - [ ] 10.5 Implement view preferences store
    - Create `src/stores/viewPreferencesStore.ts` with showFavoritesOnly, compactMode, selectedTheme
    - Add toggle actions for each preference
    - Wire preferences into relevant components
    - _Requirements: 11.4_

  - [ ] 10.6 Add loading skeleton placeholders
    - Create skeleton components for timing display, track map, and data panels
    - Show skeletons during initial load
    - Ensure smooth transition from skeleton to actual data
    - _Requirements: 18.2_

  - [ ] 10.7 Implement refresh indicators for live mode
    - Add subtle indicator when data is being refreshed in live mode
    - Show "updating..." status or spinner
    - Don't block UI during refresh
    - _Requirements: 18.3_

  - [ ] 10.8 Add accessibility features
    - Add ARIA labels to all interactive elements
    - Implement keyboard navigation support
    - Add live region announcements for timing updates
    - Ensure sufficient color contrast for text and backgrounds
    - Add focus management for modals
    - Test with screen readers
    - _Requirements: All requirements - accessibility is cross-cutting_

  - [ ] 10.9 Optimize rendering performance
    - Apply React.memo to TrackMap and TelemetryChart components
    - Implement debouncing for filter inputs
    - Add code splitting by route using React.lazy
    - Lazy load Recharts and heavy components
    - _Requirements: All requirements - performance is cross-cutting_

  - [ ]* 10.10 Write integration tests for API client and hooks
    - Test API client retry logic with mocked server (MSW)
    - Test hooks with React Query caching behavior
    - Test localStorage integration for favorites
    - Test polling intervals for live mode
    - _Requirements: 17, 19_

- [ ] 11. Final integration and testing
  - [ ] 11.1 Integrate all components into Dashboard page
    - Wire SessionSelector, ModeIndicator, TimingDisplay, TrackMap, WeatherModule, FlagsDisplay, RadioFeed, PitStopPanel, ComparisonTool, CircuitHistory into main dashboard layout
    - Ensure proper state management and data flow between components
    - Test complete user journey: select session → view timing → explore features
    - _Requirements: All requirements_

  - [ ] 11.2 Set up error boundaries for resilient UI
    - Wrap each major section with ErrorBoundary
    - Ensure errors in one component don't crash entire app
    - Test error scenarios and recovery
    - _Requirements: 17_

  - [ ] 11.3 Run full test suite
    - Execute all unit tests, property tests, component tests, and integration tests
    - Verify test coverage meets targets (overall 80%, pure functions 100%)
    - Fix any failing tests
    - _Requirements: All requirements_

  - [ ] 11.4 Perform manual testing across devices and browsers
    - Test on desktop (Chrome, Firefox, Safari)
    - Test on tablet (iPad, Android tablet)
    - Test on mobile (iPhone, Android phone)
    - Verify responsive design works correctly at all breakpoints
    - Test live mode with actual OpenF1 API during live session if possible
    - _Requirements: 16, All requirements_

- [ ] 12. Final checkpoint - Application complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Property-based tests validate universal correctness properties with minimum 100 iterations
- Unit tests validate specific examples and edge cases
- The implementation follows an incremental approach with checkpoints for validation
- All property tests should include proper tag comments: `// Feature: openf1-dashboard, Property N: [property text]`
- Live polling is implemented using TanStack Query's refetchInterval feature
- Caching strategy: session metadata 30min, driver data 24h, historical timing 5min, live data staleTime=0
- The design uses TypeScript and React, so all code should be type-safe with comprehensive interfaces

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4", "1.5"] },
    { "id": 2, "tasks": ["1.6", "1.7", "1.8"] },
    { "id": 3, "tasks": ["2.1", "2.4"] },
    { "id": 4, "tasks": ["2.2", "2.3", "2.5", "2.6"] },
    { "id": 5, "tasks": ["3.1", "3.2", "3.7"] },
    { "id": 6, "tasks": ["3.3", "3.4", "3.5"] },
    { "id": 7, "tasks": ["3.6", "3.8", "3.9", "3.10"] },
    { "id": 8, "tasks": ["5.1", "5.2"] },
    { "id": 9, "tasks": ["5.3", "5.4"] },
    { "id": 10, "tasks": ["5.5", "5.6", "5.7"] },
    { "id": 11, "tasks": ["6.1", "6.2"] },
    { "id": 12, "tasks": ["6.3", "6.4", "6.5"] },
    { "id": 13, "tasks": ["7.1", "7.4", "7.8", "7.12"] },
    { "id": 14, "tasks": ["7.2", "7.5", "7.9", "7.13"] },
    { "id": 15, "tasks": ["7.3", "7.6", "7.10", "7.14"] },
    { "id": 16, "tasks": ["7.7", "7.11", "7.15"] },
    { "id": 17, "tasks": ["9.1", "9.3", "9.4", "9.6", "9.9"] },
    { "id": 18, "tasks": ["9.2", "9.5", "9.7", "9.8", "9.10"] },
    { "id": 19, "tasks": ["9.11", "9.12", "9.13"] },
    { "id": 20, "tasks": ["10.1", "10.3", "10.5"] },
    { "id": 21, "tasks": ["10.2", "10.4", "10.6", "10.7", "10.8"] },
    { "id": 22, "tasks": ["10.9", "10.10"] },
    { "id": 23, "tasks": ["11.1"] },
    { "id": 24, "tasks": ["11.2", "11.3"] },
    { "id": 25, "tasks": ["11.4"] }
  ]
}
```
