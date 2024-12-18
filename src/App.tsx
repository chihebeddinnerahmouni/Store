import { Outlet } from "react-router-dom";
import NavBar from "./components/ui/NavBar";
// import SideBar from "./components/navbar/mobile/SideBar";

function App() {
  return (
    <div>
      <NavBar />

      {/* <div className="main grid grid-cols-12"> */}
        {/* <div className="bar hidden lg:col-span-2 lg:shadow-md lg:min-h-screen lg:overflow-auto lg:block"> */}
          {/* <SideBar /> */}
        {/* </div> */}
        {/* <div className="col-span-12 lg:col-span-10"> */}
        <Outlet />
        {/* </div> */}
      {/* </div> */}
    </div>
  );
}

export default App;
