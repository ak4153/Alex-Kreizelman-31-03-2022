import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import { WeatherPageWrapper } from '../styles/WeatherPageWrapper';
import { Grid, CircularProgress } from '@mui/material';
import SearchInput from '../components/Search';

import DefaultWeather from '../components/DefaultWeather';
import SearchedCityWeather from '../components/SearchedCityWeather';
import axios from 'axios';
import urls from '../assets/urls.json';

import Clock from '../components/TickingClock';
import { useSnackbar } from 'notistack';
import showSnackBar from '../utils/showSnackBar';
import { DailyForecast } from '../types/5dayForeCast';
import { CityWeather } from '../types/CityWeather';
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
  const [searchedCityWeather, setSarchedCityWeather] = useState<CityWeather>();
  const [defaultWeather, setDefaultWeather] = useState<DailyForecast[]>();
  const [searchParams, setSearchParams] = useSearchParams();
  //axios get coords = success

  const success = (e: GeolocationPosition) => {
    let latLng = { lat: e.coords.latitude, lng: e.coords.longitude };
    axios
      .get(getLocationUrl + latLng.lat.toString() + ',' + latLng.lat.toString())
      .then((res) => {
        getRequest(forecastsUrl + res.data.Key + apiKey, {
          setData: setDefaultWeather,
          action: action,
          enqueueSnackbar: enqueueSnackbar,
          page: 'weather',
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
      setData: setDefaultWeather,
      action: action,
      enqueueSnackbar: enqueueSnackbar,
      page: 'weather',
    });
  };

  useEffect(() => {
    if (!isNull(searchParams.get('selectedFavoriteKey'))) {
      getRequest(
        forecastsUrl +
          searchParams.get('selectedFavoriteKey').toString() +
          apiKey,
        {
          setData: setDefaultWeather,
          enqueueSnackbar: enqueueSnackbar,
          action: action,
          page: 'weather',
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
            <SearchInput setSarchedCityWeather={setSarchedCityWeather} />
          </Box>
        </Grid>
        <Grid item alignItems="flex-start" xs={12} md={6} xl={6}>
          <Clock />
        </Grid>

        {!searchedCityWeather && !defaultWeather ? (
          <CircularProgress color="success" />
        ) : searchedCityWeather ? (
          // display searched weather
          <SearchedCityWeather searchedCityWeather={searchedCityWeather} />
        ) : (
          defaultWeather && <DefaultWeather defaultWeather={defaultWeather} />
        )}
      </Grid>
    </WeatherPageWrapper>
  );
};
