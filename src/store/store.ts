// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import teamsReducer from './teamsSlice';
import playersReducer from './playersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    teams: teamsReducer,
    players: playersReducer,
  },
  
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
