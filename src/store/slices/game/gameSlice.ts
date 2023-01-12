import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface gameState {
  isLoading: boolean;
  allWords: string[];
  usedWords: string[];
  currentWord: string;
  gameStart: boolean;
  inGameWords: string[][];
  currentRow: number;
  errorMessage?: string;
  hasWin: boolean;
  hasLose: boolean;
}

const initialState: gameState = {
  allWords: [],
  usedWords: [],
  isLoading: false,
  currentWord: "",
  gameStart: false,
  inGameWords: [[], [], [], [], []],
  currentRow: 0,
  errorMessage: undefined,
  hasWin: false,
  hasLose: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startLoadingWords: (state) => {
      state.isLoading = true;
    },
    setWords: (state, { payload }: PayloadAction<any>) => {
      state.allWords = payload.words;
      state.isLoading = false;
    },
    startGame: (state) => {
      state.gameStart = true;
      state.hasLose = false;
      while (
        state.currentWord.length !== 5 ||
        state.usedWords.find((word) => word === state.currentWord)
      ) {
        state.currentWord =
          state.allWords[Math.floor(Math.random() * state.allWords.length)];
      }
      state.usedWords.push(state.currentWord);
      state.inGameWords = [[], [], [], [], []];
      state.hasWin = false;
      state.currentRow = 0;
      state.errorMessage = undefined;
    },
    setCurrentRow: (state) => {
      state.currentRow += 1;
    },
    isValidWord: (state, { payload }) => {
      const isValid = state.allWords.find((word) => word === payload.join(""));
      if (state.currentWord === payload.join("") && isValid) {
        state.hasWin = true;
        state.gameStart = false;
        state.inGameWords[state.currentRow] = isValid.split("");
        state.currentRow += 1;
      } else if (isValid) {
        state.inGameWords[state.currentRow] = isValid.split("");
        state.currentRow += 1;
      } else {
        state.errorMessage = "Palabra no valida";
      }
    },
    loseGame: (state) => {
      state.hasWin = false;
      state.gameStart = false;
      state.currentRow += 1;
      state.hasLose = true;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  clearErrorMessage,
  isValidWord,
  loseGame,
  setCurrentRow,
  setWords,
  startGame,
  startLoadingWords,
} = gameSlice.actions;
