import { useEffect } from "react";

import Swal from "sweetalert2";

import { StatsModal, Header, WordRow } from "./components";
import { HowToPlayModal } from "./components/HowToPlayModal";
import { useAppDispatch, useAppSelector, useGameState, useTimer } from "./hooks";
import { clearErrorMessage } from "./store/slices/game";

export const App = () => {
  const dispatch = useAppDispatch();
  const {
    isLoading,
    inGameWords,
    errorMessage,
  } = useAppSelector((state) => state.game);

  const { mode } = useAppSelector((state) => state.ui);

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
  useGameState();

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
