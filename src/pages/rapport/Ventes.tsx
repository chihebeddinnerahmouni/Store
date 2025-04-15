import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ButtonsCont from "../../containers/raports/vente/ButtonsCont";
import TableVente from "../../containers/raports/vente/TableVente";
import DatesCont from "../../containers/raports/DatesCont";
import PageTitle from "../../components/ui/PageTitle";
import Loading from "../../components/ui/Loading";
import { IVente } from "../../types/rapport/ventes/vente";
import { IVenteTable } from "../../types/rapport/ventes/vente";
import { PrivilegesContext } from "../../App";
import { useNavigate } from "react-router-dom";
import IMagasin from "../../types/magasin";
import IClient from "../../types/client";
import { handleAxiosError } from "../../helper/axios_error";

const Ventes = () => {
  const today = new Date();
  today.setMonth(today.getMonth() - 2);
  const formattedDate = today.toISOString().split("T")[0];

  const todatSratDate = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IVente[]>([]);
  const [startDate, setStartDate] = useState<string>(formattedDate);
  const [endDate, setEndDate] = useState<string>(todatSratDate);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinId, setMagasinId] = useState<number>(0);
  const [clientId, setClientId] = useState<number>(0);
  const [clientsArray, setClientsArray] = useState<any[]>([]);
  const [userInvNumber, setUserInvNumber] = useState<string>("");

  const url = import.meta.env.VITE_BASE_URL as string;
  const privileges = useContext(PrivilegesContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!privileges.Rapports["Rapport De Sortie"]) navigate("/tableau-de-bord");
    Promise.all([
      axios.get<{ ventes: any[] }>(
        `${url}/api/reports/ventes/report?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
      axios.get<{ entreports : IMagasin[]}>(`${url}/api/entreports`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      axios.get<{clients: IClient[]}>(`${url}/api/clients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ])
      .then((res: any) => { 
        const data = res[0].data;
        const magasinsResult = res[1].data;
        const clientsResult = res[2].data;
        const newArrayAchats = createNewArrayVentes(data.ventes);
        setData(newArrayAchats);
        setMagasinsArray(magasinsResult.entrepots);
        setClientsArray(clientsResult.clients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Erreur lors de la récupération des données", {
          variant: "error",
        });
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (startDate === formattedDate && endDate === todatSratDate) {
      return;
    }
    setLoading(true);
    axios
      .get(
        `${url}/api/reports/ventes/report?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response :any) => {
        const newArrayAchats = createNewArrayVentes(response.data.ventes);
        setData(newArrayAchats);
        setLoading(false);
      })
        .catch((err) => {
        handleAxiosError(err);
        setLoading(false);
      });
  }, [startDate, endDate]);

  if (loading) return <Loading />;

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport de sorties" />
      <div className="w-full">
        <ButtonsCont
          setData={setData}
          columns={columns}
          data={data}
          magasinsArray={magasinsArray}
          setMagasinId={setMagasinId}
          magasinId={magasinId}
          clientsArray={clientsArray}
          clientId={clientId}
          setClientId={setClientId}
          userInvNumber={userInvNumber}
          setUserInvNumber={setUserInvNumber}
        />
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



const columns: (keyof IVenteTable)[] = [
  "référence",
  "date",
  "réference de l'utilisateur",
  "client",
  "magasin",
  "total",
  "ajouter par",
];
const createNewArrayVentes = (data: IVente[]) => {
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

export default Ventes;
