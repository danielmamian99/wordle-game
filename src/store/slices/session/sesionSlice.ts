import { createSlice } from "@reduxjs/toolkit";

const isFirtsTime = !(
  localStorage.getItem("Firts-Time-In-The-Game") === "false"
);

export interface sessionState {
  isFirtsTime: boolean;
  plays: number;
  time: string;
  wins: number;
}

const initialState: sessionState = {
  isFirtsTime: isFirtsTime,
  plays: 0,
  time: '05:00',
  wins: 0,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setFirtsTime: (state) => {
      state.isFirtsTime = false;
      localStorage.setItem("Firts-Time-In-The-Game", "false");
    },
    setPlays: (state) => {
      state.plays += 1;
    },
    setWins: (state) => {
      state.wins += 1;
    },
    setTime: (state, {payload}) => {
      const seconds = payload.seconds < 10 ? `0${payload.seconds}` : payload.seconds;
      state.time = `0${payload.minutes}:${seconds}`;
    },

  },
});

export const { setFirtsTime, setPlays, setWins, setTime } =
  sessionSlice.actions;