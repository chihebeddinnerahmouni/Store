import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import OptionsButton from "../../../ui/buttons/actions/OptionsButton";
import IAchat from "../../../../types/achat";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import createPDF from "../../../../helper/create_pdf_from_object";


interface OptionsMenuProps {
  active: boolean;
  row: IAchat;
  columns: any[];
}

const OptionsMenu = ({
  active,
  row,
  columns
}: OptionsMenuProps) => {

  const [isOptoinsOpen, setIsOptionsOpen] = useState<null | HTMLElement>(null);

  const url = import.meta.env.VITE_BASE_URL as string;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      event.preventDefault();
      setIsOptionsOpen(event.currentTarget);
    };

    const handleClose = () => {
      setIsOptionsOpen(null);
    };

  
  const deleteRow = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    axios
      .delete(`${url}/api/achats/${row.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        window.location.reload();
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });
  }


  const options = [
    {
      title: "Details De L'achat",
      onClick: () => window.open(`/achats/details/${row.id}`, "_blank"),
    },
    {
      title: "Télécharger Le PDF",
      onClick: () => createPDF(row, columns, "Achat"),
    },
    {
      title: "Supprimer L'achat",
      onClick: deleteRow,
    },
  ];
  
  return (
    <div className="">
      <OptionsButton onClick={handleOpen} active={active} />
      <Menu
        anchorEl={isOptoinsOpen}
        open={Boolean(isOptoinsOpen)}
        onClose={handleClose}
        sx={{
          "& .MuiMenu-paper": {
            boxShadow: 4,
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            sx={{
              fontFamily: "Nunito, sans-serif",
            }}
            onClick={option.onClick}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}


export default OptionsMenu
