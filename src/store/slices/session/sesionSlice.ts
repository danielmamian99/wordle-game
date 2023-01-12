import { createSlice } from "@reduxjs/toolkit";

export interface sessionState {
  plays: number;
  timeIsOver: boolean;
  wins: number;
}

const initialState: sessionState = {
  plays: 0,
  timeIsOver: false,
  wins: 0,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setPlays: (state) => {
      state.plays += 1;
    },
    setWins: (state) => {
      state.wins += 1;
    },
    startTime: (state) => {
      state.timeIsOver = false;
    },
    overTime: (state) => {
      state.timeIsOver = true;
    }
  },
});

export const { setPlays, setWins, startTime, overTime } =
  sessionSlice.actions;