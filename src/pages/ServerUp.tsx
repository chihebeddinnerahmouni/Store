import CircularProgress from "@mui/material/CircularProgress";
import symloop from "../assets/images/auth-bg";
import logo from "../assets/images/logo";
import { Tooltip } from "@mui/material";

const ServerUp = () => {
  return (
      <div className="w-full h-screen bg-black flex flex-col justify-center">
          <Tooltip title="07-79-55-24-50" placement="top">
          <img src={symloop} alt="logo" className="w-[200px] mx-auto absolute top-0 left-1/2 -translate-x-1/2" />
          </Tooltip>

          <div className="text-center text-white flex flex-col gap-10 items-center">
        <img src={logo} alt="logo" className="w-[100px] object-cover mx-auto" />
        <CircularProgress color="inherit" />
        <p>Le serveur démarre, veuillez patienter...</p>
      </div>
    </div>
  );
};

export default ServerUp;
