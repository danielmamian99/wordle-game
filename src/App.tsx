import { useEffect } from "react";

import Swal from "sweetalert2";

import { StatsModal, Header, WordRow } from "./components";
import { HowToPlayModal } from "./components/HowToPlayModal";
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
    gameStart,
    allWords
  } = useAppSelector((state) => state.game);

  const { mode, isHowToPlayModalOpen, isStatsModalOpen } = useAppSelector((state) => state.ui);

  useEffect(() => {
    dispatch(getWords());
  }, []);

  useEffect(() => {
    if(!isHowToPlayModalOpen && !isStatsModalOpen && !gameStart && allWords.length > 0){
      dispatch(startGame());
    }
  }, [isHowToPlayModalOpen, isStatsModalOpen, gameStart, allWords.length])

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

  useTimer();

  return (
    <div
      className={
        "h-screen py-10 " + (mode === "Dark" ? `bg-[#262B3C] text-white` : "")
      }
    >
      <Header />
      <section className="mt-10">
        {inGameWords.map((word, index) => (
          <WordRow key={index} positionRow={index} />
        ))}
      </section>
      <StatsModal />
      <HowToPlayModal />
    </div>
  );
};
