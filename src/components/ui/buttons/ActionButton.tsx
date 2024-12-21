import { useState } from "react";

interface ShiningButtonProps {
  icon: any;
  color: string;
  active: boolean;
  onClick: (...args: any[]) => void;
}

const ActionButton = ({ icon, color, onClick, active }: ShiningButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      // onClick={onClick}
      onClick={active ? onClick : (e) => {e.preventDefault(), e.stopPropagation();}}
      onMouseEnter={() => active && setIsHovered(true)}
      onMouseLeave={() => active && setIsHovered(false)}
      style={{
        opacity: active ? 1 : 0.2,
        color: isHovered ? "white" : color,
        border: `1px solid ${color}`,
        backgroundColor: isHovered ? color : "white",
        transition: "background-color 0.3s ease",
        boxShadow: isHovered ? `0 8px 15px -8px ${color}` : "none",
      }}
      className="shining-button flex items-center gap-2 px-2 py-1 rounded-full lg:px-4 lg:py-2"
    >
      {icon}
    </button>
  );
};

export default ActionButton;
