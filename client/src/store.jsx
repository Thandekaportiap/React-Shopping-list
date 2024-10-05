import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from './features/Shopping/ShoppingListSlice'
import loginReducer from './features/Login/LoginSlice'
import registerReducer from './features/Signup/SignupSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    shoppingList: shoppingListReducer,
   register: registerReducer,
  },
})