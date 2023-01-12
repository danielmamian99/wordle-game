import Modal from "react-modal";

import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { onCloseStatsModal } from "../store/slices/ui";
import { Button } from "./generals";

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
  const { plays, wins, time } = useAppSelector((state) => state.session);
  const { hasLose, currentWord } = useAppSelector((state) => state.game);

  const onCloseModal = () => {
    dispatch(onCloseStatsModal());
  };

  customStyles.content!.borderColor = mode === "Dark" ? "#939B9F" : "#000000";
  customStyles.content!.backgroundColor =
    mode === "Dark" ? "#262B3C" : "rgba(243, 243, 243, 0.89)";
  customStyles.overlay!.backgroundColor =
    mode === "Dark" ? "rgba(38, 43, 60, 0.89)" : "rgba(243, 243, 243, 0.89)";

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
        {hasLose && <p>La palabra era <span className="font-bold">{currentWord}</span></p>}
        <article className="flex flex-col justify-center items-center mt-10">
          <p className=""> SIGUIENTE PALABRA </p>
          <p className="font-bold"> {time} </p>
        </article>
        <Button
            className="mt-4"
            handleClick={onCloseModal}
            label="Aceptar"
        />
      </section>
    </Modal>
  );
};
