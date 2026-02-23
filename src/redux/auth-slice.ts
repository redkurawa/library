import { PostService, PatchService } from '@/services/service';
import type { AuthState, LoginPayload, LoginRequest, User } from '@/types/user';
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

export const updateProfile = createAsyncThunk<
  Partial<User>,
  Partial<User>,
  { rejectValue: any }
>('auth/updateProfile', async (userData: Partial<User>, { rejectWithValue, getState }) => {
  try {
    const state: any = getState();
    const token = state.auth.token;

    // Create FormData for multipart/form-data
    const formData = new FormData();
    if (userData.name) formData.append('name', userData.name);
    if (userData.phone) formData.append('phone', userData.phone);

    const r = await PatchService('me', formData, token);
    console.log('Update profile response:', r.data);

    // Return the data we sent (backend might not return full user object)
    return userData;
  } catch (error: any) {
    return rejectWithValue(error.response?.data);
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
      // Clear cart on logout
      localStorage.removeItem('cart');
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
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateProfile.fulfilled,
        (state, action: PayloadAction<Partial<User>>) => {
          state.isLoading = false;
          // Update user data with the changes we sent
          if (state.user) {
            state.user = {
              ...state.user,
              ...action.payload,
            };
          }
        }
      )
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
