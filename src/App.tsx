import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./components/ui/Loading";
import axios from "axios";




function App() {

  const [loading, setLoading] = useState(true);
  const [sideBarArray, setSideBarArray] = useState<Record<string, Record<string, boolean>>>(Object.create(null));
  const [user, setUser] = useState< Record<string, string>>(Object.create(null));
  const navigate = useNavigate();
  const url = import.meta.env.VITE_BASE_URL as string;


  useEffect(() => {
    axios
      .get(`${url}/api/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data.user);
        setSideBarArray(res.data.privileges);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/login");
        }
      });
    }, []);

  if (loading) {
    return <Loading />;
  }


  return (
    <div>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        autoHideDuration={3000}
      >
        <NavBar
          dataArray={sideBarArray}
          user={user}
        />
        <Outlet />
      </SnackbarProvider>
    </div>
  );
}

export default App;
