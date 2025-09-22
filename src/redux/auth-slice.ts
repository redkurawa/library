// auth-slice.ts

import { PostService } from '@/services/service';
import type { AuthState, LoginPayload, LoginRequest } from '@/types/user';
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  LoginPayload,
  LoginRequest,
  { rejectValue: any }
>('auth/login', async (userData: LoginRequest, { rejectWithValue }) => {
  try {
    const r = await PostService('auth/login', userData);
    // console.log(r.data.data);
    return r.data.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginPayload>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
