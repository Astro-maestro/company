// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducer/rootReducer'; // Import the combined reducers
import { apiMiddleware } from '../middleware/middleware'; // Import the middleware array

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...apiMiddleware), // Concatenate all middlewares
});


