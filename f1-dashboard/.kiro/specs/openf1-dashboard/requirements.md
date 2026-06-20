# Requirements Document

## Introduction

The OpenF1 Dashboard is a web-based application built with Vite and TypeScript that provides Formula 1 fans with real-time and historical race data. The dashboard consumes the OpenF1 API to display live timing, driver information, session data, car telemetry, weather conditions, and race flags in an intuitive and responsive interface. The application features an animated track map, pit stop analysis, radio messages, driver comparisons, and comprehensive driver profiles.

## Glossary

- **Dashboard**: The main web application interface displaying F1 data
- **OpenF1_API**: The external REST API service at openf1.org providing F1 data
- **Session**: A single F1 track event (practice, qualifying, sprint, or race)
- **Driver**: An F1 driver participating in the current season
- **Driver_Profile_Page**: A dedicated page showing detailed driver statistics and career information
- **Timing_Data**: Real-time lap times, sector times, and gaps between drivers
- **Telemetry**: Car performance data including speed, throttle, brake, and gear information
- **Weather_Module**: Component displaying current track weather conditions
- **Track_Map**: Visual representation of the circuit showing driver positions
- **Flag_Status**: Current race control flag state (green, yellow, red, blue, checkered)
- **Pit_Stop_Data**: Timing information for pit stops including duration and lap number
- **Radio_Message**: Team radio communication transcript
- **Live_Mode**: Application state where data refreshes automatically during active sessions
- **Historical_Mode**: Application state for viewing past session data
- **Favorites**: User-saved drivers and teams for quick access
- **Team_Page**: A dedicated page showing team information, driver lineup, and performance data
- **Circuit_History**: Historical performance data for a specific circuit across previous seasons

## Requirements

### Requirement 1: Session Selection

**User Story:** As an F1 fan, I want to browse and select different race sessions, so that I can view data from any event.

#### Acceptance Criteria

1. WHEN the Dashboard loads, THE Dashboard SHALL display a list of available sessions from the current season
2. WHEN a user selects a session, THE Dashboard SHALL load and display data for that session
3. THE Dashboard SHALL display session metadata including circuit name, date, and session type
4. WHEN no sessions are available, THE Dashboard SHALL display an informative empty state message

### Requirement 2: Live Timing Display

**User Story:** As an F1 fan, I want to see live timing data during active sessions, so that I can follow the race in real-time.

#### Acceptance Criteria

1. WHILE in Live_Mode, THE Dashboard SHALL display the current driver standings with positions
2. WHILE in Live_Mode, THE Dashboard SHALL update Timing_Data at a maximum interval of 2 seconds
3. WHEN a driver improves their lap time, THE Dashboard SHALL highlight the improvement visually
4. THE Dashboard SHALL display the gap to the driver immediately ahead to 3 decimal places (e.g., +1.234s)
5. THE Dashboard SHALL display each driver's last lap time and best lap time
6. THE Dashboard SHALL highlight the overall fastest lap with a distinct visual indicator
7. THE Dashboard SHALL display gap times relative to the race leader

### Requirement 3: Driver Information

**User Story:** As an F1 fan, I want to view detailed driver information, so that I can learn about the competitors.

#### Acceptance Criteria

1. THE Dashboard SHALL display a list of all drivers in the current session
2. WHEN a user selects a driver, THE Dashboard SHALL navigate to the Driver_Profile_Page
3. THE Dashboard SHALL display team colors to visually distinguish drivers
4. THE Dashboard SHALL display driver nationality with appropriate flag icons

### Requirement 4: Driver Profile Page

**User Story:** As an F1 fan, I want a dedicated page for each driver, so that I can see their complete information and statistics.

#### Acceptance Criteria

1. THE Driver_Profile_Page SHALL display driver biographical information including name, number, team, and nationality
2. THE Driver_Profile_Page SHALL display current season championship standings position
3. THE Driver_Profile_Page SHALL display current season points total
4. THE Driver_Profile_Page SHALL display career statistics including total career points
5. THE Driver_Profile_Page SHALL display the driver's current season race results
6. THE Driver_Profile_Page SHALL display the driver's best lap time for each session attended
7. THE Driver_Profile_Page SHALL provide navigation back to the main Dashboard

