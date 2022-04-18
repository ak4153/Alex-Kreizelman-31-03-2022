import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import urls from '../assets/urls.json';
//types
import Location from '../types/Location';
const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = urls.baseUrl;

export const locationApiSlice = createApi({
  reducerPath: 'locationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),

  endpoints(builder) {
    return {
      fetchLocation: builder.query<Location, number | void>({
        query(favoriteKey) {
          return `/locations/v1/${favoriteKey}${apiKey}`;
        },
      }),
    };
  },
});

export const { useFetchLocationQuery } = locationApiSlice;
