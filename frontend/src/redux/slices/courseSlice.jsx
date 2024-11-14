import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseUrl = import.meta.env.VITE_BACKEND_BASE_API_URL;
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Course", "Faq", "Apply"],
  endpoints: (builder) => ({
    // Fetch courses
    getCourses: builder.query({
      query: () => "/course",
      providesTags: ["Course"],
    }),
    // Fetch faqs
    getFaqs: builder.query({
      query: () => "/faq",
      providesTags: ["Faq"],
    }),
    postApplication: builder.mutation({
      query: (applicationData) => ({
        url: "/apply",        
        method: "POST",      
        body: applicationData, 
      }),
      invalidatesTags: ["Apply"], 
    }),
  }),
});

// Export hooks for using the queries in components
export const { useGetCoursesQuery, useGetFaqsQuery, usePostApplicationMutation} = courseApi;
