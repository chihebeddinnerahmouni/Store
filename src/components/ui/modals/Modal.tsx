import { Modal, Box } from "@mui/material";

interface IProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalComp = ({open,onClose, children}: IProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(5px)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: "40%", lg: 400 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 1,
        }}
          >
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComp;
