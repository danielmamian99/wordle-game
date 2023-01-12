import { createSlice } from "@reduxjs/toolkit";

export interface sessionState {
  plays: number;
  time: string;
  wins: number;
}

const initialState: sessionState = {
  plays: 0,
  time: '05:00',
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
    setTime: (state, {payload}) => {
      console.log('payload.seconds >>>', payload.seconds);
      console.log('payload.minutes >>>', payload.minutes);
      const seconds = payload.seconds < 10 ? `0${payload.seconds}` : payload.seconds;
      state.time = `0${payload.minutes}:${seconds}`;
    },
  },
});

export const { setPlays, setWins, setTime } =
  sessionSlice.actions;