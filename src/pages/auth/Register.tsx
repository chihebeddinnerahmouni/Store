import auth_bg from "../../assets/images/auth-bg";
import logo from "../../assets/images/logo";
import { useForm, SubmitHandler } from "react-hook-form";
import InputPassword from "../../components/ui/inputs/InputPassword";
import { Controller } from "react-hook-form";
import { useState } from "react";
import InputEmail from "../../components/ui/inputs/InputEmail";
import FullShiningButton from "../../components/ui/buttons/FullShiningButton";
import axios from "axios";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useNavigate } from "react-router-dom";
import InputText from "../../components/ui/inputs/InputText";
// import InputNumber from "../../components/ui/inputs/InputNumber";

type FormValues = {
  email: string;
    password: string;
    name: string;
    surname: string;
    // phone: string;
    confirmPassword: string;
};

const Register = () => {
  const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    // const [phone, setPhone] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_BASE_URL as string;
  const navigate = useNavigate();

  // console.log(url);

  const mainColor = "#006233";

  const send = () => {
    setLoading(true);
    axios
      .post(
        `${url}/api/auth/register`,
        {
          name: name,
          surname: surname,
          email: email,
          password: password,
          password_confirmation: confirmPassword,
        },
        {}
      )
      .then((res) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          //   enqueueSnackbar(err.response.data.message, { variant: "error" });
          Object.keys(err.response.data.details).forEach((key) => {
            err.response.data.details[key].forEach((e: string) => {
              enqueueSnackbar(e, { variant: "error" });
            });
          });
        }
      });
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
      clearErrors,
        watch
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = send;

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={3000}
    >
      <div className="w-full min-h-screen bg-black flex justify-center items-center pb-10">
        <div className="content w-[90%] max-w-[600px] flex flex-col items-center">
          <img src={auth_bg} className="bg-red-200" alt="symloop" />

          <div className="cardCss w-full flex flex-col items-center">
            <img src={logo} className="w-[90px] h-[90px]" alt="logo" />
            <p className="mt-4 font-bold text-xl">S'inscrire</p>
            <form
              className="mt-4 flex flex-col gap-4 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="fields grid grid-cols-2 gap-5">
                {/* name */}
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Le nom est obligatoire" }}
                  render={({ field }) => (
                    <InputText
                      label="Nom"
                      {...field}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      value={name}
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

                {/* surname */}
                <Controller
                  name="surname"
                  control={control}
                  rules={{ required: "Le prénom est obligatoire" }}
                  render={({ field }) => (
                    <InputText
                      label="Prénom"
                      {...field}
                      error={!!errors.surname}
                      helperText={errors.surname?.message}
                      value={surname}
                      setValue={(value: string) => {
                        setSurname(value);
                        field.onChange(value);
                        if (errors.surname) {
                          clearErrors("surname");
                        }
                      }}
                    />
                  )}
                />

                {/* phone */}
                {/* <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Le numéro de téléphone est obligatoire" }}
                  render={({ field }) => (
                    <InputNumber
                      label="Numéro de téléphone"
                      {...field}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      value={phone}
                      setValue={(value: string) => {
                        setPhone(value);
                        field.onChange(value);
                        if (errors.phone) {
                          clearErrors("phone");
                        }
                      }}
                    />
                  )}
                /> */}

                {/* email */}
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "L'email est obligatoire",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Veuillez entrer un email valide",
                    },
                  }}
                  render={({ field }) => (
                    <InputEmail
                      label="L'addresse email"
                      {...field}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      value={email}
                      setValue={(value: string) => {
                        setEmail(value);
                        field.onChange(value);
                        if (errors.email) {
                          clearErrors("email");
                        }
                      }}
                    />
                  )}
                />

                {/* password */}
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: "Le mot de pass est obligatoire" }}
                  render={({ field }) => (
                    <InputPassword
                      label="Le mot de passe"
                      {...field}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      value={password}
                      setValue={(value: string) => {
                        setPassword(value);
                        field.onChange(value);
                        if (errors.password) {
                          clearErrors("password");
                        }
                      }}
                    />
                  )}
                />

                {/* confirm password */}
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Le mot de passe est obligatoire",
                    validate: (value) =>
                      value === watch("password") ||
                      "Les mots de passe ne correspondent pas",
                  }}
                  render={({ field }) => (
                    <InputPassword
                      label="Confirmer le mot de passe"
                      {...field}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      value={confirmPassword}
                      setValue={(value: string) => {
                        setConfirmPassword(value);
                        field.onChange(value);
                        if (errors.confirmPassword) {
                          clearErrors("confirmPassword");
                        }
                      }}
                    />
                  )}
                />
              </div>
              <FullShiningButton
                text="S'inscrire"
                color={mainColor}
                onClick={handleSubmit(onSubmit)}
                type="submit"
                loading={loading}
              />
            </form>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};


export default Register;
