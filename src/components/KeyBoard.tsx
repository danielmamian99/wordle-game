
interface HandleCLickProps {
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    letter: string;
}
export const KeyBoard = () => {
  const firtsRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"];
  const thirdRow = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"];
  const handleClick = ({event, letter} : HandleCLickProps) => {
    let key = letter;
    if(key === 'ENTER'){
        key = 'Enter';
    }else if(key === 'BACKSPACE'){
        key = 'Backspace'
    }
    document.dispatchEvent(new KeyboardEvent('keydown',{
        key,
    }));
    event.currentTarget.blur();
  }
  return (
    <section className="flex justify-center mt-10">
      <div className="flex flex-col bg-[#dadce0]/30 rounded-lg p-6 h-44 justify-center">
        <div className="flex font-medium text-[#56575E] ml-4">
          {firtsRow.map((letter, index) => (
            <button
              key={index}
              className="flex justify-center items-center uppercase text-lg rounded m-1 w-10 h-10 bg-[#D3D6DA]"
              onClick={(event) => handleClick({event, letter})}
              value={letter}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex font-medium text-[#56575E] ml-8">
          {secondRow.map((letter, index) => (
            <button
              key={index}
              className="flex justify-center items-center uppercase text-lg rounded m-1 w-10 h-10 bg-[#D3D6DA]"
              onClick={(event) => handleClick({event, letter})}
              value={letter}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex font-medium text-[#56575E]">
          {thirdRow.map((letter, index) => (
            <button
              key={index}
              className={'flex justify-center items-center uppercase text-lg rounded m-1 bg-[#D3D6DA] h-10 '+ (index === 0 ? 'w-20  text-sm' : ( index === 8 ? 'w-16' : 'w-10'))}
              onClick={(event) => handleClick({event, letter})}
            >
              {(index < 8 ? letter : <img src="images/keyBoard/Light/backSpace.svg"></img>)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
