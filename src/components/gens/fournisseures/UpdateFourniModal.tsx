import { Box } from "@mui/material";
import InputText from "../../ui/inputs/InputText";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ModalComp from "../../ui/modals/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import ModalTitle from "../../ui/modals/ModalTitle";
import { useMutation } from "@tanstack/react-query";
import { handleAxiosError } from "../../../helper/axios_error";
import IFournisseures from "../../../types/fournisseures";

const url = import.meta.env.VITE_BASE_URL as string;
const sendData = async (values: any, id: number) => {
  // const timestamp = new Date().getTime(); // Get current timestamp
  // const uniqueEmail = `email${timestamp}@email.com`; // Append timestamp to email
  const { data } = await axios.put(
    `${url}/api/providers/${id}`,
    {
      // code_provider: generateCodeProvider(),
      name: values.name,
      // email: uniqueEmail,
      // phone: "00100",
      // address: "address",
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
  data: IFournisseures
}

const UpdateFourniModal = ({ onClose, refetch, data }: IProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => sendData(values, data.id),
    onSuccess: (res: any) => {
      enqueueSnackbar(res.message, {
        variant: "success",
      });
      refetch();
      onClose();
    },
    onError: handleAxiosError,
  });

  const formik = useFormik({
    initialValues: {
      name: data.name,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom est obligatoire"),
    }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <ModalComp open={true} onClose={onClose}>
      <ModalTitle text="Ajouter Un Fournisseur" />

      {/* texts */}
      <form className="flex flex-col gap-5 mt-5" onSubmit={formik.handleSubmit}>
        <InputText
          label="Le nom de fournisseur*"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          value={formik.values.name}
          setValue={(value: string) => {
            formik.handleChange("name")(value);
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

export default UpdateFourniModal;

// ______________________________________________
// const generateCodeProvider = () => {
//   const timestamp = Date.now().toString().slice(-3);
//   const randomNum = Math.floor(Math.random() * 1000)
//     .toString()
//     .padStart(3, "0");
//   return timestamp + randomNum;
// };