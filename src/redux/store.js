// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import modelReducer from './reducer/modelSlice.js';
import tabRouteReducer from './reducer/tabRouteSlice.js'; // Changed from tabRouteSlice to tabRouteReducer for clarity
import questionerReducer from './reducer/questioner.js';
import menuDataReducer from './reducer/menuDataSlice.js';

export const store = configureStore({
  reducer: {
    model: modelReducer,
    route: tabRouteReducer,  // This will handle the prefixed tab keys
    questioner: questionerReducer,
    menuData: menuDataReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the check for file objects, etc.
    }),

  // Optional: Add devTools configuration
  devTools: process.env.NODE_ENV !== 'production',
});

// Optional: Export types for TypeScript if you're using it
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;