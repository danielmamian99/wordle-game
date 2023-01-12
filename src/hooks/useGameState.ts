import { useEffect } from "react";

import Swal from "sweetalert2";

import { useAppDispatch, useAppSelector } from "./redux";
import { clearErrorMessage, getWords, loseGame, onStartGame } from "../store/slices/game";
import { setPlays, setWins } from "../store/slices/session";
import { onOpenStatsModal } from "../store/slices/ui";

export const useGameState = () => {
  const dispatch = useAppDispatch();
  const { hasLose, hasWin, currentRow, allWords, gameStart , errorMessage } = useAppSelector((state) => state.game);
  const { timeIsOver } = useAppSelector((state) => state.session);

  const isFirtsTime = !(
    localStorage.getItem("Firts-Time-In-The-Game") === "false"
  );

  if(isFirtsTime){
    localStorage.setItem("Firts-Time-In-The-Game", "false")
  }
  
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

  useEffect(() => {
    if(allWords.length > 0 && !isFirtsTime && !gameStart){
        dispatch(onStartGame());
    }
  }, [allWords.length]);
  

  useEffect(() => {
    if (hasWin || hasLose) {
      dispatch(onOpenStatsModal());
      dispatch(setPlays());
    }
    if (hasWin) {
      dispatch(setWins());
    }
  }, [hasLose, hasWin]);

  useEffect(() => {
    if ((currentRow > 4 || timeIsOver)  && !hasLose && !hasWin) {
      dispatch(loseGame());
    }
  }, [currentRow, timeIsOver]);
  
};
