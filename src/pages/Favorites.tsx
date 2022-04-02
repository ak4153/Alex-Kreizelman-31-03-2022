import React, { useContext } from 'react';
import { WeatherPageWrapper } from '../styles/WeatherPageWrapper';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { Store } from '../Store/Provider';
import { FavWeatherItem } from '../components/FavWeatherItem';

import apiKeyJson from '../assets/apiKey.json';
import urls from '../assets/urls.json';
import { Link } from 'react-router-dom';

const baseUrl = urls.baseUrl;

export const Favorites = () => {
  const { state, dispatch } = useContext(Store);

  return (
    <WeatherPageWrapper>
      <Grid container>
        <Grid item xs={12} md={12} xl={12}>
          <Grid
            container
            flexDirection="row"
            spacing={3}
            justifyContent="center"
          >
            {state.favorites.length > 0 ? (
              state.favorites.map((fav: any) => (
                <FavWeatherItem key={Math.random()} favorite={fav} />
              ))
            ) : (
              <Grid item>
                <Typography>
                  Empty.. <Link to="/">Make it full :)</Link>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </WeatherPageWrapper>
  );
};
