import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AutoComplete } from '../types/AutoCompleteType';
import urls from '../assets/urls.json';

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = urls.baseUrl;
const autocompleteUrl = `${baseUrl}/locations/v1/cities/autocomplete${apiKey}&q=`;

export const autoCompleteApiSlice = createApi({
  reducerPath: 'autoCompleteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints(builder) {
    return {
      fetchCities: builder.query<AutoComplete[], string | void>({
        query(input = 'china') {
          return `/locations/v1/cities/autocomplete${apiKey}&q=${input}`;
        },
      }),
    };
  },
});

export const { useFetchCitiesQuery } = autoCompleteApiSlice;
