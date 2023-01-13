import Modal from "react-modal";

import { useAppSelector, useAppDispatch } from "../../hooks";
import { onStartGame } from "../../store/slices/game";
import { onCloseHowToPlayModal } from "../../store/slices/ui";
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
    height: "80%",
    display: "flex",
    flexDirection: "column",
    // padding: "40px",
    borderRadius: "15px",
  },
};

if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root');

export const HowToPlayModal = () => {
  const dispatch = useAppDispatch();
  const { isHowToPlayModalOpen, mode } = useAppSelector(state => state.ui);
  const { gameStart } = useAppSelector(state => state.game);

  customStyles.content!.borderColor = mode === "Dark" ? "#939B9F" : "#000000";
  customStyles.content!.backgroundColor =
    mode === "Dark" ? "#262B3C" : "rgba(243, 243, 243, 0.89)";
  customStyles.overlay!.backgroundColor =
    mode === "Dark" ? "rgba(38, 43, 60, 0.89)" : "rgba(243, 243, 243, 0.89)";

  const rowStyle =
    "flex justify-center font-bold my-2 " +
    (mode === "Dark" ? "" : "text-black");

    const letterGeneralStyle = 'flex justify-center items-center uppercase text-lg sm:text-2xl rounded m-1 w-6 sm:w-14 h-6 sm:h-14 ';

  const letterStyleMode =
  letterGeneralStyle +
    "border " +
    (mode === "Dark" ? " border-white" : "border-black");

  const cats = ["G", "A", "T", "O", "S"];
  const vocal = ["V", "O", "C", "A", "L"];
  const sing = ["C", "A", "N", "T", "O"];

  const onCloseModal = () => {
    if(!gameStart){
      dispatch(onStartGame());
    }
    dispatch(onCloseHowToPlayModal());
  };

  return (
    <Modal
      isOpen={isHowToPlayModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <section className={mode === "Dark" ? "text-white bg-[#262B3C]" : ""}>
        <article className="flex flex-col text-sm sm:text-lg">
          <p className="text-xl sm:text-2xl font-bold self-center">Cómo jugar</p>
          <br />
          <p>Adivina la palabra oculta en cinco intentos.</p>
          <br />
          <p>Cada intento debe ser una palabra válida de 5 letras.</p>
          <br />
          <p>
            {" "}
            Después de cada intento el color de las letras cambia para mostrar
            qué tan cerca estás de acertar la palabra.
          </p>
          <br />
        </article>
        <p className="text-base sm:text-xl font-bold"> Ejemplos </p>
        <div className={rowStyle}>
          {cats.map((letter, index) =>
            index === 0 ? (
              <div key={index} className={letterGeneralStyle + 'bg-[#6AAA64]'}>
                {letter}
              </div>
            ) : (
              <div key={index} className={letterStyleMode}>{letter}</div>
            )
          )}
        </div>
        <p className="text-sm sm:text-lg">
          La letra <span className="font-bold">G</span> está en la palabra y en
          la posición correcta.
        </p>
        <div className={rowStyle}>
          {vocal.map((letter, index) =>
            index === 2 ? (
              <div key={index} className={letterGeneralStyle + 'bg-[#CEB02C]'}>
                {letter}
              </div>
            ) : (
              <div key={index} className={letterStyleMode}>{letter}</div>
            )
          )}
        </div>
        <p className="text-sm sm:text-lg">
          La letra <span className="font-bold">C</span> está en la palabra pero
          en la posición incorrecta.
        </p>
        <div className={rowStyle}>
          {sing.map((letter, index) =>
            index === 4 ? (
              <div key={index} className={letterGeneralStyle + 'bg-[#939B9F]'}>
                {letter}
              </div>
            ) : (
              <div key={index} className={letterStyleMode}>{letter}</div>
            )
          )}
        </div>
        <p className="text-sm sm:text-lg">
          La letra <span className="font-bold">O</span> no está en la palabra.
        </p>
        <p className="text-sm sm:text-lg mt-5 sm:mt-10">
          Puede haber letras repetidas. Las pistas son independientes para cada
          letra.
        </p>
        <article className="flex justify-center mt-5 sm:mt-10 text-sm sm:text-lg">
          <p>¡Una palabra nueva cada 5 minutos!</p>
        </article>
        <Button className="mt-10 text-sm sm:text-lg" handleClick={onCloseModal} label="!JUGAR¡" />
      </section>
    </Modal>
  );
};
