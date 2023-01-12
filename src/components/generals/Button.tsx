import { memo } from "react";

export interface ButtonProps {
    handleClick: ()=>void;
    label: string;
    className?: string;
}

export const Button = memo(({className='', handleClick, label} : ButtonProps) => {
  return (
    <div className={'flex justify-center ' + className} data-testid="button-container">
        <button
        onClick={handleClick}
        className="w-4/6 h-10 rounded font-bold text-white bg-[#6AAA64]"
        >
        {" "}
        {label}{" "}
        </button>
  </div>
  )
})
