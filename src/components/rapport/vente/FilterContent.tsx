import { Box } from "@mui/material";
import { BsArrowRepeat } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
// import Fourni from "./filter content/fourni";
import Magasin from "./filter content/Magasin";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import Clients from "./filter content/Clients";
import UserInvNum from "./filter content/UserInvNum";
import { IVente } from "../../../types/rapport/ventes/vente";
import { handleAxiosError } from "../../../helper/axios_error";



interface Props {
  setData: (value: any) => void;
  close: () => void;
  magasinsArray: any[];
  clientsArray: any[];
  magasinId: number;
  setMagasinId: (value: number) => void;
  setClientId: (value: number) => void;
  clientId: number;
  userInvNumber: string;
  setUserInvNumber: (value: string) => void;
}

const FilterContent = ({
    setData,
    close,
    magasinsArray,
  magasinId,
  setMagasinId,
  clientsArray,
  setClientId,
  clientId,
  userInvNumber,  
  setUserInvNumber
}: Props) => {

  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_BASE_URL;


  const search = () => {
    const check = !magasinId && !clientId && !userInvNumber;
    if (check) {
      enqueueSnackbar("Veuillez remplir au moins un champ", { variant: "error" });
      return;
    }
    setLoading(true);
    const params = createParams(clientId.toString(), magasinId.toString(), userInvNumber);
    axios
      .get( url + `/api/reports/ventes/filter?${params.toString()}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res: any) => {
        // console.log(res.data);
        const newArray = createNewArrayAchats(res.data.ventes);
        setData(newArray);
        close();
      })
      .catch((err) => {
        setLoading(false);
        handleAxiosError(err);
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
        setMagasinId(0);
        setClientId(0);
        setUserInvNumber("");
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
          magasinId={magasinId}
          setMagasinId={setMagasinId}
          magasinsArray={magasinsArray}
        />

        <Clients
          clientId={clientId}
          setClientId={setClientId}
          clientsArray={clientsArray}
        />

        <UserInvNum
          userInvNumber={userInvNumber}
          setUserInvNumber={setUserInvNumber}
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


const createParams = (clientName: string, magasinName: string, userInvNumber: string) => {
  const params = new URLSearchParams();
  if (clientName) params.append("client_name", clientName);
  if (magasinName) params.append("entrepot_name", magasinName);
  if (userInvNumber) params.append("user_invoice_number", userInvNumber);
  return params;
}