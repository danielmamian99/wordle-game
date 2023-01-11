import { useEffect } from "react";

import Swal from "sweetalert2";

import { StatsModal, Header, WordRow } from "./components";
import { useAppDispatch, useAppSelector, useTimer } from "./hooks";
import { clearErrorMessage, getWords, startGame } from "./store/slices/game";

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

  const { mode } = useAppSelector(state => state.ui)

  useEffect(() => {
    dispatch(getWords());
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 1500,
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
  useTimer();
  return (
    <div className={'h-screen py-10 ' +  (mode === 'Dark' ? `bg-[#262B3C] text-white` : '')}>
      <Header/>
      <div className="flex flex-col">
        <button onClick={initGame}> Iniciar juego </button>
      </div>
      {inGameWords.map((word, index) => (
        <WordRow key={index} positionRow={index} />
      ))}
      <StatsModal/>
    </div>
  );
};
