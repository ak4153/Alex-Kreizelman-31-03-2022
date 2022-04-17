import React, { useContext } from 'react';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

//redux
import { setFavorites } from '../reduxSlices/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../Store/hooks';

interface Props {
  favorites?: any[];
  locationKey: number;
  cityWeather?: any;
}

const FavoriteButton = (props: Props) => {
  const { locationKey } = props;
  // const { state, dispatch } = useContext(Store);

  //redux
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites);

  const handleAddToFav = () => {
    dispatch(setFavorites({ key: +locationKey }));
  };

  return (
    <Button>
      <FavoriteIcon
        onClick={handleAddToFav}
        color={
          favorites.find((fav: { key: number }) => +locationKey === fav.key)
            ? 'error'
            : 'action'
        }
      />
    </Button>
  );
};

export default FavoriteButton;
