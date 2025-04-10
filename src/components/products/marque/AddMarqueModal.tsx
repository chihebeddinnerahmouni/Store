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

const url = import.meta.env.VITE_BASE_URL as string;
const sendData = async (values: any) => {
  const { data } = await axios.post(
    `${url}/api/brands`,
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

interface AddCategoryModalProps {
  onClose: () => void;
  refetch: () => void;
}

const AddCategoryModal = ({ onClose, refetch }: AddCategoryModalProps) => {
  const mainColor = "#006233";
  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
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
      name: "",
      code: "",
      description: "",
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
      <ModalTitle text="Ajouter une marque" />

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
            color={mainColor}
            type="submit"
            loading={isPending}
          />
        </Box>
      </form>
    </ModalComp>
  );
};

export default AddCategoryModal;
