import {
  HowToPlayModal,
  StatsModal,
  Header,
  WordRow,
  KeyBoard,
} from "./components";

import { useAppSelector, useGameState } from "./hooks";

export const App = () => {
  const { isLoading, inGameWords } = useAppSelector((state) => state.game);
  const { mode } = useAppSelector((state) => state.ui);

  useGameState();

  return (
    <div
      className={
        "flex justify-center h-screen overflow-scroll " +
        (mode === "Dark" ? `bg-[#262B3C] text-white` : "")
      }
    >
      <div className="py-10">
        <Header />
        {!isLoading && (
          <>
            <section className="mt-10">
              {inGameWords.map((word, index) => (
                <WordRow key={index} positionRow={index} />
              ))}
            </section>
            <KeyBoard />
          </>
        )}
        <StatsModal />
        <HowToPlayModal />
      </div>
    </div>
  );
};
