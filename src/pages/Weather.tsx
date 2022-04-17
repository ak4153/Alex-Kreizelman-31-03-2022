import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import { WeatherPageWrapper } from '../styles/WeatherPageWrapper';
import { Grid, CircularProgress } from '@mui/material';
import SearchInput from '../components/Search';

import SearchedCityWeather from '../components/SearchedCityWeather';
import axios, { AxiosResponse, AxiosResponseHeaders } from 'axios';
import urls from '../assets/urls.json';

import Clock from '../components/TickingClock';
import { useSnackbar } from 'notistack';
import showSnackBar from '../utils/showSnackBar';
import { NewWeather } from '../types/NewWeather';
import Location from '../types/Location';

import enqueueAction from '../utils/enqueueAction';
import getRequest from '../utils/getRequest';
import { useSearchParams } from 'react-router-dom';
import { isNull } from 'lodash';
const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = urls.baseUrl;
const forecastsUrl = `${baseUrl}/forecasts/v1/daily/5day/`;
const telAvivKey = 215854;
const getLocationUrl = `${baseUrl}/locations/v1/cities/geoposition/search${apiKey}&q=`;

export const Weather = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  const [newWeather, setNewWeather] = useState<NewWeather>();
  //axios get coords = success
  const success = (e: GeolocationPosition) => {
    let latLng = { lat: e.coords.latitude, lng: e.coords.longitude };
    axios
      .get(getLocationUrl + latLng.lat.toString() + ',' + latLng.lng.toString())
      .then((res: AxiosResponse<Location>) => {
        getRequest(forecastsUrl + res.data.Key + apiKey, {
          setData: setNewWeather,
          action: action,
          enqueueSnackbar: enqueueSnackbar,
          page: 'weather',
          keyAndCity: {
            key: +res.data.Key,
            city: res.data.LocalizedName,
          },
        });
      })
      .catch((err) => {
        console.clear();
        showSnackBar(enqueueSnackbar, action, err.message);
      });
  };

  //axios get coords = fail
  const fail = () => {
    getRequest(forecastsUrl + telAvivKey.toString() + apiKey, {
      setData: setNewWeather,
      action: action,
      enqueueSnackbar: enqueueSnackbar,
      page: 'weather',
      keyAndCity: { key: 215854, city: 'Tel Aviv' },
    });
  };

  useEffect(() => {
    if (!isNull(searchParams.get('selectedFavoriteKey'))) {
      getRequest(
        forecastsUrl +
          searchParams.get('selectedFavoriteKey').toString() +
          apiKey,
        {
          setData: setNewWeather,
          enqueueSnackbar: enqueueSnackbar,
          action: action,
          page: 'weather',
          keyAndCity: {
            key: +searchParams.get('selectedFavoriteKey'),
            city: searchParams.get('selectedFavoriteCityName').toString(),
          },
        }
      );
    } else {
      navigator.geolocation.getCurrentPosition(success, fail);
    }
  }, []);

  //snackbar popup action
  const action = (key: any) =>
    enqueueAction({ key: key, closeSnackbar: closeSnackbar });

  return (
    <WeatherPageWrapper>
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={12} md={6} xl={6}>
          <Box
            sx={{
              marginBottom: '15px',
            }}
          >
            <SearchInput newWeather={setNewWeather} />
          </Box>
        </Grid>
        <Grid item alignItems="flex-start" xs={12} md={6} xl={6}>
          <Clock />
        </Grid>

        {newWeather ? (
          <SearchedCityWeather newWeather={newWeather} />
        ) : (
          <CircularProgress color="success" />
        )}
      </Grid>
    </WeatherPageWrapper>
  );
};
