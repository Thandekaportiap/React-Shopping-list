// loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginData: {
    username: '',
    password: '',
  },
  loginErrors: {},
  loginValid: true,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginData(state, action) {
      state.loginData = { ...state.loginData, ...action.payload };
    },
    setLoginErrors(state, action) {
      state.loginErrors = action.payload;
    },
    setLoginValid(state, action) {
      state.loginValid = action.payload;
    },
  },
});

export const { setLoginData, setLoginErrors, setLoginValid } = loginSlice.actions;
export default loginSlice.reducer;
