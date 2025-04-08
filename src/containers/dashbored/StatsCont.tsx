import SemaineComp from "../../components/dashbored/SemaineComp"
import PlusVendue from "../../components/dashbored/PlusVendue"
import Alerts from "../../components/dashbored/Alerts";
import Instructions from "../../components/dashbored/Instructions";
import VenteRecente from "../../components/dashbored/VenteRecente";

interface Props {
  venteAchatsemaine: IVenteAchatsemaine;
  pieChartData: IPieChartData[];
  alerteData: IAlerteData[];
  recentVente: IRecentVente[];
}


const StatsCont = ({ venteAchatsemaine, pieChartData, alerteData, recentVente }: Props) => {
  


  return (
    <section className="mt-10 flex flex-col gap-6 lg:mt-14">
      <div className="flex flex-col gap-6 xl:flex-row ">
        <SemaineComp
        data={venteAchatsemaine}
        />
        <PlusVendue
        pieChartData={pieChartData}
        />
      </div>
      <div className="flex flex-col gap-6 xl:flex-row ">
        <Alerts
        alerteData={alerteData}
        />
        <Instructions />
      </div>
      <VenteRecente
      recentVente={recentVente}
      />
    </section>
  );
}

export default StatsCont



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