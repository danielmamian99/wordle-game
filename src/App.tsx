import { useEffect } from "react";
import { Accordion } from "./components/Accordion";
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { getWords, setCurrentWord } from "./store/slices/game";

export const App = () => {
  const dispatch = useAppDispatch();
  const {allWords, isLoading, currentWord} = useAppSelector(state => state.game);
  useEffect(() => {
    dispatch(getWords());
  }, [])
  if(allWords.length > 0 && currentWord === ''){
    dispatch(setCurrentWord())
  }
  
  console.log('allWords >>>', allWords);
  console.log('currentWord >>>', currentWord);
  return (
    <Accordion title="Hola Mundo">
      <h3 className="text-8xl"> My Content </h3>
      <p> some content</p>
    </Accordion>
  );
};