import { Box } from "@mui/material";
import { BsArrowRepeat } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import Magasin from "./filter content/Magasin";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import Clients from "./filter content/Clients";
import { IVente } from "../../../types/rapport/ventes/vente";
import { handleAxiosError } from "../../../helper/axios_error";

interface Props {
  setData: (value: any) => void;
  close: () => void;
  magasinsArray: any[];
  magasinName: number;
  setMagasinName: (value: number) => void;
  clientsArray: any[];
  setClientName: (value: number) => void;
  clientName: number;
}

const FilterContent = ({
  setData,
  close,
  magasinsArray,
  magasinName,
  setMagasinName,
  clientsArray,
  setClientName,
  clientName,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_BASE_URL;

  const search = () => {
    const check = !magasinName && !clientName;
    if (check) {
      enqueueSnackbar("Veuillez remplir au moins un champ", {
        variant: "error",
      });
      return;
    }
    setLoading(true);
    const params = createParams(clientName.toString(), magasinName.toString());
    axios
      .get(url + `/api/reports/products/ventes/filter?${params.toString()}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res: any) => {
        // console.log(res.data);
        const newArray = createNewArrayAchats(res.data.ventes);
        setData(newArray);
        close();
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        handleAxiosError(err);
      });
  };

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
        setMagasinName(0);
        setClientName(0);
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

        <Clients
          clientName={clientName}
          setClientName={setClientName}
          clientsArray={clientsArray}
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

const createNewArrayAchats = (data: IVente[]) => {
  return data.map((item: IVente, index: number) => {
    return {
      ...item,
      id: index,
      // date: item.date,
      référence: item.invoice_number,
      "réference de l'utilisateur": item.user_invoice_number,
      client: item.client_name,
      magasin: item.entrepot_name,
      // total: item.total,
      "ajouter par": item.created_by_user,
    };
  });
};

const createParams = (clientName: string, magasinName: string) => {
  const params = new URLSearchParams();
  if (clientName) params.append("client_name", clientName);
  if (magasinName) params.append("entrepot_name", magasinName);
  return params;
};
