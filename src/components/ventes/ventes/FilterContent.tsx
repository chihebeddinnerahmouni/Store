import { Box } from "@mui/material";
import { BsArrowRepeat } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import FullShiningButton from "../../ui/buttons/FullShiningButton";
import Magasin from "./filter content/Magasin";
import StartDate from "./filter content/StartDate";
import UserInvNumber from "./filter content/UserInvNumber";
import Client from "./filter content/Client";
import axios from "axios";
import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import IMagasin from "../../../types/magasin";
import IClient from "../../../types/client";
import { useNavigate, useLocation } from "react-router-dom";


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
        queryFn: () => fetchHelper("api/clients"),
      },
    ],
  });
  const magasins: { entrepots: IMagasin[] } = (queries[0]?.data ?? {
    entrepots: [],
  }) as {
    entrepots: IMagasin[];
  };

  const clients: { clients: IClient[] } = (queries[1]?.data ?? {
    clients: [],
  }) as {
    clients: IClient[];
  };
  return {
    magasins: magasins.entrepots,
    clients: clients.clients,
  };
};

interface Props {
  close: () => void;
}

const FilterContent = ({close}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [clientId, setClientId] = useState(searchParams.get("client_id") ? parseInt(searchParams.get("client_id")!) : 0);
  const [userInvNumber, setUserInvNumber] = useState(searchParams.get("user_invoice_number") || "");
  const [magasinId, setMagasinId] = useState(searchParams.get("entrepot_id") ? parseInt(searchParams.get("entrepot_id")!) : 0);
  const [date, setDate] = useState(searchParams.get("date") || "");

  const { magasins, clients } = fetchData();

  const search = () => {
    const searchParams = new URLSearchParams(location.search);
    if (date) searchParams.set("date", date);
    if (userInvNumber) searchParams.set("user_invoice_number", userInvNumber);
    if (clientId) searchParams.set("client_id", clientId.toString());
    if (magasinId) searchParams.set("entrepot_id", magasinId.toString());
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
        navigate("/ventes");
        close();
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
        <StartDate
          value={date}
          setValue={setDate}
        />
        <Client
          clientId={clientId}
          setClientId={setClientId}
          clientsArray={clients}
        />
        <Magasin
          magasinsArray={magasins}
          setMagasinId={setMagasinId}
          magasinId={magasinId}
        />
        <UserInvNumber
          value={userInvNumber}
          setValue={setUserInvNumber}
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
              loading={false}
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default FilterContent;
