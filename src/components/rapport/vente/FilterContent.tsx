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



interface Props {
  setData: (value: any) => void;
  close: () => void;
  magasinsArray: any[];
  magasinName: string;
  setMagasinName: (value: string) => void;
  clientsArray: any[];
  setClientName: (value: string) => void;
  clientName: string;
  userInvNumber: string;
  setUserInvNumber: (value: string) => void;
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
  userInvNumber,  
  setUserInvNumber
}: Props) => {

  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_BASE_URL;


  const search = () => {
    const check = magasinName === "" && clientName === "" && userInvNumber === "";
    if (check) {
      enqueueSnackbar("Veuillez remplir au moins un champ", { variant: "error" });
      return;
    }
    setLoading(true);
    const params = createParams(clientName, magasinName, userInvNumber);
    axios
      .get( url + `/api/reports/ventes/filter?${params.toString()}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        // console.log(res.data);
        const newArray = createNewArrayAchats(res.data.ventes);
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
        setClientName("");
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
          magasinName={magasinName}
          setMagasinName={setMagasinName}
          magasinsArray={magasinsArray}
        />

        <Clients
          clientName={clientName}
          setClientName={setClientName}
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