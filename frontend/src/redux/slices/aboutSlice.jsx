import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseUrl = import.meta.env.VITE_BACKEND_BASE_API_URL;
export const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["About", "Team"],
  endpoints: (builder) => ({
    // Fetch courses
    getAbout: builder.query({
      query: () => "/about",
      providesTags: ["About"],
    }),
    // Fetch faqs
    getTeams: builder.query({
      query: () => "/team",
      providesTags: ["Team"],
    }),
  }),
});

// Export hooks for using the queries in components
export const { useGetAboutQuery, useGetTeamsQuery } = aboutApi;