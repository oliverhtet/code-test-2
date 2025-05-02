// src/store/teamsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorageHelpers';

interface Team {
  id: string;
  name: string;
  playerCount: number;
  region: string;
  country: string;
  players: string[];
}

interface TeamsState {
  teams: Team[];
}

const initialState: TeamsState = getFromLocalStorage<TeamsState>('teams') || { teams: [] };

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    createTeam(state, action: PayloadAction<Team>) {
      state.teams.push(action.payload);
      saveToLocalStorage('teams', state);
    },
    updateTeam(state, action: PayloadAction<Team>) {
      const index = state.teams.findIndex((team) => team.id === action.payload.id);
      if (index >= 0) {
        state.teams[index] = action.payload;
        saveToLocalStorage('teams', state);
      }
    },
    deleteTeam(state, action: PayloadAction<string>) {
      state.teams = state.teams.filter((team) => team.id !== action.payload);
      saveToLocalStorage('teams', state);
    },
  },
});

export const { createTeam, updateTeam, deleteTeam } = teamsSlice.actions;
export default teamsSlice.reducer;
