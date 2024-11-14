// src/middleware.js
import { contactApi } from "../slices/contactSlice";
import { courseApi } from "../slices/courseSlice";
import { aboutApi } from "../slices/aboutSlice";
import { homeApi } from "../slices/homeSlice";
import { blogApi } from "../slices/blogSlice";
// Add more APIs if needed

export const apiMiddleware = [
  contactApi.middleware,
  courseApi.middleware,
  aboutApi.middleware,
  homeApi.middleware,
  blogApi.middleware
  // Add more API middlewares here

];
