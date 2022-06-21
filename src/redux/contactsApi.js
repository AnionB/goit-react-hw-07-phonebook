import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://62ac8502402135c7acb359a7.mockapi.io/',
  }),
  tagTypes: ['contacts'],

  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `contacts/`,
      providesTags: ['contacts'],
    }),
    addContact: builder.mutation({
      query: ({ name, phone }) => ({
        url: `contacts/`,
        method: 'POST',
        body: { name, phone },
      }),
      invalidatesTags: ['contacts'],
    }),
    delContact: builder.mutation({
      query: id => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDelContactMutation,
} = contactsApi;
