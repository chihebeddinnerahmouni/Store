import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createContext } from "react";

// export const PrivilegesContext = createContext<Record<string, string>>(Object.create(null));
export const PrivilegesContext = createContext<any>(Object.create(null));




function App() {

  const [sideBarArray, setSideBarArray] = useState<Record<string, Record<string, boolean>>>(Object.create(null));
  const [user, setUser] = useState<Record<string, string>>(Object.create(null));
  // const [privileges, setPrivileges] = useState<any>(Object.create(null));
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BASE_URL as string;


  useEffect(() => {
    axios
      .get(`${url}/api/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res: any) => {
        // console.log(res.data);
        setUser(res.data.user);
        setSideBarArray(res.data.privileges);
      })
      .catch((err) => {
         if (err.message === "Network Error") {
           enqueueSnackbar("Erreur de connexion", { variant: "error" });
         } else {
           enqueueSnackbar(err.response.data.message, { variant: "error" });
         }
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
    }, []);


  return (
    <PrivilegesContext.Provider value={sideBarArray}>
    <div>
        <NavBar
          dataArray={sideBarArray}
          user={user}
        />
        <Outlet />
      </div>
    </PrivilegesContext.Provider>
  );
}

export default App;
