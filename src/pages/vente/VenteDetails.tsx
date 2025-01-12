import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { IAchatSingle } from "../../types/achatSingle"
import { IVenteSingleTable } from "../../types/venteSingle";
import { IProduct } from "../../types/venteSingle";
import { IClient } from "../../types/venteSingle";
import { IEntrepot } from "../../types/venteSingle";
import Loading from "../../components/ui/Loading";
import { enqueueSnackbar } from "notistack";
import InfosCont from "../../containers/vente/vente details/infosCont";
import PageTitle from "../../components/ui/PageTitle";
import Table from "../../containers/vente/vente details/Table";

const VenteDetails = () => {
  const { venteId } = useParams<{ venteId: string }>();
  const [client, setClient] = useState<IClient | null>(null);
  const [entrepot, setEntrepot] = useState<IEntrepot | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<string>("");
  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    axios
      .get(`${url}/api/vente/${venteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        const newData = ModifiedData(res.data.vente.products);
        setProducts(newData);
        setTotal(res.data.vente.total_cost);
        setClient(res.data.vente.client);
        setEntrepot(res.data.vente.entrepot);
        setLoading(false);
      })
        .catch((err) => {
        //   console.log(err);
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });
  }, [venteId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Details d'un sortie" />
      <InfosCont clientData={client} entrepotData={entrepot} total={total} />
      <Table rows={products} columns={columns} />
    </div>
  );
};

export default VenteDetails;

const columns: (keyof IVenteSingleTable)[] = [
  // "id",
  "code",
  "produit",
  "prix_unitaire",
  "quantité",
  "tax",
  "grand_total",
];

const ModifiedData = (data: IProduct[]) => {
  return data.map((item) => {
    return {
      ...item,
      id: item.id,
      produit: item.name,
        quantité: item.pivot.quantity_sold,
      grand_total: item.pivot.subtotal,
      tax: item.pivot.tax,
      prix_unitaire: item.pivot.unit_price,
      code: item.code_barre,
    };
  });
};

