import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import { SnackbarProvider } from "notistack";
// import isLoggedIn from "./helper/isLogedin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./components/ui/Loading";
import axios from "axios";




function App() {

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [sideBarArray, setSideBarArray] = useState<
    Record<string, Record<string, boolean>>
  >(Object.create(null));
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
        setSideBarArray(res.data.privileges);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log("pst");
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
        <NavBar dataArray={sideBarArray} />
        <Outlet />
      </SnackbarProvider>
    </div>
  );
}

export default App;
