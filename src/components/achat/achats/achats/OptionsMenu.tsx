import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import OptionsButton from "../../../ui/buttons/actions/OptionsButton";
import IAchat from "../../../../types/achat";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import createPDF from "../../../../helper/create_pdf_from_object";
import { useMutation } from "@tanstack/react-query";
import { handleAxiosError } from "../../../../helper/axios_error";


const url = import.meta.env.VITE_BASE_URL as string;
const deletFunction = async (id: number) => {
  const response = await axios.delete(`${url}/api/achats/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}


interface OptionsMenuProps {
  active: boolean;
  row: IAchat;
  columns: any[];
  refetch?: () => void;
}

const OptionsMenu = ({ active, row, columns, refetch }: OptionsMenuProps) => {
  const [isOptoinsOpen, setIsOptionsOpen] = useState<null | HTMLElement>(null);
  const { mutate } = useMutation({
    mutationFn: deletFunction,
    onSuccess: (res: any) => {
      enqueueSnackbar(res.message, { variant: "success" });
      refetch && refetch();
    },
    onError: handleAxiosError,
  });

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
    mutate(row.id);
  };

  const options = [
    {
      title: "Details De L'enrée",
      onClick: () => window.open(`/achats/details/${row.id}`, "_blank"),
    },
    {
      title: "Télécharger Le PDF",
      onClick: () => createPDF(row, columns, "Achat"),
    },
    {
      title: "Supprimer L'enrée",
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
              fontFamily: "Changa, sans-serif",
            }}
            onClick={option.onClick}
          >
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};


export default OptionsMenu
