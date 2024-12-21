import { Modal, Box, Typography } from "@mui/material";
import { useState } from "react";
import InputText from "../../ui/inputs/InputText";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { Controller } from "react-hook-form";
import InputMultiLine from "../../ui/inputs/InputMultiLine";
import axios from "axios";
import { enqueueSnackbar } from "notistack";



type FormValues = {
  categoryName: string;
  categoryCode: string;
  description: string;
};

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCategoryModal = ({ open, onClose }: AddCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryCode, setCategoryCode] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const url = import.meta.env.VITE_BASE_URL as string;

  const mainColor = "#006233";

    const handleSave = () => {
        setLoading(true);
        axios
          .post(
            `${url}/api/categories`,
            {
              code_category: categoryCode,
              name_category: categoryName,
              description: description,
              status: "active",
            },
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
            onClose();
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

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = handleSave;

  return (
    <Modal
      open={open}
      onClose={onClose}
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
        }}
      >
        <Typography
          sx={{
            fontFamily: "Nunito",
          }}
          variant="h6"
          component="h2"
        >
          Ajouter une catégorie
        </Typography>

        {/* texts */}
        <form
          className="flex flex-col gap-5 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="categoryName"
            control={control}
            rules={{
              required: "Le nom de la catégorie est obligatoire",
            }}
            render={({ field }) => (
              <InputText
                label="Le nom de la catégorie*"
                {...field}
                error={!!errors.categoryName}
                helperText={errors.categoryName?.message}
                value={categoryName}
                setValue={(value: string) => {
                  setCategoryName(value);
                  field.onChange(value);
                  if (errors.categoryName) {
                    clearErrors("categoryName");
                  }
                }}
              />
            )}
          />

          <Controller
            name="categoryCode"
            control={control}
            rules={{
              required: "Le code de la catégorie est obligatoire*",
            }}
            render={({ field }) => (
              <InputText
                label="Le code de la catégorie"
                {...field}
                error={!!errors.categoryCode}
                helperText={errors.categoryCode?.message}
                value={categoryCode}
                setValue={(value: string) => {
                  setCategoryCode(value);
                  field.onChange(value);
                  if (errors.categoryCode) {
                    clearErrors("categoryCode");
                  }
                }}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            rules={{
              required: "La description de la catégorie est obligatoire",
            }}
            render={({ field }) => (
              <InputMultiLine
                label="La description de la catégorie*"
                {...field}
                error={!!errors.description}
                helperText={errors.description?.message}
                value={description}
                setValue={(value: string) => {
                  setDescription(value);
                  field.onChange(value);
                  if (errors.description) {
                    clearErrors("description");
                  }
                }}
              />
            )}
          />
          <Box mt={2} display="flex" justifyContent="flex-end">
            <FullShiningButton
              text="Soumettre"
              color={mainColor}
              //   onClick={handleSave}
              onClick={handleSubmit(onSubmit)}
                          type="submit"
                            loading={loading}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
