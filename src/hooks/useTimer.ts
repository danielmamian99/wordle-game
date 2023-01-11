import { useState, useEffect } from "react";
import { setTime } from "../store/slices/session";
import { useAppDispatch, useAppSelector } from "./redux";

export const useTimer = () => {
  const dispatch = useAppDispatch();
  const { gameStart } = useAppSelector((state) => state.game);
  const startingMinutes = 5;
  const startingSeconds = 0;
  const [minutes, setMinutes] = useState(startingMinutes);
  const [seconds, setSeconds] = useState(startingSeconds);
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (gameStart) {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(sampleInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
        dispatch(
          setTime({
            minutes,
            seconds,
          })
        );
      }else{
        setMinutes(5);
        setSeconds(0);
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });
};
