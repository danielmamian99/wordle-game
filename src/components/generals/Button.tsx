
interface props {
    handleClick: ()=>void;
    label: string;
    className?: string;
}

export const Button = ({className='', handleClick, label} : props) => {
  return (
    <div className={'flex justify-center ' + className}>
        <button
        onClick={handleClick}
        className="w-4/6 h-10 rounded font-bold text-white bg-[#6AAA64]"
        >
        {" "}
        {label}{" "}
        </button>
  </div>
  )
}
