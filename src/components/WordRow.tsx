import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

import { equalsArrays } from "../helpers";
import { isValidWord } from "../store/slices/game";

export const WordRow = ({ positionRow }: { positionRow:number }) => {
  const dispatch = useAppDispatch();
  const { currentRow, gameStart, currentWord } = useAppSelector(
    (state) => state.game
  );
  const { mode } = useAppSelector((state) => state.session);

  const noCheck = (mode === "Light" ? "text-black bg-[#939b9f]/30" : "bg-[#939b9f]/20");
  const correctLetter = mode === "Light" ? "bg-[#66A060]" : "bg-[#6AAA64]";

  const [word, setWord] = useState<string[]>([]);
  const [styles, setStyles] = useState([
    noCheck,
    noCheck,
    noCheck,
    noCheck,
    noCheck,
  ]);

  const newStyles = styles.map((style, index) => {
    return positionRow >= currentRow
      ? noCheck
      : currentWord.substring(index, index + 1) === word[index]
      ? correctLetter
      : currentWord.includes(word[index])
      ? "bg-[#CEB02C]"
      : "bg-[#939B9F]";
  });

  const stylesAreTheSame = equalsArrays(styles, newStyles);

  if (!stylesAreTheSame) {
    setStyles([...newStyles]);
  }

  const captureEvent = (event: KeyboardEvent) => {
    const charCode = event.key.charCodeAt(0);
    if (event.key.length > 1) {
      if (charCode === 66 && word.length > 0) {
        const copyWord = [...word];
        copyWord.pop();
        setWord(copyWord);
      } else if (charCode === 69) {
        if (word.length === 5) {
          dispatch(isValidWord(word));
        }
      }
    } else if (
      ((charCode >= 97 && charCode <= 122) ||
        (charCode >= 65 && charCode <= 90)) &&
      word.length <= 4
    ) {
      const copyWord = [...word, event.key.toLocaleLowerCase()];
      setWord(copyWord);
    }
  };
  useEffect(() => {
    if (gameStart) {
      setWord([]);
    }
  }, [gameStart]);

  useEffect(() => {
    if (positionRow === currentRow && gameStart) {
      document.addEventListener("keydown", captureEvent, false);
    }
    return () => {
      document.removeEventListener("keydown", captureEvent, false);
    };
  });
  return (
    <div className="flex justify-center text-white font-bold">
      {styles.map((letterStyle, index) => (
        <div
          key={index}
          className={
            `flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 ` +
            `${letterStyle}`
          }
        >
          {word[index]}
        </div>
      ))}
    </div>
  );
};
