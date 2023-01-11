import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { setMode } from '../store/slices/session';
 
export const Header = () => {
    const { mode } = useAppSelector(state => state.session);
    const dispatch = useAppDispatch();
    const changeMode = () => {
        dispatch(setMode());
    }
  return (
    <section className='flex justify-center'>
        <div className={'grid grid-cols-3 py-2 border-2xl w-3/5 rounded-xl ' + (mode === 'Light' ? 'bg-[#F3F3F3]' : 'bg-[#dadce0]/[0.03]')}>
            <figure className="grid place-content-center justify-self-start ml-4">
                <button>
                    <img className="w-6 h-6" src={`/images/header/${mode}/how_to_play.svg`}></img>
                </button>
            </figure>
            <article className="grid place-content-center justify-self-center">
                <p className="text-2xl font-medium"> WORDLE </p>
            </article>
            <div className="grid grid-cols-2 place-content-center justify-self-end mr-4">
                <button>
                    <img className="h-9 w-10" src={`/images/header/${mode}/stats.svg`}></img>
                </button>
                <button onClick={changeMode}>
                    <img className="h-9 w-10" src={`/images/header/${mode}/switch.svg`}></img>
                </button>
            </div>
        </div>
    </section>
  )
}
