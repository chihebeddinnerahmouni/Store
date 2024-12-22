import { Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ICategory from "../../../types/category";

interface AddCategoryModalProps {
  open: boolean;
  setOpen: (open: ICategory | null) => void;
  data: ICategory | null;
}

const DeleteCategoryModal = ({
  open,
  setOpen,
  data,
}: AddCategoryModalProps) => {


  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_BASE_URL as string;



  const deleteFunc = () => {
    setLoading(true);
    axios
      .delete(
        `${url}/api/categories/${data?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        enqueueSnackbar(res.data.message, { variant: "success" });
        setLoading(false);
        setOpen(null);
        window.location.reload();
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
        setLoading(false);
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
      DeleteModal
    </Modal>
  );
};


export default DeleteCategoryModal;
