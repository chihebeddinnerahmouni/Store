import { useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";


const User = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const mainColor = "#006233";

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleDisconnect = () => {
    navigate("/disconnect");
    handleClose();
  };

  return (
    <div>
      <Avatar
        alt="User Photo"
        src="/path/to/photo.jpg"
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          width: { xs: 25, lg: 35 },
          height: { xs: 25, lg: 35 },
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
          },
          fontSize: { xs: 12, lg: 16 },
          fontWeight: "semibold",
          color: "white",
          backgroundColor: mainColor,
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
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
          onClick={handleProfile}
        >
          Profile
        </MenuItem>
        <MenuItem
          sx={{
            fontFamily: "Changa, sans-serif",
          }}
          onClick={handleDisconnect}
        >
          Disconnect
        </MenuItem>
      </Menu>
    </div>
  );
};

export default User;
