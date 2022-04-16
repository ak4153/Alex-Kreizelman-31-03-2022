import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface isCelsius {
  value: boolean;
}

const initialState: isCelsius = {
  value: Cookies.get('isCelsius')
    ? JSON.parse(Cookies.get('isCelsius')!)
    : false,
};

const isCelsiusSlice = createSlice({
  name: 'isCelsius',
  initialState,
  reducers: {
    setUnit(state) {
      state.value = state.value ? false : true;
      Cookies.set('isCelsius', JSON.stringify(state.value));
    },
  },
});

//after this import in reduxjsStore
export const { setUnit } = isCelsiusSlice.actions;
export default isCelsiusSlice.reducer;
