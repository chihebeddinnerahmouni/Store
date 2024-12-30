import ButtonsCont from "../containers/dashbored/ButtonsCont"
import StatsCont from "../containers/dashbored/StatsCont";
import {
  useState,
  useEffect
} from "react";
import axios from "axios";
import Loading from "../components/ui/Loading";
import { enqueueSnackbar } from "notistack";


const Dashbored = () => {

  const [loading, setLoading] = useState<boolean>(true);
  const [statsData, setStatsData] = useState<any>([]);
  const [venteAchatsemaine, setVenteAchatsemaine] = useState<IVenteAchatsemaine>({ achat: [], vente: [] });
  const [pieChartData, setPieChartData] = useState<IPieChartData[]>([ { global_cost: "", name: "", quantity_sold: "" }]);
  const [alerteData, setAlerteData] = useState<IAlerteData[]>([
    {
      "Nom de Produit": "",
      "Nom d'entrepot": "",
      quanitité: 0,
      "alerte de stock": 0,
    },
  ]);
  const [recentVente, setRecentVente] = useState<IRecentVente[]>([{id: 0, "Nom de Produit": "", "Quantité Vendue": 0, "Coût Total": "" }]);
  const url = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios
      .get(`${url}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data.totals);
        setStatsData(res.data.data.totals);
        setVenteAchatsemaine(res.data.data.vente_achat_chart);
        setPieChartData(res.data.data.pie_chart);
        setAlerteData(res.data.data.alert_products_list);
        setRecentVente(res.data.data.last_sold_products);
        setLoading(false);
      })
      .catch((err) => {
        //  setLoading(false);
         if (err.message === "Network Error") {
           enqueueSnackbar("Erreur de connexion", { variant: "error" });
         } else {
           enqueueSnackbar(err.response.data.message, { variant: "error" });
         }
      });
  }, []);
  

  if (loading) {
    return <Loading />; 
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <ButtonsCont
        data={statsData}
        />
      <StatsCont
        venteAchatsemaine={venteAchatsemaine}
        pieChartData={pieChartData}
        alerteData={alerteData}
        recentVente={recentVente}
      />
    </div>
  );
}

export default Dashbored



interface IVenteAchatsemaine {
  achat: string[];
  vente: string[];
}

interface IPieChartData {
  global_cost: string;
  name: string;
  quantity_sold: string;
}

interface IAlerteData {
  "Nom de Produit": string;
  "Nom d'entrepot": string;
  quanitité: number;
  "alerte de stock": number;
}

interface IRecentVente {
  id: number;
  "Nom de Produit": string;
  "Quantité Vendue": number;
  "Coût Total": string;
}