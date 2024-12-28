import FullShiningButton from "../../../components/ui/buttons/FullShiningButton";
import { useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

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
    try {
      await Promise.all(
        chosenPermissions.map((permissionId) =>
          axios.post(
            `${url}/api/permissions/assign-all/${userId}`,
            { permission_id: permissionId },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
        )
      );
       enqueueSnackbar("Permissions attribuées avec succès", { variant: "success" });
    } catch (err: any) {
    //   console.log(err);
      if (err.message === "Network Error") {
        enqueueSnackbar("Erreur de connexion", { variant: "error" });
      } else {
        enqueueSnackbar(err.response?.data?.message || "An error occurred", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
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
