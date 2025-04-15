import { Modal, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { IUser } from "../../../types/utilisateur";
import CircularProgress from "@mui/material/CircularProgress";
import MagasinSelect from "./MagasinSelect";

interface AddCategoryModalProps {
  open: boolean;
  setOpen: () => void;
  data: IUser | null;
}

const UnAssignModal = ({ open, setOpen, data }: AddCategoryModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [magasinId, setMagasinId] = useState<number>(0);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    axios
      .get(`${url}/api/entreports`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res: any) => {
        // console.log(res.data);
        setMagasinsArray(res.data.entrepots);
        setLoadingPage(true);
      });
    //   .catch((err) => {
    // console.log(err.response);
    //   });
  }, []);

  const assignFunc = () => {
    setLoading(true);
    axios
      .post(
        `${url}/api/entreports/${magasinId}/remove-user`,
        {
          entrepot_id: data!.id,
          user_id: magasinId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res: any) => {
        // console.log(res.data);
        enqueueSnackbar(res.data.message, { variant: "success" });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.response);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
        setLoading(false);
      });
  };

  // console.log(magasinId);

  return (
    <Modal
      open={open}
      onClose={() => setOpen()}
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!loadingPage ? (
          <CircularProgress color="inherit" />
        ) : (
          <div className="flex flex-col gap-5">
            <Typography
              sx={{
                fontFamily: "Nunito",
              }}
              variant="h6"
              component="h2"
            >
              Désassigner un magasin de {data?.name}
            </Typography>
            <MagasinSelect
              value={magasinId}
              setValue={setMagasinId}
              options={magasinsArray}
            />

            <div className="button self-end">
              <FullShiningButton
                text="Désassigner"
                color="#ff0000"
                onClick={assignFunc}
                loading={loading}
              />
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default UnAssignModal;
