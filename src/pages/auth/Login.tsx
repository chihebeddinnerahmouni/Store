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
import { Tooltip } from "@mui/material";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const url = import.meta.env.VITE_BASE_URL as string;
  const navigate = useNavigate();

  // console.log(url);

  const mainColor = "#006233";

  const send = () => {
    setLoading(true);

    axios
      .post(
        `${url}/api/auth/login`,
        {
          email,
          password,
        },
        {}
      )
      .then((res) => {
        //   console.log(res.data);
        localStorage.setItem("token", res.data.token);
        enqueueSnackbar(res.data.message, { variant: "success" });
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
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
      <div className="w-full h-screen bg-black flex justify-center items-center">
        <div className="content w-[90%] max-w-[400px] flex flex-col items-center">
          <img src={auth_bg} className="bg-red-200" alt="symloop" />

          <div className="cardCss w-full flex flex-col items-center">
            <img src={logo} className="w-[90px] h-[90px]" alt="logo" />
            <p className="mt-4 font-bold text-xl">S'identifier</p>
            <form
              className="mt-4 flex flex-col gap-4 w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
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
              <FullShiningButton
                text="Login"
                color={mainColor}
                onClick={handleSubmit(onSubmit)}
                type="submit"
                loading={loading}
              />
            </form>
            <p className="mt-4 space-x-1">
              <span>Pas de compte?</span>
              <Tooltip title="Veiller contacter un test message " arrow>
              <span className="font-bold text-main">
                Créer un compte
                </span>
              </Tooltip>
            </p>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default Login;
