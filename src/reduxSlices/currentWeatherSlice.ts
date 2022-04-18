import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import urls from '../assets/urls.json';
//types
import CurrentWeather from '../types/CurrentWeather';
const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = urls.baseUrl;

export const currentWeatherApiSlice = createApi({
  reducerPath: 'currentWeatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints(builder) {
    return {
      fetchCurrentWeather: builder.query<CurrentWeather[], number | void>({
        query(favoriteKey) {
          return `/currentconditions/v1/${favoriteKey}${apiKey}`;
        },
      }),
    };
  },
});

export const { useFetchCurrentWeatherQuery } = currentWeatherApiSlice;
