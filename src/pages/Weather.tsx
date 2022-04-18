//npm packages
import React, { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Grid, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import { isNull } from 'lodash';
//assets
import urls from '../assets/urls.json';
//components
import SearchedCityWeather from '../components/SearchedCityWeather';
import Clock from '../components/TickingClock';
import SearchInput from '../components/Search';
//styles
import { WeatherPageWrapper } from '../styles/WeatherPageWrapper';
//utility functions
import showSnackBar from '../utils/showSnackBar';
import enqueueAction from '../utils/enqueueAction';
import getRequest from '../utils/getRequest';
//types
import Location from '../types/Location';
import { NewWeather } from '../types/NewWeather';
import { useGeoLocation } from '../hooks/useGeoLocation';
//config
const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = urls.baseUrl;
const forecastsUrl = `${baseUrl}/forecasts/v1/daily/5day/`;
const telAvivKey = 215854;
const getLocationUrl = `${baseUrl}/locations/v1/cities/geoposition/search${apiKey}&q=`;

export const Weather = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [searchParams] = useSearchParams();
  const [newWeather, setNewWeather] = useState<NewWeather>();
  const { geoLocation } = useGeoLocation();
  useEffect(() => {
    let searchParamsHolder = searchParams.get('selectedFavoriteKey');
    if (!isNull(searchParamsHolder) && searchParamsHolder) {
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
      if (geoLocation) {
        axios
          .get(
            getLocationUrl +
              geoLocation.coords.latitude.toString() +
              ',' +
              geoLocation.coords.latitude.toString()
          )
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
          .catch((err: AxiosError) => {
            console.clear();
            showSnackBar(enqueueSnackbar, action, err.message);
          });
      } else
        getRequest(forecastsUrl + telAvivKey.toString() + apiKey, {
          setData: setNewWeather,
          action: action,
          enqueueSnackbar: enqueueSnackbar,
          page: 'weather',
          keyAndCity: { key: 215854, city: 'Tel Aviv' },
        });
    }
  }, [geoLocation]);

  //snackbar popup action
  const action = (key: number) => {
    return enqueueAction({ key: key, closeSnackbar: closeSnackbar });
  };

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
