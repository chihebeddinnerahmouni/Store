import PageTitle from "../../components/ui/PageTitle";
import IClient from "../../types/client";
import { useEffect, useContext } from "react";
import ButtonsCont from "../../containers/gens/clients/ButtonCont";
import TableClients from "../../containers/gens/clients/TableClients";
import axios from "axios";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async () => {
  const { data } = await axios.get<{clients: any}>(`${url}/api/clients`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const newData = modifiedData(data.clients);
  return newData;
}


const Clients = () => {
    const privileges = useContext(PrivilegesContext);
    const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Gens.Clients) navigate("/tableau-de-bord");
  }, []);

  const { data: clients, refetch } = useSuspenseQuery({
    queryKey: ["clients"],
    queryFn: fetchData,
  })

 
  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Gestion Du Clients" />
      <ButtonsCont data={clients} columns={columns_test} refetch={refetch} />
      <TableClients rows={clients} columns={columns_test} refetch={refetch} />
    </div>
  );
};

export default Clients;

const columns_test: (keyof IClient)[] = [
  "id",
  "nom"
];

const modifiedData = (clients: IClient[]) => {
  return clients.map((client) => {
    return {
      ...client,
      nom: client.name,
      téléphone: client.phone,
    };
  });
}