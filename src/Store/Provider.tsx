import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';
import InitialState from '../types/initialState';
export const Store = createContext<any>(null);
//context api store
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
    default:
      return { ...state };
  }
};

export const StoreProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value: any = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
