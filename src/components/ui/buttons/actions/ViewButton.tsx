import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";

interface ShiningButtonProps {
  active: boolean;
  onClick: (...args: any[]) => void;
}

const ViewButton = ({ onClick, active }: ShiningButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const color = "#3b82f6";

  return (
    <Tooltip title="Voir" arrow>
      <button
        disabled={!active}
        // onClick={onClick}
        onClick={
          active
            ? onClick
            : (e) => {
                e.preventDefault(), e.stopPropagation();
              }
        }
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
        <FaRegEye />
      </button>
    </Tooltip>
  );
};

export default ViewButton;
