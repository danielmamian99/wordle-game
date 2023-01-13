import { MoonLoader } from "react-spinners";

import {
  HowToPlayModal,
  StatsModal,
  Header,
  WordRow,
  KeyBoard,
} from "./components";

import { useAppSelector, useGame } from "./hooks";

export const WordleApp = () => {
  const { isLoading, inGameWords } = useAppSelector((state) => state.game);
  const { mode } = useAppSelector((state) => state.ui);

  useGame();

  return (
    <div
      className={
        "flex justify-center h-screen overflow-scroll " +
        (mode === "Dark" ? `bg-[#262B3C] text-white` : "")
      }
    >
      <div className="py-10 w-11/12 sm:w-auto">
        {!isLoading ? (
          <>
            <Header />
            <section className="mt-10">
              {inGameWords.map((word, index) => (
                <WordRow key={index} positionRow={index} />
              ))}
            </section>
            <KeyBoard />
          </>
        ) : (
          <div className="flex w-[28rem] items-center justify-center h-full">
            <MoonLoader
              color={mode === "Dark" ? "#ffffff" : "#000000"}
              size={100}
            />
          </div>
        )}
        <StatsModal />
        <HowToPlayModal />
      </div>
    </div>
  );
};
