import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the base URL for the API
const baseUrl = import.meta.env.VITE_BACKEND_BASE_API_URL;
export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Blog', 'Reply', 'PostReply'],
  endpoints: (builder) => ({
    // Fetch blogs
    getBlogs: builder.query({
      query: () => '/blog',
      providesTags: ['Blog'],
    }),
    getBlogById: builder.query({
      query: (blogId) => `/blogs/${blogId}`,  // Construct URL with blogId
      providesTags: (result, error, blogId) => [{ type: 'Blog', id: blogId }],
    }),
    searchBlogsByTitle: builder.query({
      query: (title) => `/blogs/search?title=${encodeURIComponent(title)}`, // Encode the title for safe URL usage
      providesTags: ['Blog'],
    }),
    // Fetch replies
    getReplies: builder.query({
        query: () => '/reply',
        providesTags: ['Reply'],
      }),
    // Post a new reply
    postReply: builder.mutation({
      query: (newReply) => ({
        url: '/post/reply',
        method: 'POST',
        body: newReply,
      }),
      invalidatesTags: ['PostReply'],
    }),
  }),
});

// Export hooks for using the queries and mutations in components
export const { useGetBlogsQuery, useGetBlogByIdQuery,useSearchBlogsByTitleQuery, useGetRepliesQuery, usePostReplyMutation } = blogApi;
