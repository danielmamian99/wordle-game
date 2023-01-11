import { createSlice } from "@reduxjs/toolkit";

const isFirtsTime = !(
  localStorage.getItem("Firts-Time-In-The-Game") === "false"
);

export interface sessionState {
  isFirtsTime: boolean;
  mode: "Dark" | "Light";
  plays: number;
  wins: number;
  time: string;
}

const initialState: sessionState = {
  isFirtsTime: isFirtsTime,
  mode: "Light",
  plays: 0,
  wins: 0,
  time: '05:00'
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setFirtsTime: (state) => {
      state.isFirtsTime = false;
      localStorage.setItem("Firts-Time-In-The-Game", "false");
    },
    setMode: (state) => {
      state.mode = state.mode === 'Dark' ? 'Light' : 'Dark';
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
    }
  },
});

export const { setFirtsTime, setMode, setPlays, setWins, setTime } =
  sessionSlice.actions;