// import { Modal, Box, Typography } from "@mui/material";
// import { useState } from "react";
// import FullShiningButton from "../../ui/buttons/FullShiningButton";
// import axios from "axios";
// import { enqueueSnackbar } from "notistack";
// import ICategory from "../../../types/category";

// interface AddCategoryModalProps {
//   onClose: (open: ICategory | null) => void;
//   data: ICategory | null;
// }

// const DeleteCategoryModal = ({
//   setOpen,
//   data,
// }: AddCategoryModalProps) => {

//   const [loading, setLoading] = useState<boolean>(false);
//   const url = import.meta.env.VITE_BASE_URL as string;

//   const deleteFunc = () => {
//     setLoading(true);
//     axios
//       .delete(
//         `${url}/api/categories/${data?.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       )
//       .then((res) => {
//         // console.log(res.data);
//         enqueueSnackbar(res.data.message, { variant: "success" });
//         setLoading(false);
//         setOpen(null);
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
//           Supprimer {data?.name_category}
//         </Typography>
//         <Typography
//           sx={{
//             fontFamily: "Nunito",
//             mt: 1,
//           }}
//           variant="body1"
//           component="p"
//         >
//           Voulez-vous vraiment supprimer la catégorie {data!.name_category} ?
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

// export default DeleteCategoryModal;

import { Typography } from "@mui/material";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ModalComp from "../../ui/modals/Modal";
import ModalTitle from "../../ui/modals/ModalTitle";
import { useMutation } from "@tanstack/react-query";
import { handleAxiosError } from "../../../helper/axios_error";
import ICategory from "../../../types/category";

const url = import.meta.env.VITE_BASE_URL as string;
const sendData = async (id: number) => {
  const { data } = await axios.delete(
    `${url}/api/categories/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
};

interface AddCategoryModalProps {
  onClose: () => void;
  refetch: () => void;
  data: ICategory;
}

const DeleteCategoryModal = ({
  onClose,
  refetch,
  data,
}: AddCategoryModalProps) => {

  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: () => {
      enqueueSnackbar("La catégorie a été supprimer avec succès", {
        variant: "success",
      });
      refetch();
      onClose();
    },
    onError: handleAxiosError,
  });

  console.log(data.id);

  return (
    <ModalComp open={true} onClose={onClose}>
      <ModalTitle text="Supprimer une catégorie" />
      <Typography
        sx={{
          fontFamily: "Nunito",
          mt: 1,
        }}
        variant="body1"
        component="p"
      >
        Voulez-vous vraiment supprimer la catégorie {data!.name_category} ?
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
