export const wordsApi = async() => {
    const response = await fetch("src/api/words.txt");
    const data = await response.text();
    return data;
}

