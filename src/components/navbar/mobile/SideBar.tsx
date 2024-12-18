// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import Box from "@mui/material/Box";
// import logo from "../../../assets/images/logo";
// import { useLocation, useNavigate } from "react-router-dom";
// import navbar_classes_array from "../../../assets/file/NavbarClassesArray";

// interface SideBarProps {
//   toggleDrawer: (newOpen: boolean) => () => void;
// }

// const SideBar = ({ toggleDrawer }: SideBarProps) => {
//   const location = useLocation();
//   const firstSection = location.pathname.split("/")[1]
//     ? location.pathname.split("/")[1]
//     : "";
//   const navigate = useNavigate();

//   return (
//     <Box
//       sx={{
//         width: 200,
//       }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//     >
//       <img src={logo} alt="logo" className="h-[60px] mx-auto mt-5" />
//       <List>
//         {navbar_classes_array.map((item, index) => (
//           <ListItem
//             onClick={() => {
//               item.blank ? window.open(item.url, "_blank") : navigate(item.url);
//             }}
//             className={`
//             ${
//               firstSection === item.url &&
//               "border-l-4 border-main bg-main bg-opacity-10"
//             }
// `}
//             key={index}
//             disablePadding
//           >
//             <ListItemButton>
//               <img
//                 src={"/menu/" + item.icon}
//                 alt={item.title}
//                 className={`w-[20px] h-[20px] object-cover object-center bg-red200 mr-4 ${
//                   firstSection === item.url && "text-mainDark"
//                 }`}
//               />
//               <ListItemText
//                 primary={item.title}
//                 sx={{
//                   fontFamily: "Changa, sans-serif",
//                 }}
//                 className={` ${firstSection === item.url && "text-mainDark"}`}
//               />
//             </ListItemButton>
//           </ListItem>
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


interface SideBarProps {
  toggleDrawer: (newOpen: boolean) => () => void;
}

const SideBar = ({ toggleDrawer }: SideBarProps) => {
  const location = useLocation();
  const firstSection = location.pathname.split("/")[1]
    ? location.pathname.split("/")[1]
    : "";
  const navigate = useNavigate();
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});

  const handleClick = (id: number) => {
    setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
  };

  return (
    <Box
      sx={{
        // width: 200,
        width: { xs: 200, lg: 350 },
      }}
      role="presentation"
      // onClick={toggleDrawer(false)}
    >
      <img src={logo} alt="logo" className="h-[60px] mx-auto mt-5" />
      <List>
        {array.map((item) => (
          <div key={item.id}>
            <ListItem
              className={`${
                firstSection === item.url &&
                "border-l-4 border-main bg-main bg-opacity-10"
              }`}
              disablePadding
            >
              <ListItemButton onClick={() => handleClick(item.id)}>
                <img
                  src={item.icon}
                  alt={item.title}
                  className={`w-[20px] h-[20px] object-cover object-center bg-red200 mr-4 ${
                    firstSection === item.url && "text-mainDark"
                  }`}
                />
                <ListItemText
                  primary={item.title}
                  sx={{
                    fontFamily: "Changa, sans-serif",
                  }}
                  className={`${firstSection === item.url && "text-mainDark"}`}
                />
                {item.subList &&
                  (open[item.id] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.subList && (
              <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subList.map((subItem) => (
                    <ListItem
                      key={subItem.id}
                      onClick={() => {
                        navigate(subItem.url);
                        toggleDrawer(false);
                      }}
                      sx={{ pl: 4 }}
                      disablePadding
                    >
                      <ListItemButton>
                        <img
                          src={subItem.icon}
                          alt={subItem.title}
                          className="w-[20px] h-[20px] object-cover object-center bg-red200 mr-4"
                        />
                        <ListItemText
                          primary={subItem.title}
                          sx={{
                            fontFamily: "Changa, sans-serif",
                          }}
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