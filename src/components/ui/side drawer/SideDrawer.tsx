import Drawer from "@mui/material/Drawer";

interface IProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const SideDrawer = ({ children, open, onClose }: IProps) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "80%",
          maxWidth: "300px",
        },

        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(5px)",
        },
      }}
      >
          {children}
    </Drawer>
  );
};

export default SideDrawer;
