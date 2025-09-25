import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import { booksReducer } from './book-slice';
//  import { cartReducer } from './cart-slice';
import cartReducer from './cart-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: booksReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
