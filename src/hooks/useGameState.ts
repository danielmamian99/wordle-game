import { getWords, loseGame, setLose, setWin, startGame } from "../store/slices/game";
import { setPlays, setTime, setWins } from "../store/slices/session";
import { onOpenStatsModal } from "../store/slices/ui";
import { useAppDispatch, useAppSelector } from "./redux";
import { useEffect } from "react";

export const useGameState = () => {
  const dispatch = useAppDispatch();
  const { hasLose, hasWin, currentRow, gameStart, allWords } = useAppSelector((state) => state.game);
  const { time } = useAppSelector((state) => state.session);
  const { isHowToPlayModalOpen, isStatsModalOpen } = useAppSelector((state) => state.ui);
  useEffect(() => {
    dispatch(getWords());
  }, []);

  useEffect(() => {
    if (hasWin || hasLose) {
        console.log('log 2');
      dispatch(onOpenStatsModal());
      dispatch(setPlays());
    }
    if (hasWin) {
      dispatch(setWins());
    }
  }, [hasLose, hasWin]);

  useEffect(() => {
    if ((currentRow > 4 || time === "00:00")  && !hasLose) {
      dispatch(loseGame());
    }
  }, [currentRow, time]);

  useEffect(() => {
    if(!isHowToPlayModalOpen && !isStatsModalOpen && !gameStart && allWords.length > 0 && !hasLose && !hasWin){
      dispatch(startGame());
    }
  }, [isHowToPlayModalOpen, isStatsModalOpen, gameStart, allWords.length]);

  useEffect(() => {
    //TODO REVISAR QUE NO SE CAMBIE ANTES DE CERRAR EL MODAL
    if(!isStatsModalOpen &&  (hasLose || hasWin)){
        console.log('log 3');
        hasLose ? dispatch(setLose(false)) : dispatch(setWin(false));
    }
  }, [isStatsModalOpen, hasLose, hasWin])
  
};
