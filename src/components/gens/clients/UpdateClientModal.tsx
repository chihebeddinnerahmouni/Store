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
import IClient from "../../../types/client";

const url = import.meta.env.VITE_BASE_URL as string;
const sendData = async (values: any, id: number) => {
  const { data } = await axios.put(
    `${url}/api/clients/${id}`,
    {
      code_client: values.code,
      name: values.name,
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
  data: IClient;
}

const UpdateClientModal = ({ onClose, refetch, data }: IProps) => {
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
      code: data.code_client,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Le nom est obligatoire"),
      code: Yup.string().required("Le code est obligatoire"),
    }),
    onSubmit: (values) => mutate(values),
  });

  return (
    <ModalComp open={true} onClose={onClose}>
      <ModalTitle text="Ajouter un client" />

      {/* texts */}
      <form className="flex flex-col gap-5 mt-5" onSubmit={formik.handleSubmit}>
        <InputText
          label="Le nom de client*"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          value={formik.values.name}
          setValue={(value: string) => {
            formik.handleChange("name")(value);
          }}
        />

        <InputText
          label="Le code de client"
          error={formik.touched.code && Boolean(formik.errors.code)}
          helperText={formik.touched.code && formik.errors.code}
          value={formik.values.code}
          setValue={(value: string) => {
            formik.handleChange("code")(value);
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

export default UpdateClientModal;
