import ActionButton from "../../ui/buttons/ActionButton"
import { SlOptions } from "react-icons/sl";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";




const OptionsMenu = () => {

    const [isOptoinsOpen, setIsOptionsOpen] = useState<null | HTMLElement>(
      null
    );

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
      setIsOptionsOpen(event.currentTarget);
    };

    const handleClose = () => {
      setIsOptionsOpen(null);
    };

  return (
    <div className="">
      <ActionButton
        icon={<SlOptions />}
        active={true}
        color="#3b82f6"
        onClick={handleOpen}
      />
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
        <MenuItem
          sx={{
            fontFamily: "Changa, sans-serif",
          }}
        //   onClick={handleProfile}
        >
          Supprimer le retour
        </MenuItem>
      </Menu>
    </div>
  );
}

export default OptionsMenu
