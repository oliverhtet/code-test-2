// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorageHelpers';

interface AuthState {
  isAuthenticated: boolean;
  userName: string | null;
}

// Ensure this is done only on client side to avoid SSR issues
const isClient = typeof window !== 'undefined';

const initialState: AuthState = isClient
  ? getFromLocalStorage<AuthState>('auth') || { isAuthenticated: false, userName: null }
  : { isAuthenticated: false, userName: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.userName = action.payload;
      if (isClient) saveToLocalStorage('auth', state);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.userName = null;
      if (isClient) saveToLocalStorage('auth', state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
