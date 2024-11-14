import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL for the API
const baseUrl = import.meta.env.VITE_BACKEND_BASE_API_URL;
export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Contact', 'Message'],
  endpoints: (builder) => ({
    // Fetch contacts
    getContacts: builder.query({
      query: () => '/contact',
      providesTags: ['Contact'],
    }),
    // Post a new message
    postMessage: builder.mutation({
      query: (newMessage) => ({
        url: '/post/message',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

// Export hooks for using the queries and mutations in components
export const { useGetContactsQuery, usePostMessageMutation } = contactApi;
