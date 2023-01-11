import { useEffect } from "react";

import Swal from "sweetalert2";
import { Header } from "./components/Header";

import { WordRow } from "./components/WordRow";
import { useAppDispatch, useAppSelector, useTimer } from "./hooks";

import { clearErrorMessage, getWords, startGame } from "./store/slices/game";
import { setMode } from "./store/slices/session";

export const App = () => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    inGameWords,
    errorMessage,
    currentRow,
    isWon,
    currentWord,
  } = useAppSelector(state => state.game);

  const { mode } = useAppSelector(state => state.session)

  useEffect(() => {
    dispatch(getWords());
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 2000,
      });

      Toast.fire({
        icon: "warning",
        title: errorMessage,
      });
      dispatch(clearErrorMessage());
    }
  }, [errorMessage]);

  const initGame = () => {
    dispatch(startGame());
  };

  const changeMode = () => {
    dispatch(setMode());
  };
  useTimer();
  return (
    <div className={'w-screen h-screen py-10 ' +  (mode === 'Dark' ? `bg-[#262B3C] text-white` : '')}>
      <Header/>
      <div className="flex flex-col">
        <button onClick={initGame}> Iniciar juego </button>
        <button onClick={changeMode}> Mode </button>
      </div>
      {inGameWords.map((word, index) => (
        <WordRow key={index} positionRow={index} />
      ))}
    </div>
  );
};
