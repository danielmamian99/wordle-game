import { startLoadingWords, setWords } from "./"
import { AppDispatch } from "../../store";
import { wordsApi } from "../../../api/wordsApi";


export const getWords = () => {
    return async ( dispatch: AppDispatch ) => {

        dispatch( startLoadingWords() );

        const data = await wordsApi();
        const words = data.split('\n');
        const wordsWhitoutAccent = words.map((word) => {
            return word.normalize("NFD").replace(/\p{Diacritic}/gu, "")
        })
        dispatch( setWords({words:wordsWhitoutAccent}) );
    }
}