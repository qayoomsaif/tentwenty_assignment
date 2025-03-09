import {NativeStackScreenProps} from '@react-navigation/native-stack';

// Export it for reusability
export type {NativeStackScreenProps};

export type RootStackParamList = {
  Watch: undefined;
  MovieDetail: {id: number};
  MovieTickets: {id: number};
  TicketBuying: undefined;

  Dashboard: undefined;
  More: undefined;
  Media: undefined;
  Home: undefined;
};

/**
 * Defines the parameter list for the bottom tab navigator.
 */
export type RootTabParamList = {
  DashboardTab: undefined;
  WatchTab: undefined;
  MoreTab: undefined;
  MediaTab: undefined;
};

export const SCREENS = {
  Watch: 'Watch',
  MovieDetail: 'MovieDetail',
  MovieTickets: 'MovieTickets',
  TicketBuying: 'TicketBuying',
  Dashboard: 'Dashboard',
  More: 'More',
  Media: 'Media',
} as const;
