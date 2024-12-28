import ShiningButton from "../../../components/ui/buttons/ShiningButton";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";
import { enqueueSnackbar } from "notistack";
import axios from "axios";
// import { useState } from "react";




interface AllButtonsContProps {
    userId: number;
  setChosenPermissions: React.Dispatch<React.SetStateAction<number[]>>;
  permissionsArray: { id: number; name: string }[];
}

const AllButtonsCont = ({ userId, setChosenPermissions, permissionsArray }: AllButtonsContProps) => {
    
    const url = import.meta.env.VITE_BASE_URL as string;
    const mainColor = "#006233";
    // const [assignLoading, setAssignLoading] = useState(false);
    // const [unassignLoading, setUnassignLoading] = useState(false);
    
    const assignAll = () => {
        axios
          .post(
            url + `/api/permissions/assign-all/${userId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
            .then(() => {
                //   console.log(res.data);
                // window.location.reload();
            enqueueSnackbar("Permissions attribuées avec succès", {
              variant: "success",
            });
           const ids = permissionsArray.map((permission) => permission.id);
           setChosenPermissions(ids);
          })
          .catch((err) => {
            if (err.message === "Network Error") {
              enqueueSnackbar("Erreur de connexion", { variant: "error" });
            } else {
              enqueueSnackbar(err.response.data.message, {
                variant: "error",
              });
            }
          });
     }


    const unassignAll = () => { 
        axios
          .post( url + `/api/permissions/remove-all/${userId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
            .then(() => {
                // console.log(res.data);
                // window.location.reload();
            enqueueSnackbar("Permissions désattribuées avec succès", {
              variant: "success",
            });
              setChosenPermissions([]);
          })
          .catch((err) => {
            if (err.message === "Network Error") {
              enqueueSnackbar("Erreur de connexion", { variant: "error" });
            } else {
              enqueueSnackbar(err.response.data.message, {
                variant: "error",
              });
            }
          });
    }

  return (
    <section className="flex justify-start mt-5 gap-5 whitespace-nowrap">
      <ShiningButton
        text="Attribuer tous"
        icon={<FaCheck/>}
        color={mainColor}
        onClick={assignAll}
      />
      <ShiningButton
        text="désattribuer tous"
        icon={<MdOutlineCancel/>}
        color="#FF0000"
        onClick={unassignAll}
      />
    </section>
  );
}

export default AllButtonsCont
