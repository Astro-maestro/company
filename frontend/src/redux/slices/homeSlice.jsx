import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseUrl = import.meta.env.VITE_BACKEND_BASE_API_URL;
export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Banner", "Service", "Testimonial"],
  endpoints: (builder) => ({
    // Fetch carousels
    getBanners: builder.query({
      query: () => "/banner",
      providesTags: ["Banner"],
    }),
    // Fetch services
    getServices: builder.query({
      query: () => "/service",
      providesTags: ["Service"],
    }),
    // Fetch testimonials
    getTestimonials: builder.query({
        query: () => "/testimonial",
        providesTags: ["Testimonial"],
      }),
  }),
});

// Export hooks for using the queries in components
export const { useGetBannersQuery, useGetServicesQuery, useGetTestimonialsQuery } = homeApi;