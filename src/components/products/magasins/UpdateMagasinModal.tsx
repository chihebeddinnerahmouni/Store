import { Modal, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import InputText from "../../ui/inputs/InputText";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { Controller } from "react-hook-form";
import InputMultiLine from "../../ui/inputs/InputMultiLine";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import IMagasin from "../../../types/magasin";

interface AddCategoryModalProps {
  // setOpen: (open: IMagasin | null) => void;
  setOpen: () => void;
  data: IMagasin;
}

const UpdateMagasinModal = ({ setOpen, data }: AddCategoryModalProps) => {
  const [name, setName] = useState<string>(data.nom_de_magasin);
  const [code, setCode] = useState<string>(data.code_magasin);
  const [description, setDescription] = useState<string>(data.description);
  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_BASE_URL as string;
  const mainColor = "#006233";

  type FormValues = {
    name: string;
    code: string;
    description: string;
  };

  const handleSave = () => {
    setLoading(true);
    axios
      .put(
        `${url}/api/entreports/${data.id}`,
        {
          code_entreport: code,
          name: name,
          description: description,
          // status: "active",
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
        window.location.reload();
      })
      .catch((err) => {
        //   console.log(err);
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
    clearErrors,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      code: "",
      description: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.code_magasin);
      setValue("code", data.nom_de_magasin);
      setValue("description", data.description);
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<FormValues> = () => {
    handleSave();
  };

  return (
    <Modal
      open={true}
      onClose={setOpen}
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
          Modifier magasin
        </Typography>

        {/* texts */}
        <form
          className="flex flex-col gap-5 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Le nom de la magasin est obligatoire",
            }}
            render={({ field }) => (
              <InputText
                label="Nom de la magasin*"
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
              required: "Le code de la magasin est obligatoire",
            }}
            render={({ field }) => (
              <InputText
                label="Code de la magasin*"
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

export default UpdateMagasinModal;
