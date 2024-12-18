import logo from "../../assets/images/logo";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import DrawerList from "../navbar/mobile/SideBar";
import { useState } from "react";
// import MenuItems from "../navbar/pc/MenuItems";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import User from "../navbar/User";


const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };



  return (
    <div
      className={`fixed px-4 h-[60px] top-0 right-0 left-0 bg-white shadow-hardShadow flex items-center justify-between z-50 md:px-[50px] lg:h-[80px] lg:px-[80px] transition-all duration-700 ease-in-out text-main`}
    >
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <img
          className="h-[40px] buttomFadeCss lg:h-[60px]"
          src={logo}
          alt="logo"
        />
      </div>

      {/* right */}
      <div className="right bg-red200 flex items-center gap-5 buttomFadeCss lg:gap-8">
        <Badge
          badgeContent={100}
          max={99}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "red",
              color: "white",
              fontFamily: "Changa, sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              padding: "0 5px",
              boxShadow: "0 0 0 2px #fff",
            },
          }}
        >
          <MailIcon
            sx={{
              fontSize: { xs: 30, lg: 30 },
              cursor: "pointer",
              // buttomFadeCss: "lg:hidden",
            }}
          />
        </Badge>

        <User />

        <button
          className={`text-3xl buttomFadeCss`}
          onClick={toggleDrawer(true)}
        >
          {open ? <IoClose /> : <IoMdMenu />}
        </button>
      </div>

      {/* <MenuItems/> */}

      <Drawer
        sx={{
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
          },
        }}
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        
      >
        <DrawerList toggleDrawer={toggleDrawer}/>
      </Drawer>
    </div>
  );
};

export default NavBar;