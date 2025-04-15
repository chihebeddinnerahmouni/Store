// import { Modal, Box, Typography } from "@mui/material";
// import { useState } from "react";
// import FullShiningButton from "../../ui/buttons/FullShiningButton";
// import axios from "axios";
// import { enqueueSnackbar } from "notistack";
// import IClient from "../../../types/client";

// interface AddCategoryModalProps {
//   open: boolean;
//   onClose: () => void;
//   row: IClient | null;
// }

// const DeleteClientModal = ({
//   open,
//   onClose,
//   row,
// }: AddCategoryModalProps) => {


//   const [loading, setLoading] = useState<boolean>(false);
//   const url = import.meta.env.VITE_BASE_URL as string;



//   const deleteFunc = () => {
//     setLoading(true);
//     axios
//       .delete(`${url}/api/clients/${row?.id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       .then((res) => {
//         // console.log(res.row);
//         enqueueSnackbar(res.data.message, { variant: "success" });
//         setLoading(false);
//         onClose();
//         window.location.reload();
//       })
//       .catch((err) => {
//         if (err.message === "Network Error") {
//           enqueueSnackbar("Erreur de connexion", { variant: "error" });
//         } else {
//           enqueueSnackbar(err.response.data.message, { variant: "error" });
//         }
//         setLoading(false);
//       });

//     // setTimeout(() => {
//     //     setLoading(false);
//     //     // onClose();
//     // }, 2000);
//     };
    




//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
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
//           Supprimer {row?.name}
//         </Typography>
//         <Typography
//           sx={{
//             fontFamily: "Nunito",
//             mt: 1,
//           }}
//           variant="body1"
//           component="p"
//         >
//           Voulez-vous vraiment supprimer le client {row?.name} ?
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


// export default DeleteClientModal;

import { Typography } from "@mui/material";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ModalComp from "../../ui/modals/Modal";
import ModalTitle from "../../ui/modals/ModalTitle";
import { useMutation } from "@tanstack/react-query";
import { handleAxiosError } from "../../../helper/axios_error";
import IClient from "../../../types/client";

const url = import.meta.env.VITE_BASE_URL as string;
const sendData = async (id: number) => {
  const { data } = await axios.delete(`${url}/api/clients/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

interface IProps {
  onClose: () => void;
  refetch: () => void;
  data: IClient;
}

const DeleteClientModal = ({
  onClose,
  refetch,
  data,
}: IProps) => {
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
      <ModalTitle text={`Supprimer ${data.name}`} />
      <Typography
        sx={{
          fontFamily: "Nunito",
          mt: 1,
        }}
        variant="body1"
        component="p"
      >
        Voulez-vous vraiment supprimer client {data!.name} ?
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

export default DeleteClientModal;
