import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { Book } from '@/types/books';
import { GetService } from '@/services/service';
interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

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

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getBooks.fulfilled,
      (state, action: PayloadAction<Book[]>) => {
        state.loading = false;
        state.books = action.payload;
      }
    );
    builder.addCase(getBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Unknown error';
    });
  },
});

export const booksReducer = booksSlice.reducer;
