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

const AssignModal = ({ open, setOpen, data }: AddCategoryModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [magasinId, setMagasinId] = useState<number>(0);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const url = import.meta.env.VITE_BASE_URL as string;
  const mainColor = "#006233";

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
    //   .catch(() => {
    // console.log(err.response.data);
    // setLoadingPage(true);
    //   });
  }, []);
    
    
  const assignFunc = () => {
    // console.log(data!.id);
    setLoading(true);
    axios
      .post(
        `${url}/api/entreports/${magasinId}/assign-user`,
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
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          const check = err.response && err.response.data && err.response.data.message;
          if (check) {
            Object.keys(err.response.data.erreurs).forEach((key) => {
              err.response.data.erreurs[key].forEach((e: string) => {
                enqueueSnackbar(e, { variant: "error" });
              });
            });
          }
        }
      });
  };

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
              Assigner un magasin a {data?.name}
            </Typography>
            <MagasinSelect
              value={magasinId}
              setValue={setMagasinId}
              options={magasinsArray}
            />

            <div className="button self-end">
              <FullShiningButton
                text="Assigner"
                color={mainColor}
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

export default AssignModal;

{
  /* <Typography
          sx={{
            fontFamily: "Nunito",
          }}
          variant="h6"
          component="h2"
        >
          Supprimer {data?.name_category}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Nunito",
            mt: 1,
          }}
          variant="body1"
          component="p"
        >
          Voulez-vous vraiment supprimer la catégorie {data!.name_category} ?
        </Typography> */
}
