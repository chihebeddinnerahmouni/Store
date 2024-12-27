// import { useState } from "react";

// interface ShiningButtonProps {
//   text: string;
//   icon?: any;
//   color: string;
//   onClick: (...args: any[]) => void;
//   type?: "button" | "submit" | "reset";
//   loading?: boolean;
// }

// const FullShiningButton = ({
//   text,
//   icon,
//   color,
//   onClick,
//   type,
//   loading,
// }: ShiningButtonProps) => {
//   const [isHovered, setIsHovered] = useState(false);


//   // console.log(type);

//   return (
//     <button
//       onClick={onClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       type={type}
//       style={{
//         color: "white",
//         backgroundColor: color,
//         transition: "background-color 0.3s ease",
//         boxShadow: isHovered ? `0 8px 15px -8px ${color}` : "none",
//       }}
//       className="shining-button flex items-center justify-center gap-2 px-2 py-1 rounded lg:px-4 lg:py-2"
//     >
//       {icon && <span className="icon">{icon}</span>}
//       <span className="text">{text}</span>
//     </button>
//   );
// };


// export default FullShiningButton;
import { useState } from "react";
import { Button } from "@mui/material";

interface ShiningButtonProps {
  text: string;
  icon?: any;
  color: string;
  // onClick: (...args: any[]) => void;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

const FullShiningButton = ({
  text,
  icon,
  color,
  onClick,
  type,
  loading,
}: ShiningButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);


  // console.log(type);

  return (
    <Button
      onClick={onClick}
       disabled={loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      type={type}
      sx={{
        color: "white",
        backgroundColor: loading ? "grey" : color,
        transition: "background-color 0.3s ease",
        boxShadow: isHovered ? `0 8px 15px -8px ${color}` : "none",
      }}
      className="shining-button flex items-center justify-center gap-2 px-2 py-1 rounded lg:px-4 lg:py-2"
    >
      {icon && <span className="icon">{icon}</span>}
      {loading ? "Loading..." : text}
    </Button>
  );
};


export default FullShiningButton;
