import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import { WeatherPageWrapper } from '../styles/WeatherPageWrapper';
import {
  Card,
  Grid,
  Typography,
  CircularProgress,
  Button,
} from '@mui/material';
import SearchInput from '../components/Search';

import getDayOfWeek from '../utils/getDayOfWeek';
import { Store } from '../Store/Provider';
import WeatherIcon from '../components/WeatherIcon';
import FavoriteButton from '../components/FavoriteButton';
import axios from 'axios';
import urls from '../assets/urls.json';
import apiKeyJson from '../assets/apiKey.json';
import DefaultWeather from '../types/DefaultWeather';
import Clock from '../components/TickingClock';
import { useSnackbar } from 'notistack';
import showSnackBar from '../utils/showSnackBar';
import { meanTemp, convertNow } from '../utils/tempConversion';
// const autocompleteUrl = urls.autoCompleteUrl;
// "&q=32.0679%2C34.7604"

const apiKey = apiKeyJson.apiKey;
const baseUrl = urls.baseUrl;
const forecastsUrl = `${baseUrl}/forecasts/v1/daily/5day/`;
const telAvivKey = 215854;
const getLocationUrl = `${baseUrl}/locations/v1/cities/geoposition/search${apiKey}&q=`;

export const Weather = () => {
  const { state, dispatch } = useContext(Store);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  //static value => change to dynaic
  const [cityWeather, setCityWeather] = useState<any>();
  const [defaultWeather, setDefaultWeather] = useState<DefaultWeather>({
    Headline: {},
    DailyForecasts: [],
  });

  //axios get coords = success
  const success = (e: any) => {
    let latLng = { lat: e.coords.latitude, lng: e.coords.longitude };
    axios
      .get(getLocationUrl + latLng.lat.toString() + ',' + latLng.lat.toString())
      .then((res) => {
        axios
          .get(forecastsUrl + res.data.Key + apiKey)
          .then((result) => {
            setDefaultWeather(result.data);
          })
          .catch((err) => showSnackBar(enqueueSnackbar, action));
      })
      .catch((err) => {
        showSnackBar(enqueueSnackbar, action);
      });
  };
  //axios get coords = fail
  const fail = (e: any) => {
    axios
      .get(forecastsUrl + telAvivKey.toString() + apiKey)
      .then((res) => {
        setDefaultWeather(res.data);
      })
      .catch((err) => {
        showSnackBar(enqueueSnackbar, action);
      });
  };

  useEffect(() => {
    if (state.selectedFavorite.key !== 0) {
      axios
        .get(forecastsUrl + state.selectedFavorite.key.toString() + apiKey)
        .then((res) => {
          setDefaultWeather(res.data);
        })
        .catch((err) => {
          showSnackBar(enqueueSnackbar, action);
        });
    } else {
      navigator.geolocation.getCurrentPosition(success, fail);
    }
  }, []);

  //(latLng.lat && latLng.lng ?latLng.lat+","+latLng.lng: telAvivKey.toString())
  //snackbar popup action
  const action = (key: any) => (
    <>
      <Button
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        DISMISS
      </Button>
    </>
  );
  return (
    <WeatherPageWrapper>
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Grid item xs={12} md={6} xl={6}>
          <Box
            sx={{
              marginBottom: '15px',
            }}
          >
            <SearchInput setCityWeather={setCityWeather} />
          </Box>
        </Grid>

        <Grid item alignItems="flex-start" xs={12} md={6} xl={6}>
          <Clock />
        </Grid>

        {!cityWeather && defaultWeather.DailyForecasts.length < 1 ? (
          <CircularProgress color="success" />
        ) : cityWeather ? (
          // display searched weather
          <Grid item xs={12} md={12} xl={12}>
            <Grid container>
              <Grid item xs={12} md={12} xl={12}>
                <Card>
                  <Grid
                    container
                    flexDirection="row"
                    spacing={3}
                    justifyContent="center"
                  >
                    <Grid item xs={12} md={12} xl={12}>
                      <Grid container>
                        <Grid item xs={12} md={10} xl={12}>
                          <Typography
                            margin={'10px'}
                            variant="h4"
                            component="h4"
                          >
                            {cityWeather.city} - {}
                            {state.isCelsius
                              ? convertNow(
                                  'f',
                                  meanTemp(
                                    cityWeather.foreCast.DailyForecasts[0]
                                      .Temperature.Maximum.Value,
                                    cityWeather.foreCast.DailyForecasts[0]
                                      .Temperature.Minimum.Value
                                  )
                                )
                              : convertNow(
                                  'c',
                                  meanTemp(
                                    cityWeather.foreCast.DailyForecasts[0]
                                      .Temperature.Maximum.Value,
                                    cityWeather.foreCast.DailyForecasts[0]
                                      .Temperature.Minimum.Value
                                  )
                                )}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {/* change to primary on click */}
                          <FavoriteButton
                            favorites={state.favorites}
                            locationKey={cityWeather.key}
                            cityWeather={cityWeather}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    {cityWeather.foreCast.DailyForecasts.map((day: any) => (
                      <Grid xs={12} md={2} xl={2} item key={Math.random()}>
                        <Card sx={{ margin: '15px' }}>
                          <Grid
                            container
                            spacing={3}
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                          >
                            <Grid item xs={12} md={12} xl={12}>
                              <Typography>{getDayOfWeek(day.Date)}</Typography>
                            </Grid>

                            <Grid item xs={12} md={12} xl={12}>
                              <WeatherIcon weatherIcon={day.Day.Icon} />
                            </Grid>

                            <Grid item xs={12} md={12} xl={12}>
                              <Typography>
                                {state.isCelsius
                                  ? convertNow(
                                      'f',
                                      meanTemp(
                                        day.Temperature.Temperature.Maximum
                                          .Value,
                                        day.Temperature.Temperature.Minimum
                                          .Value
                                      )
                                    )
                                  : convertNow(
                                      'c',
                                      meanTemp(
                                        day.Temperature.Temperature.Maximum
                                          .Value,
                                        day.Temperature.Temperature.Minimum
                                          .Value
                                      )
                                    )}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          //display default weather if nothing searched

          <Grid item xs={12} md={12} xl={12}>
            <Grid container>
              <Grid item xs={12} md={12} xl={12}>
                <Card>
                  <Grid
                    container
                    flexDirection="row"
                    spacing={3}
                    justifyContent="center"
                  >
                    <Grid item xs={12} md={12} xl={12}>
                      <Grid container>
                        <Grid item xs={12} md={10}>
                          <Typography
                            margin={'10px'}
                            variant="h4"
                            component="h4"
                          >
                            {state.selectedFavorite.key === 0
                              ? `Tel Aviv `
                              : state.selectedFavorite.locationName}{' '}
                            -{' '}
                            {state.isCelsius
                              ? convertNow(
                                  'f',
                                  meanTemp(
                                    defaultWeather.DailyForecasts.at(0)
                                      .Temperature!.Maximum.Value,
                                    defaultWeather.DailyForecasts.at(0)
                                      .Temperature!.Minimum.Value
                                  )
                                )
                              : convertNow(
                                  'c',
                                  meanTemp(
                                    defaultWeather.DailyForecasts.at(0)
                                      .Temperature!.Maximum.Value,
                                    defaultWeather.DailyForecasts.at(0)
                                      .Temperature!.Minimum.Value
                                  )
                                )}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <FavoriteButton
                            locationKey={
                              state.selectedFavorite.key === 0
                                ? telAvivKey
                                : state.selectedFavorite.key
                            }
                            favorites={state.favorites}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item> </Grid>
                    <Grid xs={12} md={12} xl={12} item></Grid>
                    {defaultWeather.DailyForecasts.map((day: any) => (
                      <Grid xs={12} md={2} xl={2} item key={Math.random()}>
                        <Card sx={{ margin: '15px' }}>
                          <Grid
                            container
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                          >
                            <Grid item xs={12} md={12} xl={12}>
                              <WeatherIcon weatherIcon={day.Day.Icon} />
                            </Grid>
                            <Grid item xs={12} md={12} xl={12}>
                              <Typography>{getDayOfWeek(day.Date)}</Typography>
                            </Grid>

                            <Grid item xs={12} md={12} xl={12}>
                              <Typography>
                                {state.isCelsius
                                  ? convertNow(
                                      'f',
                                      meanTemp(
                                        day.Temperature!.Maximum.Value,
                                        day.Temperature!.Minimum.Value
                                      )
                                    )
                                  : convertNow(
                                      'c',
                                      meanTemp(
                                        day.Temperature!.Maximum.Value,
                                        day.Temperature!.Minimum.Value
                                      )
                                    )}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </WeatherPageWrapper>
  );
};
