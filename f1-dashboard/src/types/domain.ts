/**
 * Domain Models (Application Layer)
 * Normalized, application-friendly models derived from API responses
 */

// Normalized session for app use
export interface Session {
  key: number;
  name: string;
  type: 'race' | 'qualifying' | 'sprint' | 'practice';
  startTime: Date;
  endTime: Date;
  circuit: {
    key: number;
    name: string;
    country: string;
  };
  year: number;
  isLive: boolean; // Computed: within 30min before start to 30min after end
}

// Normalized driver
export interface Driver {
  number: number;
  name: string;
  abbreviation: string;
  team: string;
  teamColor: string; // Hex with #
  nationality: string;
  headshotUrl?: string;
}

// Timing data (combines laps + intervals)
export interface TimingEntry {
  position: number;
  driverNumber: number;
  lastLapTime: number | null; // Seconds
  bestLapTime: number | null; // Seconds
  gapToLeader: number | null; // Seconds
  gapToAhead: number | null; // Seconds
  isFastestLap: boolean;
  inPit: boolean;
}

// Telemetry point
export interface TelemetryPoint {
  distance: number;
  speed: number;
  throttle: number;
  brake: number;
  gear: number;
  rpm: number;
}

// Weather snapshot
export interface Weather {
  airTemp: number;
  trackTemp: number;
  humidity: number;
  rainfall: boolean;
  windSpeed: number;
  windDirection: number;
  timestamp: Date;
}

// Flag status
export interface FlagStatus {
  type: 'green' | 'yellow' | 'red' | 'blue' | 'checkered' | 'vsc' | 'sc';
  sector?: number;
  driverNumber?: number;
  message: string;
  timestamp: Date;
}

// Pit stop
export interface PitStop {
  driverNumber: number;
  lapNumber: number;
  duration: number;
  timestamp: Date;
}

// Radio message
export interface RadioMessage {
  driverNumber: number;
  audioUrl: string;
  timestamp: Date;
}

// Driver position on track
export interface DriverPosition {
  driverNumber: number;
  x: number; // Normalized 0-1000
  y: number; // Normalized 0-1000
  teamColor: string;
}

// Circuit layout data
export interface CircuitLayout {
  circuitKey: string;
  pathData: string; // SVG path data
  sectorBoundaries: number[]; // Percentage along track
}

// Driver profile information
export interface DriverProfile {
  driverNumber: number;
  fullName: string;
  teamName: string;
  nationality: string;
  championshipPosition: number;
  seasonPoints: number;
  careerPoints: number;
  seasonResults: RaceResult[];
  bestLapTimes: SessionLapTime[];
}

// Race result for driver profile
export interface RaceResult {
  sessionName: string;
  circuitName: string;
  date: Date;
  position: number;
  points: number;
}

// Session lap time for driver profile
export interface SessionLapTime {
  sessionName: string;
  circuitName: string;
  lapTime: number; // Seconds
  date: Date;
}

// Team information
export interface TeamInfo {
  teamName: string;
  teamColors: {
    primary: string;
    secondary: string;
  };
  championshipPosition: number;
  constructorPoints: number;
  drivers: {
    number: number;
    name: string;
  }[];
}

// Historical race data for circuit
export interface HistoricalRace {
  year: number;
  winner: {
    name: string;
    team: string;
  };
  results: {
    position: number;
    driver: string;
    team: string;
  }[];
  pitStopStrategy: {
    driver: string;
    stops: number[];
    avgDuration: number;
  }[];
}

// Driver comparison data
export interface ComparisonData {
  lapTimes: {
    lap: number;
    driver1: number;
    driver2: number;
  }[];
  sectorTimes: {
    sector: number;
    driver1: number;
    driver2: number;
  }[];
  speedTraps: {
    location: string;
    driver1: number;
    driver2: number;
  }[];
}
