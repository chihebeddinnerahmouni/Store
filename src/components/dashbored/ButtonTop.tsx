import { Link } from "react-router-dom";
import { Tooltip } from "@mui/material";

interface ButtonTopProps {
    title: string;
    Icon: any;
  url: string;
  value: string;
  tooltip: string;
}

const ButtonTop = ({ title, Icon, url, value, tooltip }: ButtonTopProps) => {
  return (
      <Tooltip title={tooltip} arrow>
      <Link
        to={url}
        className="cardCss flex items-center gap-2 transition-transform duration-300 hover:scale-[102%] whitespace-nowrap min-w-[150px] lg:flex-grow lg:min-w-[250px]" 
      >
        <Icon className="min-w-[30px] min-h-[30px] object-cover text-main lg:w-[40px] lg:h-[40px]" />
        <div className="text">
          <p className="text-xs text-writingGrey lg:text-base">{title}</p>
          <p className="text-lg font-semibold lg:text-2xl">{value}</p> 
        </div>
      </Link>
      </Tooltip>
    );
};

export default ButtonTop;