import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import { SnackbarProvider } from "notistack";
// import isLoggedIn from "./helper/isLogedin";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";




function App() {

  // const navigate = useNavigate();
  // const login = isLoggedIn();

  // useEffect(() => {
  //   if (!login) {
  //     navigate("/login");
  //   } 
  // }, []);


  // if (!login) {
  //   return null;
  // }


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
        <NavBar />
        <Outlet />
      </SnackbarProvider>
    </div>
  );
}

export default App;
