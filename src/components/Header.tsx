import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  onOpenHowToPlayModal,
  onOpenStatsModal,
  setMode,
} from "../store/slices/ui";

export const Header = () => {
  const { mode, isHowToPlayModalOpen, isStatsModalOpen } = useAppSelector(
    (state) => state.ui
  );
  const dispatch = useAppDispatch();

  const currentMode = (mode === "Light" || isStatsModalOpen || isHowToPlayModalOpen) ? 'Light' : 'Dark';

  const changeMode = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.currentTarget.blur();
    dispatch(setMode());
  };

  const openStatsModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.currentTarget.blur();
    dispatch(onOpenStatsModal());
  };

  const openHowToPlayModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.currentTarget.blur();
    dispatch(onOpenHowToPlayModal());
  };

  return (
    <section className={'flex justify-center ' + (currentMode==='Light' ? 'text-black' : 'text-white')}>
      <div
        className={
          "grid grid-cols-3 py-2 border-2xl w-full rounded-xl " +
          (currentMode === "Light" ? "bg-[#F3F3F3]" : "bg-[#dadce0]/[0.03]")
        }
      >
        <figure className="grid place-content-center justify-self-start ml-4">
          <button onClick={openHowToPlayModal}>
            <img
              alt="Como jugar wordle game"
              className="w-6 h-6"
              src={`/images/header/${currentMode}/how_to_play.svg`}
            ></img>
          </button>
        </figure>
        <article className="grid place-content-center justify-self-center">
          <p className="text-xl sm:text-2xl font-medium"> WORDLE </p>
        </article>
        {!(isStatsModalOpen || isHowToPlayModalOpen) && (
            <div className="grid grid-cols-2 place-content-center justify-self-end mr-4">
              <button onClick={openStatsModal}>
                <img
                  alt="Marcador wordle game"
                  className="h-9 w-10"
                  src={`/images/header/${currentMode}/stats.svg`}
                ></img>
              </button>
              <button onClick={changeMode} data-testid="button-change-mode">
                <img
                  alt="Alternar modo wordle game"
                  className="h-9 w-10"
                  src={`/images/header/${currentMode}/switch.svg`}
                ></img>
              </button>
            </div>
          )
        }
      </div>
    </section>
  );
};
