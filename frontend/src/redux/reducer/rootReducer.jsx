// src/reducers/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import { contactApi } from '../slices/contactSlice';
import { courseApi } from '../slices/courseSlice';
import { aboutApi } from '../slices/aboutSlice';
import { homeApi } from '../slices/homeSlice';
import { blogApi } from '../slices/blogSlice';
// Add more reducers as needed

const rootReducer = combineReducers({
  auth: authReducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [aboutApi.reducerPath]: aboutApi.reducer, 
  [homeApi.reducerPath]: homeApi.reducer, 
  [blogApi.reducerPath]: blogApi.reducer,// Add more reducers here
  // Add more reducers here
});

export default rootReducer;
