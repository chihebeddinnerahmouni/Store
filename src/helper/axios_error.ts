import { enqueueSnackbar } from "notistack";

export const handleAxiosError = (error: any) => {
  console.log(error);
  if (error.message === "Network Error") {
    enqueueSnackbar("Probléme de connexion", { variant: "error" });
  } else {
    if (isObject(error.response?.data.erreurs)) {
      Object.keys(error.response.data.erreurs).map((key) => {
        console.log(error.response.data.erreurs[key]);
        error.response.data.erreurs[key].map((err: any) => {
          enqueueSnackbar(err, { variant: "error"  });
        });
      });
    } else {
      enqueueSnackbar(error.response?.data.erreur || "something went wrong", {
        variant: "error",
      });
    }
  }
};

const isObject = (value: any): boolean => {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
};
