import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import array from "../../../assets/file/NavbarClassesArray";
import logo from "../../../assets/images/logo";
import { LuLayoutDashboard } from "react-icons/lu";

interface SideBarProps {
  toggleDrawer: (newOpen: boolean) => () => void;
  dataArray: Record<string, Record<string, boolean>>;
}

const SideBar = ({
  toggleDrawer,
  dataArray
}: SideBarProps) => {


  // const filteredArray = filterArrayByPrivileges(privileges_test);
  const filteredArray = filterArrayByPrivileges(dataArray);

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
          className={`${
            firstSection === "tableau-de-bord" &&
            "border-l-4 border-main bg-main bg-opacity-10"
          }`}
          disablePadding
        >
          <ListItemButton onClick={() => handleNavigation("/")}>
            <LuLayoutDashboard
              className={`w-[20px] h-[20px] object-cover object-center bg-red200 mr-4 ${
                firstSection === "tableau-de-bord" && "text-main"
              }`}
            />
            <ListItemText
              primary="Tableau de bord"
              sx={{ fontFamily: "Changa" }}
              className={`${
                firstSection === "tableau-de-bord" && "text-main"
              }`}
            />
          </ListItemButton>
        </ListItem>
        {filteredArray.map((item) => (
          <div key={item.id}>
            <ListItem
              className={`${
                firstSection === item.title.toLocaleLowerCase() &&
                "border-l-4 border-main bg-main bg-opacity-10"
              }`}
              disablePadding
            >
              <ListItemButton onClick={() => handleClick(item.id)}>
                <item.icon
                  className={`min-w-[20px] min-h-[20px] bg-red200 object-cover object-center bg-red200 mr-4 ${
                    firstSection === item.url && "text-main"
                  }`}
                />
                <ListItemText
                  primary={item.title}
                  sx={{ fontFamily: "Changa" }}
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
                      onClick={() => handleNavigation(subItem.url)}
                      sx={{ pl: 4 }}
                      disablePadding
                    >
                      <ListItemButton>
                        <subItem.icon className="min-w-[20px] min-h-[20px] object-cover object-center bg-red200 mr-4" />
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

const filterArrayByPrivileges = (
  privileges: Record<string, Record<string, boolean>>
) => {
  return array
    .map((item) => {
      const categoryPrivileges = privileges[item.title];

      const filteredSubList = item.subList.filter((subItem: any) => {
        return categoryPrivileges && categoryPrivileges[subItem.title] === true;
      });

      return {
        ...item,
        subList: filteredSubList,
      };
    })
    .filter((item) => item.subList.length > 0);
};



// const privileges_test = {
//   Produits: {
//     "Ajouter un produit": true,
//     "Liste des produits": true,
//     Categories: true,
//     Marques: true,
//     Unité: true,
//     Reyonnage: true,
//     Magasins: true,
//   },
//   Achats: {
//     "Ajouter Un Achat": true,
//     "Liste Des Achats": true,
//   },
//   Ventes: {
//     "Ajouter une vente": true,
//     "Liste des Ventes": true,
//   },
//   Gens: {
//     Clients: true,
//     Fournisseurs: true,
//     Utilisateurs: true,
//   },
//   Rapports: {
//     "Alertes De Quantité De Produits": true,
//     "Rapport entrepot": true,
//     "Rapport inventaire": true,
//     "Rapport Produits": true,
//     "Rapport De Vente": true,
//     "Rapport De Vente De Produits": true,
//     "Rapport Des Achats": true,
//     "Rapport Achat De Produits": true,
//     "Rapport Client": true,
//     "Rapport Fournisseur": true,
//     "Produits Les Plus Vendus": true,
//     "Meilleurs Clients": true,
//   },
//   Paramétres: {
//     Autorisations: true,
//   },
// };