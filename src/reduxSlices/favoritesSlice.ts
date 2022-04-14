import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import _ from 'lodash';

interface Favorite {
  key: number;
  locationName?: string;
}

const initialState: Favorite[] = Cookies.get('favorites')
  ? JSON.parse(Cookies.get('favorites')!)
  : [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Favorite>) {
      if (!state.find((fav: Favorite) => fav.key === action.payload.key)) {
        state.push({ key: action.payload.key });
        Cookies.set('favorites', JSON.stringify(state));
      } else {
        _.remove(state, (fav) => fav.key === action.payload.key);
        Cookies.set('favorites', JSON.stringify(state));
      }
    },
    clearFavorites(state) {
      state = [];
    },
  },
});

export const { setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