### Requirement 5: Car Telemetry Visualization

**User Story:** As an F1 fan, I want to view car telemetry data, so that I can understand driver performance in detail.

#### Acceptance Criteria

1. WHEN a user selects a driver, THE Dashboard SHALL display available telemetry data for that driver
2. THE Dashboard SHALL display speed data in a graphical format
3. THE Dashboard SHALL display throttle and brake application data
4. THE Dashboard SHALL display current gear information
5. IF telemetry data is unavailable, THEN THE Dashboard SHALL display a message indicating data is not available

### Requirement 6: Race Flags Display

**User Story:** As an F1 fan, I want to see current flag status, so that I know when yellow, red, or blue flags are active.

#### Acceptance Criteria

1. THE Dashboard SHALL display the current Flag_Status prominently in the timing view
2. WHEN a yellow flag is active, THE Dashboard SHALL display a yellow flag indicator with the affected sector
3. WHEN a red flag is active, THE Dashboard SHALL display a red flag indicator covering the full screen header
4. WHEN a blue flag is shown to a driver, THE Dashboard SHALL indicate the blue flag status next to that driver
5. WHILE in Live_Mode, THE Dashboard SHALL update Flag_Status at a maximum interval of 2 seconds
6. THE Dashboard SHALL display the safety car or virtual safety car status when active

### Requirement 7: Animated Track Map

**User Story:** As an F1 fan, I want to see driver positions on a track map, so that I can visualize the race progress.

#### Acceptance Criteria

1. THE Track_Map SHALL display a visual representation of the current circuit layout
2. THE Track_Map SHALL display driver positions as markers using team colors
3. WHILE in Live_Mode, THE Track_Map SHALL animate driver positions along the circuit
4. WHEN a user hovers over a driver marker, THE Track_Map SHALL display driver name and position
5. THE Track_Map SHALL highlight sector boundaries on the circuit
6. WHILE in Live_Mode, THE Track_Map SHALL update driver positions at a maximum interval of 2 seconds

### Requirement 8: Pit Stop Analysis

**User Story:** As an F1 fan, I want to see pit stop data, so that I can analyze team strategy and performance.

#### Acceptance Criteria

1. THE Dashboard SHALL display a pit stop summary for each driver
2. THE Dashboard SHALL display pit stop duration in seconds to 3 decimal places
3. THE Dashboard SHALL display the lap number for each pit stop
4. THE Dashboard SHALL rank pit stops by duration to show fastest pit crew performance
5. WHEN a driver enters the pit lane, THE Dashboard SHALL highlight that driver in the timing display

### Requirement 9: Radio Messages

**User Story:** As an F1 fan, I want to see team radio transcripts, so that I can follow driver and team communications.

#### Acceptance Criteria

1. THE Dashboard SHALL display a feed of recent Radio_Message transcripts
2. THE Dashboard SHALL display the driver name and timestamp for each Radio_Message
3. THE Dashboard SHALL allow users to filter Radio_Message by driver
4. WHILE in Live_Mode, THE Dashboard SHALL display new Radio_Message entries as they become available
5. THE Dashboard SHALL display the most recent 20 Radio_Message entries by default

### Requirement 10: Driver Comparison Tool

**User Story:** As an F1 fan, I want to compare two drivers, so that I can analyze their relative performance.

#### Acceptance Criteria

1. THE Dashboard SHALL allow users to select two drivers for comparison
2. THE Dashboard SHALL display lap time comparison between selected drivers
3. THE Dashboard SHALL display sector time comparison between selected drivers
4. THE Dashboard SHALL display a graphical comparison of lap times over the session
5. THE Dashboard SHALL display speed comparison at key circuit points when telemetry is available

### Requirement 11: Favorites System

**User Story:** As an F1 fan, I want to save my favorite drivers and teams, so that I can quickly access their information.

#### Acceptance Criteria

1. THE Dashboard SHALL allow users to mark drivers as Favorites
2. THE Dashboard SHALL allow users to mark teams as Favorites
3. THE Dashboard SHALL persist Favorites in browser local storage
4. THE Dashboard SHALL provide a quick filter to show only Favorites in timing displays
5. THE Dashboard SHALL highlight Favorites with a visual indicator in all views

