import auth_bg from "../../assets/images/auth-bg";
import logo from "../../assets/images/logo";
import InputPassword from "../../components/ui/inputs/InputPassword";
import InputEmail from "../../components/ui/inputs/InputEmail";
import FullShiningButton from "../../components/ui/buttons/FullShiningButton";
import axios from "axios";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { useNavigate } from "react-router-dom";
import InputText from "../../components/ui/inputs/InputText";
import { useMutation } from "@tanstack/react-query";
import { handleAxiosError } from "../../helper/axios_error";
import * as Yup from "yup";
import { useFormik } from "formik";



type FormValues = {
  email: string;
  password: string;
  name: string;
  surname: string;
  // phone: string;
  confirmPassword: string;
};

const url = import.meta.env.VITE_BASE_URL as string;
const sendData = async (values: FormValues) => {
  const response = await axios.post(`${url}/api/auth/register`, {
    name: values.name,
    surname: values.surname,
    email: values.email,
    password: values.password,
    password_confirmation: values.confirmPassword,
  });
  return response.data;
}


const Register = () => {


  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: sendData,
    onSuccess: (data: any) => {
      localStorage.setItem("token", data.token);
      enqueueSnackbar(data.message, { variant: "success" });
      navigate("/tableau-de-bord");
    },
    onError: handleAxiosError
  });


 const formik = useFormik<FormValues>({
   initialValues: {
     name: "",
     surname: "",
     // phone: "",
     email: "",
     password: "",
     confirmPassword: "",
   },
   validationSchema: Yup.object({
     name: Yup.string().required("Le nom est obligatoire"),
     surname: Yup.string().required("Le prénom est obligatoire"),
     email: Yup.string()
       .email("Email invalide")
       .required("L'email est obligatoire"),
     password: Yup.string().required("Le mot de passe est obligatoire"),
      confirmPassword: Yup.string()
        .required("Le mot de passe est obligatoire")
       .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
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
      <div className="w-full min-h-screen bg-black flex justify-center items-center pb-10">
        <div className="content w-[90%] max-w-[600px] flex flex-col items-center">
          <img src={auth_bg} className="bg-red-200" alt="symloop" />

          <div className="cardCss w-full flex flex-col items-center">
            <img src={logo} className="w-[90px] h-[90px]" alt="logo" />
            <p className="mt-4 font-bold text-xl">S'inscrire</p>
            <form
              className="mt-4 flex flex-col gap-4 w-full"
              onSubmit={formik.handleSubmit}
            >
              <div className="fields grid grid-cols-2 gap-5">
                {/* name */}
                <InputText
                  label="Nom"
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  value={formik.values.name}
                  setValue={(value: string) => {
                    formik.handleChange("name")(value);
                  }}
                />

                {/* surname */}
                <InputText
                  label="Prénom"
                  error={
                    formik.touched.surname && Boolean(formik.errors.surname)
                  }
                  helperText={formik.touched.surname && formik.errors.surname}
                  value={formik.values.surname}
                  setValue={(value: string) => {
                    formik.handleChange("surname")(value);
                  }}
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
                <InputEmail
                  label="L'addresse email"
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  value={formik.values.email}
                  setValue={(value: string) => {
                    formik.handleChange("email")(value);
                  }}
                />

                {/* password */}
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

                {/* confirm password */}
                <InputPassword
                  label="Confirmer le mot de passe"
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  value={formik.values.confirmPassword}
                  setValue={(value: string) => {
                    formik.handleChange("confirmPassword")(value);
                  }}
                />
              </div>
              <FullShiningButton
                text="S'inscrire"
                type="submit"
                loading={isPending}
              />
            </form>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default Register;
