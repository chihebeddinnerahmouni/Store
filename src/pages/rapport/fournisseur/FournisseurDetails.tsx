import axios from "axios";
import PageTitle from "../../../components/ui/PageTitle";
import ButtonsCont from "../../../containers/raports/fournisseurs/details/ButtonsCont";
import TableAchats from "../../../containers/raports/fournisseurs/details/TableAchat";
import { useParams } from "react-router-dom";
import { IProviderDetailsTable } from "../../../types/rapport/fournisseur/fournisseur_details";
import StatsCont from "../../../containers/raports/fournisseurs/details/StatsCont";
import { useSuspenseQuery } from "@tanstack/react-query";

const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async (fournisseurId: string) => {
  const { data } = await axios.get<{ achats: any[]; provider: any, total_achats: number, total_cost: number}>(
    url + `/api/reports/providers/${fournisseurId}/report`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
}


const FournisseurDetails = () => {

  const { fournisseurId } = useParams<{ fournisseurId: string }>();

  const { data } = useSuspenseQuery({
    queryKey: ["fournisseurDetails", fournisseurId],
    queryFn: () => fetchData(fournisseurId ?? ""),
  })
  const newData = createNewArrayVentes(data.achats);
  const stats = {
    total_achats: data.total_achats,
    total_cost: data.total_cost,
  };

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Rapport de fournisseurs" />
      <p className="text-center font-bold text-xl whitespace-nowrap">
        {data.provider.name}
      </p>
      <ButtonsCont columns={columnsVentes} data={newData || []} />
      <StatsCont data={stats} />
      <TableAchats columns={columnsVentes} rows={newData || []} />
    </div>
  );
};

export default FournisseurDetails;

const createNewArrayVentes = (data: any) => {
  return data.map((item: any, index:number) => {
    return {
      ...item,
      id: index,
      "référence": item.invoice_number,
      "référence de l'utilisateur": item.user_invoice_number,
      magasin: item.entrepot_name,
    };
  });
};

const columnsVentes: (keyof IProviderDetailsTable)[] = [
  "référence",
  "date",
  "référence de l'utilisateur",
  "magasin",
  "total",
];