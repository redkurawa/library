import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface BookCart {
  idCart: string;
  idBook: number;
  category: string;
  title: string;
  author: string;
  coverImage?: string;
}

// Load initial state from localStorage
const loadState = (): BookCart[] => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState: BookCart[] = loadState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<Omit<BookCart, 'idCart'>>) => {
      const isExist = state.some(
        (item) => item.idBook === action.payload.idBook
      );
      if (!isExist) {
        const newItem = { idCart: uuidv4(), ...action.payload };
        state.push(newItem);
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    removeCart: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((cart) => cart.idCart === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
  },
});

export const { addCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;
