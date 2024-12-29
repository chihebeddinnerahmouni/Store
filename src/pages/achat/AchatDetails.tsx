import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { IAchatSingle } from "../../types/achatSingle"
import { IAchatSingleTable } from "../../types/achatSingle"
import { IProvider } from "../../types/achatSingle";
import { IEntrepot } from "../../types/achatSingle";
import Loading from "../../components/ui/Loading"
import { enqueueSnackbar } from "notistack";
import InfosCont from "../../containers/achat/details/infosCont"
import PageTitle from "../../components/ui/PageTitle"
import Table from "../../containers/achat/details/Table";

const AchatDetails = () => {

  const { achatId } = useParams<{ achatId: string }>()
  const [achat, setAchat] = useState<IModifiedData[]>([]);
  const [provider, setProvider] = useState<IProvider | null>(null)
  const [entrepot, setEntrepot] = useState<IEntrepot | null>(null)
  const [loading, setLoading] = useState(true)
  const url = import.meta.env.VITE_BASE_URL as string;

  useEffect(() => {
    axios
      .get(`${url}/api/achats/${achatId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res.data.achat);
        const newData = ModifiedData(res.data.achat)
        setAchat([newData])
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
      <PageTitle text="Details d'un achat" />
      <InfosCont
        providerData={provider}
        entrepotData={entrepot}
      />
      <Table
        rows={achat}
        columns={columns}
      />
    </div>
  );
}

export default AchatDetails

const columns: (keyof IAchatSingleTable)[] = [
  "fournisseur",
  "référénce de l'utilisateur",
  "magasin",
  "coût de livraison",
  "total",
];

const ModifiedData = (data: IAchatSingle) => {
  return {
    id: data.id,
    fournisseur: data.provider.name,
    "référénce de l'utilisateur": data.user_invoice_number,
    magasin: data.entrepot.name,
    "coût de livraison": data.livraison_cost,
    total: data.total_cost,
  };
}


interface IModifiedData {
  id: number;
  fournisseur: string;
  "référénce de l'utilisateur": string;
  magasin: string;
  "coût de livraison": string;
  total: string
}