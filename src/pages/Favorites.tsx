//npm packages
import { Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
//styles
import { WeatherPageWrapper } from '../styles/WeatherPageWrapper';
//components
import { FavWeatherItem } from '../components/FavWeatherItem';
//redux
import { useAppSelector } from '../Store/hooks';
export const Favorites = () => {
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
                <FavWeatherItem key={fav.key} favorite={fav.key} />
              ))
            ) : (
              <Grid item>
                <Typography>
                  So Empty... <Link to="/">Make it full :)</Link>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </WeatherPageWrapper>
  );
};
