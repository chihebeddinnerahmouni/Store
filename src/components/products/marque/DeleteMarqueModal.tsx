import { Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import IMarque from "../../../types/marque";

interface AddCategoryModalProps {
  open: boolean;
  setOpen: (open: IMarque | null) => void;
  data: IMarque | null;
}

const DeleteMarqueModal = ({ open, setOpen, data }: AddCategoryModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_BASE_URL as string;

  const deleteFunc = () => {
    setLoading(true);
    axios
      .delete(`${url}/api/brands/${data?.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        enqueueSnackbar(res.data.message, { variant: "success" });
        setLoading(false);
        setOpen(null);
        window.location.reload();
      })
      .catch((err) => {
          setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });

    // setTimeout(() => {
    //     setLoading(false);
    //     // onClose();
    // }, 2000);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(null)}
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
        <Typography
          sx={{
            fontFamily: "Nunito",
          }}
          variant="h6"
          component="h2"
        >
          Supprimer {data?.name_brand}
        </Typography>

        <Typography
          sx={{
            fontFamily: "Nunito",
            mt: 1,
          }}
          variant="body1"
          component="p"
        >
          Voulez-vous vraiment supprimer la catégorie {data!.name_brand} ?
        </Typography>

        <Box mt={2} display="flex" justifyContent="flex-end">
          <FullShiningButton
            text="Supprimer"
            color="#ff0000"
            onClick={deleteFunc}
            loading={loading}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteMarqueModal;
