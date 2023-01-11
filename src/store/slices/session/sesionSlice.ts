import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const isFirtsTime = !(
  localStorage.getItem("Firts-Time-In-The-Game") === "false"
);

export interface sessionState {
  isFirtsTime: boolean;
  mode: "Dark" | "Light";
  plays: number;
  wins: number;
}

const initialState: sessionState = {
  isFirtsTime: isFirtsTime,
  mode: "Light",
  plays: 0,
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
    setMode: (state, { payload }) => {
      state.mode = payload;
    },
    setPlays: (state) => {
      state.plays += 1;
    },
    setWins: (state) => {
      state.wins += 1;
    },
  },
});

export const { setFirtsTime, setMode, setPlays, setWins } =
  sessionSlice.actions;
