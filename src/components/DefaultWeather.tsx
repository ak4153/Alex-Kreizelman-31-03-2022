import React from 'react';
import { Card, Grid, Typography, CircularProgress } from '@mui/material';
import Temperature from '../components/Temperature';
import FavoriteButton from '../components/FavoriteButton';
import WeatherIcon from '../components/WeatherIcon';
import { useSearchParams } from 'react-router-dom';
import { isNull } from 'lodash';
import getDayOfWeek from '../utils/getDayOfWeek';
import { DailyForecast } from '../types/5dayForeCast';

const telAvivKey = 215854;

interface Props {
  defaultWeather: DailyForecast[];
}

export default function DefaultWeather(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
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
                    <Temperature
                      text={
                        isNull(searchParams.get('selectedFavoriteCityName'))
                          ? `Tel Aviv `
                          : searchParams.get('selectedFavoriteCityName')
                      }
                      temperature={props.defaultWeather[0].Temperature}
                    ></Temperature>
                  </Grid>
                  <Grid item>
                    <FavoriteButton
                      locationKey={
                        isNull(searchParams.get('selectedFavoriteKey'))
                          ? telAvivKey
                          : Number.parseInt(
                              searchParams.get('selectedFavoriteKey')
                            )
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item> </Grid>
              <Grid xs={12} md={12} xl={12} item></Grid>
              {props.defaultWeather.map((day: any) => (
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
                        <Temperature
                          textSize="h6"
                          temperature={day.Temperature}
                        ></Temperature>
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
  );
}
