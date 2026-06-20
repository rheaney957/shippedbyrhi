/**
 * OpenF1 API Response Types
 * Based on the OpenF1 API documentation at https://openf1.org
 */

// Session endpoint: /v1/sessions
export interface SessionResponse {
  session_key: number;
  session_name: string; // "Race", "Qualifying", "Practice 1", etc.
  session_type: string;
  date_start: string; // ISO 8601
  date_end: string; // ISO 8601
  gmt_offset: string;
  location: string;
  country_name: string;
  circuit_key: number;
  circuit_short_name: string;
  year: number;
}

// Drivers endpoint: /v1/drivers
export interface DriverResponse {
  driver_number: number;
  full_name: string;
  name_acronym: string; // e.g., "HAM", "VER"
  team_name: string;
  team_colour: string; // Hex color without #
  country_code: string; // ISO 3166-1 alpha-3
  headshot_url?: string;
  session_key: number;
}

// Position endpoint: /v1/position
export interface PositionResponse {
  date: string; // ISO 8601
  driver_number: number;
  position: number;
  session_key: number;
  x: number; // Normalized coordinate
  y: number; // Normalized coordinate
  z: number; // Normalized coordinate
}

// Laps endpoint: /v1/laps
export interface LapResponse {
  date_start: string;
  driver_number: number;
  duration_sector_1: number | null;
  duration_sector_2: number | null;
  duration_sector_3: number | null;
  lap_duration: number | null;
  lap_number: number;
  is_pit_out_lap: boolean;
  session_key: number;
  segments_sector_1: number[];
  segments_sector_2: number[];
  segments_sector_3: number[];
}

// Intervals endpoint: /v1/intervals
export interface IntervalResponse {
  date: string;
  driver_number: number;
  gap_to_leader: number | null; // Seconds
  interval: number | null; // Gap to car ahead in seconds
  session_key: number;
}

// Car data endpoint: /v1/car_data
export interface CarDataResponse {
  date: string;
  driver_number: number;
  rpm: number;
  speed: number;
  n_gear: number;
  throttle: number;
  brake: number;
  drs: number;
  session_key: number;
}

// Weather endpoint: /v1/weather
export interface WeatherResponse {
  date: string;
  air_temperature: number;
  humidity: number;
  pressure: number;
  rainfall: number;
  track_temperature: number;
  wind_direction: number;
  wind_speed: number;
  session_key: number;
}

// Race control endpoint: /v1/race_control
export interface RaceControlResponse {
  date: string;
  category: string; // "Flag", "SafetyCar", "Other"
  flag: string | null; // "YELLOW", "RED", "GREEN", etc.
  lap_number: number | null;
  message: string;
  scope: string; // "Track", "Sector", "Driver"
  sector: number | null;
  driver_number: number | null;
  session_key: number;
}

// Pit stops endpoint: /v1/pits
export interface PitStopResponse {
  date: string;
  driver_number: number;
  lap_number: number;
  pit_duration: number; // Seconds
  session_key: number;
}

// Team radio endpoint: /v1/team_radio
export interface TeamRadioResponse {
  date: string;
  driver_number: number;
  session_key: number;
  recording_url: string;
}
