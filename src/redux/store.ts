import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
// import menuReducer from './menu-slice';
// import cartReducer from './cart-slice';
// import restoReduce from './resto-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // menus: menuReducer,
    // cart: cartReducer,
    // resto: restoReduce,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
