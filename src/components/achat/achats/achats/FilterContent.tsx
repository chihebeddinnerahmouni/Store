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
      ...(date && { date: date }),
      ...(endDate && { end_date: endDate }),
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
        setData(res.data.achats);
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

// const paimentStatus_array = [
//   {
//     id: 1,
//     name: "Partiel",
//   },
//   {
//     id: 2,
//     name: "Payé",
//   },
//   {
//     id: 3,
//     name: "Non payé",
//   },
// ];

// const status_array = [
//   {
//     id: 1,
//     name: "En cours",
//   },
//   {
//     id: 2,
//     name: "paid",
//   },
//   {
//     id: 3,
//     name: "non paid",
//   },
// ];

// const magasins_array = [
//   {
//     id: 1,
//     name: "Magasin 1",
//   },
//   {
//     id: 2,
//     name: "Magasin 2",
//   },
//   {
//     id: 3,
//     name: "Magasin 3",
//   },
//   {
//     id: 4,
//     name: "Magasin 4",
//   }
// ]

// const fournisseures_array = [
//   {
//     id: 1,
//     name: "Fournisseur A",
//   },
//   {
//     id: 2,
//     name: "Fournisseur B",
//   },
//   {
//     id: 3,
//     name: "Fournisseur C",
//   },
//   {
//     id: 4,
//     name: "Fournisseur D",
//   },
//   {
//     id: 2,
//     name: "Fournisseur E",
//   },
//   {
//     id: 3,
//     name: "Fournisseur F",
//   },
//   {
//     id: 4,
//     name: "Fournisseur G",
//   },
// ];
