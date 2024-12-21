// import auth_bg from "../../assets/images/auth-bg"

// const Login = () => {
//   return (
//       <div className="w-full h-screen"
//           style={{
//               backgroundImage: `url(${auth_bg})`,
//               backgroundSize: "cover",
//                 backgroundPosition: "center",
//       }}>

//     </div>
//   )
// }

// export default Login

import auth_bg from "../../assets/images/auth-bg";
import logo from "../../assets/images/logo";
import { useForm, SubmitHandler } from "react-hook-form";
import InputPassword from "../../components/ui/inputs/InputPassword";
import { Controller } from "react-hook-form";
import { useState } from "react";
import InputEmail from "../../components/ui/inputs/InputEmail";
import FullShiningButton from "../../components/ui/buttons/FullShiningButton";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    
     const mainColor = "#006233";

  const send = () => {
       setLoading(true);
    setTimeout(() => {
       setLoading(false);
    }, 2000);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = send;

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage: `url(${auth_bg})`,
      }}
    >
      <div className="cardCss flex flex-col items-center w-[90%] max-w-[400px]">
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
      </div>
    </div>
  );
};

export default Login;
