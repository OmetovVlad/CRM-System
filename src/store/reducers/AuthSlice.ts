import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RolesValues } from '../../types';
import { profile } from '../../api';

interface AuthState {
  isLoggedIn: boolean;
  roles: RolesValues[];
}

const getInitialLoggedIn = (): boolean => {
  const refreshToken = localStorage.getItem('refreshToken');
  return !!refreshToken;
};

const initialAuthState: AuthState = {
  isLoggedIn: getInitialLoggedIn(),
  roles: []
};

export const fetchProfileData = createAsyncThunk(
  'auth/fetchProfileData',
  async (): Promise<RolesValues[]> => {
    const response = await profile();
    return response.roles;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login: (state: AuthState) => {
      state.isLoggedIn = true;
    },
    exit: (state: AuthState) => {
      state.isLoggedIn = false;
    },
    setAuth: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setRoles: (state: AuthState, action: PayloadAction<RolesValues[]>) => {
      state.roles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      state.roles = action.payload as RolesValues[];
    });
  },
});

export const { login, exit, setAuth, setRoles } = authSlice.actions;
export default authSlice.reducer;
