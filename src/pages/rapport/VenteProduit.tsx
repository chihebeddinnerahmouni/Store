import { useState, useEffect } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import ButtonsCont from "../../containers/raports/vente produit/ButtonsCont";
import TableVente from "../../containers/raports/vente produit/TableVente";
import DatesCont from "../../containers/raports/DatesCont";
import PageTitle from "../../components/ui/PageTitle";
import Loading from "../../components/ui/Loading";
import { IProductVente } from "../../types/rapport/vente produit/vente_produit";
import { IProductVenteTable } from "../../types/rapport/vente produit/vente_produit";
import StatsCont from "../../containers/raports/vente produit/StatsCont";

const VenteProduit = () => {
  const today = new Date();
  today.setMonth(today.getMonth() - 2);
  const formattedDate = today.toISOString().split("T")[0];

  const todatSratDate = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IProductVente[]>([]);
  const [startDate, setStartDate] = useState<string>(formattedDate);
  const [endDate, setEndDate] = useState<string>(todatSratDate);
  const [magasinsArray, setMagasinsArray] = useState<any[]>([]);
  const [magasinName, setMagasinName] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [clientsArray, setClientsArray] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({});

  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    Promise.all([
      axios.get(
        `${url}/api/reports/products/ventes?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
      axios.get(`${url}/api/entreports`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      axios.get(`${url}/api/clients`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ])
      .then(
        axios.spread((data, magasinsResult, clientsResult) => {
            // console.log(data.data);
          const newArrayAchats = createNewArrayAchats(data.data.ventes);
          setData(newArrayAchats);
          setStats(data.data.totals);
          setMagasinsArray(magasinsResult.data.entrepots);
          setClientsArray(clientsResult.data.clients);
          setLoading(false);
        })
      )
      .catch(() => {
        // console.log(err);
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
        `${url}/api/reports/products/ventes?start_date=${startDate}&end_date=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        const newArrayAchats = createNewArrayAchats(response.data.ventes);
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
      <PageTitle text="Rapport de sorties de produits" />
      <div className="w-full">
        <ButtonsCont
          setData={setData}
          columns={columns}
          data={data}
          magasinsArray={magasinsArray}
          setMagasinName={setMagasinName}
          magasinName={magasinName}
          clientsArray={clientsArray}
          clientName={clientName}
          setClientName={setClientName}
        />
        <StatsCont data={stats} />
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

const columns: (keyof IProductVenteTable)[] = [
    "référence",
    "produit",
    "code",
    "date",
    "réference de l'utilisateur",
    "client",
    "magasin",
    "quantité vendue",
    "total",
];
const createNewArrayAchats = (data: IProductVente[]) => {
    return data.map((item: IProductVente, index: number) => {
    return {
      ...item,
        id: index,
        produit: item.product_name,
        code: item.product_code,
        // date: item.date,
        référence: item.invoice_number,
        "réference de l'utilisateur": item.user_invoice_number,
        client: item.client_name,
        magasin: item.entrepot_name,
        "quantité vendue": item.quantity_sold,
        // total: item.total,
     
    };
  });
};


export default VenteProduit;
