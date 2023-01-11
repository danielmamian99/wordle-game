// import { words } from "./words";

// export const wordsApi = () => {
//     const data = words.split('\n');
//     return data;
// }

export const wordsApi = async() => {
    const response = await fetch("src/api/words.txt");
    const data = await response.text();
    return data;
}

