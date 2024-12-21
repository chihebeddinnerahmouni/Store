import { Modal, Box, Typography } from "@mui/material";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import InputText from "../../ui/inputs/InputText";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
import { useState } from "react";
import InputMultiLine from "../../ui/inputs/InputMultiLine";

interface AddMarqueModalProps {
  open: boolean;
  onClose: () => void;
}

type FormValues = {
  name: string;
  code: string;
  description: string;
};

const AddMarqueModal = ({ open, onClose }: AddMarqueModalProps) => {
  const mainColor = "#006233";
  const url = import.meta.env.VITE_BASE_URL as string;
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();

  const handleSave: SubmitHandler<FormValues> = () => {
    setLoading(true);
    axios
      .post(
        `${url}/api/rayonages`,
        {
          code_location: code,
          name: name,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        setLoading(false);
        onClose();
        window.location.reload();
      })
      .catch((err) => {
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
        setLoading(false);
      });
  };

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
          Ajouter une rayon
        </Typography>

        {/* Form */}
        <form
          className="flex flex-col gap-5 mt-5"
          onSubmit={handleSubmit(handleSave)}
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Ce champ est obligatoire",
            }}
            render={({ field }) => (
              <InputText
                label="Nom de rayon*"
                {...field}
                value={name}
                error={!!errors.name}
                helperText={errors.name?.message}
                setValue={(value: string) => {
                  setName(value);
                  field.onChange(value);
                  if (errors.name) {
                    clearErrors("name");
                  }
                }}
              />
            )}
          />

          <Controller
            name="code"
            control={control}
            rules={{
              required: "Ce champ est obligatoire",
            }}
            render={({ field }) => (
              <InputText
                label="Code de rayon*"
                {...field}
                error={!!errors.code}
                value={code}
                helperText={errors.code?.message}
                setValue={(value: string) => {
                  setCode(value);
                  field.onChange(value);
                  if (errors.code) {
                    clearErrors("code");
                  }
                }}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{
              required: "Ce champ est obligatoire",
            }}
            render={({ field }) => (
              <InputMultiLine
                label="La description du rayon*"
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
              type="submit"
              loading={loading}
              onClick={handleSubmit(handleSave)}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddMarqueModal;
