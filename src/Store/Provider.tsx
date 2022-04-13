import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import InitialState from '../types/initialState';
export const Store = createContext<any>(null);

const initialState: InitialState = {
  favorites: Cookies.get('favorites')
    ? JSON.parse(Cookies.get('favorites')!)
    : [],
  selectedFavorite: { key: 0, locationName: '' },
  darkMode: Cookies.get('darkMode')
    ? JSON.parse(Cookies.get('darkMode')!)
    : false,
  isCelsius: Cookies.get('isCelsius')
    ? JSON.parse(Cookies.get('isCelsius')!)
    : false,
};

const reducer = (state: InitialState, action: any) => {
  switch (action.type) {
    case 'SET_FAVORITES':
      //removing/adding a favorite
      if (!state.favorites.find((fav) => fav === action.payload.key)) {
        const newFavorites = [...state.favorites, action.payload.key];
        Cookies.set('favorites', JSON.stringify(newFavorites));
        return {
          ...state,
          favorites: newFavorites,
        };
      } else {
        const newFavorites = state.favorites.filter(
          (fav) => fav !== action.payload.key
        );

        Cookies.set('favorites', JSON.stringify(newFavorites));

        return {
          ...state,
          favorites: newFavorites,
        };
      }
    case 'SELECT_FAVORITE':
      if (action.payload.key !== 0)
        return {
          ...state,
          selectedFavorite: {
            key: action.payload.key,
            locationName: action.payload.locationName,
          },
        };
      else {
        return { ...state };
      }

    case 'CLEAR_FAVORITE':
      return { ...state, selectedFavorite: { key: 0, locationName: '' } };

    // case 'SET_DARKMODE':
    //   let setDarkMode = state.darkMode ? false : true;
    //   Cookies.set('darkMode', JSON.stringify(setDarkMode));

    // return { ...state, darkMode: setDarkMode };
    case 'SET_UNIT':
      let setUnit = state.isCelsius ? false : true;
      Cookies.set('isCelsius', JSON.stringify(setUnit));
      return { ...state, isCelsius: setUnit };

    default:
      return { ...state };
  }
};

export const StoreProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value: any = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
