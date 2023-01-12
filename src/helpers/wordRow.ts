import { isValidWord } from "../store/slices/game";
import { useAppDispatch } from '../hooks/redux';

interface CaptureEventProps{
  event: KeyboardEvent;
  setWord: (word:string[])=> void;
  word: string[];
}

// const dispatch = useAppDispatch();

/*
 * description: This function compares arrays of the same size
 * return: true if are equals, false if are differents
 */
export const equalsArrays = (array1: string[], array2: string[]): boolean => {
  let areEquals = true;
  array1.forEach((element: string, index: number) => {
    if (element !== array2[index]) {
      areEquals = false;
      return;
    }
  });
  return areEquals;
};

export const captureEvent = ({event, word, setWord} : CaptureEventProps) => {
  const charCode = event.key.charCodeAt(0);
  if (event.key.length > 1) {
    if (charCode === 66 && word.length > 0) {
      const copyWord = [...word];
      copyWord.pop();
      setWord(copyWord);
    } else if (charCode === 69) {
      if (word.length === 5) {
        // dispatch(isValidWord(word));
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