import { useEffect, useContext } from "react";
import axios from "axios";
import PageTitle from "../../../../components/ui/PageTitle";
import ButtonsCont from "../../../../containers/raports/clients/ButtonsCont";
import TableClients from "../../../../containers/raports/clients/TableClients";
import { IClient } from "../../../../types/rapport/clients/client";
import { IClientTable } from "../../../../types/rapport/clients/client";
import { PrivilegesContext } from "../../../../App";
import { useNavigate } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";

const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async () => {
  const { data } = await axios.get<{clients: IClient[]}>(url + "/api/reports/clients/achat-report", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const newData = createNewArray(data.clients);
  return newData;
}


const ClientsReport = () => {
  const privileges = useContext(PrivilegesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Rapports["Rapport Client"]) navigate("/tableau-de-bord");
  }, []);

  const { data } = useSuspenseQuery({
    queryKey: ["clients-report"],
    queryFn: fetchData,
  });


  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport de clients" />
      <ButtonsCont columns={columns} data={data} />
      <TableClients columns={columns} rows={data} />
    </div>
  );
};

export default ClientsReport;

const columns: (keyof IClientTable)[] = [
  "client",
  "téléphone",
  "nombre_total",
  "argent_total",
];

const createNewArray = (data: IClient[]) => {
  return data.map((item: IClient) => {
    return {
      ...item,
      client: item.name,
      téléphone: item.phone,
      nombre_total: item.total_number,
      argent_total: item.total_money,
    };
  });
};
