import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
};

export const fetchShoppingLists = createAsyncThunk(
  'shoppingList/fetchShoppingLists',
  async (userId) => {
    const response = await axios.get(`http://localhost:5000/shoppingLists?userId=${userId}`);
    return response.data;
  }
);

const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingLists.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { addItem, updateItem, removeItem } = shoppingListSlice.actions;
export default shoppingListSlice.reducer;
