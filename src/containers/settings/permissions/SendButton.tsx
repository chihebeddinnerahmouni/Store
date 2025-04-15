import FullShiningButton from "../../../components/ui/buttons/FullShiningButton";
import { useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { handleAxiosError } from "../../../helper/axios_error";

interface SendButtonProps {
    chosenPermissions: number[];
    userId: number;
}

const SendButton = ({ chosenPermissions, userId }: SendButtonProps) => {
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_BASE_URL as string;
  const mainColor = "#006233";
    const sendFunction = async () => {
        if (userId === 0) {
            enqueueSnackbar("Veuillez sélectionner un utilisateur", { variant: "error" });
            return;
        }
    setLoading(true);
        axios
          .post(
            url + `/api/permissions/users/${userId}/assign-permissions`,
            { permission_ids: chosenPermissions },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then(() => {
            enqueueSnackbar(
              "Permissions ont été mises à jour avec succès",
              {
                variant: "success",
              }
            );
             setLoading(false);
          })
          .catch((err) => {
            handleAxiosError(err);
             setLoading(false);
          })
  };



  return (
    <div className="mt-5 lg:mt-10">
      <FullShiningButton
        text="soumettre"
        color={mainColor}
        onClick={sendFunction}
        loading={loading}
      />
    </div>
  );
};

export default SendButton;
