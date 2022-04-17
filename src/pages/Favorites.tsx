import React, { useContext } from 'react';
import { WeatherPageWrapper } from '../styles/WeatherPageWrapper';
import { Grid, Typography } from '@mui/material';
import { FavWeatherItem } from '../components/FavWeatherItem';
import { Link } from 'react-router-dom';

//redux
import { useAppSelector } from '../Store/hooks';
import { setFavorites } from '../reduxSlices/favoritesSlice';
export const Favorites = () => {
  // const { state, dispatch } = useContext(Store);
  const favorites = useAppSelector((state) => state.favorites);
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
            {favorites.length > 0 ? (
              favorites.map((fav: any) => (
                <FavWeatherItem key={Math.random()} favorite={fav.key} />
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
