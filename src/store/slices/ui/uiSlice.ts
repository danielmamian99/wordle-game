import { createSlice } from "@reduxjs/toolkit";

export interface UiState {
  isStatsModalOpen: boolean;
  isHowToPlayModalOpen: boolean;
  mode: "Dark" | "Light";
}

const isFirtsTime = !(
  localStorage.getItem("Firts-Time-In-The-Game") === "false"
);

const initialState: UiState = {
  isStatsModalOpen: false,
  isHowToPlayModalOpen: isFirtsTime,
  mode: "Light",
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
        state.mode = state.mode === 'Dark' ? 'Light' : 'Dark';
      },
  },
});

export const { onOpenStatsModal, onCloseStatsModal, onOpenHowToPlayModal, onCloseHowToPlayModal, setMode } = uiSlice.actions;
