//npm packages

import { useSnackbar } from 'notistack';
import { Card, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
//assets

//components
import WeatherIcon from './WeatherIcon';
import FavoriteButton from './FavoriteButton';
import SkeletonLoad from '../components/Skeleton';
//utility functions

import enqueueAction from '../utils/enqueueAction';
import getDayOfWeek from '../utils/getDayOfWeek';
//types

//redux
import { useAppSelector } from '../Store/hooks';
import { useFetchCurrentWeatherQuery } from '../reduxSlices/currentWeatherSlice';
import { useFetchLocationQuery } from '../reduxSlices/locationApiSlice';
//config

interface Props {
  favorite: number;
}
export const FavWeatherItem = (props: Props) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const isCelsius = useAppSelector((state) => state.isCelsius);

  const fetchLocationData = useFetchLocationQuery(props.favorite);
  var fetchCurrentWeatherData = { data: null, isSuccess: false };

  ({
    data: fetchCurrentWeatherData.data,
    isSuccess: fetchCurrentWeatherData.isSuccess,
  } = useFetchCurrentWeatherQuery(props.favorite, {
    skip: !fetchLocationData.isSuccess,
  }));

  const action = (key: number) =>
    enqueueAction({ key: key, closeSnackbar: closeSnackbar });

  return (
    <Grid item xs={6} md={5} xl={5}>
      {fetchLocationData.isError &&
        enqueueSnackbar('Error fetching, check api key', {
          action,
          preventDuplicate: true,
        }) &&
        console.clear()}
      {fetchCurrentWeatherData.isSuccess && fetchLocationData.isSuccess ? (
        <Card>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={6} xl={6}>
              <Typography margin="10px" variant="h5" component="h5">
                {fetchLocationData.data.LocalizedName} - {props.favorite}
              </Typography>
            </Grid>
            <Grid item xs={8} md={6}>
              <FavoriteButton locationKey={props.favorite} />
            </Grid>
            <Grid item>
              <Link
                to={`/?selectedFavoriteKey=${props.favorite}&selectedFavoriteCityName=${fetchLocationData.data.LocalizedName}`}
              >
                <Typography textAlign="center">Forecast</Typography>
              </Link>
            </Grid>
            <Grid item xs={12} md={12}>
              <Typography textAlign="center">
                {getDayOfWeek(
                  fetchCurrentWeatherData.data[0].LocalObservationDateTime
                )}
              </Typography>

              <Grid xs={12} md={12} xl={12} item>
                <Typography textAlign={'center'}>
                  <WeatherIcon
                    weatherIcon={fetchCurrentWeatherData.data[0].WeatherIcon}
                  />
                </Typography>
              </Grid>

              <Grid xs={12} md={12} xl={12} item>
                <Typography textAlign={'center'}>
                  {!isCelsius.value
                    ? `${fetchCurrentWeatherData.data[0].Temperature.Metric.Value}°C`
                    : `${fetchCurrentWeatherData.data[0].Temperature.Imperial.Value}°F`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <SkeletonLoad />
      )}
    </Grid>
  );
};
