/**
 * UI-Specific Types
 * Component props, state shapes, and UI-specific interfaces
 */

import type { ReactNode } from 'react';

// Session Selector Component Props
export interface SessionSelectorProps {
  selectedSessionKey: string | null;
  onSessionSelect: (sessionKey: string) => void;
}

// Timing Display Component Props
export interface TimingDisplayProps {
  sessionKey: string;
  isLiveMode: boolean;
  favoritesOnly?: boolean;
}

// Timing Row Data
export interface TimingRow {
  position: number;
  driverNumber: number;
  driverName: string;
  teamColor: string;
  gapToLeader: string; // "+1.234" format
  gapToAhead: string; // "+0.456" format
  lastLapTime: string; // "1:23.456" format
  bestLapTime: string; // "1:22.789" format
  isFastestLap: boolean;
  isImprovement: boolean; // Highlight if improved
  isFavorite: boolean;
}

// Track Map Component Props
export interface TrackMapProps {
  sessionKey: string;
  circuitKey: string;
  isLiveMode: boolean;
}

// Telemetry Chart Component Props
export interface TelemetryChartProps {
  sessionKey: string;
  driverNumber: number;
  lapNumber?: number;
}

// Telemetry Data for Visualization
export interface TelemetryData {
  distance: number; // Meters along lap
  speed: number; // km/h
  throttle: number; // 0-100%
  brake: number; // 0-100%
  gear: number; // 1-8
  rpm: number;
}

// Weather Module Component Props
export interface WeatherModuleProps {
  sessionKey: string;
  isLiveMode: boolean;
}

// Weather Data Display
export interface WeatherData {
  airTemp: number; // Celsius
  trackTemp: number; // Celsius
  humidity: number; // Percentage
  rainfall: boolean;
  windSpeed?: number;
  windDirection?: number;
}

// Flags Display Component Props
export interface FlagsDisplayProps {
  sessionKey: string;
  isLiveMode: boolean;
}

// Radio Feed Component Props
export interface RadioFeedProps {
  sessionKey: string;
  isLiveMode: boolean;
  driverFilter?: number;
}

// Radio Message Display
export interface RadioMessageDisplay {
  timestamp: string;
  driverNumber: number;
  driverName: string;
  message: string;
  audioUrl?: string;
}

// Pit Stop Panel Component Props
export interface PitStopPanelProps {
  sessionKey: string;
}

// Pit Stop Display
export interface PitStopDisplay {
  driverNumber: number;
  driverName: string;
  lapNumber: number;
  duration: number; // Seconds with 3 decimals
  timestamp: string;
  rank?: number; // Ranking by duration
}

// Comparison Tool Component Props
export interface ComparisonToolProps {
  sessionKey: string;
  driver1Number: number | null;
  driver2Number: number | null;
  onDriverSelect: (slot: 1 | 2, driverNumber: number) => void;
}

// Driver Profile Page Props
export interface DriverProfilePageProps {
  driverNumber: number; // From route params
}

// Team Page Props
export interface TeamPageProps {
  teamName: string; // From route params
}

// Circuit History Component Props
export interface CircuitHistoryProps {
  circuitKey: string;
  teamFilter?: string;
  driverFilter?: number;
}

// Common Loading State Props
export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

// Error Display Props
export interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

// Empty State Props
export interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
}

// Mode Indicator Props
export interface ModeIndicatorProps {
  isLiveMode: boolean;
  lastUpdated?: Date;
}

// Favorites State
export interface FavoritesState {
  favoriteDrivers: Set<number>;
  favoriteTeams: Set<string>;
  addDriver: (driverNumber: number) => void;
  removeDriver: (driverNumber: number) => void;
  addTeam: (teamName: string) => void;
  removeTeam: (teamName: string) => void;
  isFavoriteDriver: (driverNumber: number) => boolean;
  isFavoriteTeam: (teamName: string) => boolean;
}

// View Preferences State
export interface ViewPreferencesState {
  showFavoritesOnly: boolean;
  toggleFavoritesOnly: () => void;
  compactMode: boolean;
  toggleCompactMode: () => void;
  selectedTheme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
}

// Session State
export interface SessionState {
  selectedSessionKey: number | null;
  setSelectedSession: (key: number) => void;
  isLiveMode: boolean; // Computed based on session times
}

// Layout Component Props
export interface HeaderProps {
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

// Button Component Props
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

// Card Component Props
export interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}
