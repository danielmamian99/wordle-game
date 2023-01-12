interface CalculateCorrectWordsProps {
  currentWord: string;
  inGameWords: string[][];
}
export const calculateCorrectWords = ({
  currentWord,
  inGameWords,
}: CalculateCorrectWordsProps) => {
  const resultCorrectWords: string[] = [];
  const resultValidWords: string[] = [];
  const resultInCorrectWords: string[] = [];
  inGameWords.forEach((wordsRow) => {
    wordsRow.forEach((word, index) => {
      if (currentWord.substring(index, index + 1) === word) {
        resultCorrectWords.push(word.toUpperCase());
      } else if (currentWord.includes(word)) {
        resultValidWords.push(word.toUpperCase());
      }else{
        resultInCorrectWords.push(word.toUpperCase());
      }
    });
  });
  return {
    resultCorrectWords,
    resultValidWords,
    resultInCorrectWords,
  }
};
