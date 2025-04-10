// import { Modal, Box, Typography } from "@mui/material";
// import { useState } from "react";
// import FullShiningButton from "../../ui/buttons/FullShiningButton";
// import axios from "axios";
// import { enqueueSnackbar } from "notistack";
// import IUnite from "../../../types/unite";

// interface AddCategoryModalProps {
//   open: boolean;
//   setOpen: (open: IUnite | null) => void;
//   data: IUnite | null;
// }

// const DeleteUniteModal = ({ open, setOpen, data }: AddCategoryModalProps) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const url = import.meta.env.VITE_BASE_URL as string;

//   const deleteFunc = () => {
//     setLoading(true);
//     axios
//       .delete(`${url}/api/units/${data?.id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => {
//         // console.log(res.data);
//         enqueueSnackbar(res.data.message, { variant: "success" });
//         setLoading(false);
//         setOpen(null);
//         window.location.reload();
//       })
//       .catch((err) => {
//         setLoading(false);
//         if (err.message === "Network Error") {
//           enqueueSnackbar("Erreur de connexion", { variant: "error" });
//         } else {
//           enqueueSnackbar(err.response.data.message, { variant: "error" });
//         }
//       });

//     // setTimeout(() => {
//     //     setLoading(false);
//     //     // onClose();
//     // }, 2000);
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={() => setOpen(null)}
//       BackdropProps={{
//         style: {
//           backgroundColor: "rgba(0, 0, 0, 0.3)",
//           backdropFilter: "blur(5px)",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: { xs: "90%", md: "40%", lg: 400 },
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 3,
//           borderRadius: 1,
//         }}
//       >
//         <Typography
//           sx={{
//             fontFamily: "Nunito",
//           }}
//           variant="h6"
//           component="h2"
//         >
//           Supprimer {data?.name_unit}
//         </Typography>

//         <Typography
//           sx={{
//             fontFamily: "Nunito",
//             mt: 1,
//           }}
//           variant="body1"
//           component="p"
//         >
//           Voulez-vous vraiment supprimer la catégorie {data!.name_unit} ?
//         </Typography>

//         <Box mt={2} display="flex" justifyContent="flex-end">
//           <FullShiningButton
//             text="Supprimer"
//             color="#ff0000"
//             onClick={deleteFunc}
//             loading={loading}
//           />
//         </Box>
//       </Box>
//     </Modal>
//   );
// };


// export default DeleteUniteModal;

import { Typography } from "@mui/material";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ModalComp from "../../ui/modals/Modal";
import ModalTitle from "../../ui/modals/ModalTitle";
import { useMutation } from "@tanstack/react-query";
import { handleAxiosError } from "../../../helper/axios_error";
import IUnite from "../../../types/unite";

const url = import.meta.env.VITE_BASE_URL as string;
const sendData = async (id: number) => {
  const { data } = await axios.delete(`${url}/api/units/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

interface AddCategoryModalProps {
  onClose: () => void;
  refetch: () => void;
  data: IUnite;
}

const DeleteCategoryModal = ({
  onClose,
  refetch,
  data,
}: AddCategoryModalProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: (res: any) => {
      enqueueSnackbar(res.message, {
        variant: "success",
      });
      refetch();
      onClose();
    },
    onError: handleAxiosError,
  });

  return (
    <ModalComp open={true} onClose={onClose}>
      <ModalTitle text="Supprimer une marque" />
      <Typography
        sx={{
          fontFamily: "Nunito",
          mt: 1,
        }}
        variant="body1"
        component="p"
      >
        Voulez-vous vraiment supprimer {data!.name_unit} ?
      </Typography>

      <div className="mt-5 flex justify-end">
        <FullShiningButton
          text="Soumettre"
          color="red"
          type="submit"
          loading={isPending}
          onClick={() => mutate(data.id)}
        />
      </div>
    </ModalComp>
  );
};

export default DeleteCategoryModal;
