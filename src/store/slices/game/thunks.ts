import { startLoadingWords, setWords } from "./"
import { AppDispatch } from "../../store";
import { wordsApi } from "../../../api/wordsApi";


export const getWords = ( page = 0 ) => {
    return async ( dispatch: AppDispatch ) => {

        dispatch( startLoadingWords() );

        const data = await wordsApi();
        const words = data.split('\n');

        dispatch( setWords({words}) );
    }
}