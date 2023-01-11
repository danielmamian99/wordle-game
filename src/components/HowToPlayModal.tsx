import Modal from "react-modal";

import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { onCloseHowToPlayModal } from "../store/slices/ui";
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
    height: "80%",
    display: "flex",
    flexDirection: "column",
    padding: "40px",
    borderRadius: "15px",
  },
};

Modal.setAppElement("#root");

export const HowToPlayModal = () => {
  const dispatch = useAppDispatch();
  const { isHowToPlayModalOpen, mode } = useAppSelector((state) => state.ui);

  customStyles.content!.borderColor = mode === "Dark" ? "#939B9F" : "#000000";
  customStyles.content!.backgroundColor =
    mode === "Dark" ? "#262B3C" : "rgba(243, 243, 243, 0.89)";
  customStyles.overlay!.backgroundColor =
    mode === "Dark" ? "rgba(38, 43, 60, 0.89)" : "rgba(243, 243, 243, 0.89)";

  const onCloseModal = () => {
    dispatch(onCloseHowToPlayModal());
  };

  return (
    <Modal
      isOpen={isHowToPlayModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <section className={mode === "Dark" ? "text-white bg-[#262B3C]" : ""}>
        <article className="flex flex-col items-center">
          <p className="text-2xl font-bold">Cómo jugar</p>
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
        <p className="text-xl font-bold"> Ejemplos </p>
        <div className="flex justify-center text-black font-bold my-2">
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 bg-[#6AAA64]">
            G
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            A
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            T
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            O
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            S
          </div>
        </div>
        <p>La letra <span className="font-bold">G</span> está en la palabra y en la posición correcta.</p>
        <div className="flex justify-center text-black font-bold my-2">
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            V
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            O
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 bg-[#CEB02C]">
            C
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            A
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            L
          </div>
        </div>
        <p>La letra <span className="font-bold">C</span> está en la palabra pero en la posición incorrecta.</p>
        <div className="flex justify-center text-black font-bold my-2">
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            C
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            A
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            N
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 border border-black">
            T
          </div>
          <div className="flex justify-center items-center uppercase text-2xl rounded m-1 w-14 h-14 bg-[#939B9F]">
            O
          </div>
        </div>
        <p>La letra <span className="font-bold">O</span> no está en la palabra.</p>
        <p className="mt-10">Puede haber letras repetidas. Las pistas son independientes para cada letra.</p>
        <article className="flex justify-center mt-10">
            <p>¡Una palabra nueva cada 5 minutos!</p>
        </article>
        <Button
            className="mt-10"
            handleClick={onCloseModal}
            label="!JUGAR¡"
        />
      </section>
    </Modal>
  );
};
