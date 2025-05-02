// src/store/playersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Player {
  id: string;
  name: string;
}

interface PlayersState {
  players: Player[];
}

const initialState: PlayersState = {
  players: [],
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers(state, action: PayloadAction<Player[]>) {
      state.players = action.payload;
    },
  },
});

export const { setPlayers } = playersSlice.actions;
export default playersSlice.reducer;
