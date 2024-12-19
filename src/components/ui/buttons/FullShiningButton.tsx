import { useState } from "react";

interface ShiningButtonProps {
  text: string;
  icon?: any;
  color: string;
  onClick: (...args: any[]) => void;
}

const FullShiningButton = ({
  text,
  icon,
  color,
  onClick,
}: ShiningButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: "white",
        backgroundColor: color,
        transition: "background-color 0.3s ease",
        boxShadow: isHovered ? `0 8px 15px -8px ${color}` : "none",
      }}
      className="shining-button flex items-center gap-2 px-2 py-1 rounded lg:px-4 lg:py-2"
    >
      {icon && <span className="icon">{icon}</span>}
      <span className="text">{text}</span>
    </button>
  );
};


export default FullShiningButton;
