import { startLoadingWords, setWords, startGame } from "./";
import { AppDispatch } from "../../store";
import { wordsApi } from "../../../api/wordsApi";
import { startTime } from "../session";

export const getWords = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(startLoadingWords());

    const data = await wordsApi();
    const words = data.split("\n");
    const wordsWhitoutAccent = words.map((word) => {
      return word.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    });
    const wordsWithCorrectLenght = wordsWhitoutAccent.filter(
      (word) => word.length === 5
    );
    dispatch(setWords({ words: wordsWithCorrectLenght }));
  };
};

export const onStartGame = () => {
  return (dispatch: AppDispatch) => {
    dispatch(startTime());
    dispatch(startGame());
  };
};
