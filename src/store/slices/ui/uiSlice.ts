import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  isStatsModalOpen: boolean;
  isHowToPlayModalOpen: boolean;
  mode: "Dark" | "Light";
}

const isFirtsTime = !(
  localStorage.getItem("Firts-Time-In-The-Game") === "false"
);

const mode = localStorage.getItem("wordleGame-mode") === 'Dark' ? 'Dark' : 'Light';

const initialState: UiState = {
  isStatsModalOpen: false,
  isHowToPlayModalOpen: isFirtsTime,
  mode,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    onOpenStatsModal: (state) => {
      state.isStatsModalOpen = true;
    },
    onCloseStatsModal: (state) => {
      state.isStatsModalOpen = false;
    },
    onOpenHowToPlayModal: (state) => {
      state.isHowToPlayModalOpen = true;
    },
    onCloseHowToPlayModal: (state) => {
      state.isHowToPlayModalOpen = false;
    },
    setMode: (state) => {
      state.mode = state.mode === "Dark" ? "Light" : "Dark";
      localStorage.setItem("wordleGame-mode", state.mode);
    },
  },
});

export const {
  onOpenStatsModal,
  onCloseStatsModal,
  onOpenHowToPlayModal,
  onCloseHowToPlayModal,
  setMode,
} = uiSlice.actions;
