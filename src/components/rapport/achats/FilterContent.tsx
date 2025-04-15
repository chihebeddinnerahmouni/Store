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
import UserInvNum from "./filter content/UserInvNum";
import { IAchatReport } from "../../../types/rapport/achats/achat";
import { handleAxiosError } from "../../../helper/axios_error";



interface Props {
  setData: (value: any) => void;
  close: () => void;
  magasinsArray: any[];
  magasinName: string;
  setMagasinName: (value: string) => void;
  fournisseurArray: any[];
  setFournisseurName: (value: string) => void;
  fournisseurName: string;
  userInvNumber: string;
  setUserInvNumber: (value: string) => void;
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
  userInvNumber,
  setUserInvNumber,
}: Props) => {

  const [loading, setLoading] = useState(false);
  const url = import.meta.env.VITE_BASE_URL;


  const search = () => {
    const check = magasinName === "" && fournisseurName === "" && userInvNumber === "";
    if (check) {
      enqueueSnackbar("Veuillez remplir au moins un champ", { variant: "error" });
      return;
    }
    setLoading(true);
    const params = createParams(fournisseurName, magasinName, userInvNumber);
    axios
      .get(url + `/api/reports/achats/filter?${params.toString()}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res: any) => {
        // console.log(res.data);
        const newArray = createNewArrayAchats(res.data.achats);
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
        setMagasinName("");
        setFournisseurName("");
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

        <Fourni
          fournisseurName={fournisseurName}
          setFournisseurName={setFournisseurName}
          fournisseurArray={fournisseurArray}
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


const createNewArrayAchats = (data: []) => {
  return data.map((item: IAchatReport, index: number) => {
    return {
      ...item,
      id: index,
      // date: item.date,
      "réference de l'utilisateur": item.user_invoice_number,
      référence: item.invoice_number,
      fournisseur: item.provider_name,
      magasin: item.entrepot_name,
      // total: item.total,
    };
  });
};


const createParams = (fournisseurName: string, magasinName: string, userInvNumber: string) => {
  const params = new URLSearchParams();
  if (fournisseurName) params.append("provider_name", fournisseurName);
  if (magasinName) params.append("entrepot_name", magasinName);
  if (userInvNumber) params.append("user_invoice_number", userInvNumber);
  return params;
}