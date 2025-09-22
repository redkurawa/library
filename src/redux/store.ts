import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import { booksReducer } from './book-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    book: booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
