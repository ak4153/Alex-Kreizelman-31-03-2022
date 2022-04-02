import React, { useEffect, useState, useContext } from 'react';
import { Card, Grid, Typography, Button } from '@mui/material';
import axios from 'axios';
import WeatherIcon from './WeatherIcon';
import getDayOfWeek from '../utils/getDayOfWeek';
import FavoriteButton from './FavoriteButton';
import apiKeyJson from '../assets/apiKey.json';
import urls from '../assets/urls.json';
import { Store } from '../Store/Provider';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import SkeletonLoad from '../components/Skeleton';
import showSnackBar from '../utils/showSnackBar';
const apiKey = apiKeyJson.apiKey;
const baseUrl = urls.baseUrl;
const currentconditionsUrl = `${baseUrl}/currentconditions/v1/`;
const locationsUrl = `${baseUrl}/locations/v1/`;
interface Props {
  favorite: number;
}
export const FavWeatherItem = (props: Props) => {
  const [location, setLocation] = useState<any>({});
  const { state, dispatch } = useContext<any>(Store);
  const [currentWeather, setCurrentWeather] = useState<any>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  useEffect(() => {
    if (props.favorite) {
      axios
        .get(locationsUrl + props.favorite + apiKey)
        .then((res) => {
          setLocation((prevState: any) => (prevState = res.data));
        })
        .catch((err) => showSnackBar(enqueueSnackbar, action));

      axios
        .get(currentconditionsUrl + props.favorite + apiKey)
        .then((res) => {
          setCurrentWeather((prevState: any) => (prevState = res.data[0]));
        })
        .catch((err) => showSnackBar(enqueueSnackbar, action));
    }
  }, []);

  const onLinkClick = () => {
    dispatch({
      type: 'SELECT_FAVORITE',
      payload: { key: props.favorite, locationName: location.LocalizedName },
    });
  };

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
    <Grid item xs={6} md={5} xl={5}>
      {currentWeather ? (
        <Card>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6} xl={6}>
              <Typography margin="10px" variant="h5" component="h5">
                {location.LocalizedName} - {props.favorite}
              </Typography>
            </Grid>

            <Grid item xs={8} md={6}>
              <FavoriteButton locationKey={props.favorite} />
            </Grid>
            <Grid item>
              <Link to={'/'} onClick={onLinkClick}>
                <Typography textAlign="center">Forecast</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography textAlign="center">
                {getDayOfWeek(currentWeather.LocalObservationDateTime)}
              </Typography>

              <Grid xs={12} md={12} xl={12} item>
                <Typography textAlign={'center'}>
                  <WeatherIcon weatherIcon={currentWeather.WeatherIcon} />
                </Typography>
              </Grid>

              <Grid xs={12} md={12} xl={12} item>
                <Typography textAlign={'center'}>
                  {state.isCelsius
                    ? `${currentWeather.Temperature.Metric.Value}°C`
                    : `${currentWeather.Temperature.Imperial.Value}°F`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      ) : state.favorites.length < 1 ? (
        <Grid item xs={8} md={8}>
          <Typography margin="10px" variant="h5" component="h5">
            Nothing here
          </Typography>
          )
        </Grid>
      ) : (
        <SkeletonLoad />
      )}
    </Grid>
  );
};
