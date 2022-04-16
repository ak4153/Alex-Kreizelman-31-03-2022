import React, { useEffect, useState } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import WeatherIcon from './WeatherIcon';
import getDayOfWeek from '../utils/getDayOfWeek';
import FavoriteButton from './FavoriteButton';
import enqueueAction from '../utils/enqueueAction';
import urls from '../assets/urls.json';
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import SkeletonLoad from '../components/Skeleton';
import getRequest from '../utils/getRequest';

//types
import Location from '../types/Location';
import CurrentWeather from '../types/CurrentWeather';
//redux
import { useAppSelector } from '../Store/hooks';

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = urls.baseUrl;
const currentconditionsUrl = `${baseUrl}/currentconditions/v1/`;
const locationsUrl = `${baseUrl}/locations/v1/`;
interface Props {
  favorite: number;
}
export const FavWeatherItem = (props: Props) => {
  const [location, setLocation] = useState<Location>();
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const favorites = useAppSelector((state) => state.favorites);
  const isCelsius = useAppSelector((state) => state.isCelsius);
  // const dipatch = useAppDispatch();

  useEffect(() => {
    if (props.favorite) {
      getRequest(locationsUrl + props.favorite + apiKey, {
        enqueueSnackbar: enqueueSnackbar,
        action: action,
        setData: setLocation,
        page: 'favweatheritemComponent_setLocation',
      });
      getRequest(currentconditionsUrl + props.favorite + apiKey, {
        enqueueSnackbar: enqueueSnackbar,
        action: action,
        setData: setCurrentWeather,
        page: 'favweatheritemComponent',
      });
    }
  }, []);

  const onLinkClick = () => {
    // dispatch({
    //   type: 'SELECT_FAVORITE',
    //   payload: { key: props.favorite, locationName: location.LocalizedName },
    // });
    // dipatch(
    //   setFavorites({
    //     key: props.favorite,
    //     locationName: location.LocalizedName,
    //   })
    // );
  };

  const action = (key: any) =>
    enqueueAction({ key: key, closeSnackbar: closeSnackbar });

  return (
    <Grid item xs={6} md={5} xl={5}>
      {currentWeather && location ? (
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
              <Link
                to={`/?selectedFavoriteKey=${props.favorite}&selectedFavoriteCityName=${location.LocalizedName}`}
                onClick={onLinkClick}
              >
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
                  {!isCelsius.value
                    ? `${currentWeather.Temperature.Metric.Value}°C`
                    : `${currentWeather.Temperature.Imperial.Value}°F`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      ) : favorites.length < 1 ? (
        <Grid item xs={8} md={8}>
          <Typography margin="10px" variant="h5" component="h5"></Typography>)
        </Grid>
      ) : (
        <SkeletonLoad />
      )}
    </Grid>
  );
};
