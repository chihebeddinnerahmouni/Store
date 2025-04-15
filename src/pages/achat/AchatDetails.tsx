import axios from "axios"
import { useParams } from "react-router-dom"
import { IAchatSingleTable } from "../../types/achatSingle"
import { IProductDetails } from "../../types/achatSingle";
import { IProvider } from "../../types/provider";
import { IEntrepot } from "../../types/achatSingle";
import InfosCont from "../../containers/achat/details/infosCont"
import PageTitle from "../../components/ui/PageTitle"
import Table from "../../containers/achat/details/Table";
import { useSuspenseQuery } from "@tanstack/react-query";
import IAchat from "../../types/achat";

const url = import.meta.env.VITE_BASE_URL as string;
const fetchData = async (achatId: string) => { 
  const {data} = await axios.get<{achat: IAchat}>(`${url}/api/achats/${achatId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data.achat;
}


const AchatDetails = () => {

  const { achatId } = useParams<{ achatId: string }>()

  const { data } = useSuspenseQuery({
    queryKey: ["achat", achatId],
    queryFn: () => fetchData(achatId as string),
  })

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Details d'un entrée" />
      <InfosCont
        providerData={data.provider as IProvider}
        entrepotData={data.entrepot as IEntrepot}
        total={data.total_cost}
      />
      <Table
        rows={ModifiedData((data.products as IProductDetails[]) || [])}
        columns={columns}
      />
    </div>
  );
}

export default AchatDetails

const columns: (keyof IAchatSingleTable)[] = [
  // "id",
  // "code",
  "produit",
  "prix_unitaire",
  "quantité",
  "tax",
  "grand_total",
];

const ModifiedData = (data: IProductDetails[]) => {
  return data.map((item) => {
    return {
      ...item,
      id: item.id,
      quantité: item.quantity_declared,
      produit: item.product.name,
      grand_total: item.subtotal,
      prix_unitaire: item.unit_price,
      tax: item.tax,
      // code: item.product.code,
    };
  });
}

