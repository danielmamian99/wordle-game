import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

export interface gameState {
    isLoading: boolean;
    allWords: string[];
    usedWords: string[];
    currentWord: string;
}

const initialState: gameState = {
    allWords: [],
    usedWords: [],
    isLoading: false,
    currentWord: ''
}

export const gameSlice = createSlice({
   name: 'game',
   initialState,
   reducers: {
       startLoadingWords: (state) => {
           state.isLoading = true;
       },
       setWords: (state, {payload}: PayloadAction<any>) => {
           state.allWords = payload.words;
           state.isLoading = false;
       },
       setCurrentWord: (state) => {
        state.currentWord = state.allWords[Math.floor((Math.random() * state.allWords.length))];
        state.usedWords.push(state.currentWord);
       }
    }
});


export const { startLoadingWords, setWords, setCurrentWord } = gameSlice.actions;