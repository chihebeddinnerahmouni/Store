import { Modal, Box, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../ui/inputs/InputText";
// import InputNumber from "../../ui/inputs/InputNumber";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
// import InputEmail from "../../ui/inputs/InputEmail";
import { useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
}

const AddClientModal = ({ open, onClose }: AddCategoryModalProps) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_BASE_URL as string;

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      // email,
      // phone,
      // address,
      code,
    },
  });

  const mainColor = "#006233";

  const onSubmit = () => {
    setLoading(true)
    axios
      .post(
        `${url}/api/clients`,
        {
          code_client: code,
          name: name,
          email: "email@email.com",
          phone: "00100",
          address: "address",
          status: "active",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
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
          width: { xs: "90%", md: "40%", lg: 600 },
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
          Ajouter un client
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="fields grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
            {/* code */}
            <Controller
              name="code"
              control={control}
              rules={{ required: "Le code est obligatoire" }}
              render={({ field }) => (
                <InputText
                  label="Code du client*"
                  {...field}
                  error={!!errors.code}
                  helperText={errors.code?.message}
                  value={code}
                  //   setValue={setName}
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


            {/* Name */}
            <Controller
              name="name"
              control={control}
              rules={{ required: "Le nom est obligatoire" }}
              render={({ field }) => (
                <InputText
                  label="Nom du client*"
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  value={name}
                  //   setValue={setName}
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

            {/* Email */}
            {/* <Controller
              name="email"
              control={control}
              rules={{
                required: "L'email est obligatoire",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email invalide",
                },
              }}
              render={({ field }) => (
                <InputEmail
                  label="Email du client*"
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  value={email}
                  setValue={(value: string) => {
                    setEmail(value);
                    field.onChange(value);
                    if (errors.name) {
                      clearErrors("email");
                    }
                  }}
                />
              )}
            /> */}

            {/* Phone */}
            {/* <Controller
              name="phone"
              control={control}
              rules={{
                required: "Le téléphone est obligatoire",
                pattern: {
                  value: /^[0-9]{9,10}$/,
                  message: "Téléphone invalide",
                },
              }}
              render={({ field }) => (
                <InputNumber
                  label="Téléphone du client*"
                  {...field}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  value={phone}
                  setValue={(value: string) => {
                    setPhone(value);
                    field.onChange(value);
                    if (errors.name) {
                      clearErrors("phone");
                    }
                  }}
                />
              )}
            /> */}

            {/* Address */}
            {/* <Controller
              name="address"
              rules={{ required: "Adresse du client est obligatoire" }}
              control={control}
              render={({ field }) => (
                <InputText
                  label="Adresse du client"
                  {...field}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  value={address}
                  setValue={(value: string) => {
                    setAddress(value);
                    field.onChange(value);
                    if (errors.name) {
                      clearErrors("address");
                    }
                  }}
                />
              )}
            /> */}
          </div>

          <Box mt={2} display="flex" justifyContent="flex-end">
            <FullShiningButton
              text="Soumettre"
              color={mainColor}
              type="submit"
              onClick={handleSubmit(onSubmit)}
              loading={loading}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddClientModal;
