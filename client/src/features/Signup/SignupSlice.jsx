// registerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const registerSlice = createSlice({
  name: 'register',
  initialState: {
    formData: {
      username: '',
      email: '',
      password: '',
      confirmpassword: ''
    },
    errors: {},
    valid: true,
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setValid: (state, action) => {
      state.valid = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
      state.errors = {};
      state.valid = true;
    }
  }
});

export const { setFormData, setErrors, setValid, resetForm } = registerSlice.actions;
export default registerSlice.reducer;
