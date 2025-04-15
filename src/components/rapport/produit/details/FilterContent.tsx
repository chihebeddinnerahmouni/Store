import { Box } from "@mui/material";
import { BsArrowRepeat } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import FullShiningButton from "../../../ui/buttons/FullShiningButton";
// import Fourni from "./filter content/fourni";
import Magasin from "./filter content/Magasin";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import Users from "./filter content/Users";
import Clients from "./filter content/Clients";
import UserInvNum from "./filter content/UserInvNum";
import { useParams } from "react-router-dom";
import { IProductDetails } from "../../../../types/rapport/produits/details/product";
import { handleAxiosError } from "../../../../helper/axios_error";



interface Props {
  setData: (value: any) => void;
  close: () => void;
  magasinsArray: any[];
  usersArray: any[];
  magasinName: string;
  setMagasinName: (value: string) => void;
  userName: string;
  setUserName: (value: string) => void;
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
  usersArray,
  magasinName,
  userName,
  setMagasinName,
  setUserName,
  clientsArray,
  setClientName,
  clientName,
  userInvNumber,  
  setUserInvNumber
}: Props) => {

  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_BASE_URL;
  const { produitId } = useParams();
  const id = produitId;
  const search = () => {

    const check = magasinName === "" && userName === "" && clientName === "" && userInvNumber === "";
    if (check) {
      enqueueSnackbar("Veuillez remplir au moins un champ", { variant: "error" });
      return;
    }
    setLoading(true);
    const params = createParams(clientName, magasinName, userName, userInvNumber);
    axios
      .post(
        url +
          `/api/reports/products/${id}/detailed-report/filter?${params.toString()}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res: any) => {
        const newArray = createNewArrayAchats(res.data.details);
        setData(newArray);
        close();
      })
      .catch((err) => {
        setLoading(false);
        handleAxiosError(err)
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
        setUserName("");
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


        <Users
          userName={userName}
          setUserName={setUserName}
          usersArray={usersArray}
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


const createNewArrayAchats = (data: IProductDetails[]) => {
  return data.map((item: IProductDetails, index: number) => {
    return {
      ...item,
      id: index,
      // date: item.date,
      référence: item.code_bar,
      "ajouter par": item.created_by_user,
      // produit: item.name,
      client: item.client_name,
      magasin: item.entrepot_name,
      "quantité vendu": item.quantity_sold,
      // total: item.total,
    };
  });
};


const createParams = (clientName: string, magasinName: string, userName: string, userInvNumber: string) => {
  const params = new URLSearchParams();
  if (clientName) params.append("client_name", clientName);
  if (magasinName) params.append("entrepot_name", magasinName);
  if (userName) params.append("created_by_user", userName);
  if (userInvNumber) params.append("user_invoice_number", userInvNumber);
  return params;
}