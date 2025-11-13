import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
}

const getInitialAuthState = (): boolean => {
  const refreshToken = localStorage.getItem('refreshToken');

  return !!refreshToken;
};

const initialAuthState: AuthState = {
  isLoggedIn: getInitialAuthState(),
};

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
  },
});

export const { login, exit, setAuth } = authSlice.actions;
export default authSlice.reducer;
