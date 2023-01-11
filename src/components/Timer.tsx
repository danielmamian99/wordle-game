import { useAppSelector } from "../hooks/redux";

export const Timer = () => {
  
  const { time } = useAppSelector((state) => state.session);

  return (
    <div>
      <p>{time}</p>
    </div>
  );
};
