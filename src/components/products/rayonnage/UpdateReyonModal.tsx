import { Modal, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import InputText from "../../ui/inputs/InputText";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { Controller } from "react-hook-form";
import InputMultiLine from "../../ui/inputs/InputMultiLine";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import IReyon from "../../../types/reyonnage";

interface AddCategoryModalProps {
  open: boolean;
  setOpen: (open: IReyon | null) => void;
  data: IReyon | null;
}

const UpdateReyonModal = ({ open, setOpen, data }: AddCategoryModalProps) => {
const [name, setName] = useState<string>(data!.name);
const [code, setCode] = useState<string>(data!.code_location);
const [description, setDescription] = useState<string>(data!.description);
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
        `${url}/api/rayonages/${data?.id}`,
        {
          code_brand: code,
          name_brand: name,
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
        setOpen(null);
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
      setValue("name", data.name);
      setValue("code", data.code_location);
      setValue("description", data.description);
    }
  }, [data, setValue]);

  const onSubmit: SubmitHandler<FormValues> = () => {
    handleSave();
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(null)}
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
          Modifier marque
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
              required: "Le nom de la marque est obligatoire",
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
              required: "Le code de la marque est obligatoire",
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
              required: "La description de la catégorie est obligatoire",
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


export default UpdateReyonModal;
