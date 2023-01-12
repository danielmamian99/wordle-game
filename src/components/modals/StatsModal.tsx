import { useCallback, useState } from "react";
import Modal from "react-modal";
import { useTimer } from "../../hooks";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { onStartGame } from "../../store/slices/game";
import { onCloseStatsModal } from "../../store/slices/ui";
import { Button } from "../";

const customStyles: Modal.Styles = {
  overlay: {},
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    borderRadius: "15px",
  },
};

Modal.setAppElement("#root");

export const StatsModal = () => {
  const dispatch = useAppDispatch();
  const { isStatsModalOpen, mode } = useAppSelector((state) => state.ui);
  const { plays, wins } = useAppSelector((state) => state.session);
  const { hasLose, currentWord, gameStart } = useAppSelector(
    (state) => state.game
  );
  const startMinutes = 0;
  const startSeconds = 10;
  const [minutes, setMinutes] = useState(startMinutes);
  const [seconds, setSeconds] = useState(startSeconds);

  useTimer({ minutes, seconds, setMinutes, setSeconds });

  const onCloseModal = useCallback(() => {
    if (!gameStart) {
      dispatch(onStartGame());
      setMinutes(startMinutes);
      setSeconds(startSeconds);
    }
    dispatch(onCloseStatsModal());
  }, [gameStart]);

  const calculateSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const time = `0${minutes}:${calculateSeconds}`;

  customStyles.content!.borderColor = mode === "Dark" ? "#939B9F" : "#000000";
  customStyles.content!.backgroundColor =
    mode === "Dark" ? "#262B3C" : "rgba(243, 243, 243, 0.89)";
  customStyles.overlay!.backgroundColor =
    mode === "Dark" ? "rgba(38, 43, 60, 0.89)" : "rgba(243, 243, 243, 0.89)";
  customStyles.content!.height = hasLose ? "60%" : "50%";

  return (
    <Modal
      isOpen={isStatsModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <section className={mode === "Dark" ? "text-white bg-[#262B3C]" : ""}>
        <article className="flex justify-center">
          <p className="text-2xl font-bold"> Estadisticas </p>
        </article>
        <section className="grid grid-cols-2 mt-10">
          <article className="flex flex-col justify-center items-center">
            <p className="font-bold"> {plays} </p>
            <p> Jugadas </p>
          </article>
          <article className="flex flex-col justify-center items-center">
            <p className="font-bold text-xl"> {wins} </p>
            <p> Victorias </p>
          </article>
        </section>

        {hasLose && (
          <article className="flex justify-center mt-8">
            <p>
              La palabra era <span className="font-bold">{currentWord}</span>
            </p>
          </article>
        )}

        <article className="flex flex-col justify-center items-center mt-6">
          <p className=""> SIGUIENTE PALABRA </p>
          <p className="font-bold"> {time} </p>
        </article>
        <Button className="mt-4" handleClick={onCloseModal} label="Aceptar" />
      </section>
    </Modal>
  );
};
