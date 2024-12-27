import { Box } from "@mui/material";
import { BsArrowRepeat } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
// import Fourni from "./filter content/fourni";
import Magasin from "./filter content/Magasin";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import Fourni from "./filter content/Fourni";
import { IAchatProduit } from "../../../types/rapport/achat produit/achat_produit";



interface Props {
  setData: (value: any) => void;
  close: () => void;
  magasinsArray: any[];
  magasinName: string;
  setMagasinName: (value: string) => void;
  fournisseurArray: any[];
  setFournisseurName: (value: string) => void;
  fournisseurName: string;
  setStats: (value: any) => void;
}

const FilterContent = ({
    setData,
    close,
    magasinsArray,
  magasinName,
  setMagasinName,
  fournisseurArray,
  setFournisseurName,
  fournisseurName,
  setStats,
}: Props) => {

  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_BASE_URL;


  const search = () => {
    const check = magasinName === "" && fournisseurName === "";
    if (check) {
      enqueueSnackbar("Veuillez remplir au moins un champ", { variant: "error" });
      return;
    }
    setLoading(true);
    const params = createParams(fournisseurName, magasinName);
    axios
      .get(url + `/api/reports/products/achats/filter?${params.toString()}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data);
        setStats({ total_cost: res.data.total_cost, total_quantity: res.data.total_quantity });
        const newArray = createNewArrayAchats(res.data.achats);
        setData(newArray);
        close();
      })
      .catch((err) => {
        // console.log(err);
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
        }
      });
  }

  const buttons_array = [
    {
      icon: <CiFilter />,
      text: "Filter",
      color: "#3b82f6",
        onClick: search,
      // onClick: () => {},
    },
    {
      icon: <BsArrowRepeat />,
      text: "Réinitialiser",
      color: "#8b5cf6",
      onClick: () => {
        setMagasinName("");
        setFournisseurName("");
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
        <Magasin
          magasinName={magasinName}
          setMagasinName={setMagasinName}
          magasinsArray={magasinsArray}
        />

        <Fourni
          fournisseurName={fournisseurName}
          setFournisseurName={setFournisseurName}
          fournisseurArray={fournisseurArray}
        />

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


const createNewArrayAchats = (data: IAchatProduit[]) => {
  return data.map((item: IAchatProduit, index: number) => {
    return {
      ...item,
      id: index,
      "réference de l'utilisateur": item.user_invoice_number,
      référence: item.invoice_number,
      fournisseur: item.provider_name,
      magasin: item.entrepot_name,
      produit: item.product_name,
      quantité: item.quantity_bought,
      // total: item.total,
      // date: item.date,
    };
  });
};


const createParams = (fournisseurName: string, magasinName: string) => {
  const params = new URLSearchParams();
  if (fournisseurName) params.append("provider_name", fournisseurName);
  if (magasinName) params.append("entrepot_name", magasinName);
  return params;
}