import CircularProgress from "@mui/material/CircularProgress";
import symloop from "../assets/images/auth-bg";
import logo from "../assets/images/logo";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ServerUp = () => {

  const url = import.meta.env.VITE_BASE_URL as string;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(url + "/api/auth/login")
      .then(() => {
        navigate("/tableau-de-bord");
      })
      .catch((err) => { 
        // console.log(err);
        if (err.response) {
          navigate("/tableau-de-bord");
        }
      });
  }, []);

  return (
      <div className="w-full h-screen bg-black flex flex-col justify-center">
          <Tooltip title="07-79-55-24-50" placement="top">
          <img src={symloop} alt="logo" className="w-[200px] mx-auto absolute top-0 left-1/2 -translate-x-1/2" />
          </Tooltip>

          <div className="text-center text-white flex flex-col gap-10 items-center">
        <img src={logo} alt="logo" className="w-[100px] object-cover mx-auto" />
        <CircularProgress color="inherit" />
        <p>Veuillez patienter...</p>
      </div>
    </div>
  );
};

export default ServerUp;
