import { useState } from "react";

interface accordionProps{
    title: string;
    children: React.ReactNode;
}

export const Accordion = ({title, children}: accordionProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <button
          onClick={() => {
            setOpen(!open)
          }}
        >
          {open ? "Close" : "Open"}
        </button>
      </div>
        <div>
            {open && <div>{children}</div>}
        </div>
    </div>
  )
}
