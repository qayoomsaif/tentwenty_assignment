import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user';
import aiScannerReducer from './slices/aiScanner';
import indefiniteLoaderReducer from './slices/indefiniteLoader';

/**
 * The Redux store configuration for the application.
 * This store includes the filter slice to manage the application's filter state.
 */
export const store = configureStore({
  reducer: {
    /** The filter reducer to manage the flight filters in the application */
    user: userReducer,
    aiScanner: aiScannerReducer,
    indefiniteLoader: indefiniteLoaderReducer
  },
});

// **RootState** type represents the complete state shape of the store.
type IRootState = ReturnType<typeof store.getState>;
export interface RootState extends IRootState {}

/**
 * **AppDispatch** type represents the type of the dispatch function.
 * It helps in dispatching actions within the application.
 */
export type AppDispatch = typeof store.dispatch;
