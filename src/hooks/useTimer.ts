import { useEffect } from "react";
import { overTime } from "../store/slices/session";
import { useAppSelector, useAppDispatch } from './redux';

interface Props {
  minutes: number;
  seconds: number
  setMinutes: (minutes:number) => void;
  setSeconds: (seconds:number) => void;
}

export const useTimer = ({minutes, seconds, setMinutes, setSeconds} : Props) => {
  const dispatch =  useAppDispatch();
  const { gameStart } = useAppSelector((state) => state.game);

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (gameStart) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            dispatch(overTime());
            clearInterval(sampleInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    if(!gameStart){
      clearInterval(sampleInterval);
    }
    return () => {
      clearInterval(sampleInterval);
    };
  });
};
