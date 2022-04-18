import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
//components
import Temperature from './Temperature';
import FavoriteButton from './FavoriteButton';
import WeatherIcon from './WeatherIcon';
import getDayOfWeek from '../utils/getDayOfWeek';
//types
import { NewWeather } from '../types/NewWeather';

interface Props {
  newWeather: NewWeather;
}

export default function SearchedCityWeather(props: Props) {
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
                  <Grid item xs={12} md={10} xl={12}>
                    <Temperature
                      text={props.newWeather.city}
                      temperature={
                        props.newWeather.foreCast.DailyForecasts[0].Temperature
                      }
                    ></Temperature>
                  </Grid>
                  <Grid item>
                    <FavoriteButton
                      locationKey={props.newWeather.key}
                      newWeather={props.newWeather}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {props.newWeather.foreCast.DailyForecasts.map(
                (day: any, index: number) => (
                  <Grid xs={12} md={2} xl={2} item key={index}>
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
                          <Temperature
                            textSize="h6"
                            temperature={day.Temperature}
                          ></Temperature>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
