// import { enqueueSnackbar } from 'notistack';

// export const handleAxiosError = (error: any) => {
//   if (error.message === "Network Error") {
//     enqueueSnackbar("Probléme de connexion", { variant: "error" });
//   } else {
//     const responseMessage = error.response?.data.message || error.message;
//     enqueueSnackbar(responseMessage, { variant: "error" });
    
//   }
// };

import { enqueueSnackbar } from 'notistack';

export const handleAxiosError = (error: any) => {
   if (error.message === "Network Error") {
     enqueueSnackbar("Erreur de connexion", { variant: "error" });
   } else {
     Object.keys(error.response.data.erreurs).map((key) => {
       error.response.data.erreurs[key].map((err: any) => {
         enqueueSnackbar(err, { variant: "error" });
       });
     });
   }
};

