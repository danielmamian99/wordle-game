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
  isWon: boolean;
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
  isWon: false,
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
      while (state.currentWord.length !== 5 || state.usedWords.find((word) => word === state.currentWord)) {
        state.currentWord =
          state.allWords[Math.floor(Math.random() * state.allWords.length)];
      }
      state.usedWords.push(state.currentWord);
      state.inGameWords = [[], [], [], [], []];
      state.isWon = false;
      state.currentRow = 0;
      state.errorMessage = undefined;
    },
    setCurrentRow: (state, { payload }) => {
      state.currentRow += 1;
    },
    isValidWord: (state, { payload }) => {
      const isValid = state.allWords.find((word) => word === payload.join(""));
      if (state.currentWord === payload.join("") && isValid) {
        state.isWon = true;
        state.gameStart = false;
        state.inGameWords[state.currentRow] = isValid.split("");
        state.currentRow += 1;
      }else if (isValid && state.currentRow === 4) {
        state.isWon = false;
        state.gameStart = false;
        state.inGameWords[state.currentRow] = isValid.split("");
        state.currentRow += 1;
      }
      else if (isValid) {
        state.inGameWords[state.currentRow] = isValid.split("");
        state.currentRow += 1;
      } else {
        state.errorMessage = "Palabra no valida";
      }
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  startLoadingWords,
  setWords,
  startGame,
  setCurrentRow,
  isValidWord,
  clearErrorMessage
} = gameSlice.actions;
