// import { Modal, Box, Typography } from "@mui/material";
// import { useState, useEffect } from "react";
// import InputText from "../../ui/inputs/InputText";
// import FullShiningButton from "../../ui/buttons/FullShiningButton";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { Controller } from "react-hook-form";
// import InputMultiLine from "../../ui/inputs/InputMultiLine";
// import axios from "axios";
// import { enqueueSnackbar } from "notistack";
// import IMarque from "../../../types/marque";

// interface AddCategoryModalProps {
//   open: boolean;
//   setOpen: (open: IMarque | null) => void;
//   data: IMarque | null;
// }

// const UpdateMarqueModal = ({ open, setOpen, data }: AddCategoryModalProps) => {
// const [name, setName] = useState<string>(data!.name_brand);
// const [code, setCode] = useState<string>(data!.code_brand);
// const [description, setDescription] = useState<string>(data!.description);
//   const [loading, setLoading] = useState<boolean>(false);
//   const url = import.meta.env.VITE_BASE_URL as string;
//   const mainColor = "#006233";

//   type FormValues = {
//       name: string;
//       code: string;
//       description: string;
        
//   };

//   const handleSave = () => {
//     setLoading(true);
//     axios
//       .put(
//         `${url}/api/brands/${data?.id}`,
//         {
//           code_brand: code,
//           name_brand: name,
//           description: description,
//           status: "inactive",
//         },
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
//         .catch((err) => {
//         //   console.log(err);
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
//   };

//   const {
//     handleSubmit,
//     control,
//     clearErrors,
//     formState: { errors },
//     setValue,
//   } = useForm<FormValues>({
//     defaultValues: {
//           name: "",
//             code: "",
//       description: "",
//     },
//   });

//   useEffect(() => {
//     if (data) {
//       setValue("name", data.name_brand);
//       setValue("code", data.code_brand);
//       setValue("description", data.description);
//     }
//   }, [data, setValue]);

//   const onSubmit: SubmitHandler<FormValues> = () => {
//     handleSave();
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
//           Modifier marque
//         </Typography>

//         {/* texts */}
//         <form
//           className="flex flex-col gap-5 mt-5"
//           onSubmit={handleSubmit(onSubmit)}
//         >
//           <Controller
//             name="name"
//             control={control}
//             rules={{
//               required: "Le nom de la marque est obligatoire",
//             }}
//             render={({ field }) => (
//               <InputText
//                 label="Nom de la marque*"
//                 {...field}
//                 value={name}
//                 error={!!errors.name}
//                 helperText={errors.name?.message}
//                 setValue={(value: string) => {
//                   setName(value);
//                   field.onChange(value);
//                   if (errors.name) {
//                     clearErrors("name");
//                   }
//                 }}
//               />
//             )}
//           />

//           <Controller
//             name="code"
//             control={control}
//             rules={{
//               required: "Le code de la marque est obligatoire",
//             }}
//             render={({ field }) => (
//               <InputText
//                 label="Code de la marque*"
//                 {...field}
//                 error={!!errors.code}
//                 value={code}
//                 helperText={errors.code?.message}
//                 setValue={(value: string) => {
//                   setCode(value);
//                   field.onChange(value);
//                   if (errors.code) {
//                     clearErrors("code");
//                   }
//                 }}
//               />
//             )}
//           />

//           <Controller
//             name="description"
//             control={control}
//             rules={{
//               required: "La description de la catégorie est obligatoire",
//             }}
//             render={({ field }) => (
//               <InputMultiLine
//                 label="La description de la catégorie*"
//                 {...field}
//                 error={!!errors.description}
//                 helperText={errors.description?.message}
//                 value={description}
//                 setValue={(value: string) => {
//                   setDescription(value);
//                   field.onChange(value);
//                   if (errors.description) {
//                     clearErrors("description");
//                   }
//                 }}
//               />
//             )}
//           />
//           <Box mt={2} display="flex" justifyContent="flex-end">
//             <FullShiningButton
//               text="Soumettre"
//               color={mainColor}
//               //   onClick={handleSave}
//               onClick={handleSubmit(onSubmit)}
//               type="submit"
//               loading={loading}
//             />
//           </Box>
//         </form>
//       </Box>
//     </Modal>
//   );
// };


// export default UpdateMarqueModal;


import { Box } from "@mui/material";
import InputText from "../../ui/inputs/InputText";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import InputMultiLine from "../../ui/inputs/InputMultiLine";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ModalComp from "../../ui/modals/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import ModalTitle from "../../ui/modals/ModalTitle";
import { useMutation } from "@tanstack/react-query";
import { handleAxiosError } from "../../../helper/axios_error";
import IMArque from "../../../types/marque";

const url = import.meta.env.VITE_BASE_URL as string;
const sendData = async (values: any, id: number) => {
  const { data } = await axios.put(
    `${url}/api/brands/${id}`,
    {
      code_brand: values.code,
      name_brand: values.name,
      description: values.description,
      status: "active",
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
};

interface IProps {
  onClose: () => void;
  refetch: () => void;
  data: IMArque;
}

const UpdateMarqueModal = ({ onClose, refetch, data }: IProps) => {

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any)=> sendData(values, data.id),
    onSuccess: () => {
      enqueueSnackbar("La marque a été ajoutée avec succès", {
        variant: "success",
      });
      refetch();
      onClose();
    },
    onError: handleAxiosError,
  });

  const formik = useFormik({
    initialValues: {
      name: data.name_brand,
      code: data.code_brand,
      description: data.description,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom de la marque est obligatoire"),
      code: Yup.string().required("Le code de la marque est obligatoire"),
      description: Yup.string().required(
        "La description de la marque est obligatoire"
      ),
    }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <ModalComp open={true} onClose={onClose}>
      <ModalTitle text="Mise a jour une marque" />

      {/* texts */}
      <form className="flex flex-col gap-5 mt-5" onSubmit={formik.handleSubmit}>
        <InputText
          label="Le nom de la marque*"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          value={formik.values.name}
          setValue={(value: string) => {
            formik.handleChange("name")(value);
          }}
        />

        <InputText
          label="Le code de la marque"
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
          value={formik.values.code}
          setValue={(value: string) => {
            formik.handleChange("code")(value);
          }}
        />

        <InputMultiLine
          label="La description de la marque*"
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          value={formik.values.description}
          setValue={(value: string) => {
            formik.handleChange("description")(value);
          }}
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <FullShiningButton
            text="Soumettre"
            type="submit"
            loading={isPending}
          />
        </Box>
      </form>
    </ModalComp>
  );
};

export default UpdateMarqueModal;
