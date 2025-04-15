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
import Category from "./filter content/Category";
import axios from "axios";
import { useState } from "react";
import IMagasin from "../../../../types/magasin";
import { IProvider } from "../../../../types/provider";
import ICategory from "../../../../types/category";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueries }from "@tanstack/react-query";


const url = import.meta.env.VITE_BASE_URL;
const fetchHelper = async (endPointe: string) => {
  const response = await axios.get(`${url}/${endPointe}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const fetchData = () => {
  const queries = useQueries({
    queries: [
      {
        queryKey: ["authorised_magasins"],
        queryFn: () => fetchHelper("api/entreports/authorized/get"),
      },
      {
        queryKey: ["providers"],
        queryFn: () => fetchHelper("api/providers"),
      },
      {
        queryKey: ["categories"],
        queryFn: () => fetchHelper("api/categories"),
      },
    ],
  });
  const magasins: { entrepots: IMagasin[] } = (queries[0]?.data ?? {
    entrepots: [],
  }) as {
    entrepots: IMagasin[];
  };

  const providers: { providers: IProvider[] } = (queries[1]?.data ?? {
    providers: [],
  }) as {
    providers: IProvider[];
  };

  const categories: { categories: ICategory[] } = (queries[2]?.data ?? {
    categories: [],
  }) as {
    categories: ICategory[];
  };  
  return {
    magasins: magasins.entrepots,
    providers: providers.providers,
    categories: categories.categories,
  };
};

interface Props {
  close: () => void;
}

const FilterContent = ({ close }: Props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const [provider, setProvider] = useState<number>(searchParams.get("provider_id") ? parseInt(searchParams.get("provider_id")!) : 0);
  const [magasin, setMagasin] = useState<number>(searchParams.get("entrepot_id") ? parseInt(searchParams.get("entrepot_id")!) : 0);
  const [category, setCategory] = useState<number>(searchParams.get("category") ? parseInt(searchParams.get("category")!) : 0);
  const [date, setDate] = useState<string>(searchParams.get("date_start") || "");
  const [endDate, setEndDate] = useState<string>(searchParams.get("date_end") || "");
  const [reference, setReference] = useState<string>(searchParams.get("invoice_number") || "");
  const [userInvNumber, setUserInvNumber] = useState<string>(searchParams.get("user_invoice_number") || "");
  const { magasins, providers, categories } = fetchData();
  
  const search = () => {
    const searchParams = new URLSearchParams(location.search);
    if (date) searchParams.set("date_start", date);
    if (endDate) searchParams.set("date_end", endDate);
    if (reference) searchParams.set("invoice_number", reference);
    if (userInvNumber) searchParams.set("user_invoice_number", userInvNumber);
    if (category) searchParams.set("category", category.toString());
    if (provider) searchParams.set("provider_id", provider.toString());
    if (magasin) searchParams.set("entrepot_id", magasin.toString());
    navigate({ search: searchParams.toString() });
    close();
  };

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
        close();
        navigate("/achats");
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
        <Category options={categories} setValue={setCategory} value={category} />
        <Fourni options={providers} setValue={setProvider} value={provider} />
        <Magasin options={magasins} setValue={setMagasin} value={magasin} />
        <StartDate value={date} setValue={setDate} />
        <EndDate value={endDate} setValue={setEndDate} />
        <InvNumber value={reference} setValue={setReference} />
        <UserInvNumber value={userInvNumber} setValue={setUserInvNumber} />

        <div className="buttons flex gap-2 mt-5">
          {buttons_array.map((button, index) => (
            <FullShiningButton
              key={index}
              text={button.text}
              icon={button.icon}
              color={button.color}
              onClick={button.onClick}
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default FilterContent;
