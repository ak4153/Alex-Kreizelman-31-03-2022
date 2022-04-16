import { configureStore } from '@reduxjs/toolkit';
import { autoCompleteApiSlice } from '../reduxSlices/weather';
import darkModeReducer from '../reduxSlices/darkModeSlices';
import favoritesReducer from '../reduxSlices/favoritesSlice';
import isCelsiusReducer from '../reduxSlices/isCelsiusSlice';
//redux store
export const store = configureStore({
  reducer: {
    //[]=>state.autoCompleteApiSlice - field
    [autoCompleteApiSlice.reducerPath]: autoCompleteApiSlice.reducer,
    //after this import in component
    darkMode: darkModeReducer,
    favorites: favoritesReducer,
    isCelsius: isCelsiusReducer,
  },

  //A custom Redux middleware that contains logic for managing caching,
  //invalidation, subscriptions,
  //polling, and more. Add this to the store setup after other middleware.
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat(autoCompleteApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
