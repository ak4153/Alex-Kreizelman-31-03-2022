import { configureStore } from '@reduxjs/toolkit';
import { autoCompleteApiSlice } from '../reduxSlices/weather';
import darkModeReducer from '../reduxSlices/darkModeSlices';
import favoritesReducer from '../reduxSlices/favoritesSlice';
//redux store
export const store = configureStore({
  reducer: {
    //[]=>state.autoCompleteApiSlice - field
    [autoCompleteApiSlice.reducerPath]: autoCompleteApiSlice.reducer,
    darkMode: darkModeReducer,
    favorites: favoritesReducer,
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
