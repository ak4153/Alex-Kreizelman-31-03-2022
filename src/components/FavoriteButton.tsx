import React, { useContext } from 'react';
import {
  Card,
  Grid,
  CardContent,
  Typography,
  List,
  ListItem,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Store } from '../Store/Provider';

interface Props {
  favorites?: any[];
  locationKey: number;
  cityWeather?: any;
}

const FavoriteButton = (props: Props) => {
  const { favorites, locationKey, cityWeather } = props;
  const { state, dispatch } = useContext(Store);

  const handleAddToFav = () => {
    dispatch({ type: 'SET_FAVORITES', payload: { key: locationKey } });
  };

  return (
    <Button>
      {/* change to primary on click */}
      <FavoriteIcon
        onClick={handleAddToFav}
        color={
          state.favorites.find((k: number) => locationKey === k)
            ? 'error'
            : 'action'
        }
      />
    </Button>
  );
};

export default FavoriteButton;
