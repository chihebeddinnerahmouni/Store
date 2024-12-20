import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
import { SnackbarProvider } from "notistack";


function App() {
  return (
    <div>
      <SnackbarProvider /> 
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
