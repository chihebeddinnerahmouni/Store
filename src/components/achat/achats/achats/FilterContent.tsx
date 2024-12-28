import { Box } from "@mui/material";
import { BsArrowRepeat } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import FullShiningButton from "../../../ui/buttons/FullShiningButton";
import Fourni from "./filter content/fourni";
import Magasin from "./filter content/Magasin";
import StartDate from "./filter content/StartDate";
import EndDate from "./filter content/EndDate";
import InvNumber from "./filter content/InvNumber";
import UserInvNumber from "./filter content/UserInvNumber";
import Remark from "./filter content/Remark";
import Category from "./filter content/Category";
import MinLaivraison from "./filter content/MinLaivraison";
import { useContext } from "react";
import { AchatsContext } from "../../../../pages/achat/Achats";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import IAchat from "../../../../types/achat";


interface Props {
  close: () => void;
}

const FilterContent = ({
  close,
}: Props) => {

  const {
    setData,
    date,
    endDate,
    reference,
    userInvNumber,
    remark,
    // category,
    minLaivraison,
    maxLaivraison,
    fournisseur,
    magasin,
  } = useContext(AchatsContext);
  const url = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  
  const search = () => {
    setLoading(true);
    const body = {
      ...(date && { date_start: date }),
      ...(endDate && { date_end: endDate }),
      ...(reference && { reference: reference }),
      ...(userInvNumber && { user_invoice_number: userInvNumber }),
      ...(remark && { remark: remark }),
      // ...(category && { category: category }),
      ...(minLaivraison && { min_laivraison: minLaivraison }),
      ...(maxLaivraison && { max_laivraison: maxLaivraison }),
      ...(fournisseur && { fournisseur_id: fournisseur }),
      ...(magasin && { entrepot_id: magasin }),
    };

    axios
      .post(
        url + "/api/achats/filter/get",
        body,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        const modifiedAchatsArray = modifiedAchats(res.data.achats);
        setData(modifiedAchatsArray);
        close();
      })
      .catch((err) => {
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          const check = typeof err.response.data.message === "string";
          if (check) {
            enqueueSnackbar(err.response.data.message, { variant: "error" });
          } else {
            Object.keys(err.response.data.message).map((key) => {
              err.response.data.message[key].map((err: any) => {
                enqueueSnackbar(err, { variant: "error" });
              });
            });
          } 
        };
      });
  }

  const buttons_array = [
    {
      icon: <CiFilter />,
      text: "Filter",
      color: "#3b82f6",
      onClick: search,
    },
    {
      icon: <BsArrowRepeat />,
      text: "Réinitialiser",
      color: "#8b5cf6",
      onClick: () => {
        // setCode("");
        // setCategorie("");
        // setMarque("");
      },
    },
  ];

  return (
    <Box
    sx={{
        padding: 2,
      }}
      role="presentation"
      >
      <p className="font-bold text-[25px]">Filtre</p>
      <div className="content flex flex-col gap-6 mt-5">
        <Fourni />
        <Magasin />
        <StartDate />
        <EndDate />
        <InvNumber />
        <UserInvNumber />
        <Remark />
        <Category />
        <MinLaivraison />
      
        {/* buttons */}
        <div className="buttons flex gap-2 mt-5">
          {buttons_array.map((button, index) => (
            <FullShiningButton
              key={index}
              text={button.text}
              icon={button.icon}
              color={button.color}
              onClick={button.onClick}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default FilterContent;



const modifiedAchats = (achats: IAchat[]) => {
  return achats.map((achat: IAchat) => {
    return {
      ...achat,
      date: new Date(achat.created_at).toLocaleDateString(),
      reference: achat.invoice_number,
      fournisseur: achat.provider.name,
      magasin: achat.entrepot.name,
      // status: achat.status,
      total: achat.total_cost,
    };
  });
};