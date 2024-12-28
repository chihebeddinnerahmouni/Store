// import { useState } from 'react';
// import {
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Collapse,
//   Box,
// } from '@mui/material';
// import { ExpandLess, ExpandMore } from '@mui/icons-material';
// import { useLocation, useNavigate } from 'react-router-dom';
// import array from "../../../assets/file/NavbarClassesArray";
// import logo from '../../../assets/images/logo';
// import { LuLayoutDashboard } from "react-icons/lu";

// interface SideBarProps {
//   toggleDrawer: (newOpen: boolean) => () => void;
// }

// const SideBar = ({ toggleDrawer }: SideBarProps) => {
//   const location = useLocation();
//   const firstSection = location.pathname.split("/")[1]
//     ? location.pathname.split("/")[1]
//     : "";
//   const navigate = useNavigate();
//   const [open, setOpen] = useState<{ [key: number]: boolean }>({});

//   const handleClick = (id: number) => {
//     setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
//   };

//   return (
//     <Box
//       sx={{
//         width: { xs: 200, lg: 300 },
//       }}
//       role="presentation"
//     >
//       <img src={logo} alt="logo" className="h-[60px] mx-auto mt-5" />
//       <List>
//         <ListItem
//           className={`${
//             firstSection === "" &&
//             "border-l-4 border-main bg-main bg-opacity-10"
//           }`}
//           disablePadding
//         >
//           <ListItemButton
//             onClick={() => {
//               toggleDrawer(false)(), navigate("/");
//             }}
//           >
//             <LuLayoutDashboard
//               className={`w-[20px] h-[20px] object-cover object-center bg-red200 mr-4 ${
//                 firstSection === "" && "text-main"
//               }`}
//             />
//             {/* <img
//                   src={item.icon}
//                   alt={item.title}
//                   className={`w-[20px] h-[20px] object-cover object-center bg-red200 mr-4 ${
//                     firstSection === item.url && "text-mainDark"
//                   }`}
//                 /> */}
//             <ListItemText
//               primary={"Tableau de bord"}
//               sx={{
//                 fontFamily: "Changa, sans-serif",
//               }}
//               className={`${firstSection === "" && "text-mainDark"}`}
//             />
//           </ListItemButton>
//         </ListItem>
//         {array.map((item) => (
//           <div key={item.id}>
//             <ListItem
//               className={`${
//                 firstSection === item.title.toLocaleLowerCase() &&
//                 "border-l-4 border-main bg-main bg-opacity-10"
//               }`}
//               disablePadding
//             >
//               <ListItemButton onClick={() => handleClick(item.id)}>
//                 {/* <img
//                   src={item.icon}
//                   alt={item.title}
//                   className={`w-[20px] h-[20px] object-cover object-center bg-red200 mr-4 ${
//                     firstSection === item.url && "text-mainDark"
//                   }`}
//                 /> */}
//                 <item.icon
//                   className={`min-w-[20px] min-h-[20px] bg-red200 object-cover object-center bg-red200 mr-4 ${
//                     firstSection === item.url && "text-main"
//                   }`}
//                 />
//                 <ListItemText
//                   primary={item.title}
//                   sx={{
//                     fontFamily: "Changa, sans-serif",
//                   }}
//                   className={`${firstSection === item.url && "text-mainDark"}`}
//                 />
//                 {item.subList &&
//                   (open[item.id] ? <ExpandLess /> : <ExpandMore />)}
//               </ListItemButton>
//             </ListItem>
//             {item.subList && (
//               <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   {item.subList.map((subItem) => (
//                     <ListItem
//                       key={subItem.id}
//                       onClick={() => {
//                         toggleDrawer(false)();
//                         navigate(subItem.url);
//                       }}
//                       sx={{ pl: 4 }}
//                       disablePadding
//                     >
//                       <ListItemButton>
//                         {/* <img
//                           src={subItem.icon}
//                           alt={subItem.title}
//                           className="w-[20px] h-[20px] object-cover object-center bg-red200 mr-4"
//                         /> */}
//                         <subItem.icon
//                           className={`min-w-[20px] min-h-[20px] object-cover object-center bg-red200 mr-4`}
//                         />
//                         <ListItemText
//                           primary={subItem.title}
//                           sx={{
//                             fontFamily: "Changa, sans-serif",
//                           }}
//                         />
//                       </ListItemButton>
//                     </ListItem>
//                   ))}
//                 </List>
//               </Collapse>
//             )}
//           </div>
//         ))}
//       </List>
//     </Box>
//   );
// };


// export default SideBar;

import { useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import array from "../../../assets/file/NavbarClassesArray";
import logo from '../../../assets/images/logo';
import { LuLayoutDashboard } from "react-icons/lu";

interface SideBarProps {
  toggleDrawer: (newOpen: boolean) => () => void;
}

const SideBar = ({ toggleDrawer }: SideBarProps) => {
  const location = useLocation();
  const firstSection = location.pathname.split("/")[1] || "";
  const navigate = useNavigate();
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  const handleClick = (id: number) => {
    setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
  };

  const handleNavigation = (url: string) => {
    toggleDrawer(false)();
    navigate(url);
  };

  return (
    <Box
      sx={{
        width: 300,
      }}
      role="presentation"
    >
      <img src={logo} alt="logo" className="h-[60px] mx-auto mt-5" />
      <List>
        <ListItem
          className={`${firstSection === "" && "border-l-4 border-main bg-main bg-opacity-10"}`}
          disablePadding
        >
          <ListItemButton onClick={() => handleNavigation("/")}>
            <LuLayoutDashboard
              className={`w-[20px] h-[20px] object-cover object-center bg-red200 mr-4 ${firstSection === "" && "text-main"}`}
            />
            <ListItemText
              primary="Tableau de bord"
              sx={{ fontFamily: "Changa, sans-serif" }}
              className={`${firstSection === "" && "text-mainDark"}`}
            />
          </ListItemButton>
        </ListItem>
        {array.map((item) => (
          <div key={item.id}>
            <ListItem
              className={`${firstSection === item.title.toLocaleLowerCase() && "border-l-4 border-main bg-main bg-opacity-10"}`}
              disablePadding
            >
              <ListItemButton onClick={() => handleClick(item.id)}>
                <item.icon
                  className={`min-w-[20px] min-h-[20px] bg-red200 object-cover object-center bg-red200 mr-4 ${firstSection === item.url && "text-main"}`}
                />
                <ListItemText
                  primary={item.title}
                  sx={{ fontFamily: "Changa, sans-serif" }}
                  className={`${firstSection === item.url && "text-mainDark"}`}
                />
                {item.subList && (open[item.id] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.subList && (
              <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subList.map((subItem) => (
                    <ListItem
                      key={subItem.id}
                      onClick={() => handleNavigation(subItem.url)}
                      sx={{ pl: 4 }}
                      disablePadding
                    >
                      <ListItemButton>
                        <subItem.icon
                          className="min-w-[20px] min-h-[20px] object-cover object-center bg-red200 mr-4"
                        />
                        <ListItemText
                          primary={subItem.title}
                          sx={{ fontFamily: "Changa, sans-serif" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </div>
        ))}
      </List>
    </Box>
  );
};

export default SideBar;