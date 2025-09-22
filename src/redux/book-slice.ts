// src/store/booksSlice.ts

// Import necessary functions from Redux Toolkit.
// 'createSlice' - Creates a Redux slice with reducers.
// 'createAsyncThunk' - For async actions.
// 'PayloadAction' - For typing reducer payloads.
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
// Import Book type.
import type { Book } from '@/types/books';
import { GetService } from '@/services/service';
// Import mock generator.
// import { generateMockBooks } from '../utils/mockBooks';

// Define the initial state interface.
// 'interface BooksState' - TypeScript interface for state shape.
interface BooksState {
  // 'books: Book[];' - Array of books.
  books: Book[];
  // 'loading: boolean;' - Tracks if data is fetching.
  loading: boolean;
  // 'error: string | null;' - For error messages.
  error: string | null;
}

// Initial state object.
// 'const initialState: BooksState = { ... }' - Typed with BooksState.
const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching books.
// 'export const getBooks' - Exports the thunk.
// 'createAsyncThunk' - Takes action type string and async function.
// The async function calls the mock generator and returns data.
// If error, rejects with value.
export const getBooks = createAsyncThunk('books/getBooks', async () => {
  try {
    const r = await GetService('books');
    return r.data.books;
  } catch (error) {
    return Promise.reject('Failed to fetch books');
  }
});

// Create the slice.
// 'const booksSlice = createSlice({ ... })' - Configures slice.
const booksSlice = createSlice({
  // 'name: 'books',' - Prefix for action types.
  name: 'books',
  // 'initialState,' - Starts with defined state.
  initialState,
  // 'reducers: { }' - Sync reducers (none here, all async).
  reducers: {},
  // 'extraReducers: (builder) => { ... }' - Handles async thunk states.
  extraReducers: (builder) => {
    // 'builder.addCase(getBooks.pending, (state) => { ... })' - When thunk starts.
    builder.addCase(getBooks.pending, (state) => {
      // 'state.loading = true;' - Set loading to true.
      state.loading = true;
      // 'state.error = null;' - Clear error.
      state.error = null;
    });
    // 'builder.addCase(getBooks.fulfilled, (state, action: PayloadAction<Book[]>) => { ... })' - When success.
    // Action payload is Book[].
    builder.addCase(
      getBooks.fulfilled,
      (state, action: PayloadAction<Book[]>) => {
        // 'state.loading = false;' - Stop loading.
        state.loading = false;
        // 'state.books = action.payload;' - Set books to fetched data.
        state.books = action.payload;
      }
    );
    // 'builder.addCase(getBooks.rejected, (state, action) => { ... })' - When failed.
    builder.addCase(getBooks.rejected, (state, action) => {
      // 'state.loading = false;' - Stop loading.
      state.loading = false;
      // 'state.error = action.error.message || 'Unknown error';' - Set error message.
      state.error = action.error.message || 'Unknown error';
    });
  },
});

// 'export const booksReducer = booksSlice.reducer;' - Exports the reducer for store.
export const booksReducer = booksSlice.reducer;
