import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ButtonsCont from "../../containers/raports/best clients/ButtonsCont";
import TableVente from "../../containers/raports/best clients/TableVente";
import DatesCont from "../../containers/raports/DatesCont";
import PageTitle from "../../components/ui/PageTitle";
import Loading from "../../components/ui/Loading";
import { IBestClient } from "../../types/rapport/best clients/best_client";
import { IBestClientTable } from "../../types/rapport/best clients/best_client";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";

const BestClients = () => {
  const today = new Date();
  today.setMonth(today.getMonth() - 2);
  const formattedDate = today.toISOString().split("T")[0];

  const todatSratDate = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IBestClient[]>([]);
  const [startDate, setStartDate] = useState<string>(formattedDate);
  const [endDate, setEndDate] = useState<string>(todatSratDate);

  const url = import.meta.env.VITE_BASE_URL as string;
  const privileges = useContext(PrivilegesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Rapports["Meilleurs Clients"]) navigate("/tableau-de-bord");
    setLoading(true);
    axios
      .get(
        `${url}/api/reports/clients/best?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response: any) => {
        const newArrayAchats = createNewArrayAchats(response.data.best_clients);
        setData(newArrayAchats);
        setLoading(false);
      })
      .catch(() => {
        enqueueSnackbar("Erreur lors de la récupération des données", {
          variant: "error",
        });
        setLoading(false);
      });
  }, [startDate, endDate]);

  if (loading) return <Loading />;

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Produits les plus vendus" />
      <div className="w-full">
        <ButtonsCont columns={columns} data={data} />
        <DatesCont
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <TableVente columns={columns} rows={data} />
      </div>
    </div>
  );
};

const columns: (keyof IBestClientTable)[] = [
    "client",
    "téléphone",
    "total ventes",
    "montant total",
];

const createNewArrayAchats = (data: IBestClient[]) => {
  return data.map((item: IBestClient) => {
    return {
      ...item,
        id: item.client_id,
        client: item.client_name,
        téléphone: item.client_phone,
        "total ventes": item.total_ventes,
        "montant total": item.total_sales_cost,
    };
  });
};


export default BestClients;
