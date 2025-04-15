import auth_bg from "../../assets/images/auth-bg";
import logo from "../../assets/images/logo";
import InputPassword from "../../components/ui/inputs/InputPassword";
import InputEmail from "../../components/ui/inputs/InputEmail";
import FullShiningButton from "../../components/ui/buttons/FullShiningButton";
import axios from "axios";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

const url = import.meta.env.VITE_BASE_URL as string;
const sendData = async (values: any) => {
  const response = await axios.post(`${url}/api/auth/login`, {
    email: values.email,
    password: values.password,
  });
  return response.data;
}

const Login = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: (data: any) => {
      localStorage.setItem("token", data.token);
      enqueueSnackbar(data.message, { variant: "success" });
      navigate("/tableau-de-bord");
    },
    onError:(err: any) => {
      if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
    }
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email invalide")
        .required("L'email est obligatoire"),
      password: Yup.string().required("Le mot de passe est obligatoire"),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

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
              onSubmit={formik.handleSubmit}
            >
              <InputEmail
                label="L'addresse email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                value={formik.values.email}
                setValue={(value: string) => {
                  formik.handleChange("email")(value);
                }}
              />

              <InputPassword
                label="Le mot de passe"
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                value={formik.values.password}
                setValue={(value: string) => {
                  formik.handleChange("password")(value);
                }}
              />

              <FullShiningButton
                text="Login"
                type="submit"
                loading={isPending}
              />
            </form>
            <p className="mt-4 space-x-1">
              <span>Pas de compte?</span>
              <Tooltip
                title="Veuillez contacter les créateurs pour plus d'informations."
                arrow
              >
                <span className="font-bold text-main">Créer un compte</span>
              </Tooltip>
            </p>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default Login;
