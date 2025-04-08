import { enqueueSnackbar } from 'notistack';

export const handleAxiosError = (error: any) => {
  if (error.message === "Network Error") {
    enqueueSnackbar("Probléme de connexion", { variant: "error" });
  } else {
    const responseMessage = error.response?.data.message || error.message;
    enqueueSnackbar(responseMessage, { variant: "error" });
    
  }
};

