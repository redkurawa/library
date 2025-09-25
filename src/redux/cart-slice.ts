import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface BookCart {
  idCart: string;
  idBook: number;
  category: string;
  title: string;
  author: string;
}

const initialState: BookCart[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Omit<BookCart, 'idCart'>>) => {
      const isExist = state.some(
        (item) => item.idBook === action.payload.idBook
      );
      if (!isExist) {
        state.push({ idCart: uuidv4(), ...action.payload });
      }
    },
    removeCart: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((cart) => cart.idCart === action.payload);
      if (index !== -1) state.splice(index, 1);
    },
  },
});

export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
