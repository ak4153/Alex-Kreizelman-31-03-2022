import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import urls from '../assets/urls.json';
//types
import { NewWeather } from '../types/NewWeather';
import Location from '../types/Location';
const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = urls.baseUrl;

interface Coords {
  coords: {
    latitude: number;
    longitude: number;
  };
}
export const geoPositionLocationSlice = createApi({
  reducerPath: 'geoPositionLocationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),

  endpoints(builder) {
    return {
      fetchWeatherByCoords: builder.query<Location, Coords | void>({
        query(coords: Coords) {
          return `/locations/v1/cities/geoposition/search${apiKey}&q=${coords.coords.latitude},${coords.coords.longitude}`;
        },
      }),
      fetchForeCastByKey: builder.query<any, number | void>({
        query(key: number) {
          return `/forecasts/v1/daily/5day/${key}${apiKey}`;
        },
      }),
      fetchForeCast: builder.query<NewWeather, Coords | void>({
        queryFn: async (coords: Coords, _api, _extraOptions, fetchWithBQ) => {
          const result = await fetchWithBQ(
            `/locations/v1/cities/geoposition/search${apiKey}&q=${coords.coords.latitude},${coords.coords.longitude}`
          );
          const locationData = result.data as Location;
          const foreCastResult = await fetchWithBQ(
            `/forecasts/v1/daily/5day/${locationData.Key}${apiKey}`
          );

          return foreCastResult.data
            ? {
                data: {
                  foreCast: foreCastResult.data,
                  key: +locationData.Key,
                  city: locationData.LocalizedName,
                } as NewWeather,
              }
            : { error: foreCastResult.error as FetchBaseQueryError };
        },
      }),
    };
  },
});

export const {
  useFetchWeatherByCoordsQuery,
  useFetchForeCastByKeyQuery,
  useFetchForeCastQuery,
} = geoPositionLocationSlice;
