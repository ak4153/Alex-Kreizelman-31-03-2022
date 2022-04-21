import { configureStore } from '@reduxjs/toolkit';
import { autoCompleteApiSlice } from '../reduxSlices/autoCompleteSlice';
import darkModeReducer from '../reduxSlices/darkModeSlices';
import favoritesReducer from '../reduxSlices/favoritesSlice';
import isCelsiusReducer from '../reduxSlices/isCelsiusSlice';
import { locationApiSlice } from '../reduxSlices/locationApiSlice';
import { currentWeatherApiSlice } from '../reduxSlices/currentWeatherSlice';
import { geoPositionLocationSlice } from '../reduxSlices/geoPositionLocationSllice';
//redux store
export const store = configureStore({
  reducer: {
    //[]=>state.autoCompleteApiSlice - field
    [autoCompleteApiSlice.reducerPath]: autoCompleteApiSlice.reducer,
    [locationApiSlice.reducerPath]: locationApiSlice.reducer,
    [currentWeatherApiSlice.reducerPath]: currentWeatherApiSlice.reducer,
    [geoPositionLocationSlice.reducerPath]: geoPositionLocationSlice.reducer,
    //after this import in component
    darkMode: darkModeReducer,
    favorites: favoritesReducer,
    isCelsius: isCelsiusReducer,
  },

  //A custom Redux middleware that contains logic for managing caching,
  //invalidation, subscriptions,
  //polling, and more. Add this to the store setup after other middleware.
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat(
      autoCompleteApiSlice.middleware,
      currentWeatherApiSlice.middleware,
      locationApiSlice.middleware,
      geoPositionLocationSlice.middleware
    );
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
