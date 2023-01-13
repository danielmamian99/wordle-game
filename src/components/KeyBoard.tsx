import { useAppSelector } from "../hooks/redux";
import { useState, useEffect } from "react";
import { calculateCorrectWords } from "../helpers";

interface HandleCLickProps {
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
  letter: string;
}
export const KeyBoard = () => {
  const { currentWord, inGameWords } = useAppSelector((state) => state.game);
  const { mode, isHowToPlayModalOpen, isStatsModalOpen } = useAppSelector((state) => state.ui);
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [inCorrectWords, setInCorrectWords] = useState<string[]>([]);
  const [validWords, setValidWords] = useState<string[]>([]);
  const { resultCorrectWords, resultValidWords, resultInCorrectWords } =
    calculateCorrectWords({ currentWord, inGameWords });

    const currentMode = (mode === "Light" || isStatsModalOpen || isHowToPlayModalOpen) ? 'Light' : 'Dark';

  useEffect(() => {
    setCorrectWords([...resultCorrectWords]);
    setInCorrectWords([...resultInCorrectWords]);
    setValidWords([...resultValidWords]);
  }, [
    resultCorrectWords.length,
    resultValidWords.length,
    resultInCorrectWords.length,
  ]);
  
  const generalStyle =
    "flex justify-center items-center uppercase text-xs sm:text-lg rounded m-1 h-8 sm:h-10 ";

  const firtsRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"];
  const thirdRow = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"];
  const handleClick = ({ event, letter }: HandleCLickProps) => {
    let key = letter;
    if (key === "ENTER") {
      key = "Enter";
    } else if (key === "BACKSPACE") {
      key = "Backspace";
    }
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key,
      })
    );
    event.currentTarget.blur();
  };
  return (
    <section className="flex justify-center mx-0 mt-10 w-full sm:w-auto">
      <div
        className={
          "flex flex-col rounded-lg p-2 sm:p-6 justify-center text-white w-full sm:w-auto " +
          (currentMode === "Light" ? "bg-[#dadce0]/30" : "bg-[#dadce0]/[0.03]")
        }
      >
        <div className="flex font-medium ml-2 sm:ml-4">
          {firtsRow.map((letter, index) => (
            <button
              key={index}
              className={
                generalStyle +
                "w-10 " +
                (correctWords.find((word) => word === letter)
                  ? "bg-[#66A060]"
                  : validWords.find((word) => word === letter)
                  ? "bg-[#CEB02C]"
                  : inCorrectWords.find((word) => word === letter)
                  ? "bg-[#818181]"
                  : currentMode === "Light"
                  ? "bg-[#D3D6DA] text-[#56575E]"
                  : "bg-[#565F7E]")
              }
              onClick={(event) => handleClick({ event, letter })}
              value={letter}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex font-medium ml-4 sm:ml-8">
          {secondRow.map((letter, index) => (
            <button
              key={index}
              className={
                generalStyle +
                "w-10 " +
                (correctWords.find((word) => word === letter)
                  ? "bg-[#66A060]"
                  : validWords.find((word) => word === letter)
                  ? "bg-[#CEB02C]"
                  : inCorrectWords.find((word) => word === letter)
                  ? "bg-[#818181]"
                  : currentMode === "Light"
                  ? "bg-[#D3D6DA] text-[#56575E]"
                  : "bg-[#565F7E]")
              }
              onClick={(event) => handleClick({ event, letter })}
              value={letter}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex font-medium">
          {thirdRow.map((letter, index) => (
            <button
              key={index}
              className={
                generalStyle +
                (index === 0 ? "w-20  text-sm " : index === 8 ? "w-16 " : "w-10 ") +
                (correctWords.find((word) => word === letter)
                ? "bg-[#66A060]"
                : validWords.find((word) => word === letter)
                ? "bg-[#CEB02C]"
                : inCorrectWords.find((word) => word === letter)
                ? "bg-[#818181]"
                : currentMode === "Light"
                ? "bg-[#D3D6DA] text-[#56575E]"
                : "bg-[#565F7E]")
              }
              onClick={(event) => handleClick({ event, letter })}
            >
              {index < 8 ? (
                letter
              ) : (
                <img alt="Borrar caracter wordle game" src={`images/keyBoard/${currentMode}/backSpace.svg`}></img>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