### Requirement 12: Team Information Page

**User Story:** As an F1 fan, I want a dedicated page for each team, so that I can see their performance history and current standings.

#### Acceptance Criteria

1. THE Dashboard SHALL provide a Team_Page for each constructor in the championship
2. THE Team_Page SHALL display current season constructor championship position and points
3. THE Team_Page SHALL display the current driver lineup with links to Driver_Profile_Page
4. THE Team_Page SHALL display team colors and branding
5. THE Team_Page SHALL provide navigation back to the main Dashboard

### Requirement 13: Circuit Historical Performance

**User Story:** As an F1 fan, I want to see historical performance at each circuit, so that I can understand how teams and drivers have performed at specific tracks in previous years.

#### Acceptance Criteria

1. THE Dashboard SHALL display a Circuit_History section for the currently selected session
2. THE Circuit_History SHALL display previous years' race results at the same circuit
3. THE Circuit_History SHALL display finishing positions for each driver in previous years
4. THE Circuit_History SHALL display pit stop strategies from previous years including number of stops and lap numbers
5. THE Circuit_History SHALL display winning team and driver for each previous year
6. THE Circuit_History SHALL allow users to filter historical data by team
7. THE Circuit_History SHALL allow users to filter historical data by driver
8. THE Circuit_History SHALL display average pit stop times for each team at the circuit in previous years

### Requirement 14: Weather Information

**User Story:** As an F1 fan, I want to see current track weather conditions, so that I can understand how weather affects the race.

#### Acceptance Criteria

1. THE Weather_Module SHALL display current air temperature at the circuit
2. THE Weather_Module SHALL display current track temperature
3. THE Weather_Module SHALL display humidity percentage
4. THE Weather_Module SHALL display rainfall status
5. WHILE in Live_Mode, THE Weather_Module SHALL update weather data at a maximum interval of 30 seconds

### Requirement 15: Historical Data Access

**User Story:** As an F1 fan, I want to access historical session data, so that I can review past races and qualifying sessions.

#### Acceptance Criteria

1. THE Dashboard SHALL allow users to select sessions from previous races in the season
2. WHEN viewing historical data, THE Dashboard SHALL display the same data views as Live_Mode
3. THE Dashboard SHALL clearly indicate when displaying Historical_Mode data versus Live_Mode data

### Requirement 16: Responsive Design

**User Story:** As an F1 fan, I want to use the dashboard on different devices, so that I can follow F1 from anywhere.

#### Acceptance Criteria

1. THE Dashboard SHALL adapt its layout for desktop screens (1024px and above)
2. THE Dashboard SHALL adapt its layout for tablet screens (768px to 1023px)
3. THE Dashboard SHALL adapt its layout for mobile screens (below 768px)
4. THE Dashboard SHALL maintain functionality across all supported screen sizes

### Requirement 17: Error Handling

**User Story:** As a user, I want clear feedback when errors occur, so that I understand what went wrong.

#### Acceptance Criteria

1. IF the OpenF1_API returns an error, THEN THE Dashboard SHALL display a user-friendly error message
2. IF network connectivity is lost, THEN THE Dashboard SHALL display a connection error notification
3. IF the OpenF1_API is unreachable, THEN THE Dashboard SHALL retry the connection up to 3 times before displaying an error
4. WHEN an error occurs, THE Dashboard SHALL provide an option to retry the failed operation

### Requirement 18: Loading States

**User Story:** As a user, I want visual feedback while data is loading, so that I know the application is working.

#### Acceptance Criteria

1. WHILE data is being fetched from the OpenF1_API, THE Dashboard SHALL display a loading indicator
2. THE Dashboard SHALL display skeleton placeholders for content areas during initial load
3. WHILE in Live_Mode, THE Dashboard SHALL indicate when data is being refreshed

### Requirement 19: Data Caching

**User Story:** As a user, I want fast load times, so that I can quickly access F1 data.

#### Acceptance Criteria

1. THE Dashboard SHALL cache session data locally to reduce API calls
2. WHEN cached data is available and less than 5 minutes old, THE Dashboard SHALL use cached data for initial display
3. THE Dashboard SHALL provide an option to force refresh data from the OpenF1_API
