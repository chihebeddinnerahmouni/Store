import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
// import { IAchatSingle } from "../../types/achatSingle"
import { IAchatSingleTable } from "../../types/achatSingle"
import { IProductDetails } from "../../types/achatSingle";
import { IProvider } from "../../types/achatSingle";
import { IEntrepot } from "../../types/achatSingle";
import Loading from "../../components/ui/Loading"
import { enqueueSnackbar } from "notistack";
import InfosCont from "../../containers/achat/details/infosCont"
import PageTitle from "../../components/ui/PageTitle"
import Table from "../../containers/achat/details/Table";

const AchatDetails = () => {

  const { achatId } = useParams<{ achatId: string }>()
  const [provider, setProvider] = useState<IProvider | null>(null)
  const [entrepot, setEntrepot] = useState<IEntrepot | null>(null)
  const [products, setProducts] = useState<IProductDetails[]>([]);
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState<string>("")
  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    axios
      .get(`${url}/api/achats/${achatId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.achat.total_cost);
        const newData = ModifiedData(res.data.achat.products);
        setProducts(newData);
        setTotal(res.data.achat.total_cost);
        setProvider(res.data.achat.provider)
        setEntrepot(res.data.achat.entrepot)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false);
        if (err.message === "Network Error") {
          enqueueSnackbar("Erreur de connexion", { variant: "error" });
        } else {
          enqueueSnackbar(err.response.data.message, { variant: "error" });
        }
      });
  }, [achatId])



  if (loading) {
    return <Loading />
  }

  return (
    <div className="mt-60 px-4 max-w-[1700px] mx-auto pb-14 md:px-20 lg:px-40 lg:mt-80">
      <PageTitle text="Details d'un entrée" />
      <InfosCont
        providerData={provider}
        entrepotData={entrepot}
        total={total}
      />
      <Table
        rows={products}
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

