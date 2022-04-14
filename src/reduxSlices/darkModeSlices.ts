import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
interface DarkModeState {
  value: boolean;
}
const initialState: DarkModeState = {
  value: Cookies.get('darkMode') ? JSON.parse(Cookies.get('darkMode')!) : false,
};
//DUCK-style
const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode(state) {
      state.value = state.value ? false : true;
      Cookies.set('darkMode', JSON.stringify(state.value));
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
